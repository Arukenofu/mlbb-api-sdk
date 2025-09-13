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

interface HeroWinRateStats {
    bigrank: string;
    camp_type: string;
    main_heroid: number;
    match_type: string;
    win_rate: DailyWinRate[];
}

interface DailyWinRate {
    app_rate: number;
    ban_rate: number;
    date: string; // формат "YYYY-MM-DD"
    win_rate: number;
}