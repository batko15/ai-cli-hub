// AI CLI Provider Configurations
// Supports Mistral CLI, Vibe CLI, Gemini CLI, Codex CLI, and more

export interface CLIProvider {
  id: string;
  name: string;
  type: 'cli' | 'api' | 'local';
  description: string;
  installCommand: string;
  runCommand: string;
  defaultModel: string;
  models: CLIModel[];
  enabled: boolean;
  platform: ('windows' | 'linux' | 'macos' | 'termux')[];
  website?: string;
  repo?: string;
}

export interface CLIModel {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  capabilities: string[];
}

// Pre-configured CLI Providers
export const CLI_PROVIDERS: CLIProvider[] = [
  // ============ MISTRAL CLI ============
  {
    id: 'mistral-cli',
    name: 'Mistral CLI',
    type: 'cli',
    description: 'Official Mistral AI command-line interface. Codestral for code, Mistral Large for general tasks.',
    installCommand: 'pip install mistral-cli',
    runCommand: 'mistral chat',
    defaultModel: 'mistral-large-latest',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://mistral.ai',
    repo: 'https://github.com/mistralai/mistral-cli',
    models: [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        description: 'Most powerful model for complex tasks',
        contextWindow: 128000,
        capabilities: ['chat', 'reasoning', 'code'],
      },
      {
        id: 'codestral-latest',
        name: 'Codestral',
        description: 'Specialized for code generation and completion',
        contextWindow: 32000,
        capabilities: ['code', 'completion', 'chat'],
      },
      {
        id: 'mistral-medium-latest',
        name: 'Mistral Medium',
        description: 'Balanced performance and speed',
        contextWindow: 32000,
        capabilities: ['chat', 'reasoning'],
      },
      {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        description: 'Fast and efficient for simple tasks',
        contextWindow: 32000,
        capabilities: ['chat'],
      },
      {
        id: 'open-mistral-nemo',
        name: 'Mistral NeMo',
        description: 'Open model collaboration with NVIDIA',
        contextWindow: 128000,
        capabilities: ['chat', 'reasoning'],
      },
    ],
  },

  // ============ VIBE CLI ============
  {
    id: 'vibe-cli',
    name: 'Vibe CLI',
    type: 'cli',
    description: 'Vibe coding CLI for AI-assisted development with context-aware assistance.',
    installCommand: 'npm install -g vibe-cli',
    runCommand: 'vibe',
    defaultModel: 'auto',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://github.com/filipecalegario/awesome-vibe-coding',
    repo: 'https://github.com/filipecalegario/awesome-vibe-coding',
    models: [
      {
        id: 'auto',
        name: 'Auto Selection',
        description: 'Automatically selects best model for task',
        contextWindow: 128000,
        capabilities: ['chat', 'code', 'design', 'deploy'],
      },
      {
        id: 'vibe-architect',
        name: 'Vibe Architect',
        description: 'Architecture planning and design',
        contextWindow: 32000,
        capabilities: ['architecture', 'planning', 'design'],
      },
      {
        id: 'vibe-coder',
        name: 'Vibe Coder',
        description: 'Code generation and refactoring',
        contextWindow: 32000,
        capabilities: ['code', 'refactor', 'debug'],
      },
      {
        id: 'vibe-reviewer',
        name: 'Vibe Reviewer',
        description: 'Code review and quality checks',
        contextWindow: 32000,
        capabilities: ['review', 'quality', 'security'],
      },
    ],
  },

  // ============ GEMINI CLI ============
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    type: 'cli',
    description: 'Google Gemini command-line interface for AI assistance.',
    installCommand: 'npm install -g @anthropic-ai/gemini-cli',
    runCommand: 'gemini',
    defaultModel: 'gemini-2.0-flash',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://ai.google.dev',
    models: [
      {
        id: 'gemini-2.0-flash',
        name: 'Gemini 2.0 Flash',
        description: 'Fast multimodal model with tool use',
        contextWindow: 1000000,
        capabilities: ['chat', 'vision', 'code', 'tools'],
      },
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        description: 'Advanced reasoning and long context',
        contextWindow: 2000000,
        capabilities: ['chat', 'vision', 'code', 'reasoning'],
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        description: 'Fast and efficient',
        contextWindow: 1000000,
        capabilities: ['chat', 'vision', 'code'],
      },
    ],
  },

  // ============ CODEX CLI ============
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    type: 'cli',
    description: 'OpenAI Codex command-line interface for code generation.',
    installCommand: 'pip install openai',
    runCommand: 'codex',
    defaultModel: 'gpt-4o',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://openai.com',
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'Most capable model for code',
        contextWindow: 128000,
        capabilities: ['chat', 'code', 'vision', 'tools'],
      },
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        description: 'Fast and capable',
        contextWindow: 128000,
        capabilities: ['chat', 'code', 'vision'],
      },
      {
        id: 'o1-preview',
        name: 'o1 Preview',
        description: 'Advanced reasoning model',
        contextWindow: 200000,
        capabilities: ['reasoning', 'code', 'math'],
      },
      {
        id: 'o1-mini',
        name: 'o1 Mini',
        description: 'Fast reasoning model',
        contextWindow: 128000,
        capabilities: ['reasoning', 'code', 'math'],
      },
    ],
  },

  // ============ CLAUDE CLI ============
  {
    id: 'claude-cli',
    name: 'Claude CLI',
    type: 'cli',
    description: 'Anthropic Claude command-line interface.',
    installCommand: 'npm install -g @anthropic-ai/claude-cli',
    runCommand: 'claude',
    defaultModel: 'claude-sonnet-4-20250514',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://anthropic.com',
    models: [
      {
        id: 'claude-sonnet-4-20250514',
        name: 'Claude Sonnet 4',
        description: 'Latest Claude model with hybrid reasoning',
        contextWindow: 200000,
        capabilities: ['chat', 'code', 'vision', 'tools', 'reasoning'],
      },
      {
        id: 'claude-opus-4-20250514',
        name: 'Claude Opus 4',
        description: 'Most intelligent Claude model',
        contextWindow: 200000,
        capabilities: ['chat', 'code', 'vision', 'tools', 'reasoning'],
      },
      {
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        description: 'Fast and intelligent',
        contextWindow: 200000,
        capabilities: ['chat', 'code', 'vision', 'tools'],
      },
    ],
  },

  // ============ OPENCODE CLI ============
  {
    id: 'opencode-cli',
    name: 'OpenCode CLI',
    type: 'cli',
    description: 'Open-source coding assistant CLI with multiple model support.',
    installCommand: 'npm install -g opencode-cli',
    runCommand: 'opencode',
    defaultModel: 'auto',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    repo: 'https://github.com/5kahoisaac/opencode-configs',
    models: [
      {
        id: 'auto',
        name: 'Auto',
        description: 'Automatic model selection',
        contextWindow: 128000,
        capabilities: ['chat', 'code', 'tools'],
      },
    ],
  },

  // ============ QWEN CLI ============
  {
    id: 'qwen-cli',
    name: 'Qwen CLI',
    type: 'cli',
    description: 'Alibaba Qwen command-line interface.',
    installCommand: 'pip install dashscope',
    runCommand: 'qwen',
    defaultModel: 'qwen-max',
    enabled: false,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://tongyi.aliyun.com',
    models: [
      {
        id: 'qwen-max',
        name: 'Qwen Max',
        description: 'Most capable Qwen model',
        contextWindow: 32000,
        capabilities: ['chat', 'code', 'reasoning'],
      },
      {
        id: 'qwen-2.5-coder',
        name: 'Qwen 2.5 Coder',
        description: 'Specialized for coding',
        contextWindow: 128000,
        capabilities: ['code', 'completion'],
      },
    ],
  },

  // ============ DEEPSEEK CLI ============
  {
    id: 'deepseek-cli',
    name: 'DeepSeek CLI',
    type: 'cli',
    description: 'DeepSeek AI command-line interface for coding and reasoning.',
    installCommand: 'pip install openai',
    runCommand: 'deepseek',
    defaultModel: 'deepseek-coder',
    enabled: true,
    platform: ['windows', 'linux', 'macos', 'termux'],
    website: 'https://deepseek.com',
    models: [
      {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        description: 'Specialized coding model',
        contextWindow: 128000,
        capabilities: ['code', 'completion', 'reasoning'],
      },
      {
        id: 'deepseek-reasoner',
        name: 'DeepSeek Reasoner',
        description: 'Advanced reasoning model',
        contextWindow: 128000,
        capabilities: ['reasoning', 'math', 'code'],
      },
    ],
  },
];

// Get CLI providers by platform
export function getCLIProvidersByPlatform(platform: 'windows' | 'linux' | 'macos' | 'termux'): CLIProvider[] {
  return CLI_PROVIDERS.filter(p => p.platform.includes(platform) && p.enabled);
}

// Get CLI provider by ID
export function getCLIProviderById(id: string): CLIProvider | undefined {
  return CLI_PROVIDERS.find(p => p.id === id);
}

// Get all enabled CLI providers
export function getEnabledCLIProviders(): CLIProvider[] {
  return CLI_PROVIDERS.filter(p => p.enabled);
}

// CLI Provider count
export function getCLIProviderCount(): { total: number; enabled: number } {
  return {
    total: CLI_PROVIDERS.length,
    enabled: CLI_PROVIDERS.filter(p => p.enabled).length,
  };
}
