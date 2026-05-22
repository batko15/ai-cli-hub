# 🚀 ULTIMATIVES CLAUDE CODE SETUP
## Vollständige Anleitung für Windows & Android (Termux, ohne Root)

**Erstellt für:** Kenan Tuncaydin  
**Datum:** Januar 2025  
**Version:** 2.0 Final

---

# 📋 INHALTSVERZEICHNIS

1. [Schnellstart](#-schnellstart)
2. [Windows Setup](#-windows-setup)
3. [Android/Termux Setup](#-androidtermux-setup)
4. [MCP-Server Konfiguration](#-mcp-server-konfiguration)
5. [Skills & Agenten](#-skills--agenten)
6. [Troubleshooting](#-troubleshooting)

---

# ⚡ SCHNELLSTART

## Windows (5 Minuten)
```powershell
# 1. Terminal öffnen (PowerShell als Admin)
winget install OpenJS.NodeJS.LTS
npm install -g @anthropic-ai/claude-code
claude
# API-Key eingeben wenn gefragt
```

## Android/Termux (10 Minuten)
```bash
# 1. Termux von F-Droid installieren
pkg update && pkg upgrade -y
pkg install nodejs
npm install -g @anthropic-ai/claude-code
claude
```

---

# 🪟 WINDOWS SETUP

## 1. Voraussetzungen

### 1.1 Benötigte Software
| Software | Download | Zweck |
|----------|----------|-------|
| Node.js 20+ | https://nodejs.org | Claude Code CLI |
| Git | https://git-scm.com | Repository-Management |
| Python 3.11+ | https://python.org | MCP-Server, Agenten |
| VS Code | https://code.visualstudio.com | Entwicklung |

### 1.2 Installation
```powershell
# Via winget (empfohlen)
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Python.Python.3.12
winget install Microsoft.VisualStudioCode

# Node.js prüfen
node --version  # Sollte v20+ sein
npm --version
```

---

## 2. Claude Code Installation

### 2.1 CLI Installieren
```powershell
# Claude Code global installieren
npm install -g @anthropic-ai/claude-code

# Installation prüfen
claude --version
```

### 2.2 API-Key konfigurieren
```powershell
# Option 1: Umgebungsvariable (permanent)
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-xxxxx", "User")

# Option 2: In PowerShell Session
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# Option 3: Bei erstem Start eingeben
claude
# Folgt den Anweisungen zur Authentifizierung
```

### 2.3 Erster Start
```powershell
# Projektordner erstellen
mkdir C:\Projects\my-project
cd C:\Projects\my-project

# Claude Code starten
claude

# Erste Interaktion
> "Erstelle eine Hello World Anwendung in Python"
```

---

## 3. Ordnerstruktur erstellen

### 3.1 Basisstruktur
```powershell
# Hauptverzeichnis
mkdir C:\claude-workspace
cd C:\claude-workspace

# Unterordner
mkdir .claude
mkdir .claude\skills
mkdir .claude\agents
mkdir .claude\commands
mkdir .mcp
mkdir projects
mkdir tools
```

### 3.2 Vollständige Struktur
```
C:\claude-workspace\
├── .claude\
│   ├── settings.json          # Claude Code Einstellungen
│   ├── skills\                # Custom Skills
│   │   ├── web-dev\
│   │   │   └── SKILL.md
│   │   ├── python\
│   │   │   └── SKILL.md
│   │   └── design\
│   │       └── SKILL.md
│   ├── agents\                # Agent-Definitionen
│   │   └── coder.md
│   └── commands\              # Custom Commands
│       ├── test.md
│       └── deploy.md
├── .mcp\
│   └── mcp-config.json        # MCP Server Konfiguration
├── projects\                  # Deine Projekte
│   ├── web-app\
│   ├── python-scripts\
│   └── api-service\
├── tools\                     # Hilfsskripte
│   └── setup.ps1
└── CLAUDE.md                  # Projektweite Instructions
```

---

## 4. Konfigurationsdateien

### 4.1 CLAUDE.md (Projekt-Instructions)
```markdown
# Claude Code Configuration

## Projekt-Informationen
- **Name:** Claude Workspace
- **Besitzer:** Kenan Tuncaydin
- **Typ:** Full-Stack Entwicklung

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Next.js
- **Backend:** Python, Node.js, FastAPI
- **Datenbank:** PostgreSQL, MongoDB, SQLite
- **Deployment:** Vercel, Netlify, GitHub Pages

## Coding Standards
- TypeScript strict mode verwenden
- ESLint und Prettier nutzen
- Funktionen unter 50 Zeilen halten
- Aussagekräftige Variablennamen
- Kommentare auf Englisch

## Wichtige Befehle
| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Production Build |
| `npm test` | Tests ausführen |
| `npm run lint` | Code-Qualität prüfen |

## MCP-Server
- `filesystem` - Dateizugriff
- `github` - GitHub Integration
- `memory` - Persistenter Speicher
- `sequential-thinking` - Komplexe Problemlösung

## Skills
- `web-dev` - Webentwicklung
- `python` - Python Skripte
- `design` - UI/UX Design

## Sicherheit
- API-Keys NIE im Code speichern
- Umgebungsvariablen nutzen
- .env Dateien ignorieren
- Keine sensiblen Daten loggen
```

### 4.2 settings.json
```json
{
  "apiProvider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "fallbackModel": "claude-3-5-haiku-20241022",
  "temperature": 0.7,
  "maxTokens": 4096,
  "contextWindow": 200000,
  "skills": {
    "autoEnable": true,
    "paths": [
      "./.claude/skills"
    ]
  },
  "mcp": {
    "configPath": "./.mcp/mcp-config.json",
    "autoStart": true
  },
  "editor": {
    "formatOnSave": true,
    "linter": "eslint",
    "formatter": "prettier"
  },
  "terminal": {
    "shell": "powershell",
    "autoRun": true
  }
}
```

### 4.3 MCP-Konfiguration
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "C:\\claude-workspace\\projects"
      ],
      "env": {}
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
      "args": ["-y", "@anthropic-ai/mcp-server-memory"],
      "env": {}
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sequential-thinking"],
      "env": {}
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      },
      "disabled": true
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "disabled": true
    }
  }
}
```

---

## 5. Skills erstellen

### 5.1 Web-Dev Skill
**Datei: `.claude/skills/web-dev/SKILL.md`**
```markdown
# Web Development Skill

## Beschreibung
Erstelle moderne Webanwendungen mit React, TypeScript und Tailwind CSS.

## Trigger
- "erstelle eine webseite"
- "react app"
- "frontend"
- "web seite bauen"

## Technologien
- React 18+
- TypeScript
- Tailwind CSS
- Next.js (optional)
- Vite (für schnelle Entwicklung)

## Workflow

### 1. Projekt-Setup
```bash
# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Tailwind konfigurieren
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Komponenten erstellen
- Atomic Design Pattern nutzen
- Props mit TypeScript typen
- Responsive Design mit Tailwind
- Accessibility beachten

### 4. Best Practices
- Komponenten unter 200 Zeilen
- Custom Hooks für Logik
- Context für State Management
- Lazy Loading für Performance

## Beispiel-Prompts
- "Erstelle eine Portfolio-Webseite mit dunklem Theme"
- "Baue ein Dashboard mit Charts und Tabellen"
- "Erstelle eine Landing Page für ein SaaS-Produkt"
```

### 5.2 Python Skill
**Datei: `.claude/skills/python/SKILL.md`**
```markdown
# Python Development Skill

## Beschreibung
Entwickle Python-Skripte für Automatisierung, Datenanalyse und Backend-Services.

## Trigger
- "python skript"
- "automatisierung"
- "datenanalyse"
- "backend"

## Technologien
- Python 3.11+
- FastAPI (Backend)
- Pandas (Datenanalyse)
- Requests (HTTP)
- SQLAlchemy (Datenbank)

## Workflow

### 1. Projekt-Setup
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows
pip install fastapi uvicorn pandas requests
```

### 2. Struktur
```
project/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   └── routes.py
│   └── utils/
│       └── helpers.py
├── tests/
│   └── test_main.py
├── requirements.txt
└── README.md
```

### 3. Best Practices
- Type Hints verwenden
- Docstrings für Funktionen
- Virtual Environments nutzen
- requirements.txt pflegen
- Tests mit pytest schreiben

## Beispiel-Prompts
- "Erstelle eine REST API für Benutzer-Verwaltung"
- "Schreibe ein Skript das CSV-Dateien analysiert"
- "Baue einen Web-Scraper für Produktpreise"
```

### 5.3 Design Skill
**Datei: `.claude/skills/design/SKILL.md`**
```markdown
# UI/UX Design Skill

## Beschreibung
Erstelle benutzerfreundliche und ästhetische Oberflächen mit Fokus auf UX.

## Trigger
- "design"
- "ui ux"
- "benutzeroberfläche"
- "wireframe"

## Prinzipien
1. **Konsistenz** - Einheitliches Design-System
2. **Hierarchie** - Wichtiges hervorheben
3. **Feedback** - Benutzer-Aktionen bestätigen
4. **Einfachheit** - Nichts Überflüssiges
5. **Accessibility** - Für alle nutzbar

## Farben (Tailwind)
```css
/* Dunkles Theme */
--background: #0a0a0a
--foreground: #fafafa
--primary: #3b82f6
--secondary: #64748b
--accent: #8b5cf6
--destructive: #ef4444
```

## Typography
- **Überschriften:** Inter, 24-48px, Bold
- **Fließtext:** Inter, 16px, Regular
- **Code:** JetBrains Mono, 14px

## Komponenten
- Buttons mit Hover-States
- Formulare mit Validierung
- Navigation mit Breadcrumbs
- Karten für Content
- Modals für Aktionen

## Beispiel-Prompts
- "Erstelle ein Design-System mit Farben und Typografie"
- "Designe ein Login-Formular mit Validierung"
- "Erstelle ein Dashboard-Layout mit Sidebar"
```

---

## 6. MCP-Server Installation

### 6.1 Filesystem MCP
```powershell
# Server installieren
npm install -g @anthropic-ai/mcp-server-filesystem

# Testen
npx @anthropic-ai/mcp-server-filesystem C:\claude-workspace\projects
```

### 6.2 GitHub MCP
```powershell
# Server installieren
npm install -g @anthropic-ai/mcp-server-github

# GitHub Token erstellen: https://github.com/settings/tokens
# Berechtigungen: repo, user, read:org

# Token setzen
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxx", "User")
```

### 6.3 Memory MCP
```powershell
# Server installieren
npm install -g @anthropic-ai/mcp-server-memory

# Speichert Konversationen und Kontext
```

### 6.4 Sequential Thinking MCP
```powershell
# Server installieren
npm install -g @anthropic-ai/mcp-server-sequential-thinking

# Für komplexe Problemlösung
```

---

## 7. Automatisches Setup-Skript

### 7.1 PowerShell Setup-Skript
**Datei: `tools/setup-windows.ps1`**
```powershell
#Requires -RunAsAdministrator

# ============================================
# CLAUDE CODE WINDOWS SETUP
# ============================================

Write-Host "🚀 Starte Claude Code Setup für Windows..." -ForegroundColor Cyan

# 1. Prerequisites prüfen
Write-Host "`n📋 Prüfe Voraussetzungen..." -ForegroundColor Yellow

$tools = @("node", "npm", "python", "git")
foreach ($tool in $tools) {
    if (Get-Command $tool -ErrorAction SilentlyContinue) {
        $version = & $tool --version 2>&1
        Write-Host "✅ $tool gefunden: $version" -ForegroundColor Green
    } else {
        Write-Host "❌ $tool nicht gefunden!" -ForegroundColor Red
        Write-Host "   Bitte installiere $tool zuerst." -ForegroundColor Yellow
    }
}

# 2. Claude Code installieren
Write-Host "`n🤖 Installiere Claude Code CLI..." -ForegroundColor Yellow
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    npm install -g @anthropic-ai/claude-code
    Write-Host "✅ Claude Code installiert" -ForegroundColor Green
} else {
    Write-Host "✅ Claude Code bereits installiert" -ForegroundColor Green
}

