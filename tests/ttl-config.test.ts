import { describe, it, expect } from "vitest";
import { TTL_PRESETS, getTTLKey, createTTLResolver } from "../src";

describe("ttl-config", () => {
    it("getTTLKey: maps paths correctly", () => {
        expect(getTTLKey("/api/hero-list-new")).toBe("hero-list");
        expect(getTTLKey("/api/hero-list")).toBe("hero-list-legacy");
        expect(getTTLKey("/api/hero-detail/91/")).toBe("hero-detail");
        expect(getTTLKey("/api/hero-detail-stats/91/")).toBe("hero-detail-stats");
        expect(getTTLKey("/api/hero-skill-combo/91/")).toBe("hero-skill-combo");
        expect(getTTLKey("/api/hero-position")).toBe("hero-position");
        expect(getTTLKey("/api/hero-rate/91/")).toBe("hero-rate");
        expect(getTTLKey("/api/hero-relation/91/")).toBe("hero-relation");
        expect(getTTLKey("/api/hero-counter/91/")).toBe("hero-counter");
        expect(getTTLKey("/api/hero-compatibility/91/")).toBe("hero-compatibility");

        expect(getTTLKey("/api/hero-rank", { days: 1 })).toBe("hero-rank:1");
        expect(getTTLKey("/api/hero-rank", { days: 7 })).toBe("hero-rank:<=7");
        expect(getTTLKey("/api/hero-rank", { days: 30 })).toBe("hero-rank:>7");

        expect(getTTLKey("/unknown")).toBe("fallback");
    });

    it("createTTLResolver: uses presets by default", () => {
        const resolve = createTTLResolver();
        expect(resolve("/api/hero-list-new")).toBe(TTL_PRESETS["hero-list"]);
        expect(resolve("/api/hero-rank", { days: 1 })).toBe(TTL_PRESETS["hero-rank:1"]);
        expect(resolve("/unknown")).toBe(TTL_PRESETS.fallback);
    });

    it("createTTLResolver: respects overrides", () => {
        const resolve = createTTLResolver({
            "hero-rate": 12345,
            fallback: 777,
        });
        expect(resolve("/api/hero-rate/99/")).toBe(12345);
        expect(resolve("/unknown")).toBe(777);
    });
});
