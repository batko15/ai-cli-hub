/**
 * Integrated AI CLI Configurations
 * 
 * This file contains all extracted configurations from multiple repositories:
 * - awesome-vibe-coding
 * - ai-agent-skills
 * - vibe-skill
 * - vibe-coding
 * - anthropics-skills
 * - seshubonam-superagents
 * - awesome-agent-skills
 * - awesome-claude-skills
 * - claude-context
 * - SuperAGI
 * - Agent-MCP
 * - superagent
 * - superagents
 * - superagentx
 * - opencode-configs
 * - pi-superagents
 * - involvex-super-agent-cli
 * - super-agent-cli
 * - skills
 * 
 * Organized by category:
 * 1. Skills configurations
 * 2. Agent configurations
 * 3. Workflow definitions
 * 4. MCP server configs
 * 5. Ollama/local model configs
 * 6. Prompts and templates
 */

// ============================================================================
// SECTION 1: SKILLS CONFIGURATIONS
// ============================================================================

/**
 * Skill metadata interface
 */
export interface SkillConfig {
  name: string;
  version: string;
  description: string;
  tags: string[];
  requires: string[];
  conflicts: string[];
  author: string;
  license: string;
  wordCount: number;
  downloads: number;
  path: string;
}

/**
 * Skill definition with frontmatter
 */
export interface SkillDefinition {
  name: string;
  description: string;
  license?: string;
  content?: string;
}

/**
 * AI Agent Skills Registry (from ai-agent-skills/registry/index.json)
 */
export const AI_AGENT_SKILLS_REGISTRY: {
  version: string;
  updatedAt: string;
  count: number;
  skills: SkillConfig[];
} = {
  version: "1.0",
  updatedAt: "2026-03-27T08:56:40.931Z",
  count: 17,
  skills: [
    {
      name: "brownfield-chat",
      version: "1.0.0",
      description: "Natural-language Q&A across the full codebase. Use for multi-module questions, 'what breaks if', git history, cross-cutting queries, and anything spanning more than one file.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 529,
      downloads: 0,
      path: "skills/brownfield-chat"
    },
    {
      name: "brownfield-drift",
      version: "1.0.0",
      description: "Enforces architecture boundaries defined in PLAN.md. Use when a PR crosses module/service boundaries.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 390,
      downloads: 0,
      path: "skills/brownfield-drift"
    },
    {
      name: "brownfield-fix",
      version: "1.0.0",
      description: "Use before editing any file in a brownfield project. Runs risk check and blast radius before making any change.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 306,
      downloads: 0,
      path: "skills/brownfield-fix"
    },
    {
      name: "brownfield-gaps",
      version: "1.0.0",
      description: "Improves graph coverage for a specific file with dynamic/unannotated patterns.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 367,
      downloads: 0,
      path: "skills/brownfield-gaps"
    },
    {
      name: "brownfield-query",
      version: "1.0.0",
      description: "Deterministic lookups from dep-graph.json. Use for direct structural questions about a specific file or module.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 308,
      downloads: 0,
      path: "skills/brownfield-query"
    },
    {
      name: "deploy-checklist",
      version: "1.0.0",
      description: "Pre-deploy and post-deploy checklist skill. Ensures env vars, migrations, CI, rollback plan, smoke tests.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 474,
      downloads: 0,
      path: "skills/deploy-checklist"
    },
    {
      name: "git-os",
      version: "1.0.0",
      description: "Enforces conventional commits, atomic changes, and GIT-OS workflow for Wednesday Solutions projects.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 723,
      downloads: 0,
      path: "skills/git-os"
    },
    {
      name: "greenfield",
      version: "1.0.0",
      description: "Parallel persona planning for new projects. Research agent runs first, then Architect, PM, and Security agents run in parallel.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 547,
      downloads: 0,
      path: "skills/greenfield"
    },
    {
      name: "pr-create",
      version: "1.0.0",
      description: "Agent-driven PR creation skill. Validates branch, runs pre-push checklist, generates GIT-OS compliant PR title and body.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 938,
      downloads: 0,
      path: "skills/pr-create"
    },
    {
      name: "pr-review",
      version: "1.0.0",
      description: "Fix engine for PR review comments. Fetches review comments, categorizes by impact, posts prioritized fix queue.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 475,
      downloads: 0,
      path: "skills/pr-review"
    },
    {
      name: "sprint",
      version: "1.0.0",
      description: "Sprint initiation skill. Given a ticket title and description, outputs GIT-OS-compliant branch name and PR description template.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 296,
      downloads: 0,
      path: "skills/sprint"
    },
    {
      name: "wednesday-design",
      version: "1.0.0",
      description: "Design and UX guidelines for Wednesday Solutions projects. Covers visual design tokens, animation patterns, component standards.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 2012,
      downloads: 0,
      path: "skills/wednesday-design"
    },
    {
      name: "wednesday-dev",
      version: "1.0.0",
      description: "Technical development guidelines for Wednesday Solutions projects. Enforces import ordering, complexity limits, naming conventions.",
      tags: [],
      requires: [],
      conflicts: [],
      author: "wednesday-solutions",
      license: "MIT",
      wordCount: 2160,
      downloads: 0,
      path: "skills/wednesday-dev"
    }
  ]
};