# 3. MCP-Server installieren
Write-Host "`n🔌 Installiere MCP-Server..." -ForegroundColor Yellow
$mcpServers = @(
    "@anthropic-ai/mcp-server-filesystem",
    "@anthropic-ai/mcp-server-github",
    "@anthropic-ai/mcp-server-memory",
    "@anthropic-ai/mcp-server-sequential-thinking"
)

foreach ($server in $mcpServers) {
    npm install -g $server 2>&1 | Out-Null
    Write-Host "✅ $server" -ForegroundColor Green
}

# 4. Ordnerstruktur erstellen
Write-Host "`n📁 Erstelle Ordnerstruktur..." -ForegroundColor Yellow

$baseDir = "C:\claude-workspace"
$folders = @(
    "$baseDir\.claude\skills\web-dev",
    "$baseDir\.claude\skills\python",
    "$baseDir\.claude\skills\design",
    "$baseDir\.claude\agents",
    "$baseDir\.claude\commands",
    "$baseDir\.mcp",
    "$baseDir\projects",
    "$baseDir\tools"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
}
Write-Host "✅ Ordnerstruktur erstellt" -ForegroundColor Green

# 5. API-Key abfragen
Write-Host "`n🔑 API-Konfiguration" -ForegroundColor Yellow
$anthropicKey = Read-Host "Gib deinen Anthropic API Key ein (oder Enter zum Überspringen)"
if ($anthropicKey) {
    [Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $anthropicKey, "User")
    Write-Host "✅ ANTHROPIC_API_KEY gespeichert" -ForegroundColor Green
}

