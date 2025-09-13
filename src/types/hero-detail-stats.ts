import {BaseRecord, BaseResponse} from "./_base.js";

export interface HeroDetailStatsResponse extends BaseResponse<BaseRecord<RecordItem>>{}

interface RecordItem {
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

interface MainHeroData {
    head: string;
    name: string;
}

interface HeroChannel {
    id: number;
}

interface SubHero {
    hero: {
        data: {
            head: string;
        };
    };
    hero_appearance_rate: number;
    hero_channel: HeroChannel;
    hero_index: number;
    hero_win_rate: number;
    heroid: number;
    increase_win_rate: number;

    // win rate по таймингам
    min_win_rate6: number;
    min_win_rate6_8: number;
    min_win_rate8_10: number;
    min_win_rate10_12: number;
    min_win_rate12_14: number;
    min_win_rate14_16: number;
    min_win_rate16_18: number;
    min_win_rate18_20: number;
    min_win_rate20: number;
}

interface SubHeroLast {
    hero_appearance_rate: number;
    hero_index: number;
    hero_win_rate: number;
    heroid: number;
    increase_win_rate: number;

    min_win_rate6: number;
    min_win_rate6_8: number;
    min_win_rate8_10: number;
    min_win_rate10_12: number;
    min_win_rate12_14: number;
    min_win_rate14_16: number;
    min_win_rate16_18: number;
    min_win_rate18_20: number;
    min_win_rate20: number;
}