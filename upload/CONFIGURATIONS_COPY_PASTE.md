# 📦 KONFIGURATIONEN ZUM KOPIEREN
## Alle Config-Dateien für Claude Code Setup

---

# 🪟 WINDOWS KONFIGURATIONEN

## 1. CLAUDE.md
```markdown
# Claude Code Configuration

## Projekt-Informationen
- **Name:** Claude Workspace
- **Typ:** Full-Stack Entwicklung

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Python
- **Datenbank:** PostgreSQL, MongoDB

## Coding Standards
- TypeScript strict mode
- ESLint + Prettier
- Funktionen < 50 Zeilen
- Meaningful variable names

## Commands
| Befehl | Beschreibung |
|--------|--------------|
| npm run dev | Dev Server |
| npm run build | Build |
| npm test | Tests |
| npm run lint | Linting |
```

## 2. settings.json
```json
{
  "apiProvider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "fallbackModel": "claude-3-5-haiku-20241022",
  "temperature": 0.7,
  "maxTokens": 4096,
  "skills": {
    "autoEnable": true,
    "paths": ["./.claude/skills"]
  },
  "mcp": {
    "configPath": "./.mcp/mcp-config.json",
    "autoStart": true
  }
}
```

## 3. mcp-config.json (Windows)
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "C:\\claude-workspace\\projects"
      ]
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
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sequential-thinking"]
    }
  }
}
```

## 4. PowerShell Setup Script
```powershell
# setup-claude-windows.ps1

Write-Host "🚀 Claude Code Windows Setup" -ForegroundColor Cyan

# Prerequisites
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Python.Python.3.12

# Claude Code
npm install -g @anthropic-ai/claude-code

# MCP Servers
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-github
npm install -g @anthropic-ai/mcp-server-memory

# Folders
mkdir C:\claude-workspace\.claude\skills
mkdir C:\claude-workspace\.mcp
mkdir C:\claude-workspace\projects

# API Key
$apiKey = Read-Host "Anthropic API Key eingeben"
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $apiKey, "User")

Write-Host "✅ Setup abgeschlossen!" -ForegroundColor Green
Write-Host "Starte mit: cd C:\claude-workspace\projects && claude"
```

## 5. PowerShell Aliases
```powershell
# Zu $PROFILE hinzufügen

function claude-workspace { cd C:\claude-workspace }
function claude-projects { cd C:\claude-workspace\projects }

function new-project {
    param($name)
    mkdir "C:\claude-workspace\projects\$name"
    cd "C:\claude-workspace\projects\$name"
    claude
}

Set-Alias -Name cw -Value claude-workspace
Set-Alias -Name cpj -Value claude-projects
Set-Alias -Name np -Value new-project
```

---

# 📱 ANDROID/TERMUX KONFIGURATIONEN

## 1. CLAUDE.md (Termux)
```markdown
# Claude Code Configuration (Android)

## Environment
- Platform: Android 16 / Termux
- Shell: Bash
- Storage: ~/storage/shared/

## Tech Stack
- Frontend: React, Web
- Backend: Node.js, Python
- Database: SQLite

## Mobile Notes
- Keine GUI-Tools
- Ressourcen sparen
- haiku Modell nutzen

## Storage
- Intern: ~/
- Extern: ~/storage/shared/
```

## 2. settings.json (Termux)
```json
{
  "apiProvider": "anthropic",
  "model": "claude-3-5-haiku-20241022",
  "temperature": 0.7,
  "maxTokens": 2048,
  "skills": {
    "autoEnable": true,
    "paths": ["./.claude/skills"]
  },
  "mcp": {
    "configPath": "./.mcp/mcp-config.json",
    "autoStart": false
  }
}
```

## 3. mcp-config.json (Termux)
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/storage/emulated/0/Projects"
      ]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-memory"]
    }
  }
}
```

