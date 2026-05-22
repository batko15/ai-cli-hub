# 🚀 ULTIMATIVES CLAUDE & CLAUDE CODE SETUP
## Vollständige Konfiguration für Windows & Android 16 (Termux, ohne Root)

---

# 📊 Tiefenanalyse der Repositories

## 1. Claude Skills & Agent Skills

### ComposioHQ/awesome-claude-skills
- **URL**: https://github.com/ComposioHQ/awesome-claude-skills
- **Beschreibung**: Kuratierte Liste von Claude Skills, Ressourcen und Tools für benutzerdefinierte AI-Workflows
- **Inhalt**: Skills-Verzeichnis, Workflow-Templates, Integrations-Tools

### heilcheng/awesome-agent-skills
- **URL**: https://github.com/heilcheng/awesome-agent-skills
- **Beschreibung**: Tutorials, Guides und Agent Skills Directories
- **Inhalt**: Tutorials, Agent-Skill-Kataloge, Best Practices

### anthropics/skills
- **URL**: https://github.com/anthropics/skills
- **Beschreibung**: Offizielles Anthropic Repository für Agent Skills
- **Inhalt**: Offizielle Skills von Anthropic, Referenz-Implementierungen

## 2. Superagent Frameworks

### TransformerOptimus/SuperAGI
- **URL**: https://github.com/TransformerOptimus/SuperAGI
- **Beschreibung**: Dev-first Open Source autonomes AI-Agent-Framework
- **Features**: Agent-Erstellung, -Management und -Ausführung
- **Stars**: 14,000+

### superagentxai/superagentx
- **URL**: https://github.com/superagentxai/superagentx
- **Beschreibung**: Policy-driven autonomous AI agents mit Unified Control Plane
- **Features**: Zentralisierte Tools, MCPs, Models, Data und Policies

### rinadelph/Agent-MCP
- **URL**: https://github.com/rinadelph/Agent-MCP
- **Beschreibung**: Multi-Agent-System-Framework für koordinierte AI-Zusammenarbeit via MCP
- **Features**: Parallele Agent-Arbeit, MCP-Integration

### involvex/super-agent-cli
- **URL**: https://github.com/involvex/super-agent-cli
- **Beschreibung**: Open-Source AI-Agent für das Terminal
- **Features**: Terminal-basierte AI-Agent-Funktionalität

## 3. Code Context & MCP

### zilliztech/claude-context
- **URL**: https://github.com/zilliztech/claude-context
- **Beschreibung**: Code Search MCP für Claude Code
- **Features**: Gesamte Codebase als Context für Coding Agents

---

# 🖥️ TEIL 1: WINDOWS SETUP

## Systemvoraussetzungen

```
- Windows 10/11 (64-bit)
- Node.js 20+ (LTS)
- Python 3.10+
- Git
- PowerShell 7+ oder Windows Terminal
```

## 1. Basis-Installation

### 1.1 Node.js & Package Manager

```powershell
# Via winget (empfohlen)
winget install OpenJS.NodeJS.LTS

# Oder via Chocolatey
choco install nodejs-lts

# Verify installation
node --version
npm --version

# Install bun (schneller als npm)
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 1.2 Git & Entwicklungstools

```powershell
# Git
winget install Git.Git

# VS Code
winget install Microsoft.VisualStudioCode

# Windows Terminal
winget install Microsoft.WindowsTerminal
```

### 1.3 Python für AI-Tools

```powershell
# Python via winget
winget install Python.Python.3.12

# Via Chocolatey
choco install python

# Verify
python --version
pip --version
```

## 2. Claude Code CLI Setup

### 2.1 Installation

```powershell
# Claude Code global installieren
npm install -g @anthropic-ai/claude-code

# Oder via npx (ohne globale Installation)
npx @anthropic-ai/claude-code
```

### 2.2 API-Key konfigurieren

```powershell
# Umgebungsvariable setzen (permanent)
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-api-key", "User")