$githubToken = Read-Host "Gib deinen GitHub Token ein (oder Enter zum Überspringen)"
if ($githubToken) {
    [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $githubToken, "User")
    Write-Host "✅ GITHUB_TOKEN gespeichert" -ForegroundColor Green
}

# 6. Abschluss
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ SETUP ABGESCHLOSSEN!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host @"

🎉 Claude Code ist jetzt bereit!

📂 Workspace: C:\claude-workspace

📚 Nächste Schritte:
   1. Terminal neu starten
   2. cd C:\claude-workspace\projects
   3. claude

🔗 Nützliche Links:
   - https://docs.anthropic.com/claude/docs/claude-code
   - https://github.com/anthropics/claude-code

"@ -ForegroundColor White
```

### 7.2 Skript ausführen
```powershell
# PowerShell als Admin öffnen
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Setup ausführen
.\tools\setup-windows.ps1
```

---

## 8. Nützliche Aliases

### 8.1 PowerShell Profile
```powershell
# PowerShell Profile öffnen
notepad $PROFILE

# Folgendes hinzufügen:
function claude-workspace { cd C:\claude-workspace }
function claude-projects { cd C:\claude-workspace\projects }

function new-project {
    param($name)
    mkdir "C:\claude-workspace\projects\$name"
    cd "C:\claude-workspace\projects\$name"
    claude
}

