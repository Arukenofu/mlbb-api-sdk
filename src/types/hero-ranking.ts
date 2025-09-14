import {BaseRecord, BaseResponse} from "./_base.js";
import {HeroChannel, MainHeroData} from "./_shared";
import {HeroRankDays, HeroRankSortField, HeroRankTier, SortOrder} from "../enums/_enums";

export interface HeroRankingOptions {
    days?: HeroRankDays;
    rank?: HeroRankTier;
    size?: number;
    index?: number;
    sort_field?: HeroRankSortField;
    sort_order?: SortOrder;
}

export interface HeroRankingResponse extends BaseResponse<BaseRecord<HeroStats>> {}

interface HeroStats {
    main_hero: {
        data: MainHeroData;
    };
    main_hero_appearance_rate: number;
    main_hero_ban_rate: number;
    main_hero_channel: HeroChannel;
    main_hero_win_rate: number;
    main_heroid: number;
    sub_hero: SubHero[];
}

interface SubHero {
    hero: {
        data: SubHeroData;
    };
    hero_channel: HeroChannel;
    heroid: number;
    increase_win_rate: number;
}

interface SubHeroData {
    head: string;
}