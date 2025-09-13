import type {BaseRecord, BaseResponse} from "./_base";
import type {BaseSubHero, HeroChannel, MainHeroData} from "./_shared";

export interface HeroCompatibilityResponse extends BaseResponse<BaseRecord<HeroCounterRelationRecord>>{}
export interface HeroCounterResponse extends BaseResponse<BaseRecord<HeroCounterRelationRecord>>{}

export interface HeroCounterRelationRecord {
    _createdAt: number;
    _id: string;
    _updatedAt: number;
    data: HeroAnalytics;
    id: number;
    sourceId: number;
}

export interface HeroAnalytics {
    bigrank: string;
    camp_type: string;
    main_hero: {
        data: MainHeroData;
    };
    main_hero_appearance_rate: number;
    main_hero_ban_rate: number;
    main_hero_channel: HeroChannel;
    main_hero_win_rate: number;
    main_heroid: number;
    match_type: string;
    sub_hero: SubHero[];
    sub_hero_last: SubHero[];
}

interface SubHero extends BaseSubHero {
    hero: {
        data: {
            head: string;
        };
    };
}