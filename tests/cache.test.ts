import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
vi.mock("ofetch", async () => await import("./__mocks__/ofetch.mock"));

import { createMlbbFetcher } from "../src";
import {
    __setRoute,
    __getStats,
    __getLastHeaders,
    __resetOfetchMock,
} from "./__mocks__/ofetch.mock";

describe("mlbb-fetcher cache", () => {
    beforeEach(() => {
        __resetOfetchMock();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("fresh cache hit avoids network", async () => {
        __setRoute("/api/hero-list-new", { etag: "v1", data: { ok: 1 } });

        const f = createMlbbFetcher({ defaultTTL: 300_000 });
        const a = await f("/api/hero-list-new");
        expect(a).toEqual({ ok: 1 });
        expect(__getStats().calls).toBe(1);

        const b = await f("/api/hero-list-new");
        expect(b).toEqual({ ok: 1 });
        expect(__getStats().calls).toBe(1);
    });

    it("staleIfError=false propagates error after expiry", async () => {
        __setRoute("/api/hero-rate/93/", { etag: "v1", data: { rate: [7] } });
        const f = createMlbbFetcher();

        await f("/api/hero-rate/93/", undefined, { ttl: 10 });
        vi.advanceTimersByTime(20);
        __setRoute("/api/hero-rate/93/", { etag: "v1", data: { rate: [7] }, failNext: true });

        await expect(
            f("/api/hero-rate/93/", undefined, { ttl: 10, staleIfError: false })
        ).rejects.toThrow();
    });

    it("mode=no-store bypasses cache", async () => {
        __setRoute("/api/hero-list", { etag: "v1", data: { ok: 2 } });
        const f = createMlbbFetcher();

        await f("/api/hero-list", undefined, { mode: "no-store" });
        await f("/api/hero-list", undefined, { mode: "no-store" });
        await f("/api/hero-list");
        expect(__getStats().calls).toBe(3); // 2 no-store + 1 обычный
    });

    it("deduplicates concurrent identical requests", async () => {
        __setRoute("/api/hero-position", { etag: "v1", data: { page: 1 } });
        const f = createMlbbFetcher();

        const [a, b] = await Promise.all([
            f("/api/hero-position", { query: { page: 1 } }),
            f("/api/hero-position", { query: { page: 1 } }),
        ]);

        expect(a).toEqual({ page: 1 });
        expect(b).toEqual({ page: 1 });
        expect(__getStats().calls).toBe(1);
    });

    it("ttlOverrides are applied", async () => {
        __setRoute("/api/hero-list-new", { etag: "v1", data: { ok: 3 } });
        const f = createMlbbFetcher({ ttlOverrides: { "hero-list": 100 } });

        await f("/api/hero-list-new");
        expect(__getStats().calls).toBe(1);

        vi.advanceTimersByTime(90);
        await f("/api/hero-list-new");
        expect(__getStats().calls).toBe(1); // ещё свежий

        vi.advanceTimersByTime(15);
        await f("/api/hero-list-new");
        expect(__getStats().calls).toBe(2); // истёк TTL → повторный запрос
    });

    it("custom store is used", async () => {
        __setRoute("/api/hero-compatibility/91/", { etag: "v1", data: { ok: 9 } });

        const ops: string[] = [];
        const store = {
            get: (k: string) => (ops.push("get"), undefined),
            set: (k: string, v: any) => void ops.push("set"),
            delete: (k: string) => void ops.push("delete"),
            clear: () => void ops.push("clear"),
            size: () => 0,
        };

        const f = createMlbbFetcher({ store: store as any });

        await f("/api/hero-compatibility/91/");
        expect(ops).toContain("get");
        expect(ops).toContain("set");
    });
});