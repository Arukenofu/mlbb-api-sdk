import {ofetch, $Fetch} from "ofetch";
import type {HeroListNewResponse} from "./types/hero-list-new";
import type {HeroListLegacyResponse} from "./types/hero-list-legacy";
import type {HeroRankingResponse, HeroRankingOptions} from "./types/hero-ranking";
import type {HeroPositionOptions, HeroPositionResponse} from "./types/hero-position";
import type {HeroDetailResponse} from "./types/hero-detail";
import type {HeroDetailStatsResponse} from "./types/hero-detail-stats";
import type {HeroSkillComboResponse} from "./types/hero-skill-combo";
import type {HeroRateDays} from "./types/_enums";
import type {HeroRateResponse} from "./types/hero-rate";
import type {HeroRelationResponse} from "./types/hero-relation";
import type {HeroCounterResponse} from "./types/hero-counter";
import type {HeroCompatibilityResponse} from "./types/hero-compatibility";
import {Languages} from "./types/_core";

export class MlbbAPI {
    private readonly baseURL: string;
    public readonly makeRequest: $Fetch;

    constructor(baseURL?: string, language: Languages = Languages.English) {
        this.baseURL = baseURL || 'https://mlbb-stats.ridwaanhall.com/';
        this.makeRequest = ofetch.create({
            baseURL: this.baseURL,
            query: {
                lang: language
            }
        });
    }

    async getHeroList() {
        return this.makeRequest<HeroListNewResponse>('/api/hero-list-new');
    }

    /**
     * @deprecated use {@link getHeroList} instead.
     */
    async getHeroListLegacy() {
        return this.makeRequest<HeroListLegacyResponse>('/api/hero-list');
    }

    async getHeroRanking(options?: HeroRankingOptions) {
        return this.makeRequest<HeroRankingResponse>('/api/hero-rank', {
            query: options,
        });
    }

    async getHeroPosition(options?: HeroPositionOptions) {
        return this.makeRequest<HeroPositionResponse>('/api/hero-position', {
            query: options,
        });
    }

    async getHeroDetail(heroId: number) {
        return this.makeRequest<HeroDetailResponse>(`/api/hero-detail/${heroId}/`);
    }

    async getHeroDetailStats(heroId: number) {
        return this.makeRequest<HeroDetailStatsResponse>(
            `/api/hero-detail-stats/${heroId}/`
        );
    }

    async getHeroSkillCombo(heroId: number) {
        return this.makeRequest<HeroSkillComboResponse>(`/api/hero-skill-combo/${heroId}/`);
    }

    async getHeroRate(heroId: number, pastDays: HeroRateDays) {
        return this.makeRequest<HeroRateResponse>(`/api/hero-rate/${heroId}/`, {
            query: { 'past-days': pastDays },
        });
    }

    async getHeroRelation(heroId: number) {
        return this.makeRequest<HeroRelationResponse>(`/api/hero-relation/${heroId}/`);
    }

    async getHeroCounter(heroId: number) {
        return this.makeRequest<HeroCounterResponse>(`/api/hero-counter/${heroId}/`);
    }

    async getHeroCompatibility(heroId: number) {
        return this.makeRequest<HeroCompatibilityResponse>(
            `/api/hero-compatibility/${heroId}/`
        );
    }
}