export type Route = {
    etag?: string;
    lastModified?: string;
    data?: any;
    failNext?: boolean;
};

const routes = new Map<string, Route>();
const stats = { calls: 0 };
const lastHeaders = new Map<string, Record<string, string>>();

export const __setRoute = (path: string, route: Route) => {
    routes.set(path, { ...route });
};

export const __getStats = () => ({ calls: stats.calls });
export const __getLastHeaders = (path: string) => lastHeaders.get(path);

/** ➜ вот это добавь */
export const __resetOfetchMock = () => {
    routes.clear();
    lastHeaders.clear();
    stats.calls = 0;
};

export const ofetch = {
    create(cfg: { baseURL?: string; query?: Record<string, any> }) {
        return {
            async raw<T>(path: string, options?: { headers?: Record<string, string> }) {
                stats.calls++;
                const r = routes.get(path) ?? {};
                const headersIn = options?.headers ?? {};
                lastHeaders.set(path, headersIn);

                if (r.failNext) {
                    r.failNext = false;
                    throw new Error("network");
                }

                const matchETag = r.etag && headersIn["If-None-Match"] === r.etag;
                const matchLM = r.lastModified && headersIn["If-Modified-Since"] === r.lastModified;

                if (matchETag || matchLM) {
                    return {
                        status: 304,
                        headers: new Headers(
                            r.etag ? { etag: r.etag } :
                                r.lastModified ? { "last-modified": r.lastModified } : {}
                        ),
                    } as any;
                }

                return {
                    status: 200,
                    headers: new Headers({
                        ...(r.etag ? { etag: r.etag } : {}),
                        ...(r.lastModified ? { "last-modified": r.lastModified } : {}),
                    }),
                    data: r.data as T,
                } as any;
            },
        };
    },
};

export type $Fetch = unknown;
export type FetchOptions<T> = unknown;