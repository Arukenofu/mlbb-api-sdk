export enum Languages {
    Russian = 'ru',
    English = 'en',
    Indonesian = 'id',
}

export interface MlbbAPIOptions {
    baseURL?: string;
    language?: Languages;
}