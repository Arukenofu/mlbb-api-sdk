import {BaseRecord, BaseResponse} from "./_base.js";

export interface HeroRelationResponse extends BaseResponse<BaseRecord<HeroRelationRecord>> {}

interface HeroRelationRecord {
    hero: {
        data: {
            name: string;
        };
    };
    hero_id: number;
    relation: HeroRelation;
}

interface HeroRelation {
    assist: RelationTarget;
    strong: RelationTarget;
    weak: RelationTarget;
}

interface RelationTarget {
    target_hero_id: number[];
}