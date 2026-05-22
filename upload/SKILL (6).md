---
name: competitive-ads-extractor
description: Extract, analyze and benchmark competitor advertising strategies, ad copy, landing pages, and marketing angles. Use this skill whenever the user mentions competitor research, ad analysis, marketing intelligence, spying on ads, Facebook Ads Library, Google Ads transparency, analyzing competitor campaigns, finding winning ad angles, or wants to reverse-engineer successful marketing. Always trigger for any competitive marketing analysis task.
---

# Competitive Ads Extractor

Extracts and analyzes competitor advertising strategies from multiple sources to identify winning angles, hooks, and messaging patterns.

## Workflow

### 1. Target Identification
Ask for:
- Competitor URLs or brand names (min 2-3)
- Product/niche category
- Target platforms (Meta, Google, TikTok, LinkedIn)
- Analysis depth (quick scan vs deep analysis)

### 2. Data Sources to Check
```
Priority order:
1. Meta Ads Library: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q={brand}
2. Google Ads Transparency: https://adstransparency.google.com/?region=anywhere&query={brand}
3. TikTok Creative Center: https://ads.tiktok.com/business/creativecenter/inspiration
4. SimilarWeb for traffic sources
5. Competitor landing pages (direct scrape)
```

### 3. Extraction Framework

For each competitor ad, extract:

```markdown
## Ad Analysis Card

**Brand**: [name]
**Platform**: [Meta/Google/TikTok/LinkedIn]
**Format**: [Image/Video/Carousel/Story]
**Hook**: [First 3 seconds or headline - what grabs attention]
**Offer**: [Core value proposition]
**CTA**: [Call to action text]
**Angle**: [Emotional/Logical/Social proof/Fear/Aspiration]
**Landing Page Pattern**: [Feature/Benefit/Problem-Solution/VSL]
**Estimated Run Time**: [days active = signal of success]
**Engagement Signals**: [reactions, shares if visible]
```

### 4. Pattern Analysis Output

After extracting 5+ ads, synthesize:

```markdown
## Competitive Intelligence Report

### Winning Hooks (most common patterns)
1. [Pattern] - used by X/Y competitors
2. [Pattern] - used by X/Y competitors

### Dominant Angles
- Primary: [angle] (X% of ads)
- Secondary: [angle] (X% of ads)

### Offer Structures
- [structure] → [landing page type]

### Content Gaps (what nobody's saying)
- [opportunity 1]
- [opportunity 2]

### Recommended Test Matrix
| Hook | Angle | Offer | Format |
|------|-------|-------|--------|
| [best hook] | [best angle] | [best offer] | [format] |
```

### 5. Deliverables

Generate:
- **Ad Swipe File** (markdown table with all analyzed ads)
- **Hook Library** (extracted hooks ranked by likely performance)
- **Winning Angle Report** (which angles dominate and why)
- **Gap Analysis** (positioning opportunities)
- **Test Brief** (3-5 ad concepts to test based on findings)

## Tech Stack Integration (Kenan's Stack)

When building ad intelligence tools:
```typescript
// Next.js API route for ad data aggregation
// app/api/ads/analyze/route.ts
import { z } from 'zod'

const AdAnalysisSchema = z.object({
  competitor: z.string().url(),
  platforms: z.array(z.enum(['meta', 'google', 'tiktok', 'linkedin'])),
  depth: z.enum(['quick', 'deep']).default('quick')
})
```

## Quality Checks
- Minimum 3 competitors for pattern validity
- Flag ads running 30+ days as proven winners
- Note seasonal/promotional patterns
- Cross-reference with organic content strategy
