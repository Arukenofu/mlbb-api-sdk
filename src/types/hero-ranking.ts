import {BaseRecord, BaseResponse} from "./_base.js";
import {HeroRankDays, HeroRankSortField, HeroRankTier, SortOrder} from "./_enums.js";

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

interface MainHeroData {
    head: string;
    name: string;
}

interface HeroChannel {
    id: number;
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