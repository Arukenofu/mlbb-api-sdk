import {BaseRecord, BaseResponse} from "./_base.js";
import {BaseHeroRelation} from "./_shared";

export interface HeroDetailResponse extends BaseResponse<BaseRecord<RecordItem>>{}

interface RecordItem {
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

interface HeroWrapper {
    _object: number;
    head: string;
    head_big: string;
    hero: HeroData;
    hero_id: number;
    painting: string;
    relation: HeroesRelation;
}

interface HeroData {
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

interface SkillGroup {
    skilllist: Skill[];
    skilllistid: string;
}

interface Skill {
    "skillcd&cost": string;
    skilldesc: string;
    skillicon: string;
    skillid: number;
    skillname: string;
    skilltag: SkillTag[];
    skillvideo: string;
}

interface SkillTag {
    tagid: number;
    tagname: string;
    tagrgb: string;
}

interface RoadSort {
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

interface HeroesRelation extends BaseHeroRelation<RelationDetail>{
}

interface RelationDetail {
    desc: string;
    target_hero: { data: { head: string } }[];
    target_hero_id: number[];
}