/**
 * Vibe Skills (from vibe-skill repo)
 */
export const VIBE_SKILLS: SkillDefinition[] = [
  {
    name: "vibe-agent",
    description: "Standalone agentic architecture skill. Designs complete multi-agent AI systems from scratch. Deep knowledge of LangGraph, LangChain, CrewAI, AutoGen, Vercel AI SDK."
  },
  {
    name: "vibe-architect",
    description: "Architecture planning and design skill for vibe coding projects."
  },
  {
    name: "vibe-brainstorm",
    description: "Brainstorming and ideation skill for vibe coding."
  },
  {
    name: "vibe-changelog",
    description: "Changelog generation and maintenance skill."
  },
  {
    name: "vibe-cost",
    description: "Cost analysis and optimization skill for AI operations."
  },
  {
    name: "vibe-deploy",
    description: "Deployment automation and management skill."
  },
  {
    name: "vibe-design",
    description: "Design and UI/UX skill for vibe coding projects."
  },
  {
    name: "vibe-doctor",
    description: "System health check and diagnostics skill."
  },
  {
    name: "vibe-document",
    description: "Documentation generation and management skill."
  },
  {
    name: "vibe-e2e",
    description: "End-to-end testing skill for vibe coding projects."
  },
  {
    name: "vibe-fix-bug",
    description: "Bug fixing and debugging skill."
  },
  {
    name: "vibe-graph",
    description: "Graph visualization and analysis skill."
  },
  {
    name: "vibe-handoff",
    description: "Project handoff and knowledge transfer skill."
  },
  {
    name: "vibe-init",
    description: "Project initialization skill for vibe coding."
  },
  {
    name: "vibe-ledger",
    description: "Change tracking and ledger management skill."
  },
  {
    name: "vibe-mode",
    description: "Mode switching and configuration skill."
  },
  {
    name: "vibe-new-app",
    description: "New application scaffolding skill."
  },
  {
    name: "vibe-parallel",
    description: "Parallel task execution skill."
  },
  {
    name: "vibe-perf",
    description: "Performance optimization skill."
  },
  {
    name: "vibe-progress",
    description: "Progress tracking and reporting skill."
  },
  {
    name: "vibe-review",
    description: "Code review skill for vibe coding projects."
  },
  {
    name: "vibe-spec-review",
    description: "Specification review skill."
  },
  {
    name: "vibe-test",
    description: "Testing skill for vibe coding projects."
  },
  {
    name: "vibe-change-spec",
    description: "Change specification skill."
  },
  {
    name: "vibe-add-feature",
    description: "Feature addition skill."
  },
  {
    name: "vibe-design-md",
    description: "Markdown design skill."
  }
];

/**
 * Claude Skills (from awesome-claude-skills, skills, anthropics-skills repos)
 */
export const CLAUDE_SKILLS: SkillDefinition[] = [
  {
    name: "skill-creator",
    description: "Guide for creating high-quality Claude skills with proper structure and validation."
  },
  {
    name: "mcp-builder",
    description: "Guide for creating high-quality MCP servers that enable LLMs to interact with external services."
  },
  {
    name: "webapp-testing",
    description: "Web application testing skill with browser automation capabilities."
  },
  {
    name: "theme-factory",
    description: "Theme generation and customization skill."
  },
  {
    name: "slack-gif-creator",
    description: "GIF creation for Slack messages."
  },
  {
    name: "docx",
    description: "Document creation and editing skill for .docx files."
  },
  {
    name: "brand-guidelines",
    description: "Brand guidelines and style guide skill."
  },
  {
    name: "canvas-design",
    description: "Canvas-based design and visualization skill."
  },
  {
    name: "doc-coauthoring",
    description: "Document co-authoring and collaboration skill."
  },
  {
    name: "pptx",
    description: "PowerPoint presentation creation and editing skill."
  },
  {
    name: "claude-api",
    description: "Claude API integration and usage skill."
  },
  {
    name: "algorithmic-art",
    description: "Algorithmic art generation skill."
  },
  {
    name: "pdf",
    description: "PDF document manipulation skill."
  },
  {
    name: "internal-comms",
    description: "Internal communications skill."
  },
  {
    name: "xlsx",
    description: "Excel spreadsheet manipulation skill."
  },
  {
    name: "web-artifacts-builder",
    description: "Web artifacts and components builder skill."
  },
  {
    name: "frontend-design",
    description: "Frontend design and development skill."
  },
  {
    name: "changelog-generator",
    description: "Automated changelog generation skill."
  },
  {
    name: "meeting-insights-analyzer",
    description: "Meeting transcription and insights analysis skill."
  },
  {
    name: "invoice-organizer",
    description: "Invoice organization and processing skill."
  },
  {
    name: "image-enhancer",
    description: "Image enhancement and processing skill."
  },
  {
    name: "tailored-resume-generator",
    description: "Tailored resume generation skill."
  },
  {
    name: "connect",
    description: "Connection and integration skill."
  },
  {
    name: "competitive-ads-extractor",
    description: "Competitive ads analysis and extraction skill."
  },
  {
    name: "langsmith-fetch",
    description: "LangSmith integration and data fetching skill."
  },
  {
    name: "lead-research-assistant",
    description: "Lead research and analysis assistant skill."
  },
  {
    name: "file-organizer",
    description: "File organization and management skill."
  },
  {
    name: "artifacts-builder",
    description: "Artifacts and components builder skill."
  },
  {
    name: "video-downloader",
    description: "Video downloading skill."
  },
  {
    name: "developer-growth-analysis",
    description: "Developer growth and metrics analysis skill."
  },
  {
    name: "domain-name-brainstormer",
    description: "Domain name brainstorming skill."
  },
  {
    name: "raffle-winner-picker",
    description: "Raffle winner selection skill."
  },
  {
    name: "content-research-writer",
    description: "Content research and writing skill."
  },
  {
    name: "twitter-algorithm-optimizer",
    description: "Twitter/X algorithm optimization skill."
  },
  {
    name: "connect-apps",
    description: "App connection and integration skill."
  },
  {
    name: "skill-share",
    description: "Skill sharing and distribution skill."
  }
];

