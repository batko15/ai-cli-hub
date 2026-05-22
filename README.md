# 🚀 AI CLI Hub

**Mistral CLI, Vibe CLI, Gemini CLI, Codex CLI & More for Termux/Android/Linux/Windows**

Eine einheitliche Oberfläche für alle AI-CLI-Tools mit Skills, Workflows, Agents und MCP-Servern.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🤖 **Multiple CLI Providers** - Mistral, Vibe, Gemini, Codex, Claude, DeepSeek, Qwen
- 🛠️ **Skills System** - Wiederverwendbare AI-Fähigkeiten
- 🔄 **Workflows** - Automatisierte Workflows
- 🤝 **Agents** - Vorkonfigurierte AI-Agenten
- 🔌 **MCP Servers** - Model Context Protocol Integration
- 🖥️ **Local Models** - Ollama Unterstützung für lokale LLMs
- 📱 **Cross-Platform** - Linux, Windows, Termux (Android)

## 🛠️ CLI Providers

| Provider | Install Command | Run Command | Models |
|----------|-----------------|-------------|--------|
| **Mistral CLI** | `pip install mistral-cli` | `mistral chat` | Mistral Large, Codestral, NeMo |
| **Vibe CLI** | `npm install -g vibe-cli` | `vibe` | Auto, Architect, Coder, Reviewer |
| **Gemini CLI** | `npm install -g @anthropic-ai/gemini-cli` | `gemini` | Gemini 2.0 Flash, 1.5 Pro |
| **Codex CLI** | `pip install openai` | `codex` | GPT-4o, o1-preview, o1-mini |
| **Claude CLI** | `npm install -g @anthropic-ai/claude-cli` | `claude` | Claude Sonnet 4, Opus 4 |
| **DeepSeek CLI** | `pip install openai` | `deepseek` | DeepSeek Coder, Reasoner |

## 📦 Installation

### Linux / macOS

```bash
# Repository klonen
git clone https://github.com/batko15/ai-cli-hub.git
cd ai-cli-hub

# Setup-Script ausführen
chmod +x setup/install-linux.sh
./setup/install-linux.sh
```

### Windows

```powershell
# Repository klonen
git clone https://github.com/batko15/ai-cli-hub.git
cd ai-cli-hub

# Setup-Script ausführen
setup\install-windows.bat
```

### Termux (Android)

```bash
# Repository klonen
git clone https://github.com/batko15/ai-cli-hub.git
cd ai-cli-hub

# Setup-Script ausführen
chmod +x setup/install-termux.sh
./setup/install-termux.sh
```

## 🚀 Schnellstart

```bash
# Abhängigkeiten installieren
bun install

# Datenbank einrichten
bun run db:push

# Entwicklungsserver starten
bun run dev
```

Dann öffne http://localhost:3000 im Browser.

## 🔑 API Keys konfigurieren

Erstelle eine `.env` Datei im Projektverzeichnis:

```env
# Mistral AI
MISTRAL_API_KEY=your_mistral_api_key

# OpenAI / Codex
OPENAI_API_KEY=your_openai_api_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key

# Google Gemini
GOOGLE_API_KEY=your_google_api_key

# DeepSeek
DEEPSEEK_API_KEY=your_deepseek_api_key

# GitHub (für MCP)
GITHUB_PAT_TOKEN=your_github_token

# Brave Search
BRAVE_API_KEY=your_brave_api_key
```

## 📱 Termux-spezifische Einrichtung

Für Android mit Termux:

1. **Termux installieren** von [F-Droid](https://f-droid.org/packages/com.termux/) (empfohlen) oder Play Store

2. **Erforderliche Pakete:**
```bash
pkg update && pkg upgrade
pkg install curl wget git nodejs python build-essential
```

3. **Bun installieren:**
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

4. **AI CLI Tools:**
```bash
pip install mistral-cli openai google-generativeai anthropic
```

5. **Ollama für Android** (optional, erfordert proot):
```bash
pkg install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3
```

## 🛠️ MCP Server

Das Projekt enthält MCP-Server-Integrationen:

| Server | Beschreibung |
|--------|--------------|
| **Filesystem** | Dateisystem-Zugriff |
| **Memory** | Persistenter Speicher |
| **Brave Search** | Websuche |
| **GitHub** | Repository-Integration |
| **Puppeteer** | Browser-Automatisierung |
| **Sequential Thinking** | Schrittweises Denken |

## 📚 Skills & Workflows

### Verfügbare Skills

- `brownfield-query` - Codebase-Analyse
- `brownfield-fix` - Bug-Fixing
- `pr-review` - Pull Request Reviews
- `deploy-checklist` - Deployment-Checkliste
- `git-os` - Git-Operationen
- `greenfield` - Neue Projekte starten

### Verfügbare Workflows

- `code-review` - Vollständiger Code Review
- `feature-development` - Feature-Entwicklung
- `bug-fix` - Bug-Fixing Workflow

### Verfügbare Agents

- `pr-review-agent` - PR Review Agent
- `module-audit` - Modul-Audit
- `onboard-dev` - Developer Onboarding

## 🖥️ Lokale Modelle (Ollama)

```bash
# Ollama installieren (Linux/macOS)
curl -fsSL https://ollama.com/install.sh | sh

# Modelle herunterladen
ollama pull llama3
ollama pull mistral
ollama pull codellama
ollama pull deepseek-coder

# Server starten
ollama serve
```

## 📁 Projektstruktur

```
ai-cli-hub/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React Komponenten
│   │   ├── ui/        # shadcn/ui Komponenten
│   │   └── cli/       # CLI-spezifische Komponenten
│   └── lib/
│       └── cli/       # CLI Konfigurationen
├── setup/             # Installations-Scripts
├── repos/             # Geklonte Repositories
├── prisma/            # Datenbank-Schema
└── mini-services/     # WebSocket Services
```

## 🔧 Entwicklung

```bash
# Linting
bun run lint

# Datenbank-Migration
bun run db:migrate

# Build
bun run build
```

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🙏 Credits

- [Mistral AI](https://mistral.ai)
- [Anthropic](https://anthropic.com)
- [OpenAI](https://openai.com)
- [Google AI](https://ai.google.dev)
- [Ollama](https://ollama.com)
- [Vibe Coding](https://github.com/filipecalegario/awesome-vibe-coding)

---

**Made with ❤️ by [batko15](https://github.com/batko15)**