# Oder in PowerShell Session
$env:ANTHROPIC_API_KEY = "your-api-key"
```

### 2.3 Konfigurationsdateien erstellen

**Ordnerstruktur:**
```
C:\Users\<Username>\
├── .claude/
│   ├── config.json
│   ├── agents/
│   │   ├── architect.md
│   │   ├── developer.md
│   │   └── reviewer.md
│   ├── commands/
│   │   ├── test.md
│   │   └── deploy.md
│   └── hooks/
│       └── pre-commit.ps1
├── .mcp/
│   └── mcp-config.json
├── CLAUDE.md
└── AGENTS.md
```

## 3. MCP Server Setup (Windows)

### 3.1 MCP Konfiguration

**Datei: `C:\Users\<Username>\.mcp\mcp-config.json`**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\<Username>\\Projects"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
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
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "disabled": true
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "disabled": true
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      },
      "disabled": true
    }
  }
}
```

### 3.2 Claude Desktop Config

**Datei: `%APPDATA%\Claude\claude_desktop_config.json`**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\<Username>\\Projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

## 4. Skills & Agent Frameworks

### 4.1 Aider Installation

```powershell
# Via pip
pip install aider-chat

# Via pipx (isoliert)
pip install pipx
pipx install aider-chat

# Starten
aider --anthropic-api-key $env:ANTHROPIC_API_KEY
```

### 4.2 SuperAGI Setup

```powershell
# Repository klonen
git clone https://github.com/TransformerOptimus/SuperAGI.git
cd SuperAGI

# Python Environment
python -m venv venv
.\venv\Scripts\activate

# Abhängigkeiten
pip install -r requirements.txt

# Konfiguration
cp config_template.yaml config.yaml
# Edit config.yaml mit API-Keys
```

### 4.3 CrewAI Installation

```powershell
pip install crewai crewai-tools

# Projekt erstellen
crewai create my-crew
cd my-crew
crewai run
```

### 4.4 LangChain Setup

```powershell
pip install langchain langchain-anthropic langchain-community

# Mit MCP Support
pip install langchain-mcp
```

## 5. VS Code Extensions

```powershell
# Via CLI installieren
code --install-extension saoudrizwan.claude-dev
code --install-extension RooVeterinaryTeam.roo-cline
code --install-extension Continue.continue
code --install-extension GitHub.copilot
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

## 6. Vollständige Windows Setup-Script

**Datei: `setup-claude-windows.ps1`**

```powershell
#Requires -RunAsAdministrator

# ============================================
# ULTIMATIVE CLAUDE & CLAUDE CODE WINDOWS SETUP
# ============================================

$ErrorActionPreference = "Stop"

# Farben für Output
function Write-ColorOutput($ForegroundColor) {
    $fc = $ForegroundColor
    Write-Host "========================================" -ForegroundColor $fc
}

Write-Host "🚀 Starte Claude & Claude Code Setup für Windows..." -ForegroundColor Cyan

# 1. Prerequisites prüfen
Write-Host "`n📋 Prüfe Systemvoraussetzungen..." -ForegroundColor Yellow

$tools = @("node", "npm", "python", "git")
foreach ($tool in $tools) {
    if (Get-Command $tool -ErrorAction SilentlyContinue) {
        $version = & $tool --version 2>&1
        Write-Host "✅ $tool gefunden: $version" -ForegroundColor Green
    } else {
        Write-Host "❌ $tool nicht gefunden. Bitte installieren." -ForegroundColor Red
        exit 1
    }
}

# 2. Bun installieren
Write-Host "`n📦 Installiere Bun..." -ForegroundColor Yellow
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Invoke-RestMethod https://bun.sh/install.ps1 | Invoke-Expression
    Write-Host "✅ Bun installiert" -ForegroundColor Green
} else {
    Write-Host "✅ Bun bereits installiert" -ForegroundColor Green
}

