import { describe, it, expect, vi } from "vitest";
vi.mock("ofetch", async () => await import("./__mocks__/ofetch.mock"));

import { MlbbAPI } from "../src/";
import { __setRoute, __getStats } from "./__mocks__/ofetch.mock";

describe("MlbbAPI wrapper", () => {
    it("calls endpoints through typed fetcher and supports clearCache", async () => {
        __setRoute("/api/hero-list-new", { etag: "v1", data: { ok: true } });
        const api = new MlbbAPI();

        const a = await api.getHeroList();

        expect(a).toEqual({message: 'OK'});
        expect(__getStats().calls).toBe(1);

        await api.getHeroList();
        expect(__getStats().calls).toBe(1);

        api.clearCache();
        await api.getHeroList();
        expect(__getStats().calls).toBe(2);
    });

    it("exposes cacheStore", () => {
        const api = new MlbbAPI();
        expect(typeof api.cacheStore.size).toBe("function");
    });
});
