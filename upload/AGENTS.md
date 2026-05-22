# AGENTS.md - Unified AI Agent Instructions

> This file follows the Agent Rules Standard for unified AI coding agent instructions.
> Compatible with: Claude Code, GitHub Copilot, Cline, Roo Code, Aider, Cursor

---

## Project Overview

This is a Next.js 16 full-stack application with AI capabilities.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **State**: Zustand (client), TanStack Query (server)

### Backend
- **API**: Next.js API Routes
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Auth**: NextAuth.js v4

### AI & Media
- **LLM**: z-ai-web-dev-sdk
- **Image Generation**: z-ai-web-dev-sdk
- **Speech**: ASR/TTS via z-ai-web-dev-sdk

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── styles/           # Global styles

prisma/
└── schema.prisma     # Database schema

skills/               # AI skills modules
mini-services/        # Independent services
```

## Coding Standards

### TypeScript
- Use strict mode
- Prefer interfaces over types for objects
- Use const assertions for literals
- Avoid `any` - use `unknown` when type is uncertain

### React
- Use functional components with hooks
- Prefer server components by default
- Use `'use client'` directive only when needed
- Implement proper error boundaries

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming
- Implement dark mode support

### API Routes
- Use standard HTTP methods
- Implement proper error handling
- Return consistent response formats
- Validate input with Zod schemas

## Commands

```bash
# Development
bun run dev           # Start development server (port 3000)
bun run lint          # Run ESLint
bun run db:push       # Push Prisma schema to database

# Database
bun run db:studio     # Open Prisma Studio
bun run db:migrate    # Run migrations
```

## Best Practices

### Git Workflow
- Use conventional commits
- Create feature branches
- Write descriptive PR titles

### Testing
- Test critical paths
- Use Jest/Vitest for unit tests
- Implement E2E tests with Playwright

### Security
- Never expose API keys in client code
- Validate all user inputs
- Use environment variables for secrets
- Implement rate limiting

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI Services (z-ai-web-dev-sdk)
# Configured automatically
```

## AI Tool Integration

### MCP Servers
This project can use MCP servers for extended capabilities:
- **filesystem**: File operations
- **github**: Repository management
- **memory**: Persistent memory
- **database**: SQL operations

### Custom Rules Location
- `.cursor/rules/` - Cursor rules
- `.clinerules` - Cline rules
- `.github/copilot-instructions.md` - Copilot instructions
