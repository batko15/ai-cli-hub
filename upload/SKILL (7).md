---
name: changelog-generator
description: Automatically generate professional changelogs, release notes, and version histories from git commits, PR descriptions, or feature lists. Use this skill whenever the user wants to create a CHANGELOG.md, write release notes, document version changes, summarize git history, prepare GitHub releases, or communicate what changed between versions. Always trigger for changelog, release notes, or version documentation tasks.
---

# Changelog Generator

Transforms raw git commits and PR data into polished, user-facing changelogs following Keep a Changelog standards and Conventional Commits.

## Workflow

### 1. Input Collection

Accept any of:
- **Git log** (raw `git log --oneline` output)
- **Conventional commits** (feat:, fix:, chore:, etc.)
- **PR titles & descriptions**
- **Feature bullet list** (ad-hoc)
- **Version range** (e.g., v1.2.0...v1.3.0)

### 2. Fetch Git Data (if in repo)

```bash
# Get commits since last tag
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s" --no-merges

# Get all tags for version history
git tag --sort=-version:refname | head -20

# Get commits between two tags
git log v1.0.0..v1.1.0 --pretty=format:"%h|%s|%an|%ad" --date=short
```

### 3. Classification Rules

```
feat: → ✨ New Features
fix: → 🐛 Bug Fixes
perf: → ⚡ Performance
refactor: → ♻️ Improvements
docs: → 📚 Documentation
style: → 💄 UI/Design
test: → 🧪 Tests
chore: → 🔧 Maintenance
security: → 🔒 Security
breaking change: → ⚠️ Breaking Changes
```

### 4. Output Formats

#### Standard CHANGELOG.md (Keep a Changelog)
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.3.0] - 2026-05-18

### ✨ New Features
- Add user authentication with NextAuth.js v4 (#42)
- Implement dark mode toggle with Tailwind CSS 4 (#38)

### 🐛 Bug Fixes
- Fix hydration mismatch in Server Components (#45)
- Resolve Prisma connection pooling issue in production (#43)

### ⚡ Performance
- Implement TanStack Query for server state caching (#40)

### ♻️ Improvements
- Migrate from Pages Router to App Router (#35)
- Replace axios with native fetch in API routes (#37)

### 🔧 Maintenance
- Update to Next.js 16, React 19, TypeScript 5 (#33)
- Configure Biome for linting and formatting (#34)

## [1.2.0] - 2026-04-01
...
```

#### GitHub Release Notes (concise)
```markdown
## What's New in v1.3.0 🎉

### Highlights
- **User Auth** - Full NextAuth.js integration with OAuth providers
- **Dark Mode** - System-aware theme switching

### Full Changes
[Detailed list...]

**Full Changelog**: https://github.com/{owner}/{repo}/compare/v1.2.0...v1.3.0
```

#### Slack/Teams Announcement
```markdown
🚀 *v1.3.0 Released!*

*New this week:*
• Auth system live (Google + GitHub OAuth)
• Dark mode for all users

*Fixes:*
• 3 bug fixes, 2 performance improvements

Full notes: [link]
```

### 5. Kenan's Bun Workflow Integration

```bash
# Add to package.json scripts
"scripts": {
  "changelog": "git log --pretty=format:'%s' | claude 'Generate changelog entry'",
  "release": "bun run changelog && bun run build && git tag v$(cat package.json | jq -r .version)"
}
```

### 6. Quality Rules
- Group related commits (don't list duplicates)
- User-facing language (not developer jargon)
- Credit contributors when available
- Link to issues/PRs when referenced
- Flag breaking changes prominently (⚠️)
- Sort: Breaking > Features > Fixes > Performance > Other
