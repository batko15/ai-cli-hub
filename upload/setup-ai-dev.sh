#!/bin/bash

# =====================================================
# AI Development Environment Setup Script
# Vollständiges Setup für AI Coding Tools, MCPs & Agents
# =====================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "${BLUE}=====================================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}=====================================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js installed: $NODE_VERSION"
    else
        print_error "Node.js not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check npm/npx
    if command -v npx &> /dev/null; then
        print_success "npx available"
    else
        print_error "npx not available"
        exit 1
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        print_success "Git installed"
    else
        print_warning "Git not installed - some features may not work"
    fi
    
    # Check Python (for Aider)
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python installed: $PYTHON_VERSION"
    else
        print_warning "Python not installed - Aider will not be available"
    fi
}

# Install MCP Servers
install_mcp_servers() {
    print_header "Installing MCP Servers"
    
    MCP_SERVERS=(
        "@modelcontextprotocol/server-filesystem"
        "@modelcontextprotocol/server-github"
        "@modelcontextprotocol/server-memory"
        "@modelcontextprotocol/server-sequential-thinking"
        "@modelcontextprotocol/server-brave-search"
    )
    
    for server in "${MCP_SERVERS[@]}"; do
        print_info "Installing $server..."
        npm install -g "$server" 2>/dev/null || print_warning "Failed to install $server globally (will use npx)"
    done
    
    print_success "MCP Servers ready (will use npx for execution)"
}

# Install AI Coding Tools
install_ai_tools() {
    print_header "Installing AI Coding Tools"
    
    # Aider
    if command -v pip &> /dev/null; then
        print_info "Installing Aider..."
        pip install aider-chat 2>/dev/null && print_success "Aider installed" || print_warning "Aider installation failed"
    else
        print_warning "pip not available - skipping Aider"
    fi
    
    print_info "For VS Code extensions, install manually:"
    echo "  - Cline: https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev"
    echo "  - Roo Code: https://marketplace.visualstudio.com/items?itemName=RooVeterinaryTeam.roo-cline"
    echo "  - Continue: https://marketplace.visualstudio.com/items?itemName=Continue.continue"
    echo "  - GitHub Copilot: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot"
}