# Aliases
Set-Alias -Name cw -Value claude-workspace
Set-Alias -Name cpj -Value claude-projects
Set-Alias -Name np -Value new-project
```

---

# 📱 ANDROID/TERMUX SETUP

## 1. Voraussetzungen

### 1.1 WICHTIG: Termux von F-Droid installieren!
- **NICHT** vom Google Play Store (veraltete Version)
- **Download:** https://f-droid.org/packages/com.termux/
- **F-Droid App:** https://f-droid.org/

### 1.2 Zusätzliche Pakete
| Paket | Zweck | Installation |
|-------|-------|--------------|
| Termux:API | System-Zugriff | F-Droid |
| Termux:Boot | Autostart | F-Droid |
| Termux:Widget | Homescreen-Shortcuts | F-Droid |

---

## 2. Basis-Setup

### 2.1 Termux aktualisieren
```bash
# Termux öffnen und aktualisieren
pkg update && pkg upgrade -y

# Speicherzugriff erteilen
termux-setup-storage
# Bestätigen Sie die Berechtigungsanfrage
```

### 2.2 Node.js installieren
```bash
# Node.js installieren
pkg install nodejs -y

# Version prüfen
node --version
npm --version
```

### 2.3 Zusätzliche Pakete
```bash
# Wichtige Pakete
pkg install -y git python build-essential wget curl nano vim

