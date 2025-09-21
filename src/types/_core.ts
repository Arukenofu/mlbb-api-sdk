import {MlbbApiEndpointResponse, MlbbApiEndpoints} from "./_endpoints";
import {FetchOptions} from "ofetch";
import {CacheOptions, CacheStore, CreateFetcherOptions} from "./_cache";

export enum Languages {
    Russian = 'ru',
    English = 'en',
    Indonesian = 'id',
}

export interface MakeRequest {
    <P extends MlbbApiEndpoints>(
        path: P,
        options?: FetchOptions<"json">,
        cache?: CacheOptions
    ): Promise<MlbbApiEndpointResponse<P>>;
    clear(): void;
    store: CacheStore;
}

export interface MlbbAPICacheOptions extends CreateFetcherOptions {
    baseURL: never;
    language: never
}

export interface MlbbAPIOptions {
    baseURL: string;
    language: Languages;
    cache: Partial<MlbbAPICacheOptions>;
}