import {BaseRecord, BaseResponse} from "./_base.js";
import {BaseHeroRelation} from "./_shared";

export interface HeroListNewResponse extends BaseResponse<BaseRecord<HeroRecord>> {}

interface HeroRecord {
    hero: {
        data: HeroData;
    };
    hero_id: number;
    relation: HeroRelation;
}

interface HeroData {
    head: string;
    name: string;
    smallmap: string;
}

interface HeroRelation extends BaseHeroRelation<RelationTarget> {}

interface RelationTarget {
    target_hero_id: number[];
}