# Für bessere Performance
pkg install -y proot proot-distro
```

---

## 3. Claude Code Installation

### 3.1 CLI Installieren
```bash
# Claude Code global installieren
npm install -g @anthropic-ai/claude-code

# Installation prüfen
claude --version
```

### 3.2 API-Key konfigurieren
```bash
# API Key in .bashrc speichern
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
source ~/.bashrc

# Oder beim ersten Start eingeben
claude
```

### 3.3 Erster Start
```bash
# Projektordner erstellen
mkdir ~/projects
cd ~/projects

# Claude Code starten
claude

# Erste Interaktion
> "Erstelle eine einfache HTML-Seite"
```

---

## 4. Ordnerstruktur

### 4.1 Verzeichnisse erstellen
```bash
# Hauptverzeichnis
mkdir -p ~/claude-workspace
cd ~/claude-workspace

# Unterordner
mkdir -p .claude/skills/{web-dev,python,design}
mkdir -p .claude/agents
mkdir -p .claude/commands
mkdir -p .mcp
mkdir -p projects
mkdir -p tools

# Für Zugriff auf internen Speicher
ln -s ~/storage/shared/Projects ~/projects-external
```

### 4.2 Vollständige Struktur
```
~/claude-workspace/
├── .claude/
│   ├── settings.json
│   ├── skills/
│   │   ├── web-dev/SKILL.md
│   │   ├── python/SKILL.md
│   │   └── design/SKILL.md
│   ├── agents/
│   └── commands/
├── .mcp/
│   └── mcp-config.json
├── projects/
├── tools/
└── CLAUDE.md
```

---

## 5. Konfigurationsdateien

### 5.1 CLAUDE.md
```bash
cat > ~/claude-workspace/CLAUDE.md << 'EOF'
# Claude Code Configuration (Android/Termux)

## Environment
- Platform: Android 16 / Termux
- Shell: Bash
- Editor: Nano/Vim
- Storage: ~/storage/shared/

## Tech Stack
- Frontend: React Native, Flutter, Web
- Backend: Node.js, Python
- Database: SQLite, Firebase

## Mobile-Specific Notes
- Keine GUI-Tools (Headless)
- Begrenzte Ressourcen
- Battery-efficient code
- Offline-first Design

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`

## Storage Paths
- Intern: ~/
- Extern: ~/storage/shared/
- Projects: ~/storage/shared/Projects/

## Termux Commands
- `termux-wake-lock` - Screen an halten
- `termux-notification` - Benachrichtigungen
- `termux-share` - Dateien teilen
EOF
```

### 5.2 settings.json
```bash
cat > ~/claude-workspace/.claude/settings.json << 'EOF'
{
  "apiProvider": "anthropic",
  "model": "claude-3-5-haiku-20241022",
  "temperature": 0.7,
  "maxTokens": 2048,
  "contextWindow": 100000,
  "skills": {
    "autoEnable": true,
    "paths": [
      "./.claude/skills"
    ]
  },
  "mcp": {
    "configPath": "./.mcp/mcp-config.json",
    "autoStart": false
  },
  "terminal": {
    "shell": "bash",
    "autoRun": true
  }
}
EOF
```

### 5.3 MCP-Konfiguration (Termux-optimiert)
```bash
cat > ~/claude-workspace/.mcp/mcp-config.json << 'EOF'
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
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      },
      "disabled": true
    }
  }
}
EOF
```

---

## 6. Hilfreiche Funktionen

