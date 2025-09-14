import {HeroLane, HeroRole} from "../enums/_enums.js";
import {BaseRecord, BaseResponse} from "./_base.js";

export interface HeroPositionOptions {
    role?: HeroRole;
    lane?: HeroLane;
    size?: number;
    index?: number;
}

export interface HeroPositionResponse extends BaseResponse<BaseRecord<HeroRecord>> {}

interface HeroRecord {
    hero: {
        data: HeroData;
    };
    hero_id: number;
    relation: HeroRelation;
}

interface HeroData {
    name: string;
    roadsort: RoadSort[];
    smallmap: string;
    sortid: (SortId | string)[];
}

interface RoadSort {
    _id: string;
    caption: string;
    configId: number;
    createdAt: number; // timestamp
    createdUser: string;
    data: RoadSortData;
    dynamic: unknown | null;
    id: number;
    linkId: number[];
    sort: number;
    updatedAt: number;
    updatedUser: string;
}

interface RoadSortData {
    _object: number;
    road_sort_icon: string;
    road_sort_id: string;
    road_sort_title: string;
}

interface SortId {
    _id: string;
    caption: string;
    configId: number;
    createdAt: number;
    createdUser: string;
    data: SortIdData;
    dynamic: unknown | null;
    id: number;
    linkId: number[];
    sort: number;
    updatedAt: number;
    updatedUser: string;
}

interface SortIdData {
    _object: number;
    sort_icon: string;
    sort_id: string;
    sort_title: string;
}

interface HeroRelation {
    assist: RelationTarget;
    strong: RelationTarget;
    weak: RelationTarget;
}

interface RelationTarget {
    target_hero_id: number[];
}