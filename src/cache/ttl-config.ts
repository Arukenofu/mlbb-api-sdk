import {TTLKeys, TTLOutrides} from "../types/_cache";

const MIN = (n: number) => n * 60_000;
const H = (n: number) => n * 3_600_000;
const D = (n: number) => n * 86_400_000;

export const TTL_PRESETS: Record<TTLKeys, number> = {
    "hero-list": D(3),
    "hero-list-legacy": D(3),
    "hero-detail": D(14),
    "hero-detail-stats": H(12),
    "hero-skill-combo": D(30),
    "hero-position": H(6),
    "hero-rate": H(3),
    "hero-relation": D(14),
    "hero-counter": H(12),
    "hero-compatibility": H(12),
    "hero-rank:1": MIN(15),
    "hero-rank:<=7": H(2),
    "hero-rank:>7": H(6),
    fallback: MIN(5),
};

export const getTTLKey = (path: string, query?: Record<string, any>): TTLKeys => {
    if (path.startsWith("/api/hero-list-new")) return "hero-list";
    if (path.startsWith("/api/hero-list")) return "hero-list-legacy";
    if (path.startsWith("/api/hero-detail-stats/")) return "hero-detail-stats";
    if (path.startsWith("/api/hero-detail/")) return "hero-detail";
    if (path.startsWith("/api/hero-skill-combo/")) return "hero-skill-combo";
    if (path.startsWith("/api/hero-position")) return "hero-position";
    if (path.startsWith("/api/hero-rate/")) return "hero-rate";
    if (path.startsWith("/api/hero-relation/")) return "hero-relation";
    if (path.startsWith("/api/hero-counter/")) return "hero-counter";
    if (path.startsWith("/api/hero-compatibility/")) return "hero-compatibility";
    if (path.startsWith("/api/hero-rank")) {
        const d = Number(query?.days ?? 1);
        return d <= 1 ? "hero-rank:1" : d <= 7 ? "hero-rank:<=7" : "hero-rank:>7";
    }
    return "fallback";
};

export const createTTLResolver = (overrides?: TTLOutrides) => {
    const conf: Record<TTLKeys, number> = { ...TTL_PRESETS, ...(overrides ?? {}) };
    const resolve = (path: string, query?: Record<string, any>, fallback?: number) => {
        const key = getTTLKey(path, query);
        return key in conf ? conf[key] : (fallback ?? conf.fallback);
    };
    (resolve as any).config = conf;
    return resolve as typeof resolve & { config: Record<TTLKeys, number> };
};

export const ttlFor = createTTLResolver();