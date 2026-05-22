// MCP (Model Context Protocol) Configuration
// Supports local (stdio) and remote (HTTP/SSE) MCP servers

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  type: 'local' | 'remote';
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error' | 'unknown';
  transport: MCPTransport;
  capabilities?: MCPCapabilities;
  tools?: MCPTool[];
  resources?: MCPResource[];
}

export interface MCPTransport {
  type: 'stdio' | 'sse' | 'http';
  command?: string[];
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
}

export interface MCPCapabilities {
  tools?: boolean;
  resources?: boolean;
  prompts?: boolean;
  streaming?: boolean;
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: MCPToolAnnotations;
}

export interface MCPToolAnnotations {
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
  openWorldHint?: boolean;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

// Pre-configured MCP servers
export const MCP_SERVERS: MCPServer[] = [
  // ============ LOCAL MCP SERVERS ============
  {
    id: 'z-ai-mcp',
    name: 'Z-AI MCP Server',
    description: 'Z-AI MCP server providing AI capabilities including vision, image generation, web search, and more.',
    type: 'local',
    enabled: true,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@z_ai/mcp-server'],
      env: {
        Z_AI_API_KEY: '{env:Z_AI_API_KEY}',
        Z_AI_MODE: 'ZAI',
      },
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
      streaming: true,
    },
  },
  {
    id: 'github-mcp',
    name: 'GitHub MCP Server',
    description: 'GitHub integration for repository operations, issues, and pull requests.',
    type: 'remote',
    enabled: true,
    status: 'unknown',
    transport: {
      type: 'http',
      url: 'https://api.githubcopilot.com/mcp',
      headers: {
        Authorization: 'Bearer {env:GITHUB_PAT_TOKEN}',
      },
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'filesystem-mcp',
    name: 'Filesystem MCP Server',
    description: 'Local filesystem operations with secure access controls.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-filesystem'],
      args: ['{allowed-paths}'],
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'postgres-mcp',
    name: 'PostgreSQL MCP Server',
    description: 'PostgreSQL database operations with read/write capabilities.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-postgres'],
      env: {
        POSTGRES_CONNECTION_STRING: '{env:DATABASE_URL}',
      },
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'sqlite-mcp',
    name: 'SQLite MCP Server',
    description: 'SQLite database operations for local development.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-sqlite'],
      args: ['{db-path}'],
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'brave-search-mcp',
    name: 'Brave Search MCP Server',
    description: 'Web search capabilities using Brave Search API.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-brave-search'],
      env: {
        BRAVE_API_KEY: '{env:BRAVE_API_KEY}',
      },
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'slack-mcp',
    name: 'Slack MCP Server',
    description: 'Slack integration for messaging and channel operations.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-slack'],
      env: {
        SLACK_BOT_TOKEN: '{env:SLACK_BOT_TOKEN}',
        SLACK_TEAM_ID: '{env:SLACK_TEAM_ID}',
      },
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'puppeteer-mcp',
    name: 'Puppeteer MCP Server',
    description: 'Browser automation for web scraping and testing.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-puppeteer'],
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'memory-mcp',
    name: 'Memory MCP Server',
    description: 'Persistent memory storage for conversation context.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-memory'],
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'sequential-thinking-mcp',
    name: 'Sequential Thinking MCP Server',
    description: 'Structured problem-solving with sequential reasoning.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['npx', '-y', '@modelcontextprotocol/server-sequential-thinking'],
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: true,
      streaming: false,
    },
  },
  {
    id: 'atlassian-mcp',
    name: 'Atlassian MCP Server',
    description: 'Jira and Confluence integration for project management.',
    type: 'local',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'stdio',
      command: ['uvx', 'mcp-atlassian'],
      env: {
        CONFLUENCE_API_TOKEN: '{env:CONFLUENCE_API_TOKEN}',
        CONFLUENCE_URL: '{env:CONFLUENCE_URL}',
        CONFLUENCE_USERNAME: '{env:JIRA_USERNAME}',
        JIRA_API_TOKEN: '{env:JIRA_API_TOKEN}',
        JIRA_URL: '{env:JIRA_URL}',
        JIRA_USERNAME: '{env:JIRA_USERNAME}',
      },
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'figma-mcp',
    name: 'Figma MCP Server',
    description: 'Figma design tool integration for design-to-code workflows.',
    type: 'remote',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'http',
      url: 'http://127.0.0.1:3845/mcp',
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      streaming: false,
    },
  },
  {
    id: 'agent-mcp',
    name: 'Agent MCP Server',
    description: 'Multi-agent orchestration MCP server.',
    type: 'remote',
    enabled: false,
    status: 'unknown',
    transport: {
      type: 'sse',
      url: 'http://localhost:8080/sse',
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
      streaming: true,
    },
  },
];

// Get enabled MCP servers
export function getEnabledMCPServers(): MCPServer[] {
  return MCP_SERVERS.filter(s => s.enabled);
}

// Get MCP server by ID
export function getMCPServerById(id: string): MCPServer | undefined {
  return MCP_SERVERS.find(s => s.id === id);
}

// Get MCP servers by type
export function getMCPServersByType(type: 'local' | 'remote'): MCPServer[] {
  return MCP_SERVERS.filter(s => s.type === type);
}

// Get MCP server count
export function getMCPServerCount(): { total: number; enabled: number; connected: number } {
  return {
    total: MCP_SERVERS.length,
    enabled: MCP_SERVERS.filter(s => s.enabled).length,
    connected: MCP_SERVERS.filter(s => s.status === 'connected').length,
  };
}

// MCP Configuration template for opencode.json
export const MCP_CONFIG_TEMPLATE = {
  mcpServers: MCP_SERVERS.reduce((acc, server) => {
    if (server.enabled) {
      acc[server.id] = {
        command: server.transport.command,
        args: server.transport.args,
        env: server.transport.env,
        url: server.transport.url,
        type: server.type,
        enabled: server.enabled,
        headers: server.transport.headers,
      };
    }
    return acc;
  }, {} as Record<string, unknown>),
};

// Tool naming conventions
export const MCP_TOOL_NAMING = {
  pattern: '{service}_{action}_{resource}',
  examples: {
    github_create_issue: 'Create a GitHub issue',
    slack_send_message: 'Send a Slack message',
    jira_search_issues: 'Search Jira issues',
    figma_get_design: 'Get Figma design',
  },
};

// Transport options documentation
export const MCP_TRANSPORT_OPTIONS = {
  stdio: {
    name: 'stdio',
    description: 'Local integrations, command-line tools',
    characteristics: [
      'Standard input/output stream communication',
      'Simple setup, no network configuration needed',
      'Runs as subprocess of the client',
    ],
  },
  sse: {
    name: 'Server-Sent Events',
    description: 'Remote servers with real-time updates',
    characteristics: [
      'Bidirectional communication over HTTP',
      'Server-to-client notifications',
      'Good for streaming responses',
    ],
  },
  http: {
    name: 'HTTP',
    description: 'Remote servers, web services',
    characteristics: [
      'Standard HTTP request/response',
      'Stateless communication',
      'Easy to integrate with existing APIs',
    ],
  },
};
