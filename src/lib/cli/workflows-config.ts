// Pre-configured Workflows
// Inspired by SuperAGI, Superagent, and OpenClaw configurations

export interface WorkflowConfig {
  id: string;
  name: string;
  description: string;
  category: WorkflowCategory;
  steps: WorkflowStep[];
  trigger: 'manual' | 'schedule' | 'webhook' | 'event';
  schedule?: string;
  active: boolean;
  tags: string[];
}

export interface WorkflowStep {
  id: string;
  type: StepType;
  name: string;
  config: Record<string, any>;
  onFailure?: 'continue' | 'stop' | 'retry';
  retryCount?: number;
}

export type WorkflowCategory = 
  | 'development'
  | 'research'
  | 'content'
  | 'automation'
  | 'analysis'
  | 'communication';

export type StepType = 
  | 'llm'
  | 'search'
  | 'vision'
  | 'image'
  | 'code'
  | 'file'
  | 'api'
  | 'mcp'
  | 'condition'
  | 'loop'
  | 'output';

// Pre-configured workflows
export const PRECONFIGURED_WORKFLOWS: WorkflowConfig[] = [
  // Development Workflows
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Automated code review with bug detection and improvement suggestions',
    category: 'development',
    trigger: 'manual',
    active: true,
    tags: ['code', 'review', 'quality'],
    steps: [
      {
        id: 'analyze-code',
        type: 'llm',
        name: 'Analyze Code',
        config: {
          prompt: 'Analyze this code for bugs, security issues, and improvements. Check for: 1) Logic errors 2) Security vulnerabilities 3) Performance issues 4) Code style and best practices',
          temperature: 0.3,
        },
        onFailure: 'stop',
      },
      {
        id: 'generate-report',
        type: 'output',
        name: 'Generate Report',
        config: {
          format: 'markdown',
          template: 'code-review',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'test-generation',
    name: 'Test Generation',
    description: 'Generate comprehensive unit tests for code',
    category: 'development',
    trigger: 'manual',
    active: true,
    tags: ['testing', 'code', 'automation'],
    steps: [
      {
        id: 'analyze-structure',
        type: 'code',
        name: 'Analyze Code Structure',
        config: {
          action: 'parse',
          extractFunctions: true,
          extractClasses: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'generate-tests',
        type: 'llm',
        name: 'Generate Unit Tests',
        config: {
          prompt: 'Generate comprehensive unit tests including edge cases, error handling, and happy path tests',
          temperature: 0.4,
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'output-tests',
        type: 'output',
        name: 'Output Tests',
        config: {
          format: 'code',
          extension: 'test.ts',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'git-commit-generator',
    name: 'Git Commit Generator',
    description: 'Generate meaningful commit messages from code changes',
    category: 'development',
    trigger: 'manual',
    active: true,
    tags: ['git', 'automation', 'commits'],
    steps: [
      {
        id: 'analyze-diff',
        type: 'code',
        name: 'Analyze Git Diff',
        config: {
          action: 'git-diff',
          stagedOnly: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'generate-message',
        type: 'llm',
        name: 'Generate Commit Message',
        config: {
          prompt: 'Generate a concise, meaningful commit message following conventional commits format',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'changelog-generator',
    name: 'Changelog Generator',
    description: 'Generate user-facing changelogs from git history',
    category: 'development',
    trigger: 'manual',
    active: true,
    tags: ['git', 'changelog', 'release'],
    steps: [
      {
        id: 'get-commits',
        type: 'code',
        name: 'Get Recent Commits',
        config: {
          action: 'git-log',
          since: 'last-tag',
        },
        onFailure: 'stop',
      },
      {
        id: 'categorize-changes',
        type: 'llm',
        name: 'Categorize Changes',
        config: {
          prompt: 'Categorize commits into: Features, Bug Fixes, Improvements, Breaking Changes',
          temperature: 0.2,
        },
        onFailure: 'continue',
      },
      {
        id: 'format-changelog',
        type: 'output',
        name: 'Format Changelog',
        config: {
          format: 'markdown',
          template: 'changelog',
        },
        onFailure: 'continue',
      },
    ],
  },

  // Research Workflows
  {
    id: 'deep-research',
    name: 'Deep Research',
    description: 'Comprehensive research on any topic with multiple sources',
    category: 'research',
    trigger: 'manual',
    active: true,
    tags: ['research', 'analysis', 'web'],
    steps: [
      {
        id: 'initial-search',
        type: 'search',
        name: 'Initial Search',
        config: {
          depth: 'deep',
          sources: ['web', 'academic'],
          maxResults: 10,
        },
        onFailure: 'continue',
      },
      {
        id: 'analyze-findings',
        type: 'llm',
        name: 'Analyze Findings',
        config: {
          prompt: 'Analyze and synthesize research findings. Identify key themes, contradictions, and knowledge gaps.',
          temperature: 0.5,
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'follow-up-search',
        type: 'search',
        name: 'Follow-up Search',
        config: {
          basedOn: 'previous-analysis',
          maxResults: 5,
        },
        onFailure: 'continue',
      },
      {
        id: 'compile-report',
        type: 'output',
        name: 'Compile Report',
        config: {
          format: 'markdown',
          includeCitations: true,
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Analyze competitors and extract insights',
    category: 'research',
    trigger: 'manual',
    active: true,
    tags: ['business', 'research', 'competition'],
    steps: [
      {
        id: 'search-competitors',
        type: 'search',
        name: 'Search Competitors',
        config: {
          query: 'competitors',
          maxResults: 15,
        },
        onFailure: 'continue',
      },
      {
        id: 'analyze-features',
        type: 'llm',
        name: 'Analyze Features',
        config: {
          prompt: 'Compare features, pricing, strengths, and weaknesses. Identify market gaps.',
          temperature: 0.4,
        },
        onFailure: 'continue',
      },
      {
        id: 'generate-swot',
        type: 'output',
        name: 'Generate SWOT Analysis',
        config: {
          format: 'markdown',
          template: 'swot',
        },
        onFailure: 'continue',
      },
    ],
  },

  // Content Workflows
  {
    id: 'blog-post-creator',
    name: 'Blog Post Creator',
    description: 'Create comprehensive blog posts with research',
    category: 'content',
    trigger: 'manual',
    active: true,
    tags: ['content', 'blog', 'writing'],
    steps: [
      {
        id: 'research-topic',
        type: 'search',
        name: 'Research Topic',
        config: {
          depth: 'standard',
          maxResults: 8,
        },
        onFailure: 'continue',
      },
      {
        id: 'create-outline',
        type: 'llm',
        name: 'Create Outline',
        config: {
          prompt: 'Create a detailed blog post outline with engaging sections',
          temperature: 0.6,
        },
        onFailure: 'retry',
        retryCount: 1,
      },
      {
        id: 'write-content',
        type: 'llm',
        name: 'Write Content',
        config: {
          prompt: 'Write engaging, well-structured blog content',
          temperature: 0.7,
          maxLength: 2000,
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'format-post',
        type: 'output',
        name: 'Format Post',
        config: {
          format: 'markdown',
          includeToc: true,
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'social-media-campaign',
    name: 'Social Media Campaign',
    description: 'Generate social media content for multiple platforms',
    category: 'content',
    trigger: 'manual',
    active: true,
    tags: ['social', 'marketing', 'content'],
    steps: [
      {
        id: 'create-hooks',
        type: 'llm',
        name: 'Create Hooks',
        config: {
          prompt: 'Create engaging hooks for Twitter, LinkedIn, and Instagram',
          temperature: 0.8,
        },
        onFailure: 'continue',
      },
      {
        id: 'optimize-platforms',
        type: 'llm',
        name: 'Optimize for Platforms',
        config: {
          prompt: 'Optimize content for each platform character limits and best practices',
          temperature: 0.5,
        },
        onFailure: 'continue',
      },
      {
        id: 'output-campaign',
        type: 'output',
        name: 'Output Campaign',
        config: {
          format: 'json',
          platforms: ['twitter', 'linkedin', 'instagram'],
        },
        onFailure: 'continue',
      },
    ],
  },

  // Automation Workflows
  {
    id: 'daily-summary',
    name: 'Daily Summary',
    description: 'Generate daily summary of news and updates',
    category: 'automation',
    trigger: 'schedule',
    schedule: '0 9 * * *', // Every day at 9 AM
    active: true,
    tags: ['automation', 'daily', 'summary'],
    steps: [
      {
        id: 'fetch-news',
        type: 'search',
        name: 'Fetch News',
        config: {
          query: 'latest tech news AI',
          recency: '24h',
          maxResults: 10,
        },
        onFailure: 'continue',
      },
      {
        id: 'summarize',
        type: 'llm',
        name: 'Summarize',
        config: {
          prompt: 'Create a concise daily summary with key highlights',
          temperature: 0.4,
        },
        onFailure: 'continue',
      },
      {
        id: 'send-notification',
        type: 'output',
        name: 'Send Notification',
        config: {
          format: 'notification',
          channels: ['email', 'slack'],
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'file-organization',
    name: 'File Organization',
    description: 'Automatically organize files by type and content',
    category: 'automation',
    trigger: 'manual',
    active: true,
    tags: ['files', 'organization', 'automation'],
    steps: [
      {
        id: 'scan-directory',
        type: 'file',
        name: 'Scan Directory',
        config: {
          action: 'scan',
          recursive: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'categorize-files',
        type: 'llm',
        name: 'Categorize Files',
        config: {
          prompt: 'Suggest optimal file organization based on content and type',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
      {
        id: 'create-structure',
        type: 'file',
        name: 'Create Structure',
        config: {
          action: 'organize',
          createFolders: true,
        },
        onFailure: 'continue',
      },
    ],
  },

  // Analysis Workflows
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyze data and generate insights',
    category: 'analysis',
    trigger: 'manual',
    active: true,
    tags: ['data', 'analysis', 'insights'],
    steps: [
      {
        id: 'load-data',
        type: 'file',
        name: 'Load Data',
        config: {
          formats: ['csv', 'json', 'xlsx'],
          maxSize: '10MB',
        },
        onFailure: 'stop',
      },
      {
        id: 'analyze-patterns',
        type: 'llm',
        name: 'Analyze Patterns',
        config: {
          prompt: 'Identify patterns, trends, and anomalies in the data',
          temperature: 0.3,
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'visualize',
        type: 'output',
        name: 'Visualize',
        config: {
          format: 'charts',
          types: ['bar', 'line', 'pie'],
        },
        onFailure: 'continue',
      },
      {
        id: 'report',
        type: 'output',
        name: 'Generate Report',
        config: {
          format: 'markdown',
          includeCharts: true,
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'meeting-analysis',
    name: 'Meeting Analysis',
    description: 'Analyze meeting transcripts for insights and action items',
    category: 'analysis',
    trigger: 'manual',
    active: true,
    tags: ['meetings', 'analysis', 'productivity'],
    steps: [
      {
        id: 'parse-transcript',
        type: 'llm',
        name: 'Parse Transcript',
        config: {
          prompt: 'Extract key discussion points, decisions, and action items',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
      {
        id: 'analyze-dynamics',
        type: 'llm',
        name: 'Analyze Dynamics',
        config: {
          prompt: 'Analyze speaking patterns, participation, and team dynamics',
          temperature: 0.4,
        },
        onFailure: 'continue',
      },
      {
        id: 'generate-summary',
        type: 'output',
        name: 'Generate Summary',
        config: {
          format: 'markdown',
          includeActionItems: true,
        },
        onFailure: 'continue',
      },
    ],
  },

  // Communication Workflows
  {
    id: 'email-drafter',
    name: 'Email Drafter',
    description: 'Draft professional emails for various purposes',
    category: 'communication',
    trigger: 'manual',
    active: true,
    tags: ['email', 'communication', 'writing'],
    steps: [
      {
        id: 'understand-context',
        type: 'llm',
        name: 'Understand Context',
        config: {
          prompt: 'Understand the email purpose, recipient, and desired outcome',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
      {
        id: 'draft-email',
        type: 'llm',
        name: 'Draft Email',
        config: {
          prompt: 'Write a professional, clear, and effective email',
          temperature: 0.5,
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'polish',
        type: 'llm',
        name: 'Polish',
        config: {
          prompt: 'Review and improve clarity, tone, and professionalism',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
    ],
  },
];

// Get workflows by category
export function getWorkflowsByCategory(
  workflows: WorkflowConfig[]
): Record<WorkflowCategory, WorkflowConfig[]> {
  return workflows.reduce((acc, workflow) => {
    if (!acc[workflow.category]) {
      acc[workflow.category] = [];
    }
    acc[workflow.category].push(workflow);
    return acc;
  }, {} as Record<WorkflowCategory, WorkflowConfig[]>);
}

// Get active workflows
export function getActiveWorkflows(workflows: WorkflowConfig[]): WorkflowConfig[] {
  return workflows.filter(w => w.active);
}

// Get scheduled workflows
export function getScheduledWorkflows(workflows: WorkflowConfig[]): WorkflowConfig[] {
  return workflows.filter(w => w.trigger === 'schedule' && w.active);
}
