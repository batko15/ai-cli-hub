---
name: lead-research-assistant
description: Research, qualify, and enrich sales leads and prospects. Builds detailed lead profiles with contact info, company intel, pain points, and personalized outreach angles. Use this skill whenever the user wants to research a company or person before outreach, build a prospect list, qualify leads, find decision makers, generate personalized cold emails, or do any sales intelligence work. Always trigger for B2B research, lead generation, prospect research, or outreach personalization tasks.
---

# Lead Research Assistant

Transforms company names or URLs into fully researched, qualified lead profiles with personalized outreach angles.

## Workflow

### 1. Input
```
Required: Company name or URL
Optional:
- ICP (Ideal Customer Profile) criteria
- Decision maker role (CTO, CMO, CEO, etc.)
- Research depth (quick/standard/deep)
- Output format (email draft/profile/CSV)
```

### 2. Company Research Checklist

#### Basic Profile
```markdown
**Company**: [name]
**URL**: [website]
**Industry**: [sector]
**Size**: [employees] (LinkedIn, Crunchbase)
**Founded**: [year]
**HQ**: [location]
**Revenue**: [range if available]
**Funding**: [stage + amount if startup]
```

#### Tech Stack Intelligence
```bash
# Check via Wappalyzer, BuiltWith, or direct inspection
# Look for: CMS, analytics, ad tools, CRM, communication tools
# Source: headers, meta tags, script srcs, job listings
```

#### Pain Point Signals
Look for:
- **Job postings** → What problems are they hiring to solve?
- **G2/Trustpilot reviews** → What do customers complain about?
- **LinkedIn posts** → What topics does leadership discuss?
- **Press coverage** → Recent news, challenges mentioned
- **GitHub** → Tech debt, open issues, deprecated libraries

#### Decision Maker Profile
```markdown
**Name**: [full name]
**Title**: [exact title from LinkedIn]
**LinkedIn**: [URL]
**Background**: [2-3 sentence summary]
**Recent Activity**: [posts, comments, shares - last 30 days]
**Likely Pain Points**: [based on role + company stage]
**Mutual Connections**: [if any]
**Trigger Events**: [funding, hiring, product launch, news]
```

### 3. Lead Scoring Matrix

| Factor | Weight | Score (1-5) |
|--------|--------|-------------|
| Company fits ICP | 30% | |
| Decision maker accessible | 20% | |
| Budget signals (funding/size) | 20% | |
| Timing signals (trigger events) | 15% | |
| Tech compatibility | 15% | |

**Total Score**: [weighted sum] → Hot/Warm/Cold

### 4. Personalized Outreach Angle

Based on research, generate:
```markdown
**Hook**: [specific thing you found - job posting, article, product launch]
**Pain Point**: [what they likely struggle with based on signals]
**Value Bridge**: [how your solution addresses their specific situation]
**Social Proof**: [most relevant case study/client for this prospect]
**CTA**: [low-friction ask - 15 min call, resource, demo]
```

### 5. Output Templates

#### Quick Profile (5 min research)
```markdown
## Lead: [Name] @ [Company]

**Quick Stats**: [size] | [industry] | [funding stage]
**Decision Maker**: [name, title, LinkedIn]
**Pain Signal**: [one clear signal found]
**Angle**: [one sentence outreach hook]
**Score**: [Hot/Warm/Cold]
```

#### Full Profile (deep research)
Full company + person analysis with multiple outreach angles, objection prep, and cadence recommendation.

#### Cold Email Draft
```
Subject: [personalized, <50 chars]

Hi [First Name],

[Hook - specific thing about them/company]

[Problem they likely face based on research]

[How you solve it - 1 sentence]

[Social proof - most relevant]

[Low-friction CTA]

[Signature]
```

### 6. Batch Processing
For lead lists (CSV input):
```
Name | Company | URL → Enriched CSV with all fields + scores
Process 10-50 leads in sequence
Flag Hot leads for immediate follow-up
```

### 7. Integration with Kenan's Stack
```typescript
// Lead data schema for Prisma
model Lead {
  id          String   @id @default(cuid())
  company     String
  contact     String
  score       Int      // 1-100
  status      String   // hot/warm/cold/contacted
  research    Json     // full profile
  createdAt   DateTime @default(now())
}
```