# 3. Claude Code CLI
Write-Host "`n🤖 Installiere Claude Code CLI..." -ForegroundColor Yellow
npm install -g @anthropic-ai/claude-code
Write-Host "✅ Claude Code CLI installiert" -ForegroundColor Green

# 4. Aider installieren
Write-Host "`n🔧 Installiere Aider..." -ForegroundColor Yellow
pip install aider-chat
Write-Host "✅ Aider installiert" -ForegroundColor Green

# 5. Agent Frameworks
Write-Host "`n🤖 Installiere Agent Frameworks..." -ForegroundColor Yellow
pip install crewai langchain langchain-anthropic
Write-Host "✅ Frameworks installiert" -ForegroundColor Green

# 6. VS Code Extensions
Write-Host "`n🔌 Installiere VS Code Extensions..." -ForegroundColor Yellow
$extensions = @(
    "saoudrizwan.claude-dev",
    "RooVeterinaryTeam.roo-cline",
    "Continue.continue",
    "GitHub.copilot"
)

foreach ($ext in $extensions) {
    code --install-extension $ext 2>&1 | Out-Null
    Write-Host "✅ $ext" -ForegroundColor Green
}

# 7. Ordnerstruktur erstellen
Write-Host "`n📁 Erstelle Ordnerstruktur..." -ForegroundColor Yellow

$baseDir = "$env:USERPROFILE"
$folders = @(
    "$baseDir\.claude",
    "$baseDir\.claude\agents",
    "$baseDir\.claude\commands",
    "$baseDir\.claude\hooks",
    "$baseDir\.mcp",
    "$baseDir\Projects"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
}
Write-Host "✅ Ordnerstruktur erstellt" -ForegroundColor Green

# 8. Konfigurationsdateien erstellen
Write-Host "`n📝 Erstelle Konfigurationsdateien..." -ForegroundColor Yellow

# CLAUDE.md
$claudeMd = @"
# Claude Code Configuration

## Project Information
- **Name**: My Projects
- **Type**: Full-Stack Development

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Database: PostgreSQL, MongoDB

## Coding Guidelines
- Use TypeScript strict mode
- Follow ESLint and Prettier rules
- Write tests for critical paths

## Commands
- Dev: \`npm run dev\` or \`bun run dev\`
- Build: \`npm run build\`
- Test: \`npm run test\`
- Lint: \`npm run lint\`
"@

Set-Content -Path "$baseDir\CLAUDE.md" -Value $claudeMd -Encoding UTF8

# AGENTS.md
$agentsMd = @"
# Agent Instructions

## Overview
This file provides unified instructions for AI coding agents.

## Coding Standards
- Clean Code principles
- SOLID design patterns
- Comprehensive documentation

## File Organization
- \`/src\` - Source code
- \`/tests\` - Test files
- \`/docs\` - Documentation

## Best Practices
1. Write self-documenting code
2. Keep functions under 50 lines
3. Use meaningful variable names
4. Handle errors gracefully
"@

Set-Content -Path "$baseDir\AGENTS.md" -Value $agentsMd -Encoding UTF8

# MCP Config
$mcpConfig = @{
    mcpServers = @{
        filesystem = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-filesystem", "$baseDir\Projects")
        }
        github = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-github")
            env = @{
                GITHUB_PERSONAL_ACCESS_TOKEN = "`${GITHUB_TOKEN}"
            }
        }
        memory = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-memory")
        }
        "sequential-thinking" = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-sequential-thinking")
        }
    }
} | ConvertTo-Json -Depth 10

Set-Content -Path "$baseDir\.mcp\mcp-config.json" -Value $mcpConfig -Encoding UTF8

Write-Host "✅ Konfigurationsdateien erstellt" -ForegroundColor Green

# 9. Umgebungsvariablen
Write-Host "`n🔑 Konfiguriere Umgebungsvariablen..." -ForegroundColor Yellow

