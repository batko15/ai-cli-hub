#!/bin/bash
# AI-CLI Setup Script for Linux
# Supports: Ubuntu, Debian, Fedora, Arch, and other Linux distributions

set -e

echo "========================================"
echo "   AI-CLI Setup Script for Linux"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Detect distribution
detect_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
    elif [ -f /etc/debian_version ]; then
        DISTRO="debian"
    elif [ -f /etc/fedora-release ]; then
        DISTRO="fedora"
    elif [ -f /etc/arch-release ]; then
        DISTRO="arch"
    else
        DISTRO="unknown"
    fi
    echo -e "${CYAN}Detected distribution: ${DISTRO}${NC}"
}

# Install system dependencies
install_system_deps() {
    echo -e "${YELLOW}Installing system dependencies...${NC}"
    
    case $DISTRO in
        ubuntu|debian|linuxmint|pop)
            sudo apt update
            sudo apt install -y curl wget git build-essential python3 python3-pip python3-venv nodejs npm
            ;;
        fedora|rhel|centos)
            sudo dnf install -y curl wget git gcc gcc-c++ make python3 python3-pip nodejs npm
            ;;
        arch|manjaro)
            sudo pacman -Syu --noconfirm
            sudo pacman -S --noconfirm curl wget git base-devel python python-pip nodejs npm
            ;;
        opensuse*)
            sudo zypper refresh
            sudo zypper install -y curl wget git gcc make python3 python3-pip nodejs npm
            ;;
        *)
            echo -e "${RED}Unknown distribution. Please install dependencies manually.${NC}"
            echo "Required: curl, wget, git, python3, pip, nodejs, npm"
            ;;
    esac
}

# Install Bun (fast JavaScript runtime)
install_bun() {
    echo -e "${YELLOW}Installing Bun...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    echo -e "${GREEN}Bun installed successfully!${NC}"
}

# Install Ollama for local LLM inference
install_ollama() {
    echo -e "${YELLOW}Installing Ollama...${NC}"
    curl -fsSL https://ollama.com/install.sh | sh
    echo -e "${GREEN}Ollama installed successfully!${NC}"
    
    # Start Ollama service
    echo -e "${YELLOW}Starting Ollama service...${NC}"
    ollama serve &
    sleep 5
    
    # Pull recommended models
    echo -e "${CYAN}Pulling recommended models...${NC}"
    ollama pull llama3
    ollama pull mistral
    echo -e "${GREEN}Models downloaded!${NC}"
}

# Install AI CLI Tools
install_cli_tools() {
    echo -e "${YELLOW}Installing AI CLI Tools...${NC}"
    
    # Mistral CLI
    echo -e "${PURPLE}Installing Mistral CLI...${NC}"
    pip3 install mistral-cli --user
    
    # Vibe CLI
    echo -e "${PURPLE}Installing Vibe CLI...${NC}"
    npm install -g vibe-cli 2>/dev/null || echo "Vibe CLI installation skipped"
    
    # Claude CLI
    echo -e "${PURPLE}Installing Claude CLI...${NC}"
    npm install -g @anthropic-ai/claude-cli 2>/dev/null || echo "Claude CLI installation skipped"
    
    # OpenAI CLI
    echo -e "${PURPLE}Installing OpenAI CLI...${NC}"
    pip3 install openai --user
    
    # Gemini CLI (if available)
    echo -e "${PURPLE}Installing Gemini dependencies...${NC}"
    pip3 install google-generativeai --user
    
    echo -e "${GREEN}CLI Tools installed!${NC}"
}

