import {Languages, MlbbAPI} from "../src";
import {mkdir, writeFile} from "fs/promises";
import {join} from "path";

const api = new MlbbAPI({language: Languages.Russian});

type Named = [string, () => Promise<unknown>];

type Result = {
    ok: boolean;
    ms: number;
    response?: unknown;
    error?: string;
};

function printSummary(name: string, res: any) {
    if (!res) {
        console.log("empty");
        return;
    }

    const candidate = res?.data ?? res;

    if (Array.isArray(candidate?.records)) {
        const records = candidate.records as any[];
        const sample = records[0] ?? null;
        const slimSample = sample && typeof sample === "object"
            ? Object.fromEntries(Object.entries(sample).slice(0, 6))
            : sample;


        console.log(JSON.stringify({
            code: res?.code ?? candidate?.code ?? undefined,
            message: res?.message ?? candidate?.message ?? undefined,
            records: records.length,
            sample: slimSample,
        }, null, 2));
        return;
    }


    console.dir(candidate, { depth: 2 });
}


async function run() {
    const heroId = 127;

    const tasks: Named[] = [
        ["getHeroList", () => api.getHeroList()],
        ["getHeroListLegacy", () => api.getHeroListLegacy()],
        ["getHeroRanking", () => api.getHeroRanking()],
        ["getHeroPosition", () => api.getHeroPosition()],
        ["getHeroDetail", () => api.getHeroDetail(heroId)],
        ["getHeroDetailStats", () => api.getHeroDetailStats(heroId)],
        ["getHeroSkillCombo", () => api.getHeroSkillCombo(heroId)],
        ["getHeroRate", () => api.getHeroRate(heroId, 7 as any)],
        ["getHeroRelation", () => api.getHeroRelation(heroId)],
        ["getHeroCounter", () => api.getHeroCounter(heroId)],
        ["getHeroCompatibility", () => api.getHeroCompatibility(heroId)],
    ];

    const results: Record<string, Result> = {};

    for (const [name, fn] of tasks) {
        const started = Date.now();
        const res = await fn();
        results[name] = { ok: true, ms: Date.now() - started, response: res };
        printSummary(name, res);
        console.log(`✓ ${name} (${Date.now() - started}ms)`);
        console.log("");
    }

    const outDir = join(process.cwd(), "output");
    await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "smoke.json");
    const payload = { ts: new Date().toISOString(), baseURL: api.baseURL, heroId, results };
    await writeFile(outFile, JSON.stringify(payload, null, 2), "utf8");
    console.log(`JSON saved to: ${outFile}`);
}

run()
    .then(() => process.exit(0))