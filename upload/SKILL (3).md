---
name: tailored-resume-generator
description: Generate professionally tailored CVs and cover letters optimized for specific job descriptions using ATS-friendly formatting. Use this skill whenever the user wants to create or update a resume/CV, tailor their profile to a job listing, write a cover letter, optimize for ATS systems, or prepare job application materials. Always trigger for resume, CV, cover letter, job application, or ATS optimization tasks.
---

# Tailored Resume Generator

Creates ATS-optimized, role-specific resumes and cover letters that significantly improve interview callback rates.

## Workflow

### 1. Input Collection
```
Required:
- Job description (paste full text)
- Current resume/CV (or raw experience list)

Optional:
- Target company culture notes
- Desired tone (formal/modern/creative)
- Output format (PDF-ready HTML / Markdown / LaTeX)
```

### 2. Job Description Analysis

Extract and score:
```markdown
## JD Analysis

**Role**: [exact title]
**Seniority**: [junior/mid/senior/lead]
**Company**: [company name]
**Industry**: [sector]

**Must-Have Requirements** (hard filter):
- [requirement 1] → YOUR MATCH: [yes/partial/no]
- [requirement 2] → YOUR MATCH: [yes/partial/no]

**Nice-to-Have** (bonus points):
- [requirement] → [match status]

**Key ATS Keywords** (must appear in resume):
[list of exact phrases from JD]

**Culture Signals** (for cover letter tone):
[agile, innovative, collaborative, etc.]

**Hidden Requirements** (reading between the lines):
[inferred from company/role context]

**Match Score**: [X/10]
```

### 3. Resume Tailoring Strategy

```markdown
## Tailoring Decisions

For each section, determine:
1. Which experiences to INCLUDE (most relevant first)
2. Which to DEPRIORITIZE or REMOVE
3. Which keywords to INJECT naturally
4. Which metrics to EMPHASIZE

Keyword injection priority:
1. Professional Summary (3-4 keywords)
2. Skills section (all relevant keywords)
3. Experience bullets (natural integration)
4. Project descriptions (technical keywords)
```

### 4. Output: Tailored Resume

```markdown
# [FULL NAME]
[City, Country] | [email] | [phone] | [LinkedIn] | [GitHub/Portfolio]

---

## Professional Summary
[3-4 lines. Lead with role-matching keywords. Quantify if possible.
Example: "Full-Stack Developer with 5+ years building scalable Next.js 
applications. Specialized in TypeScript, React 19, and distributed systems. 
Proven track record of reducing load times by 60% and shipping features 2x 
faster through TDD and CI/CD practices."]

---

## Technical Skills
**Languages**: TypeScript, Python, SQL, [others from JD]
**Frontend**: React 19, Next.js 16, Tailwind CSS 4, shadcn/ui
**Backend**: Node.js, FastAPI, GraphQL, REST APIs
**Database**: PostgreSQL, MongoDB, Prisma ORM, Redis
**DevOps**: Vercel, Docker, GitHub Actions, [cloud platform]
**Testing**: Vitest, Playwright, pytest, [testing tools from JD]

---

## Professional Experience

### [Job Title] | [Company] | [Date Range]
*[One-line role summary matching JD language]*

- [Achievement bullet: Action verb + specific task + measurable result]
  Example: "Architected real-time dashboard serving 50K daily users, reducing 
  data latency from 3s to 200ms using TanStack Query and SSE streaming"
- [Another achievement - use JD keywords naturally]
- [Another achievement]

---

## Projects
### [Project Name] — [tech stack keywords]
[One line: what it does + who it serves + scale]
[GitHub link] | [Live demo if available]

---

## Education
[Degree, Institution, Year] [GPA if >3.5]

---

## Certifications / Additional
[Any relevant certs from JD]
```

### 5. Cover Letter Template

```markdown
[Date]

Dear [Hiring Manager Name / Hiring Team],

**Opening Hook** (1-2 sentences - reference specific company thing):
[Not "I'm applying for..." - instead: "When [Company] launched [specific 
product/initiative], it reinforced why I've been following your work for 
[time]. [Company's] approach to [specific aspect] aligns exactly with how 
I've built [similar work]."]

**Why You** (1 paragraph - show you've done research):
[Company mission + specific project/product + how it connects to your work]

**Why Me** (1-2 paragraphs - your 2-3 strongest matching achievements):
[Use exact phrases from JD. Quantify. Bridge from their need to your solution.]

**Closing** (1 paragraph - confident, not desperate):
["I'd welcome the opportunity to discuss how my work on [specific project] 
could contribute to [company goal]. I'm available for a conversation at 
your convenience."]

[Professional sign-off]
[Name]
```

### 6. ATS Optimization Checklist
- [ ] Job title from JD appears in summary
- [ ] All "must-have" skills listed in Skills section
- [ ] Date format consistent (Month YYYY)
- [ ] No tables or columns in text sections (ATS-safe)
- [ ] Headers use standard terms (Experience, Education, Skills)
- [ ] Keywords appear naturally 2-3x (not stuffed)
- [ ] File named: `[FirstName-LastName]-[Role]-Resume.pdf`

### 7. Quick One-Page Format (for senior roles)
Summary → Skills → 3 most recent roles (4-5 bullets each) → Key projects (2-3) → Education
