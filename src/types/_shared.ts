export interface MainHeroData {
    head: string;
    name: string;
}

export interface HeroChannel {
    id: number;
}

export interface BaseSubHero {
    hero_appearance_rate: number;
    hero_channel: HeroChannel;
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

export interface BaseHeroRelation<T> {
    assist: T;
    strong: T;
    weak: T;
}