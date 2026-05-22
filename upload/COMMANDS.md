# Slash Commands für Claude Code
# Speichern als einzelne .md Dateien unter .claude/commands/
# Basiert auf: centminmod/my-claude-code-setup + hesreallyhim/awesome-claude-code

---

## /review.md
```
Review the current file or staged changes for:
1. TypeScript type safety (no `any`, proper generics)
2. Security vulnerabilities (OWASP Top 10)
3. Performance issues (N+1 queries, unnecessary re-renders, bundle size)
4. Code style and conventions
5. Missing tests
6. Accessibility (if UI code)

Output format:
## Code Review

### 🔴 Critical (must fix)
### 🟡 Warning (should fix)  
### 🟢 Suggestion (nice to have)
### ✅ Looks Good
```

---

## /security.md
```
Run a security review on $ARGUMENTS or current file.
Check for:
- OWASP Top 10:2025 vulnerabilities
- Hardcoded secrets or credentials
- Missing input validation (Zod schemas)
- Authentication bypass risks
- SQL injection risks
- XSS vulnerabilities
- Sensitive data in logs or responses

Use the owasp-security and security-scanner skills.
Output: severity-ranked findings with specific remediation code.
```

---

## /deploy.md
```
Run the pre-deployment checklist:
1. TypeScript: bunx tsc --noEmit
2. Lint: bun run lint
3. Tests: bun run test
4. Build: bun run build
5. Secret scan: grep for hardcoded credentials
6. Env vars: verify all required vars are set
7. Database: check if migrations need to run
8. Dependencies: bun audit

Report: READY_TO_DEPLOY or list of BLOCKERS.
```

---

## /debug.md
```
Debug the issue: $ARGUMENTS

Use systematic-debugging skill:
1. Reproduce the problem
2. Add strategic logging/breakpoints
3. Isolate to specific component/function
4. Form hypothesis about root cause
5. Test hypothesis
6. Implement fix
7. Verify fix + add regression test

Do NOT propose fixes until root cause is confirmed.
```

---

## /test.md
```
Generate comprehensive tests for: $ARGUMENTS

Using tdd-patterns skill:
- Unit tests with Vitest (mock external dependencies)
- Integration test (real database/API if applicable)
- Edge cases: null/undefined, empty, max values, malformed input
- Error cases: what should fail and how

Coverage target: 80%+ lines, branches, functions.
Tests should be in __tests__/ or *.test.ts next to implementation.
```

---

## /agent.md
```
Spawn a specialized subagent for: $ARGUMENTS

Available agents:
- research:   Deep web research + competitive analysis
- browser:    Browser automation + scraping (Playwright)
- security:   Security audit + vulnerability scan
- devops:     Deployment + infrastructure
- business:   Invoices, meetings, outreach

Select the best agent, provide context, and run the task.
Use agent-mcp-orchestrator skill if multiple agents needed.
```

---

## /changelog.md
```
Generate a changelog from recent git commits.
Use changelog-generator skill:
1. git log --since="last tag" or "last 2 weeks"
2. Group by: Features, Bug Fixes, Performance, Maintenance
3. Translate technical commits to user-facing language
4. Format as Keep a Changelog standard

Also generate:
- GitHub Release draft
- Slack announcement (brief)
```

---

## /analyze.md
```
Analyze the codebase or specific component: $ARGUMENTS

Use claude-context MCP (Zilliz semantic search) to find:
- All relevant code across the project
- Dependencies and callers
- Similar patterns elsewhere
- Technical debt

Report: architecture overview, complexity assessment, improvement opportunities.
```

---

## /invoice.md
```
Create or process an invoice: $ARGUMENTS

Use invoice-organizer skill.
Required info (ask if missing):
- Client name and address
- Services/products provided
- Amount (EUR, Net30 default)
- Invoice date and due date

Output: formatted invoice + payment reminder template.
```

---

## /research.md
```
Research the topic: $ARGUMENTS

Use Research-Intelligence agent with:
- exa + brave-search for comprehensive coverage
- playwright for dynamic content if needed
- memory to save findings

Deliver: structured report with sources, key findings, actionable insights.
Depth: thorough (not just snippets).
```