### 6.1 Bash Aliases
```bash
cat >> ~/.bashrc << 'EOF'

# ============================================
# CLAUDE CODE ALIASES
# ============================================

# Claude Shortcuts
alias cc='claude'
alias ccd='cd ~/claude-workspace && claude'
alias ccp='cd ~/claude-workspace/projects && claude'

# Projekt-Shortcuts
alias projects='cd ~/storage/shared/Projects'
alias p='cd ~/storage/shared/Projects'
alias workspace='cd ~/claude-workspace'

# Git Shortcuts
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline'

# Node Shortcuts
alias ni='npm install'
alias nid='npm install --save-dev'
alias nr='npm run'
alias nd='npm run dev'
alias nb='npm run build'

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
    echo "✅ Wake lock aktiviert - Screen bleibt an"
}

sleepnow() {
    termux-wake-unlock
    echo "✅ Wake lock deaktiviert"
}

# Notification
notify() {
    termux-notification --title "$1" --content "$2"
}

# Neues Projekt erstellen
new-project() {
    mkdir -p ~/claude-workspace/projects/$1
    cd ~/claude-workspace/projects/$1
    echo "📁 Projekt '$1' erstellt"
    claude
}

# Schneller Server
serve() {
    python -m http.server ${1:-8000}
}

# Backup erstellen
backup() {
    tar -czf ~/storage/shared/claude-backup-$(date +%Y%m%d).tar.gz \
        --exclude='node_modules' \
        --exclude='.git' \
        ~/claude-workspace
    echo "✅ Backup erstellt"
}
EOF

source ~/.bashrc
```

---

## 7. MCP-Server Installation (Termux)

### 7.1 Filesystem MCP
```bash
# Server installieren
npm install -g @anthropic-ai/mcp-server-filesystem

# Testen
npx @anthropic-ai/mcp-server-filesystem /storage/emulated/0/Projects
```

### 7.2 Memory MCP
```bash
# Server installieren
npm install -g @anthropic-ai/mcp-server-memory
```

### 7.3 Hinweise
- GitHub MCP benötigt einen Token
- Starte MCP-Server nur bei Bedarf (spart Ressourcen)
- Nutze `haiku` Modell für schnellere Antworten

---

## 8. Autostart einrichten

### 8.1 Mit Termux:Boot
```bash
# Boot-Verzeichnis erstellen
mkdir -p ~/.termux/boot

# Autostart-Skript
cat > ~/.termux/boot/claude-autostart.sh << 'EOF'
#!/bin/bash

# Warten bis Netzwerk bereit
sleep 10

# Wake Lock aktivieren
termux-wake-lock

# Optional: Claude Code starten
# cd ~/claude-workspace/projects
# claude

# Benachrichtigung
termux-notification --title "Claude Ready" --content "Workspace ist bereit"
EOF

# Ausführbar machen
chmod +x ~/.termux/boot/claude-autostart.sh
```

---

## 9. Setup-Skript (Android)

### 9.1 Automatisches Setup
```bash
cat > ~/claude-workspace/tools/setup-termux.sh << 'EOF'
#!/bin/bash

# ============================================
# CLAUDE CODE TERMUX SETUP
# ============================================

echo "🚀 Starte Claude Code Setup für Termux..."

# Farben
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. System Update
echo -e "${YELLOW}📦 Aktualisiere System...${NC}"
pkg update -y && pkg upgrade -y

# 2. Basis Pakete
echo -e "${YELLOW}📦 Installiere Basis-Pakete...${NC}"
pkg install -y git nodejs python build-essential wget curl nano vim

# 3. Storage Setup
echo -e "${YELLOW}📁 Konfiguriere Speicher...${NC}"
if [ ! -d ~/storage ]; then
    echo "Bitte Speicher-Berechtigung erteilen..."
    termux-setup-storage
    sleep 2
fi

# 4. Claude Code
echo -e "${YELLOW}🤖 Installiere Claude Code...${NC}"
npm install -g @anthropic-ai/claude-code

# 5. MCP-Server
echo -e "${YELLOW}🔌 Installiere MCP-Server...${NC}"
npm install -g @anthropic-ai/mcp-server-filesystem
npm install -g @anthropic-ai/mcp-server-memory

# 6. Ordnerstruktur
echo -e "${YELLOW}📁 Erstelle Ordnerstruktur...${NC}"
mkdir -p ~/claude-workspace/.claude/skills/{web-dev,python,design}
mkdir -p ~/claude-workspace/.claude/agents
mkdir -p ~/claude-workspace/.mcp
mkdir -p ~/claude-workspace/projects
mkdir -p ~/claude-workspace/tools
mkdir -p ~/storage/shared/Projects

# 7. API-Key
echo -e "${YELLOW}🔑 API-Konfiguration${NC}"
read -p "Anthropic API Key eingeben (oder Enter zum Überspringen): " api_key
if [ -n "$api_key" ]; then
    echo "export ANTHROPIC_API_KEY=\"$api_key\"" >> ~/.bashrc
    echo -e "${GREEN}✅ API Key gespeichert${NC}"
fi

# 8. Abschluss
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ SETUP ABGESCHLOSSEN!${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${BLUE}🎉 Claude Code ist bereit!${NC}"
echo -e "\n${YELLOW}Nächste Schritte:${NC}"
echo "   1. source ~/.bashrc"
echo "   2. cd ~/claude-workspace/projects"
echo "   3. claude"
EOF

chmod +x ~/claude-workspace/tools/setup-termux.sh
```

