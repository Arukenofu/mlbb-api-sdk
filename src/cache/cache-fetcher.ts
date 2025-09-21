import {createTTLResolver, TTL_PRESETS} from "./ttl-config";
import {Languages} from "../types/_core";
import {type FetchOptions, ofetch} from "ofetch";
import type {MlbbApiEndpointResponse, MlbbApiEndpoints} from "../types/_endpoints";
import type {CacheStore, CacheEntry, CacheKey, CacheOptions, CreateFetcherOptions} from "../types/_cache";

class SimpleLRU implements CacheStore {
    private map = new Map<CacheKey, CacheEntry<unknown>>();
    constructor(private max = 500) {}
    get<T>(key: CacheKey): CacheEntry<T> | undefined {
        const v = this.map.get(key) as CacheEntry<T> | undefined;
        if (!v) return;
        this.map.delete(key);
        this.map.set(key, v);
        return v;
    }
    set<T>(key: CacheKey, entry: CacheEntry<T>): void {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, entry);
        if (this.map.size > this.max) {
            const k = this.map.keys().next().value as CacheKey | undefined;
            if (k) this.map.delete(k);
        }
    }
    delete(key: CacheKey): void { this.map.delete(key); }
    clear(): void { this.map.clear(); }
    size(): number { return this.map.size; }
}

const now = () => Date.now();
const isFresh = (e: CacheEntry<unknown>) => now() - e.createdAt < e.ttl;

const buildKey = (baseURL: string, path: string, query?: Record<string, any>) => {
    const q = query ? Object.keys(query).sort().map(k => `${k}=${String(query[k])}`).join("&") : "";
    return `${baseURL}|${path}?${q}`;
};

export function createMlbbFetcher(opts: Partial<CreateFetcherOptions> = {}) {
    const baseURL = opts.baseURL ?? "https://mlbb-stats.ridwaanhall.com/";
    const language = opts.language ?? Languages.English;
    const store = opts.store ?? new SimpleLRU(opts.memoryMaxEntries ?? 500);
    const ttlResolve = createTTLResolver(opts.ttlOverrides);
    const enabled = opts.enabled ?? true;

    const client = ofetch.create({
        baseURL,
        query: { lang: language },
    });

    const inflight = new Map<string, Promise<any>>();

    async function core<P extends MlbbApiEndpoints, T = MlbbApiEndpointResponse<P>>(
        path: P,
        options?: FetchOptions<"json">,
        cache?: Partial<CacheOptions>,
    ): Promise<T> {
        const mode = cache?.mode ?? "default";
        const q = { ...(options?.query as any) };
        const key = cache?.keyOverride ?? buildKey(baseURL, path, { ...q, lang: language });

        if (!enabled || mode === "no-store") {
            // @ts-ignore
            const raw = await (client as any).raw<T>(path, options) as RawLike<T>;
            return (raw as any).data ?? (raw as any)._data;
        }

        const existing = store.get<T>(key);
        if (existing && isFresh(existing)) return existing.data;

        if (inflight.has(key)) {
            return inflight.get(key)!;
        }

        const p = (async () => {
            const headers: Record<string, string> = {};
            if (existing?.etag) headers["If-None-Match"] = existing.etag;
            else if (existing?.lastModified) headers["If-Modified-Since"] = existing.lastModified;

            try {
                // @ts-ignore
                const raw = await (client as any).raw<T>(path, { ...(options ?? {}), headers }) as RawLike<T>;
                if (raw.status === 304 && existing) {
                    store.set<T>(key, { ...existing, createdAt: now() });
                    return existing.data;
                }
                const data = (raw as any).data ?? (raw as any)._data as T;
                const etag = raw.headers.get("etag") ?? undefined;
                const lastModified = raw.headers.get("last-modified") ?? undefined;
                const ttl = cache?.ttl ?? ttlResolve(path, q, opts.defaultTTL ?? TTL_PRESETS.fallback);
                store.set<T>(key, { data, etag, lastModified, createdAt: now(), ttl });

                return data;
            } catch (e) {
                if (existing && (cache?.staleIfError ?? true)) return existing.data;
                throw e;
            } finally {
                inflight.delete(key);
            }
        })();

        inflight.set(key, p);
        return p;
    }

    const fetcher = core as {
        <P extends MlbbApiEndpoints>(path: P, options?: FetchOptions<"json">, cache?: Partial<CacheOptions>): Promise<MlbbApiEndpointResponse<P>>;
        clear(): void;
        store: CacheStore;
    };

    fetcher.clear = () => store.clear();
    (fetcher as any).store = store;

    return fetcher;
}