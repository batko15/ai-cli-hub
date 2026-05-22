---
name: meeting-insights-analyzer
description: Extract structured insights, action items, decisions, and follow-ups from meeting transcripts, notes, or recordings. Use this skill whenever the user shares meeting notes, a transcript, a Zoom/Teams recording summary, wants to summarize a call, needs action items extracted, or wants to send a meeting recap email. Always trigger for any meeting analysis, transcript processing, call summary, or follow-up generation task.
---

# Meeting Insights Analyzer

Transforms raw meeting transcripts or notes into structured, actionable intelligence with zero information loss.

## Workflow

### 1. Input Handling

Accept:
- **Raw transcript** (Zoom, Teams, Fireflies, Otter.ai output)
- **Meeting notes** (bullet points or prose)
- **Audio summary** (if user describes what was discussed)
- **Slack thread** (async "meeting" summary)

If transcript is long (>5000 words), process in sections, then synthesize.

### 2. Core Extraction Framework

```markdown
## Meeting Intelligence Report
**Date**: [date]
**Duration**: [estimated from transcript length]
**Attendees**: [extracted from transcript + roles if mentioned]
**Meeting Type**: [standup/planning/review/sales/1:1/all-hands]

---

## 🎯 Key Decisions Made
[Only firm decisions, not discussions]
1. [Decision] → Owner: [name] | Deadline: [date]
2. ...

## ✅ Action Items
| # | Task | Owner | Deadline | Priority |
|---|------|-------|----------|----------|
| 1 | [specific task] | [name] | [date/ASAP] | 🔴/🟡/🟢 |

## 📌 Key Discussion Points
[Structured summary of what was discussed, NOT verbatim]
### [Topic 1]
- Key point
- Decision or outcome

## ⚠️ Risks & Blockers Mentioned
- [risk/blocker] → [who owns resolution]

## 💡 Ideas for Later
[Good ideas mentioned but not actioned yet]

## ❓ Open Questions / Parking Lot
[Unresolved questions that need follow-up]

## 📊 Metrics / Numbers Mentioned
[Any KPIs, numbers, targets discussed]
```

### 3. Meeting Type Templates

#### Sales Call Analysis
Additional extraction:
```markdown
## Sales Intelligence
**Lead Temperature**: [hot/warm/cold based on conversation]
**Budget Signals**: [any mentions of budget, pricing, cost]
**Decision Timeline**: [when they plan to decide]
**Objections Raised**: [+ recommended responses]
**Next Step Agreed**: [exactly what was committed to]
**Champion Contact**: [internal advocate if identified]
**Competitor Mentions**: [any competitors brought up]
```

#### Sprint/Planning Meeting
```markdown
## Sprint Planning Output
**Sprint Goal**: [the agreed goal]
**Committed Stories**: [list with points]
**Capacity**: [team capacity mentioned]
**Risks to Sprint**: [blockers/dependencies]
**Definition of Done**: [if discussed]
```

#### 1:1 Meeting
```markdown
## 1:1 Summary
**Morale Signal**: [positive/neutral/concern - based on tone]
**Career Topics**: [any growth/concern discussions]
**Feedback Given**: [manager → report]
**Feedback Received**: [report → manager]
**Goals Progress**: [OKR/goal check-in if discussed]
```

### 4. Automated Follow-Up Generation

#### Email Recap (send to all attendees)
```markdown
Subject: Meeting Recap - [Topic] | [Date]

Hi team,

Quick recap from today's [meeting type]:

**Decisions:**
- [decision 1]

**Action Items:**
- @[name]: [task] by [date]
- @[name]: [task] by [date]

**Next meeting**: [date/time if scheduled]

Full notes: [Notion/Drive link if applicable]

[Sender]
```

#### Slack Summary (for async teams)
```markdown
📋 *Meeting Recap - [Topic]*

*Decisions made:*
• [decision]

*Action items:*
:white_check_mark: [name] → [task] (by [date])

*Open questions:*
:question: [question] - [owner]

Thread for follow-up questions below 👇
```

### 5. Integration Points

```typescript
// Notion MCP integration for saving meeting notes
// Google Calendar MCP for linking to calendar event
// Slack MCP for posting recap to channel

// Suggested Prisma schema for meeting tracking
model Meeting {
  id          String   @id @default(cuid())
  date        DateTime
  attendees   String[]
  actionItems Json     // structured action items
  decisions   Json
  summary     String
  followUpSent Boolean @default(false)
}
```

### 6. Quality Standards
- Every action item must have: task + owner + deadline
- Decisions must be clearly separated from discussions
- Use exact names (not "someone" or "they")
- Flag urgency for items needed before next business day
- Never paraphrase numbers - use exact figures from transcript