// ============================================================================
// SECTION 2: AGENT CONFIGURATIONS
// ============================================================================

/**
 * Agent stage configuration
 */
export interface AgentStage {
  type: "sequential" | "parallel";
  steps: string[];
}

/**
 * Agent configuration from agent.yml files
 */
export interface AgentConfig {
  name: string;
  stages: AgentStage[];
}

/**
 * Extended agent configuration with additional metadata
 */
export interface ExtendedAgentConfig {
  name: string;
  role: string;
  description: string;
  model?: string;
  tools?: string[];
  temperature?: number;
  systemPrompt?: string;
}

/**
 * AI Agent Skills Agent Configurations (from agent.yml files)
 */
export const AI_AGENT_CONFIGS: AgentConfig[] = [
  {
    name: "pr-review-agent",
    stages: [
      { type: "sequential", steps: ["triage-read"] },
      { type: "parallel", steps: ["brownfield-fix", "brownfield-drift"] },
      { type: "sequential", steps: ["triage-fix"] }
    ]
  },
  {
    name: "module-audit-agent",
    stages: [
      { type: "parallel", steps: ["brownfield-query", "brownfield-fix"] },
      { type: "sequential", steps: ["brownfield-tests"] }
    ]
  },
  {
    name: "onboard-dev-agent",
    stages: [
      { type: "sequential", steps: ["brownfield-gaps", "brownfield-chat"] }
    ]
  }
];

/**
 * Super Agent CLI Agent Configuration Template
 */
export const SUPER_AGENT_CONFIG_TEMPLATE: ExtendedAgentConfig = {
  name: "agent-name",
  role: "Agent role description",
  description: "Detailed description of what this agent does",
  model: "model-name",
  tools: ["tool1", "tool2"],
  temperature: 0.7,
  systemPrompt: "You are a helpful AI assistant..."
};

/**
 * Vibe Agent Architecture Patterns
 */
export const AGENT_PATTERNS = {
  sequentialPipeline: {
    name: "Sequential Pipeline",
    description: "Linear, deterministic steps, no branching",
    useCase: "Simple workflows with predictable execution order"
  },
  singleAgentWithTools: {
    name: "Single Agent + Tools",
    description: "One complex task, needs tools, variable path",
    useCase: "Complex single-purpose tasks requiring tool use"
  },
  parallelSpecialists: {
    name: "Parallel Specialists",
    description: "Multiple independent task types in parallel",
    useCase: "Tasks that can be processed simultaneously"
  },
  orchestratorWithSubagents: {
    name: "Orchestrator + Sub-agents",
    description: "Complex coordination, planning, delegation",
    useCase: "Multi-step workflows requiring coordination"
  }
};

/**
 * Agent Framework Recommendations
 */
export const AGENT_FRAMEWORKS = {
  langGraph: {
    name: "LangGraph",
    useCase: "Cyclic workflows, complex state, self-correction loops",
    setup: "pip install langgraph langchain-anthropic"
  },
  langChain: {
    name: "LangChain",
    useCase: "Linear chains, simple tool use, fast to prototype",
    setup: "pip install langchain langchain-anthropic"
  },
  crewAI: {
    name: "CrewAI",
    useCase: "Role-based teams, natural language task delegation",
    setup: "pip install crewai crewai-tools"
  },
  autoGen: {
    name: "AutoGen",
    useCase: "Conversational back-and-forth between agents",
    setup: "pip install pyautogen"
  },
  vercelAISDK: {
    name: "Vercel AI SDK",
    useCase: "TypeScript stack, Next.js, Vercel deployment",
    setup: "npm install ai @ai-sdk/anthropic"
  },
  custom: {
    name: "Custom Implementation",
    useCase: "Maximum control, no framework overhead, custom needs",
    setup: "No dependencies required"
  }
};