### 9.2 Skript ausführen
```bash
# Setup ausführen
~/claude-workspace/tools/setup-termux.sh
```

---

## 10. Performance-Tipps für Android

### 10.1 Modell-Wahl
| Situation | Modell | Grund |
|-----------|--------|-------|
| Schnelle Antworten | claude-3-5-haiku | Schneller, weniger Tokens |
| Komplexe Aufgaben | claude-sonnet-4 | Bessere Qualität |
| Code-Generierung | claude-3-5-haiku | Meist ausreichend |

### 10.2 Ressourcen sparen
```bash
# Nur notwendige MCP-Server starten
# In mcp-config.json unnötige Server deaktivieren

# Wake-Lock nur bei langen Aufgaben
wake  # Aktivieren
# ... Aufgabe ...
sleepnow  # Deaktivieren

# Speicher prüfen
df -h
```

### 10.3 Externe SD-Karte nutzen
```bash
# Projekte auf SD-Karte
mkdir -p /sdcard/Projects
ln -s /sdcard/Projects ~/projects-sd

# In Zukunft dort arbeiten
cd ~/projects-sd
claude
```

---

# 🔌 MCP-SERVER KONFIGURATION

## 1. Filesystem MCP
```json
{
  "name": "filesystem",
  "description": "Dateizugriff auf Projektverzeichnis",
  "command": "npx",
  "args": [
    "-y",
    "@anthropic-ai/mcp-server-filesystem",
    "/path/to/projects"
  ]
}
```

**Funktionen:**
- Dateien lesen/schreiben
- Verzeichnisse durchsuchen
- Dateien erstellen/löschen

## 2. GitHub MCP
```json
{
  "name": "github",
  "description": "GitHub Integration",
  "command": "npx",
  "args": ["-y", "@anthropic-ai/mcp-server-github"],
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

**Funktionen:**
- Repositories durchsuchen
- Issues erstellen
- Pull Requests
- Code-Reviews

## 3. Memory MCP
```json
{
  "name": "memory",
  "description": "Persistenter Kontext-Speicher",
  "command": "npx",
  "args": ["-y", "@anthropic-ai/mcp-server-memory"]
}
```

**Funktionen:**
- Konversationen speichern
- Kontext zwischen Sessions
- Wichtigste Fakten merken

## 4. Sequential Thinking MCP
```json
{
  "name": "sequential-thinking",
  "description": "Komplexe Problemlösung",
  "command": "npx",
  "args": ["-y", "@anthropic-ai/mcp-server-sequential-thinking"]
}
```

**Funktionen:**
- Schritt-für-Schritt Analyse
- Komplexe Probleme zerlegen
- Logisches Denken

---

# 🎯 SKILLS & AGENTEN

## 1. Verfügbare Skills

| Skill | Beschreibung | Trigger |
|-------|--------------|---------|
| web-dev | Webentwicklung | "webseite", "react", "frontend" |
| python | Python Skripte | "python", "skript", "automatisierung" |
| design | UI/UX Design | "design", "ui", "benutzeroberfläche" |

## 2. Custom Skills erstellen

### Struktur
```
skills/
└── my-skill/
    ├── SKILL.md      # Skill-Definition
    └── examples/     # Beispiel-Dateien
