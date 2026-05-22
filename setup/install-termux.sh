#!/bin/bash
# AI-CLI Setup Script for Termux (Android)
# Requires: Termux app from F-Droid or Play Store

echo "========================================"
echo "   AI-CLI Setup Script for Termux"
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

# Check if running in Termux
if [ ! -d "/data/data/com.termux" ]; then
    echo -e "${RED}This script is designed for Termux on Android${NC}"
    echo "Please install Termux from F-Droid or Play Store"
    exit 1
fi

# Update and upgrade packages
update_packages() {
    echo -e "${YELLOW}Updating packages...${NC}"
    pkg update -y
    pkg upgrade -y
    echo -e "${GREEN}Packages updated!${NC}"
}

# Install essential packages
install_essentials() {
    echo -e "${YELLOW}Installing essential packages...${NC}"
    pkg install -y \
        curl \
        wget \
        git \
        nodejs \
        python \
        python-pip \
        build-essential \
        binutils \
        openssl \
        openssh \
        proot \
        proot-distro
    echo -e "${GREEN}Essentials installed!${NC}"
}

# Install Bun
install_bun() {
    echo -e "${YELLOW}Installing Bun...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    
    # Add to bashrc
    echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
    echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
    
    echo -e "${GREEN}Bun installed!${NC}"
}

# Install Ollama (via proot-distro for better performance)
install_ollama_termux() {
    echo -e "${YELLOW}Setting up Ollama for Android...${NC}"
    
    # Note: Ollama on Android requires a Linux distro via proot
    echo -e "${CYAN}Installing Ubuntu proot for Ollama...${NC}"
    proot-distro install ubuntu
    
    echo -e "${CYAN}Setting up Ollama in Ubuntu proot...${NC}"
    proot-distro login ubuntu -- << 'EOF'
        apt update
        apt install -y curl
        curl -fsSL https://ollama.com/install.sh | sh
        ollama pull llama3
        ollama pull mistral
EOF
    
    echo -e "${GREEN}Ollama installed in Ubuntu proot!${NC}"
    echo -e "${CYAN}To use Ollama, run: proot-distro login ubuntu${NC}"
    echo -e "${CYAN}Then: ollama serve (in one session) and ollama run llama3 (in another)${NC}"
}

# Install AI CLI Tools
install_cli_tools_termux() {
    echo -e "${YELLOW}Installing AI CLI Tools for Termux...${NC}"
    
    # Install Python packages
    pip install --upgrade pip
    
    # Mistral CLI
    echo -e "${PURPLE}Installing Mistral CLI...${NC}"
    pip install mistral-cli
    
    # OpenAI CLI
    echo -e "${PURPLE}Installing OpenAI CLI...${NC}"
    pip install openai
    
    # Google Generative AI (Gemini)
    echo -e "${PURPLE}Installing Gemini dependencies...${NC}"
    pip install google-generativeai
    
    # Anthropic SDK (Claude)
    echo -e "${PURPLE}Installing Anthropic SDK...${NC}"
    pip install anthropic
    
    echo -e "${GREEN}CLI Tools installed!${NC}"
}

# Install MCP Servers (limited on Termux)
install_mcp_servers_termux() {
    echo -e "${YELLOW}Installing MCP Servers (Termux-compatible)...${NC}"
    
    # Filesystem MCP
    npm install -g @modelcontextprotocol/server-filesystem 2>/dev/null || true
    
    # Memory MCP
    npm install -g @modelcontextprotocol/server-memory 2>/dev/null || true
    
    echo -e "${GREEN}MCP Servers installed!${NC}"
}

