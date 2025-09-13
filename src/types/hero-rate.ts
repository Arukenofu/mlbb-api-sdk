import {BaseRecord, BaseResponse} from "./_base.js";

export interface HeroRateResponse extends BaseResponse<BaseRecord<RecordItem>> {}

interface RecordItem {
    _createdAt: number;
    _id: string;
    _updatedAt: number;
    data: HeroWinRateStats;
    id: number;
    sourceId: number;
}

export interface HeroWinRateStats {
    bigrank: string;
    camp_type: string;
    main_heroid: number;
    match_type: string;
    win_rate: DailyWinRate[];
}

export interface DailyWinRate {
    app_rate: number;
    ban_rate: number;
    date: `${number}${number}${number}${number}-${number}${number}-${number}${number}`; // "YYYY-MM-DD"
    win_rate: number;
}