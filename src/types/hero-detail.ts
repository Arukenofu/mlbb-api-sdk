import {BaseResponse} from "./_base.js";
import {BaseHeroRelation} from "./_shared";

export interface HeroDetailResponse extends BaseResponse<{
    records: HeroDetailRecord[],
    total: number;
}> {}

export interface HeroDetailRecord {
    _id: string;
    caption: string;
    configId: number;
    createdAt: number;
    createdUser: string;
    data: HeroWrapper;
    dynamic: unknown | null;
    id: number;
    linkId: number[];
    sort: number;
    updatedAt: number;
    updatedUser: string;
}

export interface HeroWrapper {
    _object: number;
    head: string;
    head_big: string;
    hero: {
        _createdAt: number;
        _id: string;
        _updatedAt: number;
        data: HeroData;
        id: number;
        sourceId: number;
    };
    hero_id: number;
    painting: string;
    relation: HeroesRelation;
}

export interface HeroData {
    abilityshow: string[];
    difficulty: string;
    head: string;
    heroid: number;
    heroskilllist: SkillGroup[];
    heroskin: unknown | null;
    name: string;
    painting: string;
    recommendlevel: string[];
    recommendlevellabel: string;
    recommendmasterplan: unknown[];
    roadsort: (RoadSort | string)[];
    roadsorticon1: string;
    roadsorticon2: string;
    roadsortlabel: string[];
    smallmap: string;
    sorticon1: string;
    sorticon2: string;
    sortid: (SortId | string)[];
    sortlabel: string[];
    speciality: string[];
    squarehead: string;
    squareheadbig: string;
    story: string;
    tale: string;
}

export interface SkillGroup {
    skilllist: Skill[];
    skilllistid: string;
}

export interface Skill {
    "skillcd&cost": string;
    skilldesc: string;
    skillicon: string;
    skillid: number;
    skillname: string;
    skilltag: SkillTag[];
    skillvideo: string;
}

export interface SkillTag {
    tagid: number;
    tagname: string;
    tagrgb: string;
}

export interface RoadSort {
    _id: string;
    caption: string;
    configId: number;
    createdAt: number;
    createdUser: string;
    data: RoadSortData;
    dynamic: unknown | null;
    id: number;
    linkId: number[];
    sort: number;
    updatedAt: number;
    updatedUser: string;
}

export interface RoadSortData {
    _object: number;
    road_sort_icon: string;
    road_sort_id: string;
    road_sort_title: string;
}

export interface SortId {
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

export interface SortIdData {
    _object: number;
    sort_icon: string;
    sort_id: string;
    sort_title: string;
}

interface HeroesRelation extends BaseHeroRelation<RelationDetail> {}

export interface RelationDetail {
    desc: string;
    target_hero: {
        data: { head: string };
    }[];
    target_hero_id: number[];
}