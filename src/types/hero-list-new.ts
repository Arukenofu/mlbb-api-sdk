import {BaseRecord, BaseResponse} from "./_base.js";

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

interface HeroRelation {
    assist: RelationTarget;
    strong: RelationTarget;
    weak: RelationTarget;
}

interface RelationTarget {
    target_hero_id: number[];
}