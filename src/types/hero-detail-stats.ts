import {BaseRecord, BaseResponse} from "./_base.js";
import {BaseSubHero, HeroChannel, MainHeroData} from "./_shared";

export interface HeroDetailStatsResponse extends BaseResponse<BaseRecord<HeroDetailStatsRecord>> {}

interface HeroDetailStatsRecord {
    _createdAt: number;
    _id: string;
    _updatedAt: number;
    data: HeroStats;
    id: number;
    sourceId: number;
}

interface HeroStats {
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
    sub_hero_last: SubHeroLast[];
}

interface SubHero extends BaseSubHero {
    hero: {
        data: {
            head: string;
        };
    };
}

interface SubHeroLast extends Omit<BaseSubHero, "hero_channel"> {
    hero_channel?: never;
}