# Create configuration files
create_config_files() {
    print_header "Creating Configuration Files"
    
    # Create directories
    mkdir -p .github/instructions
    mkdir -p .cursor/rules
    mkdir -p .claude/agents
    mkdir -p .claude/commands
    mkdir -p .cline/rules
    mkdir -p .mcp
    
    # AGENTS.md
    if [ ! -f "AGENTS.md" ]; then
        print_info "Creating AGENTS.md..."
        cat > AGENTS.md << 'EOF'
# AGENTS.md - Unified AI Agent Instructions

> Follows the Agent Rules Standard for unified AI coding agent instructions.
> Compatible with: Claude Code, GitHub Copilot, Cline, Roo Code, Aider, Cursor

## Project Overview

[Describe your project here]

## Tech Stack

- Frontend: [technologies]
- Backend: [technologies]
- Database: [database]

## Coding Standards

- [Your coding standards here]
- [Follow language-specific best practices]
- [Write tests for new features]

## Commands

- Dev: `bun run dev`
- Build: `bun run build`
- Test: `bun run test`
- Lint: `bun run lint`

## Project Structure

```
src/
├── app/           # Pages and routes
├── components/    # UI components
├── lib/           # Utilities
└── styles/        # Styling
```
EOF
        print_success "AGENTS.md created"
    else
        print_info "AGENTS.md already exists"
    fi
    
    # CLAUDE.md
    if [ ! -f "CLAUDE.md" ]; then
        print_info "Creating CLAUDE.md..."
        cat > CLAUDE.md << 'EOF'
# Claude Code Configuration

## Project Information

- **Name**: [Project Name]
- **Type**: [Project Type]
- **Description**: [Brief description]

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma

## Development Commands

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run test     # Run tests
bun run lint     # Check code quality
```

## Coding Guidelines

1. Use TypeScript strict mode
2. Follow ESLint rules
3. Write meaningful commit messages
4. Test before pushing

## Architecture

[Describe your architecture here]
EOF
        print_success "CLAUDE.md created"
    else
        print_info "CLAUDE.md already exists"
    fi
    
    # .github/copilot-instructions.md
    if [ ! -f ".github/copilot-instructions.md" ]; then
        print_info "Creating .github/copilot-instructions.md..."
        cat > .github/copilot-instructions.md << 'EOF'
# GitHub Copilot Instructions

## Project Context

This is a [project type] application built with [technologies].

## Coding Conventions

- Use TypeScript for all new files
- Follow the existing code style
- Write self-documenting code with clear variable names
- Add JSDoc comments for public functions

## Best Practices

1. Keep functions small and focused
2. Use meaningful variable and function names
3. Handle errors gracefully
4. Write unit tests for complex logic

## File Organization

- Components go in `src/components/`
- Utilities go in `src/lib/`
- Types go in `src/types/`
- Styles use Tailwind classes
EOF
        print_success ".github/copilot-instructions.md created"
    else
        print_info ".github/copilot-instructions.md already exists"
    fi
    
    # .cursorrules
    if [ ! -f ".cursorrules" ]; then
        print_info "Creating .cursorrules..."
        cat > .cursorrules << 'EOF'
# Cursor AI Rules

## General Guidelines

- Write clean, maintainable code
- Follow existing patterns in the codebase
- Prefer TypeScript over JavaScript
- Use Tailwind CSS for styling

## Code Style

- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages
- Keep files under 300 lines

## Best Practices

- Test before committing
- Review generated code carefully
- Document complex logic
- Follow DRY principles
EOF
        print_success ".cursorrules created"
    else
        print_info ".cursorrules already exists"
    fi
    
    # MCP config
    if [ ! -f ".mcp/mcp-config.json" ]; then
        print_info "Creating MCP configuration..."
        cat > .mcp/mcp-config.json << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
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
    }
  }
}
EOF
        print_success "MCP config created"
    else
        print_info "MCP config already exists"
    fi
    
    print_success "All configuration files created"
}

# Create environment template
create_env_template() {
    print_header "Creating Environment Template"
    
    if [ ! -f ".env.example" ]; then
        cat > .env.example << 'EOF'
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub (for MCP)
GITHUB_TOKEN="ghp_your_token_here"

# Brave Search (optional)
BRAVE_API_KEY="your_brave_api_key"

# Slack (optional)
SLACK_BOT_TOKEN="xoxb-your-token"
SLACK_TEAM_ID="TXXXXXXXX"

# Google Maps (optional)
GOOGLE_MAPS_API_KEY="your_google_maps_key"
EOF
        print_success ".env.example created"
    else
        print_info ".env.example already exists"
    fi
}

# Print summary
print_summary() {
    print_header "Setup Complete!"
    
    echo ""
    echo -e "${GREEN}Your AI development environment is ready!${NC}"
    echo ""
    echo "Configuration files created:"
    echo "  - AGENTS.md (Unified agent instructions)"
    echo "  - CLAUDE.md (Claude Code configuration)"
    echo "  - .github/copilot-instructions.md (GitHub Copilot)"
    echo "  - .cursorrules (Cursor AI)"
    echo "  - .mcp/mcp-config.json (MCP servers)"
    echo ""
    echo "Next steps:"
    echo "  1. Edit AGENTS.md with your project details"
    echo "  2. Set environment variables in .env"
    echo "  3. Install VS Code extensions (Cline, Roo Code, etc.)"
    echo ""
    echo "Useful resources:"
    echo "  - MCP Servers: https://github.com/punkpeye/awesome-mcp-servers"
    echo "  - AI Tools: https://github.com/ai-for-developers/awesome-ai-coding-tools"
    echo "  - Agent Rules: https://github.com/agent-rules/agent-rules"
    echo ""
}

# Main execution
main() {
    print_header "AI Development Environment Setup"
    
    check_prerequisites
    install_mcp_servers
    install_ai_tools
    create_config_files
    create_env_template
    print_summary
}

# Run main
main