# Setup the AI-CLI project
setup_project_termux() {
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
create_env_file_termux() {
    echo -e "${YELLOW}Creating environment configuration...${NC}"
    
    cat > ~/.ai-cli-env << 'EOF'
# AI-CLI Environment Configuration for Termux
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
EOF
    
    # Source env file in bashrc
    echo 'source ~/.ai-cli-env 2>/dev/null' >> ~/.bashrc
    
    echo -e "${GREEN}Environment file created at ~/.ai-cli-env${NC}"
    echo -e "${CYAN}Please edit the file and add your API keys${NC}"
}

# Create startup script
create_startup_script() {
    echo -e "${YELLOW}Creating startup script...${NC}"
    
    cat > ~/start-ai-cli.sh << 'EOF'
#!/bin/bash
# AI-CLI Startup Script for Termux

cd /path/to/ai-cli
bun run dev
EOF
    
    chmod +x ~/start-ai-cli.sh
    
    echo -e "${GREEN}Startup script created at ~/start-ai-cli.sh${NC}"
}

# Setup storage access
setup_storage() {
    echo -e "${YELLOW}Setting up storage access...${NC}"
    termux-setup-storage
    echo -e "${GREEN}Storage access configured!${NC}"
}

# Create Termux boot script
create_boot_script() {
    echo -e "${YELLOW}Creating Termux boot script...${NC}"
    
    mkdir -p ~/.termux
    cat > ~/.termux/boot/ai-cli.sh << 'EOF'
#!/bin/bash
# Auto-start AI-CLI on boot (requires Termux:Boot app)
cd /path/to/ai-cli
bun run dev &
EOF
    
    chmod +x ~/.termux/boot/ai-cli.sh
    
    echo -e "${GREEN}Boot script created!${NC}"
    echo -e "${CYAN}Note: Requires Termux:Boot app from F-Droid${NC}"
}

# Main installation
main() {
    echo -e "${CYAN}Starting AI-CLI installation for Termux/Android...${NC}"
    echo ""
    
    echo -e "${YELLOW}Select installation options:${NC}"
    echo "1) Full Installation (recommended)"
    echo "2) Core Only (AI-CLI project)"
    echo "3) CLI Tools Only"
    echo "4) Ollama (requires proot)"
    echo "5) Custom"
    echo ""
    read -p "Enter choice [1-5]: " choice
    
    case $choice in
        1)
            setup_storage
            update_packages
            install_essentials
            install_bun
            install_cli_tools_termux
            install_mcp_servers_termux
            setup_project_termux
            create_env_file_termux
            create_startup_script
            ;;
        2)
            update_packages
            install_essentials
            install_bun
            setup_project_termux
            ;;
        3)
            update_packages
            install_essentials
            install_cli_tools_termux
            ;;
        4)
            update_packages
            install_essentials
            install_ollama_termux
            ;;
        5)
            echo "Custom installation - select components:"
            read -p "Setup storage? (y/n): " storage
            read -p "Update packages? (y/n): " update
            read -p "Install essentials? (y/n): " essentials
            read -p "Install Bun? (y/n): " bun
            read -p "Install CLI tools? (y/n): " cli
            read -p "Install MCP servers? (y/n): " mcp
            read -p "Install Ollama? (y/n): " ollama
            read -p "Setup project? (y/n): " project
            
            [[ "$storage" == "y" ]] && setup_storage
            [[ "$update" == "y" ]] && update_packages
            [[ "$essentials" == "y" ]] && install_essentials
            [[ "$bun" == "y" ]] && install_bun
            [[ "$cli" == "y" ]] && install_cli_tools_termux
            [[ "$mcp" == "y" ]] && install_mcp_servers_termux
            [[ "$ollama" == "y" ]] && install_ollama_termux
            [[ "$project" == "y" ]] && setup_project_termux
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
    echo ""
    echo -e "${CYAN}Tips for Termux:${NC}"
    echo -e "  - Use a Bluetooth keyboard for better typing"
    echo -e "  - Long-press screen for additional menu options"
    echo -e "  - Install Hacker's Keyboard from Play Store for better input"
    echo -e "  - Use 'termux-wake-lock' to prevent sleep during long tasks"
}

# Run main
main
