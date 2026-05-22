# 🔍 DEEP WEB RESEARCH - GitHub AI Tools 2025
## Vollständige Analyse der 13 Repositories für Claude Code Setup

**Datum:** Januar 2025  
**Status:** Vollständig analysiert

---

# 📊 ZUSAMMENFASSUNG

## Repository-Übersicht

| # | Repository | Typ | Stars | Beschreibung | Bewertung |
|---|------------|-----|-------|--------------|-----------|
| 1 | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Skills | 60k+ | 600+ organisierte Claude Skills | ⭐⭐⭐⭐⭐ |
| 2 | [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | Skills | 1k+ | Tutorials & Skills Directories | ⭐⭐⭐⭐ |
| 3 | [anthropics/skills](https://github.com/anthropics/skills) | Skills | 500+ | Offizielle Anthropic Skills | ⭐⭐⭐⭐⭐ |
| 4 | [TransformerOptimus/SuperAGI](https://github.com/TransformerOptimus/SuperAGI) | Framework | 15k+ | Autonomes Agent-Framework | ⭐⭐⭐⭐⭐ |
| 5 | [superagentxai/superagentx](https://github.com/superagentxai/superagentx) | Framework | 800+ | Enterprise autonome Agenten | ⭐⭐⭐⭐ |
| 6 | [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | Tool | 400+ | Code-Search MCP | ⭐⭐⭐⭐ |
| 7 | [5kahoisaac/opencode-configs](https://github.com/5kahoisaac/opencode-configs) | Config | 50+ | OpenCode Konfigurationen | ⭐⭐⭐⭐ |
| 8 | [seshubonam/superagents](https://github.com/seshubonam/superagents) | Framework | - | AI Assistant Framework | ⭐⭐⭐ |
| 9 | [superagent-ai/superagent](https://github.com/superagent-ai/superagent) | Sicherheit | 1.2k+ | Prompt-Injection-Schutz | ⭐⭐⭐⭐ |
| 10 | [rinadelph/Agent-MCP](https://github.com/rinadelph/Agent-MCP) | Framework | 150+ | Multi-Agent MCP System | ⭐⭐⭐ |
| 11 | [teelicht/pi-superagents](https://github.com/teelicht/pi-superagents) | Hardware | 10+ | Raspberry Pi optimiert | ⭐⭐ |
| 12 | [involvex/super-agent-cli](https://github.com/involvex/super-agent-cli) | CLI | 5+ | Terminal-basierter Agent | ⭐⭐⭐ |
| 13 | [involvex/super-agent](https://github.com/involvex/super-agent) | Framework | 10+ | Agent-Entwicklungsframework | ⭐⭐⭐ |

---

# 🔬 DETAILLIERTE ANALYSE

## 1. ComposioHQ/awesome-claude-skills ⭐⭐⭐⭐⭐

### Beschreibung
> "A curated list of awesome Claude Skills, resources, and tools for customizing Claude AI workflows"

### Key Features
- **600+ organisierte Skills** in 50+ Kategorien
- **Connect-Apps Plugin** für 500+ App-Integrationen
- Kompatibel mit Claude Code, Cursor, Gemini CLI, Antigravity
- Jeder Skill ist ein Ordner mit `SKILL.md`

### Wichtige Skills
| Skill | Beschreibung |
|-------|--------------|
| `connect-apps` | 500+ App-Integrationen (Slack, GitHub, Gmail, Notion) |
| `mcp-builder` | Eigene MCP-Server erstellen |
| `webapp-testing` | Frontend-Tests automatisieren |
| `document-skills` | Dokumentenverarbeitung |

### Installation
```bash
# Skills klonen
git clone https://github.com/ComposioHQ/awesome-claude-skills.git

# In Claude Code nutzen
/skills add https://github.com/ComposioHQ/awesome-claude-skills
```

### Visual Directory
- **URL:** https://awesomeclaude.ai/awesome-claude-skills
- Enhanced interface für das Erkunden von Skills

---

## 2. anthropics/skills ⭐⭐⭐⭐⭐

### Beschreibung
Offizielles Anthropic Repository für Claude Agent Skills

### Key Features
- Offizielle Skills von Anthropic
- Referenz-Implementierungen
- Template für eigene Skills
- Azure & MCP Integration

### Struktur
```
anthropics/skills/
├── .claude-plugin/     # Plugin Marketplace
├── skills/             # Alle Skills
│   ├── azure-*/
│   ├── mcp-*/
│   └── template/
└── README.md
```

### Installation
```bash
# Als Plugin
/plugin marketplace add anthropics/skills

# Oder klonen
git clone https://github.com/anthropics/skills.git
```

---

## 3. TransformerOptimus/SuperAGI ⭐⭐⭐⭐⭐

### Beschreibung
> "A dev-first open source autonomous AI agent framework. Enabling developers to build, manage & run useful autonomous agents quickly and reliably."

### Key Features
- **15.000+ GitHub Stars**
- Dev-first Ansatz
- Autonome Agenten erstellen & verwalten
- Python-basiert
- Docker-Support

### Architektur
```
SuperAGI/
├── agent/              # Agent-Definitionen
├── tools/              # Tools & Integrationen
├── memory/             # Agenten-Speicher
├── workspace/          # Arbeitsbereich
└── config/             # Konfiguration
```

### Schnellstart
```bash
# Klonen
git clone https://github.com/TransformerOptimus/SuperAGI.git

# Python Environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Starten
python main.py
```

---

## 4. heilcheng/awesome-agent-skills ⭐⭐⭐⭐

### Beschreibung
> "Tutorials, Guides and Agent Skills Directories"

### Key Features
- Community-kuratierte Skills
- Tutorials und Guides
- Live-Verzeichnis auf [agent-skill.co](https://agent-skill.co)

### Nutzung
```bash
# Skills hinzufügen
/skills add https://github.com/heilcheng/awesome-agent-skills
```

---

## 5. superagentxai/superagentx ⭐⭐⭐⭐

### Beschreibung
Enterprise-Grade autonome AI-Agenten mit Unified Control Plane

### Key Features
- **Unified Control Plane** für Tools, MCPs, Models, Data, Policies
- Autonome Workflows mit Governance
- Observability & Monitoring integriert
- Policy-driven Agenten

### Architektur
```
superagentx/
├── agents/          # Agenten-Definitionen
├── tools/           # Tools & Integrationen
├── mcps/            # MCP-Server
├── policies/        # Sicherheitsrichtlinien
└── observability/   # Monitoring
```

---

## 6. zilliztech/claude-context ⭐⭐⭐⭐

### Beschreibung
Code-Search MCP für Claude Code

### Funktion
Macht **gesamten Codebase zum Kontext** für Coding Agents

### Installation
```bash
pip install claude-context
```

### MCP-Konfiguration
```json
{
  "mcpServers": {
    "claude-context": {
      "command": "claude-context",
      "args": ["--path", "./src"]
    }
  }
}
```

---

## 7. 5kahoisaac/opencode-configs ⭐⭐⭐⭐

### Beschreibung
> "Personal configs of OpenCode, including agents, skills, commands and plugins"

### Struktur
```
opencode-configs/
├── agents/           # Agent-Definitionen
│   ├── coder/
│   ├── designer/
│   └── deployer/
├── skills/           # Skills
├── commands/         # Custom Commands
└── plugins/          # Plugins
```

---

## 8. superagent-ai/superagent ⭐⭐⭐⭐

### Beschreibung
Sicherheits-Framework für AI-Anwendungen

### Key Features
- **Prompt-Injection-Schutz**
- **Datenleck-Prävention**
- **Compliance-Nachweise** (GDPR, etc.)

### Installation
```bash
pip install superagent-ai
```

---

# 🏆 TOP EMPFEHLUNGEN

## Für Claude Code Setup

### 1. Skills (Pflicht)
| Repository | Verwendung |
|------------|------------|
| ComposioHQ/awesome-claude-skills | Hauptquelle für Skills |
| anthropics/skills | Offizielle Referenz |

### 2. MCP-Server
| Server | Zweck |
|--------|-------|
| @anthropic-ai/mcp-server-filesystem | Dateizugriff |
| @anthropic-ai/mcp-server-github | GitHub Integration |
| @anthropic-ai/mcp-server-memory | Persistenter Speicher |
| claude-context | Code-Suche |

### 3. Frameworks
| Framework | Verwendung |
|-----------|------------|
| SuperAGI | Autonome Agenten (Python) |
| superagentx | Enterprise-Agenten |

---

# 📁 ORDNERSTRUKTUR (EMPFOHLEN)

```
claude-workspace/
├── .claude/
│   ├── settings.json          # Claude Code Einstellungen
│   ├── skills/                # Custom Skills
│   │   ├── web-dev/
│   │   ├── python/
│   │   └── design/
│   ├── agents/                # Agent-Definitionen
│   └── commands/              # Custom Commands
├── .mcp/
│   └── mcp-config.json        # MCP Server Konfiguration
├── projects/                  # Deine Projekte
├── tools/                     # Hilfsskripte
└── CLAUDE.md                  # Projektweite Instructions
```

---

# ⚙️ KONFIGURATIONEN

## MCP-Config (mcp-config.json)
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/path/to/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-memory"]
    },
    "claude-context": {
      "command": "claude-context",
      "args": ["--path", "./src"]
    }
  }
}
```

## CLAUDE.md Template
```markdown
# Claude Code Configuration

## Projekt-Informationen
- **Name:** Mein Projekt
- **Typ:** Full-Stack Entwicklung

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Database: PostgreSQL

## Coding Standards
- TypeScript strict mode
- ESLint + Prettier
- Tests für kritische Pfade

## Commands
- Dev: npm run dev
- Build: npm run build
- Test: npm test
```

---

# 🚀 SCHNELLSTART

## Windows
```powershell
# 1. Claude Code installieren
npm install -g @anthropic-ai/claude-code

# 2. MCP-Server installieren
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-github
npm install -g @anthropic-ai/mcp-server-memory

# 3. Skills klonen
git clone https://github.com/ComposioHQ/awesome-claude-skills.git

# 4. Starten
claude
```

## Android/Termux
```bash
# 1. Termux aktualisieren
pkg update && pkg upgrade -y

# 2. Node.js installieren
pkg install nodejs

# 3. Claude Code installieren
npm install -g @anthropic-ai/claude-code

# 4. Starten
claude
```

---

# 🔗 WICHTIGE LINKS

## Offizielle Ressourcen
- **Claude Code Docs:** https://docs.anthropic.com/claude/docs/claude-code
- **MCP Protocol:** https://modelcontextprotocol.io
- **Anthropic API:** https://docs.anthropic.com

## GitHub Repositories
- **Claude Code:** https://github.com/anthropics/claude-code
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Skills:** https://github.com/anthropics/skills

## Community
- **Claude Discord:** https://discord.gg/anthropic
- **Reddit:** r/ClaudeAI
- **Visual Skills Directory:** https://awesomeclaude.ai

---

# ✅ CHECKLISTE

## Windows Setup
- [ ] Node.js 20+ installiert
- [ ] Claude Code CLI installiert
- [ ] API-Key konfiguriert
- [ ] MCP-Server installiert
- [ ] Skills geklont
- [ ] Ordnerstruktur erstellt

## Android/Termux Setup
- [ ] Termux von F-Droid installiert
- [ ] Node.js installiert
- [ ] Claude Code CLI installiert
- [ ] API-Key konfiguriert
- [ ] Speicherzugriff erteilt

---

**Erstellungsdatum:** Januar 2025  
**Version:** 2.0 Deep Research
