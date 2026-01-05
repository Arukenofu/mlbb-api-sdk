import type {HeroListNewResponse} from "./hero-list-new";
import type {HeroRankingResponse} from "./hero-ranking";
import type {HeroPositionResponse} from "./hero-position";
import type {HeroDetailResponse} from "./hero-detail";
import type {HeroDetailStatsResponse} from "./hero-detail-stats";
import type {HeroSkillComboResponse} from "./hero-skill-combo";
import type {HeroRateResponse} from "./hero-rate";
import type {HeroRelationResponse} from "./hero-relation";
import type {HeroCompatibilityResponse, HeroCounterResponse} from "./hero-counter-relations";

export type MlbbApiEndpoints =
    | "/api/hero-list-new"
    | "/api/hero-list"
    | "/api/hero-rank"
    | "/api/hero-position"
    | `/api/hero-detail/${number}/`
    | `/api/hero-detail-stats/${number}/`
    | `/api/hero-skill-combo/${number}/`
    | `/api/hero-rate/${number}/`
    | `/api/hero-relation/${number}/`
    | `/api/hero-counter/${number}/`
    | `/api/hero-compatibility/${number}/`;

export type MlbbApiEndpointResponse<P> =
    P extends "/api/hero-list" ? HeroListNewResponse :
    P extends "/api/hero-rank" ? HeroRankingResponse :
    P extends "/api/hero-position" ? HeroPositionResponse :
    P extends `/api/hero-detail/${number}/` ? HeroDetailResponse :
    P extends `/api/hero-detail-stats/${number}/` ? HeroDetailStatsResponse :
    P extends `/api/hero-skill-combo/${number}/` ? HeroSkillComboResponse :
    P extends `/api/hero-rate/${number}/` ? HeroRateResponse :
    P extends `/api/hero-relation/${number}/` ? HeroRelationResponse :
    P extends `/api/hero-counter/${number}/` ? HeroCounterResponse :
    P extends `/api/hero-compatibility/${number}/` ? HeroCompatibilityResponse :
    unknown;