// ============================================================================
// SECTION 3: WORKFLOW DEFINITIONS
// ============================================================================

/**
 * Workflow step definition
 */
export interface WorkflowStep {
  name: string;
  type: "read" | "write" | "compute" | "mcp" | "handoff";
  purpose: string;
  riskLevel: "low" | "medium" | "high";
}

/**
 * Workflow configuration
 */
export interface WorkflowConfig {
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggers: string[];
  outputs: string[];
}

/**
 * PR Review Workflow
 */
export const PR_REVIEW_WORKFLOW: WorkflowConfig = {
  name: "pr-review-workflow",
  description: "Full PR review orchestrator that runs blast radius + drift check on changed files",
  steps: [
    { name: "fetch-comments", type: "read", purpose: "Fetch PR review comments", riskLevel: "low" },
    { name: "blast-radius", type: "compute", purpose: "Calculate change impact", riskLevel: "low" },
    { name: "drift-check", type: "compute", purpose: "Check architecture boundaries", riskLevel: "low" },
    { name: "categorize", type: "compute", purpose: "Categorize comments by impact", riskLevel: "low" },
    { name: "apply-fixes", type: "write", purpose: "Apply approved fixes", riskLevel: "medium" }
  ],
  triggers: ["pr:opened", "pr:synchronize", "pr:review_requested"],
  outputs: ["review-summary", "fix-queue", "architecture-report"]
};

/**
 * Deploy Checklist Workflow
 */
export const DEPLOY_WORKFLOW: WorkflowConfig = {
  name: "deploy-checklist-workflow",
  description: "Pre-deploy and post-deploy checklist verification",
  steps: [
    { name: "check-env-vars", type: "read", purpose: "Verify environment variables", riskLevel: "low" },
    { name: "check-migrations", type: "read", purpose: "Verify database migrations ready", riskLevel: "low" },
    { name: "check-ci", type: "read", purpose: "Verify CI pipeline status", riskLevel: "low" },
    { name: "check-rollback", type: "read", purpose: "Verify rollback plan exists", riskLevel: "low" },
    { name: "check-monitoring", type: "read", purpose: "Verify monitoring dashboards", riskLevel: "low" },
    { name: "run-smoke-tests", type: "compute", purpose: "Execute smoke tests", riskLevel: "medium" }
  ],
  triggers: ["deploy:pre", "deploy:post"],
  outputs: ["checklist-report", "warnings", "blockers"]
};

/**
 * Sprint Initiation Workflow
 */
export const SPRINT_WORKFLOW: WorkflowConfig = {
  name: "sprint-initiation-workflow",
  description: "Sprint initiation workflow that generates branch names and PR templates",
  steps: [
    { name: "parse-ticket", type: "read", purpose: "Parse ticket title and description", riskLevel: "low" },
    { name: "generate-branch-name", type: "compute", purpose: "Generate GIT-OS compliant branch name", riskLevel: "low" },
    { name: "generate-pr-title", type: "compute", purpose: "Generate PR title", riskLevel: "low" },
    { name: "generate-pr-description", type: "compute", purpose: "Generate PR description template", riskLevel: "low" }
  ],
  triggers: ["sprint:start", "ticket:assigned"],
  outputs: ["branch-name", "pr-title", "pr-description-template"]
};

/**
 * Git Hooks Workflows (from ai-agent-skills/assets/hooks/)
 */
export const GIT_HOOK_WORKFLOWS = {
  postMerge: {
    name: "post-merge",
    description: "Runs after a successful git merge"
  },
  postCommit: {
    name: "post-commit",
    description: "Runs after a successful git commit"
  }
};

// ============================================================================
// SECTION 4: MCP SERVER CONFIGURATIONS
// ============================================================================

/**
 * MCP Server configuration
 */
export interface MCPServerConfig {
  name: string;
  command?: string[];
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  type: "local" | "remote";
  enabled?: boolean;
  headers?: Record<string, string>;
}

/**
 * MCP Configuration structure
 */
export interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

/**
 * Agent-MCP Configuration (from Agent-MCP/mcp.json)
 */
export const AGENT_MCP_CONFIG: MCPConfig = {
  mcpServers: {
    "Agent-MCP": {
      name: "Agent-MCP",
      url: "http://localhost:8080/sse",
      type: "remote"
    }
  }
};

/**
 * OpenCode MCP Configuration (from opencode-configs/opencode.json)
 */