# API Key prompt
$anthropicKey = Read-Host "Gib deinen Anthropic API Key ein (oder Enter zum Überspringen)"
if ($anthropicKey) {
    [Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $anthropicKey, "User")
    Write-Host "✅ ANTHROPIC_API_KEY gesetzt" -ForegroundColor Green
}

$githubToken = Read-Host "Gib deinen GitHub Personal Access Token ein (oder Enter zum Überspringen)"
if ($githubToken) {
    [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $githubToken, "User")
    Write-Host "✅ GITHUB_TOKEN gesetzt" -ForegroundColor Green
}

# 10. Abschluss
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ SETUP ABGESCHLOSSEN!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host @"

🎉 Claude & Claude Code ist jetzt bereit!

📂 Ordnerstruktur:
   $baseDir\.claude\     - Claude Code Config
   $baseDir\.mcp\        - MCP Server Config
   $baseDir\Projects\    - Deine Projekte

📚 Nächste Schritte:
   1. Terminal neu starten
   2. 'claude' in Terminal eingeben
   3. Projekt in Projects-Ordner erstellen

🔗 Nützliche Links:
   - https://docs.anthropic.com/claude/docs/claude-code
   - https://github.com/modelcontextprotocol/servers

"@ -ForegroundColor White
```

---

# 📱 TEIL 2: ANDROID 16 / TERMUX SETUP (OHNE ROOT)

## Voraussetzungen

- Honor Magic 8 Pro mit Android 16
- Termux aus F-Droid (NICHT Play Store!)
- Mindestens 8GB freier Speicher
- Stable Internetverbindung

## 1. Termux Installation & Basis-Setup

### 1.1 Termux installieren

```bash
# Termux von F-Droid herunterladen
# URL: https://f-droid.org/packages/com.termux/

# Nach Installation: Termux öffnen und aktualisieren
pkg update && pkg upgrade -y
```

### 1.2 Storage-Berechtigung

```bash
# Storage-Zugriff aktivieren
termux-setup-storage

# Bestätigen Sie die Berechtigungsanfrage
```

### 1.3 Basis-Pakete installieren

```bash
# Essentielle Pakete
pkg install -y git nodejs python build-essential binutils

# Zusätzliche Tools
pkg install -y wget curl nano vim

# Für Kompilierung
pkg install -y clang make cmake
```

## 2. Node.js & Package Manager Setup

### 2.1 Node.js konfigurieren

```bash
# Node.js Version prüfen
node --version
npm --version

# npm aktualisieren
npm install -g npm@latest
```

### 2.2 Bun installieren (Alternative zu npm)

```bash
# Bun installieren
curl -fsSL https://bun.sh/install | bash

# Shell neu laden
source ~/.bashrc

# Verifizieren
bun --version
```

## 3. Claude Code CLI Setup

### 3.1 Installation

```bash
# Via npm
npm install -g @anthropic-ai/claude-code

# Oder via bun (empfohlen für Termux)
bun install -g @anthropic-ai/claude-code
```

### 3.2 API-Key konfigurieren

```bash
# API Key als Umgebungsvariable
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc

# Oder direkt verwenden
export ANTHROPIC_API_KEY="your-api-key-here"
```

## 4. MCP Server Setup (Termux)

### 4.1 MCP Server installieren

```bash
# Filesystem MCP
npm install -g @modelcontextprotocol/server-filesystem

# GitHub MCP
npm install -g @modelcontextprotocol/server-github

# Memory MCP
npm install -g @modelcontextprotocol/server-memory

# Sequential Thinking
npm install -g @modelcontextprotocol/server-sequential-thinking
```

### 4.2 MCP Konfiguration erstellen

**Datei: `~/.mcp/mcp-config.json`**

```bash
mkdir -p ~/.mcp

cat > ~/.mcp/mcp-config.json << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/sdcard/Projects"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
EOF
```

## 5. Python & AI Tools Setup

### 5.1 Python Environment

```bash
# Python Pakete für AI
pip install --upgrade pip

# Virtual Environment Support
pip install virtualenv
```

### 5.2 Aider installieren

```bash
# Aider installieren
pip install aider-chat