# Install MCP Servers
install_mcp_servers() {
    echo -e "${YELLOW}Installing MCP Servers...${NC}"
    
    # Filesystem MCP
    npm install -g @modelcontextprotocol/server-filesystem 2>/dev/null || true
    
    # Memory MCP
    npm install -g @modelcontextprotocol/server-memory 2>/dev/null || true
    
    # Brave Search MCP
    npm install -g @modelcontextprotocol/server-brave-search 2>/dev/null || true
    
    # Sequential Thinking MCP
    npm install -g @modelcontextprotocol/server-sequential-thinking 2>/dev/null || true
    
    # Puppeteer MCP
    npm install -g @modelcontextprotocol/server-puppeteer 2>/dev/null || true
    
    echo -e "${GREEN}MCP Servers installed!${NC}"
}

# Setup the AI-CLI project
setup_project() {
    echo -e "${YELLOW}Setting up AI-CLI project...${NC}"
    
    # Get script directory
    SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
    
    cd "$PROJECT_DIR"
    
    # Install dependencies
    bun install
    
    # Setup database
    bun run db:push
    
    echo -e "${GREEN}Project setup complete!${NC}"
}

# Create environment file
create_env_file() {
    echo -e "${YELLOW}Creating environment configuration...${NC}"
    
    cat > ~/.ai-cli-env << 'EOF'
# AI-CLI Environment Configuration
# Add your API keys here

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

# GitHub (for MCP)
GITHUB_PAT_TOKEN=your_github_token

# Brave Search
BRAVE_API_KEY=your_brave_api_key
EOF
    
    echo -e "${GREEN}Environment file created at ~/.ai-cli-env${NC}"
    echo -e "${CYAN}Please edit the file and add your API keys${NC}"
}

# Create desktop entry
create_desktop_entry() {
    echo -e "${YELLOW}Creating desktop entry...${NC}"
    
    cat > ~/.local/share/applications/ai-cli.desktop << 'EOF'
[Desktop Entry]
Name=AI-CLI
Comment=AI-Powered Command Line Interface
Exec=bash -c "cd /path/to/ai-cli && bun run dev"
Icon=terminal
Terminal=true
Type=Application
Categories=Development;Utility;
EOF
    
    echo -e "${GREEN}Desktop entry created!${NC}"
}

# Main installation
main() {
    echo -e "${CYAN}Starting AI-CLI installation for Linux...${NC}"
    echo ""
    
    detect_distro
    echo ""
    
    echo -e "${YELLOW}Select installation options:${NC}"
    echo "1) Full Installation (recommended)"
    echo "2) Core Only (AI-CLI project)"
    echo "3) CLI Tools Only"
    echo "4) Ollama Only"
    echo "5) Custom"
    echo ""
    read -p "Enter choice [1-5]: " choice
    
    case $choice in
        1)
            install_system_deps
            install_bun
            install_ollama
            install_cli_tools
            install_mcp_servers
            setup_project
            create_env_file
            ;;
        2)
            install_system_deps
            install_bun
            setup_project
            ;;
        3)
            install_system_deps
            install_cli_tools
            ;;
        4)
            install_ollama
            ;;
        5)
            echo "Custom installation - select components:"
            read -p "Install system deps? (y/n): " sys_deps
            read -p "Install Bun? (y/n): " bun
            read -p "Install Ollama? (y/n): " ollama
            read -p "Install CLI tools? (y/n): " cli
            read -p "Install MCP servers? (y/n): " mcp
            read -p "Setup project? (y/n): " project
            
            [[ "$sys_deps" == "y" ]] && install_system_deps
            [[ "$bun" == "y" ]] && install_bun
            [[ "$ollama" == "y" ]] && install_ollama
            [[ "$cli" == "y" ]] && install_cli_tools
            [[ "$mcp" == "y" ]] && install_mcp_servers
            [[ "$project" == "y" ]] && setup_project
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   AI-CLI Installation Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${CYAN}To start AI-CLI:${NC}"
    echo -e "  cd /path/to/ai-cli"
    echo -e "  bun run dev"
    echo ""
    echo -e "${CYAN}Then open http://localhost:3000 in your browser${NC}"
    echo ""
    echo -e "${YELLOW}Don't forget to add your API keys to ~/.ai-cli-env${NC}"
}

# Run main
main
