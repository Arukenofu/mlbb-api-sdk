import {BaseRecord, BaseResponse} from "../types/_base";

export type NormaliseModes = "safe" | "loose";

type OnlyDataKey<T> = Exclude<keyof T, "data"> extends never ? true : false;

type DeepUnwrapSafe<T> =
    T extends { data: infer D }
        ? (OnlyDataKey<T> extends true
            ? DeepUnwrapSafe<D>
            : { [K in keyof T]: DeepUnwrapSafe<T[K]> })
        : T extends (infer A)[]
            ? DeepUnwrapSafe<A>[]
            : T extends object
                ? { [K in keyof T]: DeepUnwrapSafe<T[K]> }
                : T;

type DeepUnwrapLoose<T> =
    T extends { data: infer D }
        ? DeepUnwrapLoose<D>
        : T extends (infer A)[]
            ? DeepUnwrapLoose<A>[]
            : T extends object
                ? { [K in keyof T]: DeepUnwrapLoose<T[K]> }
                : T;

export type DeepNormalize<T, M extends NormaliseModes> =
    M extends "loose" ? DeepUnwrapLoose<T> : DeepUnwrapSafe<T>;

export type NormalizedList<T, M extends NormaliseModes = "safe"> = {
    total: number;
    records: DeepNormalize<T, M>[];
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
    return v !== null && typeof v === "object" && !Array.isArray(v);
}

function deepNormalizeRuntime(value: unknown, mode: NormaliseModes): any {
    if (Array.isArray(value)) {
        return value.map((v) => deepNormalizeRuntime(v, mode));
    }
    if (!isPlainObject(value)) {
        return value;
    }

    if (mode === "loose" && "data" in value) {
        return deepNormalizeRuntime((value as any).data, mode);
    }

    if (mode === "safe" && "data" in value) {
        const keys = Object.keys(value);
        if (keys.length === 1 && keys[0] === "data") {
            return deepNormalizeRuntime((value as any).data, mode);
        }
    }

    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
        out[k] = deepNormalizeRuntime(v, mode);
    }
    return out;
}

export function normalizeApiResponse<
    T,
    M extends NormaliseModes = "safe"
>(
    input: BaseResponse<BaseRecord<T>> | BaseRecord<T>,
    options?: { mode?: M }
): NormalizedList<T, M> {
    const mode: NormaliseModes = options?.mode ?? "safe";

    const payload = ("data" in input ? (input as BaseResponse<BaseRecord<T>>).data : input) as BaseRecord<T>;

    const total = payload.total;
    const recordsNorm = deepNormalizeRuntime(payload.records, mode) as DeepNormalize<T, M>[];

    return { total, records: recordsNorm };
}