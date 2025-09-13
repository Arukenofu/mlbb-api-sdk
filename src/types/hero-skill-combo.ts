import {BaseRecord, BaseResponse} from "./_base.js";

export interface HeroSkillComboResponse extends BaseResponse<BaseRecord<ComboRecord>>{}

export interface ComboRecord {
    _id: string;
    caption: string;
    configId: number;
    createdAt: number;
    createdUser: string;
    data: ComboData;
    dynamic: unknown | null;
    id: number;
    linkId: number[];
    sort: number;
    updatedAt: number;
    updatedUser: string;
}

export interface ComboData {
    _object: number;
    desc: string;
    hero_id: number;
    skill_id: ComboSkill[];
    title: string;
}

export interface ComboSkill {
    _createdAt: number;
    _id: string;
    _updatedAt: number;
    data: {
        skillicon: string;
        skillid: number;
    };
    id: number;
    sourceId: number;
}