## 4. Bash Setup Script
```bash
#!/bin/bash
# setup-termux.sh

echo "🚀 Claude Code Termux Setup"

# Update
pkg update && pkg upgrade -y

# Packages
pkg install -y nodejs git python

# Claude Code
npm install -g @anthropic-ai/claude-code

# MCP Servers
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-memory

# Storage
termux-setup-storage

# Folders
mkdir -p ~/claude-workspace/.claude/skills
mkdir -p ~/claude-workspace/.mcp
mkdir -p ~/claude-workspace/projects
mkdir -p ~/storage/shared/Projects

# API Key
echo "export ANTHROPIC_API_KEY=\"sk-ant-xxxxx\"" >> ~/.bashrc

echo "✅ Setup abgeschlossen!"
echo "Starte mit: cd ~/claude-workspace/projects && claude"
```

## 5. Bash Aliases
```bash
# Zu ~/.bashrc hinzufügen

# Claude Shortcuts
alias cc='claude'
alias ccd='cd ~/claude-workspace && claude'
alias ccp='cd ~/claude-workspace/projects && claude'

# Project Shortcuts
alias projects='cd ~/storage/shared/Projects'
alias p='cd ~/storage/shared/Projects'

# Git
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Node
alias ni='npm install'
alias nr='npm run'
alias nd='npm run dev'

# Python
alias pi='pip install'
alias venv='python -m venv venv && source venv/bin/activate'

# Wake Lock
wake() { termux-wake-lock; echo "✅ Wake lock aktiviert"; }
sleepnow() { termux-wake-unlock; echo "✅ Wake lock deaktiviert"; }

# Notification
notify() { termux-notification --title "$1" --content "$2"; }

# New Project
new-project() {
    mkdir -p ~/claude-workspace/projects/$1
    cd ~/claude-workspace/projects/$1
    claude
}
```

---

# 🎨 SKILLS

## Web-Dev Skill
```markdown
# Web Development Skill

## Trigger
- "webseite"
- "react"
- "frontend"

## Technologien
- React 18+
- TypeScript
- Tailwind CSS
- Vite

## Workflow
1. npm create vite@latest app -- --template react-ts
2. cd app && npm install
3. npm install -D tailwindcss postcss autoprefixer
4. npx tailwindcss init -p

## Beispiel
"Erstelle eine Portfolio-Webseite mit dunklem Theme"
```

## Python Skill
```markdown
# Python Skill

## Trigger
- "python"
- "skript"
- "automatisierung"

## Technologien
- Python 3.11+
- FastAPI
- Pandas
- Requests

## Workflow
1. python -m venv venv
2. source venv/bin/activate
3. pip install fastapi uvicorn pandas

## Beispiel
"Erstelle eine REST API für Benutzer-Verwaltung"
```

## Design Skill
```markdown
# UI/UX Design Skill

## Trigger
- "design"
- "ui"
- "benutzeroberfläche"

## Prinzipien
- Konsistenz
- Hierarchie
- Feedback
- Einfachheit
- Accessibility

## Farben (Tailwind)
- background: #0a0a0a
- foreground: #fafafa
- primary: #3b82f6
- accent: #8b5cf6

## Beispiel
"Designe ein Dashboard-Layout mit Sidebar"
```

---

# 📋 SCHNELLREFERENZ

## Wichtige Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `claude` | Claude Code starten |
| `claude --version` | Version prüfen |
| `claude --help` | Hilfe anzeigen |

## MCP-Server

| Server | Zweck | Befehl |
|--------|-------|--------|
| filesystem | Dateizugriff | npx @anthropic-ai/mcp-server-filesystem |
| github | GitHub | npx @anthropic-ai/mcp-server-github |
| memory | Speicher | npx @anthropic-ai/mcp-server-memory |

## Modelle

| Modell | Verwendung |
|--------|------------|
| claude-sonnet-4 | Komplexe Aufgaben |
| claude-3-5-haiku | Schnelle Antworten |

## API-Key

```bash
# Windows (PowerShell)
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-xxxxx", "User")

# Termux (Bash)
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
source ~/.bashrc
```

---

# 🔗 LINKS

- **Claude Code Docs:** https://docs.anthropic.com/claude/docs/claude-code
- **MCP Protocol:** https://modelcontextprotocol.io
- **API Keys:** https://console.anthropic.com
- **GitHub Token:** https://github.com/settings/tokens

---

**Version:** 2.0 Final  
**Datum:** Januar 2025
