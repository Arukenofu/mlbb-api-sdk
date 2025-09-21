import {Languages} from "./_core";

export type CacheKey = string;

export type CacheMode = "default" | "no-store";

export type CacheOptions = {
    mode: CacheMode;
    ttl: number;
    staleIfError: boolean;
    keyOverride: string;
};

export interface CacheStore {
    get<T = unknown>(key: CacheKey): CacheEntry<T> | undefined;
    set<T = unknown>(key: CacheKey, entry: CacheEntry<T>): void;
    delete(key: CacheKey): void;
    clear(): void;
    size(): number;
}

export type CacheEntry<T> = {
    data: T;
    etag?: string;
    lastModified?: string;
    createdAt: number;
    ttl: number;
};

export type CreateFetcherOptions = {
    baseURL: string;
    language: Languages;
    store: CacheStore;
    defaultTTL: number;
    memoryMaxEntries: number;
    enabled: boolean;
    ttlOverrides: TTLOutrides;
};

// TTL
export type TTLKeys =
    | "hero-list"
    | "hero-list-legacy"
    | "hero-detail"
    | "hero-detail-stats"
    | "hero-skill-combo"
    | "hero-position"
    | "hero-rate"
    | "hero-relation"
    | "hero-counter"
    | "hero-compatibility"
    | "hero-rank:1"
    | "hero-rank:<=7"
    | "hero-rank:>7"
    | "fallback";

export type TTLOutrides = Partial<Record<TTLKeys, number>>;