export const OPENCODE_MCP_CONFIG: MCPConfig = {
  mcpServers: {
    vision: {
      name: "vision",
      command: ["npx", "-y", "@z_ai/mcp-server"],
      enabled: true,
      type: "local",
      env: {
        Z_AI_API_KEY: "{env:Z_AI_API_KEY}",
        Z_AI_MODE: "ZAI"
      }
    },
    github: {
      name: "github",
      enabled: true,
      type: "remote",
      url: "https://api.githubcopilot.com/mcp",
      headers: {
        Authorization: "Bearer {env:GITHUB_PAT_TOKEN}"
      }
    },
    atlassian: {
      name: "atlassian",
      command: ["uvx", "mcp-atlassian"],
      enabled: false,
      type: "local",
      env: {
        CONFLUENCE_API_TOKEN: "{env:CONFLUENCE_API_TOKEN}",
        CONFLUENCE_URL: "{env:CONFLUENCE_URL}",
        CONFLUENCE_USERNAME: "{env:JIRA_USERNAME}",
        JIRA_API_TOKEN: "{env:JIRA_API_TOKEN}",
        JIRA_URL: "{env:JIRA_URL}",
        JIRA_USERNAME: "{env:JIRA_USERNAME}"
      }
    },
    figma: {
      name: "figma",
      enabled: false,
      type: "remote",
      url: "http://127.0.0.1:3845/mcp"
    }
  }
};

/**
 * MCP Server Naming Conventions
 */
export const MCP_NAMING_CONVENTIONS = {
  python: "{service}_mcp",
  typescript: "{service}-mcp-server",
  toolNaming: "{service}_{action}_{resource}",
  examples: {
    python: ["slack_mcp", "github_mcp", "jira_mcp"],
    typescript: ["slack-mcp-server", "github-mcp-server", "jira-mcp-server"],
    tools: ["slack_send_message", "github_create_issue", "jira_search_issues"]
  }
};

/**
 * MCP Transport Options
 */
export const MCP_TRANSPORT_OPTIONS = {
  streamableHTTP: {
    name: "Streamable HTTP",
    bestFor: "Remote servers, web services, multi-client scenarios",
    characteristics: ["Bidirectional communication over HTTP", "Multiple simultaneous clients", "Server-to-client notifications"]
  },
  stdio: {
    name: "stdio",
    bestFor: "Local integrations, command-line tools",
    characteristics: ["Standard input/output stream communication", "Simple setup, no network configuration needed", "Runs as subprocess of the client"]
  }
};

/**
 * MCP Tool Annotations
 */
export const MCP_TOOL_ANNOTATIONS = {
  readOnlyHint: {
    type: "boolean",
    default: false,
    description: "Tool does not modify its environment"
  },
  destructiveHint: {
    type: "boolean",
    default: true,
    description: "Tool may perform destructive updates"
  },
  idempotentHint: {
    type: "boolean",
    default: false,
    description: "Repeated calls with same args have no additional effect"
  },
  openWorldHint: {
    type: "boolean",
    default: true,
    description: "Tool interacts with external entities"
  }
};

// ============================================================================
// SECTION 5: OLLAMA/LOCAL MODEL CONFIGURATIONS
// ============================================================================

/**
 * Ollama provider configuration
 */
export interface OllamaConfig {
  apiKey: string;
  baseURL: string;
  model: string;
  defaultModel?: string;
}

/**
 * Ollama embedding configuration
 */
export interface OllamaEmbeddingConfig {
  model: string;
  host?: string;
  dimension?: number;
  maxTokens?: number;
  keepAlive?: string | number;
  options?: Record<string, unknown>;
}

/**
 * Default Ollama Configuration
 */
export const DEFAULT_OLLAMA_CONFIG: OllamaConfig = {
  apiKey: "ollama",
  baseURL: "http://localhost:11434/v1",
  model: "llama3",
  defaultModel: "llama3"
};

/**
 * Ollama Embedding Models Configuration
 */
export const OLLAMA_EMBEDDING_MODELS = {
  "nomic-embed-text": {
    dimension: 768,
    maxTokens: 8192,
    description: "Nomic embedding model supporting 8192 tokens"
  },
  "snowflake-arctic-embed": {
    dimension: 768,
    maxTokens: 8192,
    description: "Snowflake Arctic embedding model supporting 8192 tokens"
  },
  "mxbai-embed-large": {
    dimension: 1024,
    maxTokens: 512,
    description: "MixedBread large embedding model"
  }
};

/**
 * Local LLM Provider Types
 */
export const LOCAL_LLM_PROVIDERS = {
  ollama: {
    name: "Ollama",
    baseURL: "http://localhost:11434/v1",
    defaultModel: "llama3",
    description: "Local LLM inference with Ollama"
  },
  lmstudio: {
    name: "LM Studio",
    baseURL: "http://localhost:1234/v1",
    defaultModel: "local-model",
    description: "Local LLM inference with LM Studio"
  },
  localai: {
    name: "LocalAI",
    baseURL: "http://localhost:8080/v1",
    defaultModel: "local-model",
    description: "LocalAI self-hosted OpenAI-compatible API"
  },
  vllm: {
    name: "vLLM",
    baseURL: "http://localhost:8000/v1",
    defaultModel: "local-model",
    description: "High-performance LLM serving with vLLM"
  }
};

