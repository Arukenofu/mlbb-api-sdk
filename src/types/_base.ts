export interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface BaseRecord<T> {
    records: RecordItem<T>[]
    total: number;
}

export interface RecordItem<T> {
    data: T;
}