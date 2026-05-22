---
name: domain-name-brainstormer
description: Generate creative, memorable, and available domain names for projects, products, and startups. Use this skill whenever the user needs domain name ideas, wants to name a new project or product, is starting a SaaS/startup, needs a brandable URL, or wants to check naming concepts. Always trigger for domain names, product naming, startup naming, brand naming, or URL brainstorming tasks.
---

# Domain Name Brainstormer

Generates strategic, brandable domain names with availability checks and naming frameworks.

## Workflow

### 1. Input Collection
```
Required:
- Product/project description (what does it do?)
- Target audience (who uses it?)

Optional:
- Preferred TLDs (.com/.io/.dev/.app/.ai)
- Name style (descriptive/abstract/compound/invented)
- Max length (default: <15 chars)
- Avoid words: [list]
- Budget: [free check / will pay for premium domains]
```

### 2. Naming Strategy Selection

Based on product type:

| Strategy | Examples | Best For |
|----------|----------|---------|
| **Descriptive** | Mailchimp, YouTube | Broad audiences, clarity |
| **Compound** | Facebook, Instagram | Tech products, memorability |
| **Invented** | Xerox, Kodak, Zapier | Brand building, trademark |
| **Metaphor** | Amazon, Apple | Aspirational products |
| **Portmanteau** | Pinterest (pin+interest) | Consumer apps |
| **Acronym** | IBM, SAP | B2B/enterprise |
| **Action** | Slack, Zoom, Stripe | Action-oriented tools |

### 3. Name Generation

For each category, generate 10 options:

```markdown
## Domain Candidates for [Product]

### 🎯 Tier 1 — Best Options
| Name | .com | .io | .dev | .app | Why |
|------|------|-----|------|------|-----|
| [name] | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | [rationale] |

### 💡 Tier 2 — Creative Alternatives  
[10 more options with same table]

### 🔬 Tier 3 — Experimental
[5 invented/portmanteau options]

### 🤖 Tech-Specific (.ai / .dev variants)
[5 options for dev/AI products]
```

### 4. Naming Quality Criteria

Score each candidate 1-5 on:
- **Memorable**: Can people remember it after hearing once?
- **Spellable**: Can people type it without seeing it written?
- **Brandable**: Can it become a brand identity?
- **Searchable**: Won't get buried under generic terms?
- **Pronounceable**: Works when spoken aloud?
- **Global**: Works across languages (no accidental meaning)?

```
Red flags to avoid:
- Hyphens (user-trust.io ❌)
- Numbers (gr8code.com ❌)
- Double letters that cause confusion (mettle vs mettel)
- Trademarked words (anything Apple/Google/Microsoft adjacent)
- Offensive meaning in other languages
```

### 5. Domain Availability Check

```bash
# Quick check with whois
whois [domain].com | grep "No match"
whois [domain].io | grep "No match"

# Using DNS check (faster)
dig [domain].com | grep "NXDOMAIN"  # = available

# For multiple domains (paste list):
for domain in name1 name2 name3; do
  if dig +short ${domain}.com | grep -q .; then
    echo "${domain}.com - TAKEN"
  else
    echo "${domain}.com - AVAILABLE ✅"
  fi
done
```

### 6. Name Variations Generator

For a candidate like "Flowify":
```
flowify.com / flowify.io / flowify.app / getflowify.com
tryflowify.com / useflowify.com / flowify.dev
flowify.ai / flowifyapp.com / myflowify.com
```

### 7. Output Format

```markdown
## Top 5 Recommendations

### 1. [BestName].io ⭐
**Score**: 4.5/5
**Why**: [2-sentence rationale]
**Availability**: .io ✅ | .com ❌ (taken, priced at $X on Sedo)
**Alternatives**: [best-name-variations.com ✅]

### 2. [SecondName].com ⭐
...

## Quick Check Script
```bash
# Check your favorites:
for domain in bestname1 bestname2 bestname3; do
  result=$(dig +short ${domain}.com)
  [ -z "$result" ] && echo "✅ ${domain}.com available" || echo "❌ ${domain}.com taken"
done
```

## Suggested Registrars
- Namecheap (cheapest for .io)
- Cloudflare Registrar (at-cost pricing for .com)
- Porkbun (great for .dev, .app)
```

### 8. For Kenan's Projects
When naming a Next.js SaaS:
- `.app` → perfect for web apps
- `.dev` → developer tools
- `.io` → B2B / startup standard
- `.com` → if you can get it, always best for trust
