# 🔬 Tiefenforschung: AI Coding Tools, MCPs, Skills & Superagents
## Vollständiges Setup mit Ordnerstruktur (2025/2026)

---

# 📋 Inhaltsverzeichnis

1. [MCP - Model Context Protocol](#1-mcp---model-context-protocol)
2. [Claude Code & Superagents](#2-claude-code--superagents)
3. [AI Coding IDEs & Tools](#3-ai-coding-ides--tools)
4. [AI Agent Frameworks](#4-ai-agent-frameworks)
5. [Konfigurationsstandards](#5-konfigurationsstandards)
6. [Frontend & Design Tools](#6-frontend--design-tools)
7. [Vollständige Ordnerstruktur](#7-vollständige-ordnerstruktur)
8. [Setup-Skripte & Konfigurationen](#8-setup-skripte--konfigurationen)

---

# 1. MCP - Model Context Protocol

## 🌟 Offizielle MCP Server Repository
- **GitHub**: https://github.com/modelcontextprotocol/servers
- **Beschreibung**: Referenz-Implementierungen für MCP
- **Inhalt**: Filesystem, GitHub, Git, Memory, Sequential Thinking, Slack, und mehr

## 📚 Awesome MCP Server Listen

### Top MCP Server Repositories:
| Repository | Stars | Beschreibung |
|------------|-------|--------------|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 62,000+ | Produktionsreife MCP Server |
| [mcpservers.org](https://mcpservers.org) | - | Awesome MCP Servers Verzeichnis |
| [mcp.directory](https://mcp.directory/awesome-mcp-servers) | - | 2,002+ MCP Server in 14 Kategorien |
| [alibaizhanov/awesome-mcp-servers-appcypher](https://github.com/alibaizhanov/awesome-mcp-servers-appcypher) | - | Kuratierte MCP Server Liste |

## 🔧 Wichtige MCP Server für Entwicklung

### 1. GitHub MCP Server
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token"
      }
    }
  }
}
```
- **URL**: https://github.com/github/github-mcp-server
- **Funktionen**: Repos lesen, Issues, PRs, Branches

### 2. Filesystem MCP Server
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

### 3. PostgreSQL MCP Server
- **URL**: https://github.com/crystaldba/postgres-mcp
- **URL**: https://github.com/bytebase/dbhub
- **Features**: SQL Queries, Schema Introspection

### 4. Browser Automation MCP
- **Playwright MCP**: https://github.com/microsoft/playwright-mcp
- **Browserbase MCP**: https://github.com/browserbase/mcp-server-browserbase
- **Browser MCP**: https://github.com/browsermcp/mcp

### 5. Sequential Thinking MCP
- **URL**: https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking
- **URL**: https://github.com/spences10/mcp-sequentialthinking-tools
- **Features**: Step-by-step Reasoning, Memory

### 6. AWS MCP Server
- **URL**: https://github.com/awslabs/mcp
- **Features**: CDK, Terraform, AWS Workflows

---

# 2. Claude Code & Superagents

## 🚀 SuperClaude Framework
- **URL**: https://github.com/SuperClaude-Org/SuperClaude_Framework
- **Beschreibung**: Konfigurations-Framework mit spezialisierten Commands und kognitiven Personas

## 📁 Claude Code Setup Repositories

### 1. Awesome Claude Code Setup
- **URL**: https://github.com/cassler/awesome-claude-code-setup
- **Features**: Bash Scripts, Slash Commands

### 2. Claude Code Guide
- **URL**: https://github.com/Cranot/claude-code-guide
- **Features**: Vollständiger CLI Guide

### 3. My Claude Code Setup
- **URL**: https://github.com/centminmod/my-claude-code-setup
- **Features**: Memory Bank System, Hooks, Skills, Subagents

### 4. Claude Code Best Practice
- **URL**: https://github.com/shanraisshan/claude-code-best-practice

## 🔧 Claude Code Konfigurationsdateien

### CLAUDE.md Beispiel
```markdown
# Project Configuration for Claude Code

## Project Overview
- Name: My Project
- Type: Next.js Full-Stack Application

## Tech Stack
- Frontend: React, Tailwind CSS, shadcn/ui
- Backend: Next.js API Routes, Prisma
- Database: PostgreSQL

## Coding Standards
- Use TypeScript strict mode
- Follow ESLint and Prettier rules
- Write tests for all new features

## Commands
- Dev: `bun run dev`
- Build: `bun run build`
- Test: `bun run test`
- Lint: `bun run lint`

## File Structure
- /src/app - Next.js App Router pages
- /src/components - React components
- /src/lib - Utility functions
- /prisma - Database schema
```

---

# 3. AI Coding IDEs & Tools

## 🏆 Top AI Coding IDEs 2025/2026

### 1. Cursor
- **Website**: https://cursor.com
- **Features**: AI-native IDE, .cursorrules Support
- **Rules Repository**: https://github.com/PatrickJS/awesome-cursorrules

### 2. Windsurf (Codeium)
- **Website**: https://codeium.com/windsurf
- **Features**: Cascade Agent, VS Code basiert

### 3. VS Code + Cline/Roo Code
- **Cline**: https://github.com/cline/cline
- **Roo Code**: https://github.com/RooCodeInc/Roo-Code

### 4. Aider
- **URL**: https://github.com/aider-ai/aider
- **Features**: Terminal-basiert, Git-Integration
- **Stars**: 41,600+

### 5. Continue.dev
- **URL**: https://github.com/continuedev/continue
- **Features**: Open Source, GitHub Checks

## 📋 AI Coding Tools Awesome Lists

| Repository | Beschreibung |
|------------|--------------|
| [ai-for-developers/awesome-ai-coding-tools](https://github.com/ai-for-developers/awesome-ai-coding-tools) | Kuratierte AI Coding Tools |
| [sourcegraph/awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) | AI Coding Tools Liste |
| [hashgraph-online/awesome-ai-plugins](https://github.com/hashgraph-online/awesome-ai-plugins) | AI Plugins für Claude, Codex |
| [launchapp-dev/awesome-ai-coding-tools](https://github.com/launchapp-dev/awesome-ai-coding-tools) | Editoren, Agents, CLI Tools |

---

# 4. AI Agent Frameworks

## 🤖 Multi-Agent Frameworks Vergleich

### 1. CrewAI
- **URL**: https://github.com/crewaiinc/crewai
- **Features**: Role-playing Autonomous Agents
- **Unabhängig**: Keine LangChain Abhängigkeit

### 2. LangChain + LangGraph
- **URL**: https://github.com/langchain-ai/langchain
- **Features**: Comprehensive LLM Framework

### 3. AutoGen (Microsoft)
- **URL**: https://github.com/microsoft/autogen
- **Features**: Multi-Agent Conversations

### 4. Vergleichs-Repository
- **URL**: https://github.com/Vigneshmaradiya/ai-agent-comparison
- **URL**: https://github.com/martimfasantos/ai-agents-frameworks

## 📚 AI Agents Awesome Lists

| Repository | Beschreibung |
|------------|--------------|
| [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) | Tools, Resources, Projects |
| [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) | Open Source AI Agents |
| [alohays/awesome-ai-dev-setup](https://github.com/alohays/awesome-ai-dev-setup) | Dev Setup für AI Agents |
| [caramaschiHG/awesome-ai-agents-2026](https://github.com/caramaschiHG/awesome-ai-agents-2026) | 300+ Resources, 20+ Kategorien |

---

# 5. Konfigurationsstandards

## 📄 AGENTS.md - Der Unified Standard

### Wichtige Repositories:
- **URL**: https://github.com/agent-rules/agent-rules
- **URL**: https://github.com/agentsmd/agents.md

### Unterstützte Tools:
- Claude Code
- GitHub Copilot
- Cline
- Roo Code
- Aider
- Cursor

### AGENTS.md Beispiel
```markdown
# Project Agent Instructions

## Context
This is a [project type] built with [tech stack].

## Guidelines

### Code Style
- Use [language] conventions
- Follow [framework] best practices
- Maintain [coding standard]

### Architecture
- [Architectural pattern]
- [Key modules and their purposes]

### Testing
- [Testing framework]
- [Coverage requirements]

### Git Workflow
- [Branch naming convention]
- [Commit message format]
```

## 📁 Konfigurationsdateien Übersicht

| Tool | Konfigurationsdatei | Pfad |
|------|---------------------|------|
| Claude Code | CLAUDE.md | /CLAUDE.md |
| GitHub Copilot | copilot-instructions.md | /.github/copilot-instructions.md |
| Cursor | .cursorrules / .cursor/rules/ | Projekt Root |
| Cline | .clinerules | Projekt Root |
| Roo Code | .roomotes | Projekt Root |
| Aider | CONVENTIONS.md | Projekt Root |
| Unified | AGENTS.md | Projekt Root |

## 🔧 Copilot Instructions
- **Dokumentation**: https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- **Awesome Copilot**: https://github.com/github/awesome-copilot

### Beispielstruktur:
```
.github/
├── copilot-instructions.md    # Hauptanweisungen
└── instructions/
    ├── frontend.instructions.md
    ├── backend.instructions.md
    └── testing.instructions.md
```

---

# 6. Frontend & Design Tools

## 🎨 AI UI/UX Tools

### 1. AI Web Builders
| Tool | URL | Beschreibung |
|------|-----|--------------|
| Bolt.new | https://github.com/stackblitz/bolt.new | Full-Stack Web Development im Browser |
| v0.dev | https://v0.dev | Vercel's AI UI Generator |
| Lovable | https://lovable.dev | AI App Builder |

### 2. Design Tools
| Repository | Beschreibung |
|------------|--------------|
| [VoltAgent/awesome-design-md](https://github.com/voltagent/awesome-design-md) | DESIGN.md Collection |
| [maxbogo/awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui) | AI UI/UX Tools |
| [goabstract/Awesome-Design-Tools](https://github.com/goabstract/Awesome-Design-Tools) | Design Tools |

### 3. Frontend Resources
- **URL**: https://github.com/requestly/awesome-frontend-resources

---

# 7. Vollständige Ordnerstruktur

## 📂 Empfohlene Projektstruktur

```
project-root/
├── .github/
│   ├── copilot-instructions.md      # GitHub Copilot Anweisungen
│   └── instructions/
│       ├── frontend.instructions.md
│       ├── backend.instructions.md
│       └── testing.instructions.md
│
├── .cursor/
│   └── rules/
│       ├── general.mdc
│       ├── frontend.mdc
│       └── backend.mdc
│
├── .claude/
│   ├── agents/
│   │   ├── architect.md
│   │   ├── developer.md
│   │   └── reviewer.md
│   ├── commands/
│   │   ├── test.md
│   │   └── deploy.md
│   └── hooks/
│       └── pre-commit.sh
│
├── .cline/
│   └── rules/
│       └── project-rules.md
│
├── .roomotes/                       # Roo Code Modes
│
├── AGENTS.md                        # Unified Agent Instructions
├── CLAUDE.md                        # Claude Code Instructions
├── .cursorrules                     # Cursor Rules (Legacy)
├── CONVENTIONS.md                   # Aider Conventions
│
├── .mcp/
│   └── mcp-config.json             # MCP Server Konfiguration
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
│
├── prisma/
│   └── schema.prisma
│
└── package.json
```

## 📂 AI Dev Setup Ordnerstruktur

```
ai-dev-setup/
├── config/
│   ├── mcp/
│   │   ├── claude-desktop-config.json
│   │   ├── cursor-mcp-config.json
│   │   └── vscode-mcp-config.json
│   │
│   ├── agents/
│   │   ├── AGENTS.md.template
│   │   └── CLAUDE.md.template
│   │
│   └── rules/
│       ├── .cursorrules.templates/
│       └── copilot-instructions.templates/
│
├── scripts/
│   ├── setup-mcp.sh
│   ├── setup-agents.sh
│   └── install-tools.sh
│
├── mcp-servers/
│   ├── custom-server-1/
│   └── custom-server-2/
│
└── docs/
    ├── mcp-setup-guide.md
    └── agent-configuration.md
```

---

# 8. Setup-Skripte & Konfigurationen

## 🔧 MCP Konfiguration (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@crystaldba/postgres-mcp"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/db"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

## 🔧 VS Code MCP Konfiguration (.vscode/mcp.json)

```json
{
  "servers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:githubToken}"
      }
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    }
  }
}
```

## 🔧 Cline MCP Konfiguration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## 📜 Setup Script (setup-ai-tools.sh)

```bash
#!/bin/bash

# AI Development Tools Setup Script
# Installiert alle notwendigen AI Tools und MCP Server

echo "🚀 Setting up AI Development Environment..."

# MCP Server installieren
echo "📦 Installing MCP Servers..."
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-memory
npm install -g @modelcontextprotocol/server-sequential-thinking

# Claude Code CLI (falls verfügbar)
echo "🤖 Setting up Claude Code..."

# Aider installieren
echo "🔧 Installing Aider..."
pip install aider-chat

# Projekt-Konfiguration erstellen
echo "📁 Creating project configuration files..."

# AGENTS.md erstellen
cat > AGENTS.md << 'EOF'
# Project Agent Instructions

## Overview
This project uses AI-assisted development tools.

## Coding Standards
- Follow language-specific best practices
- Write clean, maintainable code
- Include tests for new features

## Tools
- Claude Code: AI coding assistant
- MCP: Model Context Protocol for tool integration
EOF

# CLAUDE.md erstellen
cat > CLAUDE.md << 'EOF'
# Claude Code Configuration

## Project Type
[Describe your project]

## Tech Stack
- Frontend: [technologies]
- Backend: [technologies]
- Database: [database]

## Commands
- Dev: [command]
- Build: [command]
- Test: [command]

## Coding Guidelines
[Your guidelines here]
EOF

# .github/copilot-instructions.md erstellen
mkdir -p .github
cat > .github/copilot-instructions.md << 'EOF'
# GitHub Copilot Instructions

## Project Context
[Project description]

## Coding Conventions
[Your conventions]

## Best Practices
[Best practices for this project]
EOF

echo "✅ AI Development Environment setup complete!"
```

---

# 📚 Zusätzliche Ressourcen

## Prompt Engineering
- **URL**: https://github.com/dair-ai/prompt-engineering-guide
- **Inhalt**: Guides, Papers, Lessons für Prompt Engineering

## Awesome Lists Übersicht
| Thema | Repository |
|-------|------------|
| AI Coding Tools | https://github.com/ai-for-developers/awesome-ai-coding-tools |
| AI Agents | https://github.com/kyrolabs/awesome-agents |
| MCP Servers | https://github.com/punkpeye/awesome-mcp-servers |
| Cursor Rules | https://github.com/PatrickJS/awesome-cursorrules |
| AI Plugins | https://github.com/hashgraph-online/awesome-ai-plugins |
| Design Tools | https://github.com/goabstract/Awesome-Design-Tools |
| AI Dev Setup | https://github.com/alohays/awesome-ai-dev-setup |

---

# 🔗 Alle wichtigen GitHub Links

## MCP & Model Context Protocol
1. https://github.com/modelcontextprotocol/servers
2. https://github.com/punkpeye/awesome-mcp-servers
3. https://github.com/github/github-mcp-server
4. https://github.com/microsoft/playwright-mcp
5. https://github.com/awslabs/mcp

## Claude Code & Superagents
1. https://github.com/SuperClaude-Org/SuperClaude_Framework
2. https://github.com/cassler/awesome-claude-code-setup
3. https://github.com/Cranot/claude-code-guide
4. https://github.com/centminmod/my-claude-code-setup

## AI Coding Tools
1. https://github.com/cline/cline
2. https://github.com/RooCodeInc/Roo-Code
3. https://github.com/aider-ai/aider
4. https://github.com/continuedev/continue

## Cursor & Windsurf
1. https://github.com/PatrickJS/awesome-cursorrules
2. https://github.com/stackblitz/bolt.new

## Agent Frameworks
1. https://github.com/crewaiinc/crewai
2. https://github.com/langchain-ai/langchain
3. https://github.com/microsoft/autogen
4. https://github.com/kyrolabs/awesome-agents

## Standards & Configurations
1. https://github.com/agent-rules/agent-rules
2. https://github.com/agentsmd/agents.md
3. https://github.com/github/awesome-copilot
4. https://github.com/dair-ai/prompt-engineering-guide

---

**Erstellungsdatum**: Januar 2025
**Quelle**: GitHub Tiefenrecherche
**Zweck**: Vollständiges Setup für AI-unterstützte Entwicklung