# Zusätzliche Dependencies
pip install anthropic
```

### 5.3 Agent Frameworks

```bash
# CrewAI
pip install crewai crewai-tools

# LangChain
pip install langchain langchain-anthropic langchain-community

# AutoGen (optional - erfordert mehr Ressourcen)
pip install pyautogen
```

## 6. Projektstruktur erstellen

### 6.1 Ordnerstruktur

```bash
# Hauptverzeichnisse
mkdir -p ~/storage/shared/Projects
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/commands
mkdir -p ~/.claude/hooks
mkdir -p ~/bin

# Symlinks für einfachen Zugriff
ln -s ~/storage/shared/Projects ~/projects
```

### 6.2 Konfigurationsdateien

**CLAUDE.md:**

```bash
cat > ~/CLAUDE.md << 'EOF'
# Claude Code Configuration (Termux/Android)

## Environment
- Platform: Android 16 / Termux
- Shell: Bash
- Editor: Nano/Vim

## Tech Stack
- Frontend: React Native, Flutter
- Backend: Node.js, Python
- Database: SQLite, Firebase

## Coding Guidelines
- Mobile-first development
- Offline-capable features
- Battery-efficient code

## Commands
- Dev: `npm run dev` or `bun run dev`
- Build: `npm run build`
- Test: `npm test`

## Termux-Specific Notes
- Use `termux-wake-lock` for long tasks
- Storage: `/sdcard/` or `~/storage/shared/`
- Background: Use `tmux` or `screen`
EOF
```

**AGENTS.md:**

```bash
cat > ~/AGENTS.md << 'EOF'
# Agent Instructions (Android/Termux)

## Environment Constraints
- Limited memory (close other apps)
- No root access
- Battery considerations

## Best Practices
1. Use tmux for persistent sessions
2. Enable wake-lock for long tasks
3. Cache results locally
4. Minimize network requests

## File Locations
- Projects: `/sdcard/Projects/`
- Config: `~/.claude/`
- MCP: `~/.mcp/`

## Useful Termux Commands
- `termux-wake-lock` - Keep screen on
- `termux-wake-unlock` - Release wake lock
- `termux-notification` - Desktop notifications
- `termux-share` - Share files
EOF
```

## 7. Hilfs-Tools für Android

### 7.1 tmux für persistente Sessions

```bash
# tmux installieren
pkg install tmux

# Session starten
tmux new -s claude

# Session detach: Ctrl+B, dann D
# Session resume: tmux attach -t claude
```

### 7.2 Wake Lock für lange Tasks

```bash
# Wake Lock aktivieren (verhindert Sleep)
termux-wake-lock

# Nach Abschluss deaktivieren
termux-wake-unlock
```

### 7.3 Hilfreiche Aliases

**Zu `~/.bashrc` hinzufügen:**

```bash
cat >> ~/.bashrc << 'EOF'

# Claude Aliases
alias claude='termux-wake-lock && claude'
alias cc='claude'
alias aider='aider --anthropic-api-key $ANTHROPIC_API_KEY'

# Projekt-Shortcuts
alias projects='cd ~/storage/shared/Projects'
alias p='cd ~/storage/shared/Projects'

# Git Shortcuts
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Node Shortcuts
alias ni='npm install'
alias nid='npm install --save-dev'
alias nr='npm run'
alias nd='npm run dev'

# Python Shortcuts
alias pi='pip install'
alias pir='pip install -r requirements.txt'
alias venv='python -m venv venv && source venv/bin/activate'

# Utility
alias ll='ls -la'
alias la='ls -a'
alias ..='cd ..'
alias cls='clear'

# Wake Lock Functions
wake() {
    termux-wake-lock
    echo "Wake lock activated"
}

sleepnow() {
    termux-wake-unlock
    echo "Wake lock released"
}

# Notification function
notify() {
    termux-notification --title "$1" --content "$2"
}
EOF