// ============================================================================
// SECTION 6: PROMPTS AND TEMPLATES
// ============================================================================

/**
 * System prompt template
 */
export interface SystemPromptTemplate {
  name: string;
  description: string;
  template: string;
  variables: string[];
}

/**
 * Agent prompt configuration
 */
export interface AgentPromptConfig {
  goals: string;
  instructions: string;
  constraints: string;
  tools: string;
}

/**
 * SuperAGI System Prompt (from superagi/agent/prompts/superagi.txt)
 */
export const SUPERAGI_SYSTEM_PROMPT: string = `You are SuperAGI an AI assistant to solve complex problems. Your decisions must always be made independently without seeking user assistance.
Play to your strengths as an LLM and pursue simple strategies with no legal complications.
If you have completed all your tasks or reached end state, make sure to use the "finish" tool.

GOALS:
{goals}

{instructions}

CONSTRAINTS:
{constraints}

TOOLS:
{tools}

PERFORMANCE EVALUATION:
1. Continuously review and analyze your actions to ensure you are performing to the best of your abilities.
2. Use instruction to decide the flow of execution and decide the next steps for achieving the task.
3. Constructively self-criticize your big-picture behavior constantly.
4. Reflect on past decisions and strategies to refine your approach.
5. Every tool has a cost, so be smart and efficient.`;

/**
 * Super Agent CLI System Prompt
 */
export const SUPER_AGENT_CLI_PROMPT: string = `You are Super Agent CLI, an AI assistant that helps with file editing, coding tasks, and system operations.

You have access to these tools:
- view_file: View file contents or directory listings
- create_file: Create new files with content (ONLY use this for files that don't exist yet)
- str_replace_editor: Replace text in existing files (ALWAYS use this to edit or update existing files)
- bash: Execute bash commands (use for searching, file discovery, navigation, and system operations)
- search: Unified search tool for finding text content or files
- create_todo_list: Create a visual todo list for planning and tracking tasks
- update_todo_list: Update existing todos in your todo list

IMPORTANT TOOL USAGE RULES:
- NEVER use create_file on files that already exist - this will overwrite them completely
- ALWAYS use str_replace_editor to modify existing files, even for small changes
- Before editing a file, use view_file to see its current contents
- Use create_file ONLY when creating entirely new files that don't exist

TASK PLANNING WITH TODO LISTS:
- For complex requests with multiple steps, ALWAYS create a todo list first to plan your approach
- Use create_todo_list to break down tasks into manageable items with priorities
- Mark tasks as 'in_progress' when you start working on them (only one at a time)
- Mark tasks as 'completed' immediately when finished`;

/**
 * Default Prompt (from superagents/libs/superagent/prompts/default.py)
 */
export const DEFAULT_PROMPT: string = "You are a helpful AI Assistant, answer the users questions to the best of your ability.";

/**
 * AGENTS.md Prompt Guidelines (from opencode-configs/AGENTS.md)
 */
export const AGENTS_MD_GUIDELINES: string = `# Agent Guidelines: Maximum Truth-Seeking & High-Performance Execution

## Core Philosophy: Maximum Truth Seeking

- **Relentless pursuit:** Continuously seek the optimal solution; never stop improving or fixing flaws.
- **Absolute honesty:** Disclose problems, limitations, or uncertainties immediately.
- **Emotion-free reasoning:** Remove emotional bias from all thinking.
- **Precision commitment:** Verify every claim. Execute with maximum accuracy.

### Inquiry & Thinking Protocol

- **Ask on doubt:** Any uncertainty → pause and ask clarifying questions before proceeding.
- **Never fake confidence:** Acknowledge uncertainty clearly. Do not pretend.
- **Surface assumptions:** Explicitly state assumptions and tradeoffs before acting.
- **Seek classification:** If input, context, or goal is ambiguous, ask for clarification.
- **Simplicity bias:** Before any complex solution, check if a simpler one suffices.

### Less is More, Talk is Cheap

- Use short, brutal, direct words. No fancy sentences, no fluff.
- Ruthlessly cut every unnecessary word. Maximize signal.
- Clarity over elegance. Prefer blunt ugly truth to smooth nonsense.
- Action bias: Talk less. Ship more.

## Coding & Execution Rules

- Define success criteria clearly before writing code.
- No speculative features. No unrequested abstractions.
- Surgical changes only: Touch minimal code necessary.
- Match existing style. Don't "improve" unrelated parts.
- Remove only what *your* changes made unused.
- Every changed line must trace directly to the request.`;

/**
 * Skill Template (from skills/template/SKILL.md)
 */
export const SKILL_TEMPLATE: string = `---
name: template-skill
description: Replace with description of the skill and when Claude should use it.
---

# Insert instructions below`;

/**
 * MCP Builder Skill Prompt
 */
