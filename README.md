# MLBB SDK

A TypeScript SDK for working with [ridwaanhali's](https://github.com/ridwaanhall/api-mobilelegends) MLBB Stats API - an unofficial API for retrieving statistics and data about Mobile Legends: Bang Bang heroes.

## 📋 Description

This SDK provides a convenient TypeScript interface for working with MLBB Stats API, allowing you to retrieve information about heroes, their statistics, rankings, positions, and much more. It includes built-in caching, request deduplication, and full TypeScript support.

## 🚀 Installation

```bash
npm install mlbb-sdk
```

## 📖 Usage

### Basic Usage

```typescript
import { MlbbAPI, Languages } from 'mlbb-sdk';

// Create API instance with default settings
const api = new MlbbAPI();

// Or with custom configuration
const api = new MlbbAPI({
    baseURL: 'https://mlbb-stats.ridwaanhall.com/',
    language: Languages.English,
    cache: {
        enabled: true,
        defaultTTL: 300000, // 5 minutes
        memoryMaxEntries: 500
    }
});
```

### Getting Hero List

```typescript
// Get new hero list (recommended)
const heroList = await api.getHeroList();
console.log(heroList.data.records);

// Get legacy hero list (deprecated)
const legacyHeroList = await api.getHeroListLegacy();
```

### Getting Hero Rankings

```typescript
import { HeroRankDays, HeroRankTier, HeroRankSortField, SortOrder } from 'mlbb-sdk';

const ranking = await api.getHeroRanking({
  days: HeroRankDays.D7,                    // Last 7 days
  tier: HeroRankTier.Mythic,                // Mythic tier only
  per_page: 20,                             // 20 records per page
  page: 1,                                  // First page
  sort_field: HeroRankSortField.WinRate,    // Sort by win rate
  sort_order: SortOrder.Desc                // Descending order
});

console.log(ranking.data.records);
```

### Getting Hero Positions

```typescript
import { HeroRole, HeroLane } from 'mlbb-sdk';

const positions = await api.getHeroPosition({
  role: HeroRole.Mage,                     // Mages only
  lane: HeroLane.Mid,                      // Mid lane only
  per_page: 21,
  page: 1
});
```

### Getting Hero Details

```typescript
// Basic hero information
const heroDetail = await api.getHeroDetail(1); // Hero ID

// Hero statistics with performance metrics
const heroStats = await api.getHeroDetailStats(1);

// Hero skill combinations and strategies
const skillCombo = await api.getHeroSkillCombo(1);

// Hero rating over time period
import { HeroRateDays } from 'mlbb-sdk';
const heroRate = await api.getHeroRate(1, HeroRateDays.D15); // Last 15 days

// Hero relationships (strengths/weaknesses)
const heroRelation = await api.getHeroRelation(1);

// Hero counters
const heroCounter = await api.getHeroCounter(1);

// Hero compatibility with other heroes
const heroCompatibility = await api.getHeroCompatibility(1);
```

### Caching

The SDK includes built-in caching with configurable TTL and memory management:

```typescript
// Configure cache options
const api = new MlbbAPI({
    cache: {
        enabled: true,
        defaultTTL: 300000,        // 5 minutes default
        memoryMaxEntries: 500,     // Max cache entries
        ttlOverrides: {
            '/api/hero-list-new': 600000,  // 10 minutes for hero list
            '/api/hero-rank': 120000       // 2 minutes for rankings
        }
    }
});

// Use cache for specific requests
const heroList = await api.getHeroList({
    mode: 'default',  // Use cache
    ttl: 600000       // Custom TTL for this request
});

// Skip cache for fresh data
const freshRanking = await api.getHeroRanking({}, {
    mode: 'no-store'  // Bypass cache
});

// Clear cache manually
api.clearCache();
```

## 🌍 Supported Languages

The SDK supports the following languages:

- `Languages.English` (en) - English (default)
- `Languages.Russian` (ru) - Russian  
- `Languages.Indonesian` (id) - Indonesian

```typescript
const api = new MlbbAPI({
    language: Languages.Russian
});
```

## 📊 Available API Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getHeroList(cache?)` | Get new hero list with IDs, names, and images | Optional cache options |
| `getHeroListLegacy(cache?)` | Get legacy hero list (deprecated) | Optional cache options |
| `getHeroRanking(options?, cache?)` | Get hero rankings with filters | Ranking options, cache options |
| `getHeroPosition(options?, cache?)` | Get hero positions by role/lane | Position options, cache options |
| `getHeroDetail(heroId, cache?)` | Get detailed hero information | Hero ID (1-127), cache options |
| `getHeroDetailStats(heroId, cache?)` | Get hero statistics and performance | Hero ID (1-127), cache options |
| `getHeroSkillCombo(heroId, cache?)` | Get hero skill combinations | Hero ID (1-127), cache options |
| `getHeroRate(heroId, pastDays, cache?)` | Get hero rating over time | Hero ID (1-127), time period, cache options |
| `getHeroRelation(heroId, cache?)` | Get hero relationships | Hero ID (1-127), cache options |
| `getHeroCounter(heroId, cache?)` | Get hero counters | Hero ID (1-127), cache options |
| `getHeroCompatibility(heroId, cache?)` | Get hero compatibility | Hero ID (1-127), cache options |

## 🎯 Data Types

The SDK provides full TypeScript typing for all API responses:

- `HeroListNewResponse` - Hero list response
- `HeroListLegacyResponse` - Legacy hero list response
- `HeroRankingResponse` - Hero ranking response
- `HeroPositionResponse` - Hero position response
- `HeroDetailResponse` - Hero detail response
- `HeroDetailStatsResponse` - Hero statistics response
- `HeroSkillComboResponse` - Hero skill combo response
- `HeroRateResponse` - Hero rating over time response
- `HeroRelationResponse` - Hero relationship response
- `HeroCounterResponse` - Hero counter response
- `HeroCompatibilityResponse` - Hero compatibility response

## 🧪 Experimental Features

Experimental utilities are available under the `mlbb-sdk/experimental` entry. These APIs are subject to change between minor versions.

### normalizeApiResponse

Flattens API responses by unwrapping nested `data` fields and returns a convenient shape `{ total, records }`.

```typescript
import { MlbbAPI } from 'mlbb-sdk';
import { normalizeApiResponse } from 'mlbb-sdk/experimental';

const api = new MlbbAPI();

// Example with hero list
const response = await api.getHeroList();

// Default mode is "safe"
const normalized = normalizeApiResponse(response);
// normalized => { total: number, records: Array<...flattened items...> }
console.log(normalized.total, normalized.records[0]);
```

#### Modes

- `safe` (default): unwraps `data` only when it is the only key at that level.
- `loose`: aggressively unwraps any `data` keys at all levels.

```typescript
// Safe (default)
const safeList = normalizeApiResponse(response, { mode: 'safe' });

// Loose
const looseList = normalizeApiResponse(response, { mode: 'loose' });
```

#### Typing

`normalizeApiResponse` preserves types with generics. You can extract the record item type from the response typings for best inference.

```typescript
import type { HeroListNewResponse } from 'mlbb-sdk/types';
import { normalizeApiResponse } from 'mlbb-sdk/experimental';

type HeroListRecord = HeroListNewResponse['data']['records'][number];

const response = await api.getHeroList();
const normalized = normalizeApiResponse<HeroListRecord>(response);
// normalized: { total: number; records: HeroListRecord[] }
```

Note: You can also pass an already unwrapped `BaseRecord<T>` to `normalizeApiResponse` if you store `response.data` elsewhere.

## 🔧 Development

### Installing Dependencies

```bash
npm install
```

### Building the Project

```bash
# Clean and build
npm run build

# JavaScript only
npm run build:js

# TypeScript definitions only
npm run build:dts
```

### Generating Index

```bash
npm run generate
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

## 📦 Package Structure

The SDK exports multiple entry points:

- `mlbb-sdk` - Main SDK with API client and types
- `mlbb-sdk/types` - TypeScript type definitions only
- `mlbb-sdk/enums` - Enum definitions only
- `mlbb-sdk/experimental` - Experimental utilities

## 🔄 Request Deduplication

The SDK automatically deduplicates identical requests to prevent unnecessary API calls when multiple requests are made simultaneously.

## ⚡ Performance Features

- **Built-in caching** with configurable TTL
- **Request deduplication** to avoid duplicate API calls
- **Memory-efficient** LRU cache implementation
- **TypeScript support** with full type safety
- **Configurable cache stores** for different environments

## 📝 License

MIT

## 🤝 Contributing

Contributions to the project are welcome! Please create issues and pull requests.

## ⚠️ Disclaimer

This SDK is unofficial and not affiliated with Moonton or Mobile Legends: Bang Bang. Use at your own risk.