```

### SKILL.md Vorlage
```markdown
# [Skill Name]

## Beschreibung
[Kurze Beschreibung]

## Trigger
- "trigger 1"
- "trigger 2"

## Technologien
- Tech 1
- Tech 2

## Workflow
1. Schritt 1
2. Schritt 2
3. Schritt 3

## Beispiel-Prompts
- "Beispiel 1"
- "Beispiel 2"
```

## 3. Agent-Definition

### Datei: `.claude/agents/coder.md`
```markdown
# Code Agent

## Rolle
Du bist ein erfahrener Full-Stack Entwickler.

## Spezialisierungen
- Frontend: React, TypeScript, Tailwind
- Backend: Node.js, Python, FastAPI
- Database: PostgreSQL, MongoDB

## Verhaltensregeln
1. Sauberer, lesbarer Code
2. TypeScript strict mode
3. Tests für kritische Pfade
4. Dokumentation wichtigster Funktionen

## Workflow
1. Anforderungen verstehen
2. Architektur planen
3. Implementieren
4. Testen
5. Dokumentieren
```

---

# 🚨 TROUBLESHOOTING

## Häufige Probleme

### 1. Claude Code startet nicht
```bash
# Node.js Version prüfen
node --version  # Muss v18+ sein

# Neu installieren
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

### 2. API-Key nicht erkannt
```bash
# Prüfen
echo $ANTHROPIC_API_KEY

# Neu setzen
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# Permanent in .bashrc
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
source ~/.bashrc
```

### 3. MCP-Server verbindet nicht
```bash
# Server manuell testen
npx @anthropic-ai/mcp-server-filesystem /path/to/projects

# Port prüfen
lsof -i :8080

# Config prüfen
cat .mcp/mcp-config.json
```

### 4. Speicher voll (Android)
```bash
# Speicher prüfen
df -h

# Cache löschen
npm cache clean --force
pkg clean

# Auf SD-Karte verschieben
mv ~/claude-workspace /sdcard/
ln -s /sdcard/claude-workspace ~/claude-workspace
```

### 5. Termux crasht
```bash
# Wake Lock aktivieren
termux-wake-lock

# Weniger Ressourcen nutzen
# In settings.json:
# "model": "claude-3-5-haiku"
# "maxTokens": 2048
```

---

# 📚 ZUSÄTZLICHE RESSOURCEN

## Offizielle Dokumentation
- **Claude Code:** https://docs.anthropic.com/claude/docs/claude-code
- **MCP Protocol:** https://modelcontextprotocol.io
- **Anthropic API:** https://docs.anthropic.com

## GitHub Repositories
- **Claude Code:** https://github.com/anthropics/claude-code
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Skills:** https://github.com/anthropics/skills

## Community
- **Discord:** https://discord.gg/anthropic
- **Reddit:** r/ClaudeAI
- **Twitter:** @AnthropicAI

---

# ✅ CHECKLISTE

## Windows
- [ ] Node.js 20+ installiert
- [ ] Git installiert
- [ ] Python 3.11+ installiert
- [ ] Claude Code CLI installiert
- [ ] API-Key konfiguriert
- [ ] MCP-Server installiert
- [ ] Skills erstellt
- [ ] Ordnerstruktur angelegt

## Android/Termux
- [ ] Termux von F-Droid installiert
- [ ] Speicherzugriff erteilt
- [ ] Node.js installiert
- [ ] Claude Code CLI installiert
- [ ] API-Key konfiguriert
- [ ] Ordnerstruktur angelegt
- [ ] Aliases eingerichtet
- [ ] Externer Speicher verlinkt

---

**Erstellt von:** Claude (Anthropic)  
**Für:** Kenan Tuncaydin  
**Version:** 2.0 Final  
**Datum:** Januar 2025

🚀 **Viel Erfolg mit Claude Code!**