export const MCP_BUILDER_PROMPT: string = `# MCP Server Development Guide

## Overview

To create high-quality MCP (Model Context Protocol) servers that enable LLMs to effectively interact with external services.

## High-Level Workflow

### Phase 1: Deep Research and Planning
1. Understand Agent-Centric Design Principles
2. Study MCP Protocol Documentation
3. Study Framework Documentation
4. Exhaustively Study API Documentation
5. Create a Comprehensive Implementation Plan

### Phase 2: Implementation
1. Set Up Project Structure
2. Implement Core Infrastructure First
3. Implement Tools Systematically
4. Follow Language-Specific Best Practices

### Phase 3: Review and Refine
1. Code Quality Review
2. Test and Build
3. Use Quality Checklist

### Phase 4: Create Evaluations
1. Understand Evaluation Purpose
2. Create 10 Evaluation Questions
3. Evaluation Requirements
4. Output Format`;

// ============================================================================
// SECTION 7: SETTINGS CONFIGURATION
// ============================================================================

/**
 * Provider configuration
 */
export interface ProviderConfig {
  id: string;
  provider: string;
  model?: string;
  api_key?: string;
  base_url?: string;
  default_model?: string;
}

/**
 * UI configuration
 */
export interface UIConfig {
  theme: "dark" | "light";
  custom_theme_path?: string;
  show_memory_usage: boolean;
  show_token_usage: boolean;
  show_context: boolean;
  showModelInfoInChat: boolean;
}

/**
 * Hook configuration
 */
export interface HookConfig {
  type: "command" | "script" | "context";
  command?: string;
}

/**
 * Mode configuration
 */
export interface ModeConfig {
  name: string;
  description: string;
  enabled: boolean;
  prompt: string;
}

/**
 * Settings schema (from super-agent-cli/src/schemes/settings_scheme.json)
 */
export interface SettingsSchema {
  active_provider: string;
  providers: Record<string, ProviderConfig>;
  ui: UIConfig;
  mcpServers?: Record<string, MCPServerConfig>;
  plugins?: {
    allowed_plugins: string[];
    plugins: Array<{ name: string }>;
  };
  tools?: {
    allowed_tools: string[];
    tools: Array<{ name: string; enabled: boolean }>;
  };
  hooks?: {
    session_start?: HookConfig;
    session_end?: HookConfig;
    before_tool_use?: HookConfig;
    after_tool_use?: HookConfig;
    before_plugin_use?: HookConfig;
    after_plugin_use?: HookConfig;
    before_response?: HookConfig;
    after_response?: HookConfig;
    before_command_execution?: HookConfig;
    after_command_execution?: HookConfig;
    before_user_input?: HookConfig;
    after_user_input?: HookConfig;
  };
  auto_edit?: {
    enabled: boolean;
    default_state: "enabled" | "disabled";
  };
  modes?: {
    active_mode: string;
    default_mode: string;
    modes: ModeConfig[];
  };
  env?: Record<string, string>;
  context?: {
    fileName: string[];
  };
  experimental?: {
    checkpointing?: {
      enabled: boolean;
      auto_save: boolean;
      auto_load: boolean;
    };
  };
}

/**
 * Default Settings Configuration
 */
export const DEFAULT_SETTINGS: SettingsSchema = {
  active_provider: "openai",
  providers: {
    openai: {
      id: "openai",
      provider: "openai",
      model: "gpt-4",
      default_model: "gpt-4"
    },
    anthropic: {
      id: "anthropic",
      provider: "anthropic",
      model: "claude-3-sonnet",
      default_model: "claude-3-sonnet"
    },
    gemini: {
      id: "gemini",
      provider: "gemini",
      model: "gemini-pro",
      default_model: "gemini-pro"
    },
    ollama: {
      id: "ollama",
      provider: "ollama",
      model: "llama3",
      base_url: "http://localhost:11434/v1",
      default_model: "llama3"
    }
  },
  ui: {
    theme: "dark",
    show_memory_usage: true,
    show_token_usage: true,
    show_context: true,
    showModelInfoInChat: true
  },
  auto_edit: {
    enabled: true,
    default_state: "enabled"
  },
  modes: {
    active_mode: "plan",
    default_mode: "plan",
    modes: [
      { name: "plan", description: "Plan mode", enabled: true, prompt: "You are a helpful assistant." },
      { name: "code", description: "Code mode", enabled: true, prompt: "You are a helpful coding assistant." },
      { name: "debug", description: "Debug mode", enabled: true, prompt: "You are a helpful debugging assistant." }
    ]
  },
  context: {
    fileName: ["Readme.md", "Agents.md", ".super-agent/Agents.md"]
  },
  experimental: {
    checkpointing: {
      enabled: true,
      auto_save: true,
      auto_load: true
    }
  }
};

// ============================================================================
// SECTION 8: OPENCODE CONFIGURATION
// ============================================================================

/**
 * OpenCode configuration (from opencode-configs/opencode.json)
 */
