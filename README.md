# MLBB SDK

TypeScript SDK for working with [ridwaanhali's](https://github.com/ridwaanhall/api-mobilelegends) MLBB Stats API - an unofficial API for retrieving statistics and data about Mobile Legends: Bang Bang heroes.

## 📋 Description

This SDK provides a convenient TypeScript interface for working with MLBB Stats API, allowing you to retrieve information about heroes, their statistics, rankings, positions, and much more.

## 🚀 Installation

```bash
npm install mlbb-sdk
```

## 📖 Usage

### Basic Usage

```typescript
import { MlbbAPI, Languages } from 'mlbb-sdk';

// Create API instance
const api = new MlbbAPI();

// Or with custom base URL and language
const api = new MlbbAPI('https://your-api-url.com/', Languages.Russian);
```

### Getting Hero List

```typescript
// Get new hero list (recommended)
const heroList = await api.getHeroList();
console.log(heroList.data.records);

// Get legacy hero list
const legacyHeroList = await api.getHeroListLegacy();
```

### Getting Hero Rankings

```typescript
import { HeroRankDays, HeroRankTier, HeroRankSortField, SortOrder } from 'mlbb-sdk';

const ranking = await api.getHeroRanking({
  days: HeroRankDays.D7,           // Last 7 days
  tier: HeroRankTier.Mythic,       // Mythic tier only
  per_page: 20,                    // 20 records per page
  page: 1,                         // First page
  sort_field: HeroRankSortField.WinRate,  // Sort by win rate
  sort_order: SortOrder.Desc       // Descending order
});
```

### Getting Hero Positions

```typescript
import { HeroRole, HeroLane } from 'mlbb-sdk';

const positions = await api.getHeroPosition({
  role: HeroRole.Mage,             // Mages only
  lane: HeroLane.Mid,              // Mid lane only
  per_page: 21,
  page: 1
});
```

### Getting Hero Details

```typescript
// Basic hero information
const heroDetail = await api.getHeroDetail(1); // Hero ID

// Hero statistics
const heroStats = await api.getHeroDetailStats(1);

// Hero skill combos
const skillCombo = await api.getHeroSkillCombo(1);

// Hero rating over time period
import { HeroRateDays } from 'mlbb-sdk';
const heroRate = await api.getHeroRate(1, HeroRateDays.D15); // Last 15 days

// Hero relationships (strengths/weaknesses)
const heroRelation = await api.getHeroRelation(1);

// Hero counters
const heroCounter = await api.getHeroCounter(1);

// Hero compatibility
const heroCompatibility = await api.getHeroCompatibility(1);
```

## 🌍 Supported Languages

The SDK supports the following languages:

- `Languages.English` (en) - English (default)
- `Languages.Russian` (ru) - Russian
- `Languages.Indonesian` (id) - Indonesian

```typescript
const api = new MlbbAPI(undefined, Languages.Russian);
```

## 📊 Available API Methods

| Method | Description |
|-------|----------|
| `getHeroList()` | Get new hero list |
| `getHeroListLegacy()` | Get legacy hero list |
| `getHeroRanking(options?)` | Get hero rankings |
| `getHeroPosition(options?)` | Get hero positions |
| `getHeroDetail(heroId)` | Get detailed hero information |
| `getHeroDetailStats(heroId)` | Get hero statistics |
| `getHeroSkillCombo(heroId)` | Get hero skill combos |
| `getHeroRate(heroId, pastDays)` | Get hero rating over time period |
| `getHeroRelation(heroId)` | Get hero relationships |
| `getHeroCounter(heroId)` | Get hero counters |
| `getHeroCompatibility(heroId)` | Get hero compatibility |

## 🎯 Data Types

The SDK provides full TypeScript typing for all API responses:

- `HeroListNewResponse` - Hero list response
- `HeroRankingResponse` - Hero ranking response
- `HeroPositionResponse` - Hero position response
- `HeroDetailResponse` - Hero detail response
- `HeroDetailStatsResponse` - Hero statistics response
- `HeroSkillComboResponse` - Hero skill combo response
- `HeroRateResponse` - Hero rating over time response
- `HeroRelationResponse` - Hero relationship response
- `HeroCounterResponse` - Hero counter response
- `HeroCompatibilityResponse` - Hero compatibility response

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

## 📝 License

MIT

## 🤝 Contributing

Contributions to the project are welcome! Please create issues and pull requests.

## ⚠️ Disclaimer

This SDK is unofficial and not affiliated with Moonton or Mobile Legends: Bang Bang. Use at your own risk.