source ~/.bashrc
```

## 8. Vollständiges Termux Setup-Script

**Datei: `setup-claude-termux.sh`**

```bash
#!/bin/bash

# ============================================
# ULTIMATIVES CLAUDE & CLAUDE CODE TERMUX SETUP
# Für Android 16 (kein Root)
# ============================================

set -e

# Farben
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🚀 CLAUDE & CLAUDE CODE TERMUX SETUP${NC}"
echo -e "${BLUE}========================================${NC}"

# 1. System Update
echo -e "\n${YELLOW}📦 Updating System...${NC}"
pkg update -y && pkg upgrade -y

# 2. Basis Pakete
echo -e "\n${YELLOW}📦 Installing Base Packages...${NC}"
pkg install -y git nodejs python build-essential wget curl nano vim tmux

# 3. Storage Setup
echo -e "\n${YELLOW}📁 Setting up Storage...${NC}"
if [ ! -d ~/storage ]; then
    echo "Please grant storage permission..."
    termux-setup-storage
    sleep 2
fi

# 4. Bun Installation
echo -e "\n${YELLOW}⚡ Installing Bun...${NC}"
if ! command -v bun &> /dev/null; then
    curl -fsSL https://bun.sh/install | bash
    source ~/.bashrc
fi

# 5. Claude Code CLI
echo -e "\n${YELLOW}🤖 Installing Claude Code CLI...${NC}"
npm install -g @anthropic-ai/claude-code

# 6. Aider
echo -e "\n${YELLOW}🔧 Installing Aider...${NC}"
pip install aider-chat

# 7. Agent Frameworks
echo -e "\n${YELLOW}🤖 Installing Agent Frameworks...${NC}"
pip install crewai langchain langchain-anthropic

# 8. MCP Servers
echo -e "\n${YELLOW}🔌 Installing MCP Servers...${NC}"
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-memory
npm install -g @modelcontextprotocol/server-sequential-thinking

# 9. Ordnerstruktur
echo -e "\n${YELLOW}📁 Creating Folder Structure...${NC}"
mkdir -p ~/storage/shared/Projects
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/commands
mkdir -p ~/.claude/hooks
mkdir -p ~/.mcp
mkdir -p ~/bin

# Symlinks
ln -sf ~/storage/shared/Projects ~/projects 2>/dev/null || true

# 10. Konfigurationsdateien
echo -e "\n${YELLOW}📝 Creating Configuration Files...${NC}"

# CLAUDE.md
cat > ~/CLAUDE.md << 'CLAUDE_EOF'
# Claude Code Configuration (Termux/Android)

## Environment
- Platform: Android 16 / Termux
- Shell: Bash
- Package Manager: npm/bun