export interface OpenCodeConfig {
  $schema?: string;
  model: string;
  small_model?: string;
  permission?: {
    skill?: Record<string, "allow" | "deny">;
    todoread?: "allow" | "deny";
    todowrite?: "allow" | "deny";
  };
  compaction?: {
    auto?: boolean;
    prune?: boolean;
  };
  watcher?: {
    ignore: string[];
  };
  plugin?: string[];
  enabled_providers?: string[];
  provider?: Record<string, {
    options?: Record<string, unknown>;
    blacklist?: string[];
  }>;
  mcp?: Record<string, MCPServerConfig>;
}

/**
 * Default OpenCode Configuration
 */
export const DEFAULT_OPENCODE_CONFIG: OpenCodeConfig = {
  model: "openai/gpt-4",
  small_model: "openai/gpt-3.5-turbo",
  permission: {
    skill: { "*": "allow" },
    todoread: "allow",
    todowrite: "allow"
  },
  compaction: {
    auto: true,
    prune: true
  },
  watcher: {
    ignore: [
      "node_modules/**",
      "dist/**",
      ".git/**",
      "*.lock",
      "**/*.log",
      ".cache/**",
      "build/**",
      "__pycache__/**",
      ".venv/**",
      "venv/**"
    ]
  },
  plugin: [],
  enabled_providers: ["openai", "anthropic", "google"],
  provider: {},
  mcp: {}
};

// ============================================================================
// SECTION 9: UTILITY EXPORTS
// ============================================================================

/**
 * Get all skills from all sources
 */
export function getAllSkills(): SkillDefinition[] {
  return [
    ...AI_AGENT_SKILLS_REGISTRY.skills.map(s => ({
      name: s.name,
      description: s.description
    })),
    ...VIBE_SKILLS,
    ...CLAUDE_SKILLS
  ];
}

/**
 * Get all agent configurations
 */
export function getAllAgentConfigs(): AgentConfig[] {
  return AI_AGENT_CONFIGS;
}

/**
 * Get all workflow configurations
 */
export function getAllWorkflows(): WorkflowConfig[] {
  return [PR_REVIEW_WORKFLOW, DEPLOY_WORKFLOW, SPRINT_WORKFLOW];
}

/**
 * Get all MCP configurations
 */
export function getAllMCPConfigs(): MCPConfig[] {
  return [AGENT_MCP_CONFIG, OPENCODE_MCP_CONFIG];
}

/**
 * Get provider configuration by name
 */
export function getProviderConfig(name: string): ProviderConfig | undefined {
  return DEFAULT_SETTINGS.providers[name];
}

/**
 * Check if a provider is a local LLM
 */
export function isLocalLLM(provider: string): boolean {
  return Object.keys(LOCAL_LLM_PROVIDERS).includes(provider);
}

/**
 * Get Ollama configuration
 */
export function getOllamaConfig(model?: string): OllamaConfig {
  return {
    ...DEFAULT_OLLAMA_CONFIG,
    model: model || DEFAULT_OLLAMA_CONFIG.model
  };
}

/**
 * Export all configurations as a single object
 */
export const INTEGRATED_CONFIGS = {
  skills: {
    aiAgentSkills: AI_AGENT_SKILLS_REGISTRY,
    vibeSkills: VIBE_SKILLS,
    claudeSkills: CLAUDE_SKILLS
  },
  agents: {
    configs: AI_AGENT_CONFIGS,
    patterns: AGENT_PATTERNS,
    frameworks: AGENT_FRAMEWORKS
  },
  workflows: {
    prReview: PR_REVIEW_WORKFLOW,
    deploy: DEPLOY_WORKFLOW,
    sprint: SPRINT_WORKFLOW,
    gitHooks: GIT_HOOK_WORKFLOWS
  },
  mcp: {
    agentMcp: AGENT_MCP_CONFIG,
    opencodeMcp: OPENCODE_MCP_CONFIG,
    namingConventions: MCP_NAMING_CONVENTIONS,
    transportOptions: MCP_TRANSPORT_OPTIONS,
    toolAnnotations: MCP_TOOL_ANNOTATIONS
  },
  ollama: {
    defaultConfig: DEFAULT_OLLAMA_CONFIG,
    embeddingModels: OLLAMA_EMBEDDING_MODELS,
    localProviders: LOCAL_LLM_PROVIDERS
  },
  prompts: {
    superagi: SUPERAGI_SYSTEM_PROMPT,
    superAgentCli: SUPER_AGENT_CLI_PROMPT,
    default: DEFAULT_PROMPT,
    agentsMd: AGENTS_MD_GUIDELINES,
    skillTemplate: SKILL_TEMPLATE,
    mcpBuilder: MCP_BUILDER_PROMPT
  },
  settings: {
    default: DEFAULT_SETTINGS
  },
  opencode: {
    default: DEFAULT_OPENCODE_CONFIG
  }
};

export default INTEGRATED_CONFIGS;
