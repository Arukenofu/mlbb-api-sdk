import {BaseRecord, BaseResponse} from "./_base.js";
import {BaseHeroRelation} from "./_shared";

export interface HeroRelationResponse extends BaseResponse<BaseRecord<HeroRelationRecord>> {}

export interface HeroRelationRecord {
    hero: {
        data: {
            name: string;
        };
    };
    hero_id: number;
    relation: HeroesRelation;
}

interface HeroesRelation extends BaseHeroRelation<RelationTarget> {}

export interface RelationTarget {
    target_hero_id: number[];
}