## Tech Stack
- Frontend: React Native, Flutter
- Backend: Node.js, Python
- Database: SQLite, Firebase

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`

## Termux-Specific
- Storage: `/sdcard/` or `~/storage/shared/`
- Use tmux for persistent sessions
- Enable wake-lock for long tasks
CLAUDE_EOF

# AGENTS.md
cat > ~/AGENTS.md << 'AGENTS_EOF'
# Agent Instructions (Android/Termux)

## Environment
- Limited resources (close other apps)
- No root access
- Battery considerations

## File Locations
- Projects: `/sdcard/Projects/`
- Config: `~/.claude/`
- MCP: `~/.mcp/`

## Useful Commands
- `termux-wake-lock` - Keep screen on
- `tmux new -s claude` - Persistent session
AGENTS_EOF

# MCP Config
cat > ~/.mcp/mcp-config.json << 'MCP_EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/sdcard/Projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
MCP_EOF

# 11. Bashrc Aliases
echo -e "\n${YELLOW}⚙️ Setting up Aliases...${NC}"

cat >> ~/.bashrc << 'BASHRC_EOF'

# Claude Aliases
alias claude='termux-wake-lock && claude'
alias cc='claude'
alias aider='aider --anthropic-api-key $ANTHROPIC_API_KEY'

# Project Shortcuts
alias projects='cd ~/storage/shared/Projects'
alias p='cd ~/storage/shared/Projects'

# Git Shortcuts
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Node Shortcuts
alias ni='npm install'
alias nr='npm run'
alias nd='npm run dev'
alias nb='npm run build'

# Python Shortcuts
alias pi='pip install'
alias venv='python -m venv venv && source venv/bin/activate'

# Utility
alias ll='ls -la'
alias ..='cd ..'
alias cls='clear'

# Wake Lock Functions
wake() {
    termux-wake-lock
    echo "✅ Wake lock activated"
}

sleepnow() {
    termux-wake-unlock
    echo "✅ Wake lock released"
}

notify() {
    termux-notification --title "$1" --content "$2"
}
BASHRC_EOF

source ~/.bashrc

# 12. API Key Setup
echo -e "\n${YELLOW}🔑 API Key Configuration${NC}"
read -p "Enter your Anthropic API Key: " anthropic_key
if [ -n "$anthropic_key" ]; then
    echo "export ANTHROPIC_API_KEY=\"$anthropic_key\"" >> ~/.bashrc
    echo -e "${GREEN}✅ ANTHROPIC_API_KEY saved${NC}"
fi

read -p "Enter your GitHub Token (optional): " github_token
if [ -n "$github_token" ]; then
    echo "export GITHUB_TOKEN=\"$github_token\"" >> ~/.bashrc
    echo -e "${GREEN}✅ GITHUB_TOKEN saved${NC}"
fi

# 13. Abschluss
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${BLUE}🎉 Claude & Claude Code ist bereit!${NC}"
echo -e "\n${YELLOW}📁 Folder Structure:${NC}"
echo "   ~/storage/shared/Projects/  - Deine Projekte"
echo "   ~/.claude/                  - Claude Config"
echo "   ~/.mcp/                     - MCP Servers"

echo -e "\n${YELLOW}📚 Next Steps:${NC}"
echo "   1. Restart Termux"
echo "   2. Run: source ~/.bashrc"
echo "   3. Run: claude"

echo -e "\n${YELLOW}💡 Tips:${NC}"
echo "   - Use 'tmux new -s claude' for persistent sessions"
echo "   - Use 'wake' to prevent screen timeout"
echo "   - Use 'sleepnow' to release wake lock"
```

## 9. Ausführung des Setup-Scripts

```bash
# Script herunterladen oder erstellen
chmod +x setup-claude-termux.sh
./setup-claude-termux.sh

# Nach Abschluss
source ~/.bashrc
```

---

# 📚 ZUSÄTZLICHE RESSOURCEN

## Wichtige GitHub Repositories

| Repository | Beschreibung |
|------------|--------------|
| https://github.com/ComposioHQ/awesome-claude-skills | Claude Skills Sammlung |
| https://github.com/anthropics/skills | Offizielle Anthropic Skills |
| https://github.com/TransformerOptimus/SuperAGI | SuperAGI Framework |
| https://github.com/superagentxai/superagentx | SuperAgentX |
| https://github.com/zilliztech/claude-context | Claude Context MCP |
| https://github.com/rinadelph/Agent-MCP | Agent MCP Framework |
| https://github.com/modelcontextprotocol/servers | Offizielle MCP Server |

## Dokumentation

- **Claude Code**: https://docs.anthropic.com/claude/docs/claude-code
- **MCP Protocol**: https://modelcontextprotocol.io
- **Aider**: https://aider.chat
- **CrewAI**: https://docs.crewai.com
- **LangChain**: https://python.langchain.com

## Support

- **Claude Discord**: https://discord.gg/anthropic
- **MCP GitHub**: https://github.com/modelcontextprotocol
- **Termux Wiki**: https://wiki.termux.com

---

**Erstellungsdatum**: Januar 2025
**Getestet auf**: Windows 11, Android 16 (Termux)
**Version**: 1.0
