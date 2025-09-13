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
import type {HeroCompatibilityResponse, HeroCounterResponse} from "./types/hero-counter-relations";
import {Languages} from "./types/_core";

/**
 * @description MLBB API class instance
 */
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

    /**
     * @description Get hero list new. it shows hero id, hero name, hero image head, and hero image map.
     */
    async getHeroList() {
        return this.makeRequest<HeroListNewResponse>('/api/hero-list-new');
    }

    /**
     * @deprecated use {@link getHeroList} instead.
     * @description Get hero list.
     */
    async getHeroListLegacy() {
        return this.makeRequest<HeroListLegacyResponse>('/api/hero-list');
    }

    /**
     * @description The query parameters for fetching hero rankings include the number of days (1, 3, 7, 15, 30), rank category (all, epic, legend, mythic, honor, glory), number of records per page (1-129), page index (1-129), sorting field (pick_rate, ban_rate, win_rate), and sorting order (asc, desc). The default values are 1 day, all ranks, 20 records per page, page index 1, sorted by win_rate in descending order. The result includes a status code, message, and data with records of heroes, including their appearance rate, ban rate, win rate, and IDs, along with sub-heroes and their respective details. The total number of records is also provided.
     */
    async getHeroRanking(options?: HeroRankingOptions) {
        return this.makeRequest<HeroRankingResponse>('/api/hero-rank', {
            query: options,
        });
    }

    /**
     * @description The query parameters for fetching hero positions include role category (all, tank, fighter, ass, mage, mm, supp), lane category (all, exp, mid, roam, jungle, gold), number of records per page (1-129), and page index (1-129). The default values are all roles, all lanes, 21 records per page, and page index 1. The result includes a status code, message, and data with records of heroes, including their names, lane positions, and IDs, along with their relations (assist, strong, weak) with other heroes. The total number of records is also provided.
     */
    async getHeroPosition(options?: HeroPositionOptions) {
        return this.makeRequest<HeroPositionResponse>('/api/hero-position', {
            query: options,
        });
    }

    /**
     * @description The API endpoint uses a mandatory path parameter called hero_id, an integer ranging from 1 to 127, to fetch details for a specific hero. The successful response is a JSON object containing a success code and message, along with a data field that includes a records array holding the hero's information; including its name (Lukas), various image URLs, skill details (descriptions, cooldowns, tags), role, recommended lane, strengths and weaknesses against other heroes, and background information.
     */
    async getHeroDetail(heroId: number) {
        return this.makeRequest<HeroDetailResponse>(`/api/hero-detail/${heroId}/`);
    }

    /**
     * @description The API endpoint requires a path parameter called main_heroid, an integer between 1 and 127, to fetch detailed statistics for a specific main hero. The successful JSON response contains a success code and message, and a data field with a records array holding an object that includes win rates, ban rates, and appearance rates for the main hero, as well as a list of "sub-heroes" who are often seen in matches with the main hero. For each sub-hero, the response includes their appearance rate, win rate, and how their win rates fluctuate across different match time segments, also included are sub heroes that have negative impact in the matches. In short, the response provides performance metrics of the main hero, as well as the heroes frequently played with them and how these pairings affect match outcomes at different time marks.
     */
    async getHeroDetailStats(heroId: number) {
        return this.makeRequest<HeroDetailStatsResponse>(
            `/api/hero-detail-stats/${heroId}/`
        );
    }

    /**
     * @description The API endpoint uses a required path parameter, hero_id, an integer from 1 to 127, to retrieve skill combination strategies for a specific hero. The successful JSON response includes a success code and message, and a data field with a records array, where each object represents a skill combo guide for the specified hero, containing a description of the skill sequence and an array of skill_id objects that specify the skills involved in the combo along with their associated icons. Each combo also includes a title indicating its purpose, like "LANING COMBOS" or "TEAMFIGHT COMBOS". The API returns an array of these skill combination guides for a single hero.
     */
    async getHeroSkillCombo(heroId: number) {
        return this.makeRequest<HeroSkillComboResponse>(`/api/hero-skill-combo/${heroId}/`);
    }

    /**
     * @description This API endpoint uses a mandatory path parameter, main_heroid (an integer from 1 to 127), to fetch the rating data for a specific hero. It also accepts an optional query parameter past-days (with possible values of 7, 15, or 30, defaulting to 7) to determine the time range for the data. The successful JSON response contains a success code and message, along with a data field. This data field has a records array, holding objects that contain the hero's daily win rate, ban rate, and appearance rate over the specified number of past days. The response provides a time series of performance metrics, enabling analysis of the selected hero's performance over time.
     */
    async getHeroRate(heroId: number, pastDays: HeroRateDays) {
        return this.makeRequest<HeroRateResponse>(`/api/hero-rate/${heroId}/`, {
            query: { 'past-days': pastDays },
        });
    }

    /**
     * @description The API endpoint utilizes a required path parameter, hero_id, an integer from 1 to 127, to retrieve relationship data for a specific hero. The successful JSON response includes a success code and message, and the data field containing a records array. This array holds an object with the main hero's name, its hero_id, and a relation object. The relation object categorizes the hero's relationships into assist, strong, and weak based on target_hero_id arrays. These arrays hold hero IDs that represent heroes that synergize well, heroes that the main hero is strong against, and heroes that the main hero is weak against, respectively.
     */
    async getHeroRelation(heroId: number) {
        return this.makeRequest<HeroRelationResponse>(`/api/hero-relation/${heroId}/`);
    }

    /**
     * @description This API endpoint uses the main_heroid path parameter (1-129) to retrieve counter information for a hero.
     */
    async getHeroCounter(heroId: number) {
        return this.makeRequest<HeroCounterResponse>(`/api/hero-counter/${heroId}/`);
    }

    /**
     * @description API endpoint uses main_heroid (1-129) to fetch hero compatibility data.
     */
    async getHeroCompatibility(heroId: number) {
        return this.makeRequest<HeroCompatibilityResponse>(
            `/api/hero-compatibility/${heroId}/`
        );
    }
}