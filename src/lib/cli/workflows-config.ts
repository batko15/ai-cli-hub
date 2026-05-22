// Pre-configured Workflows
// Inspired by SuperAGI, Superagent, OpenClaw, ai-agent-skills, and vibe-coding configurations

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
  source?: string;
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
  | 'communication'
  | 'vibe';

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
  | 'output'
  | 'agent';

// Pre-configured workflows
export const PRECONFIGURED_WORKFLOWS: WorkflowConfig[] = [
  // ============ VIBE WORKFLOWS ============
  {
    id: 'vibe-new-project',
    name: 'Vibe New Project',
    description: 'Initialize a new project with vibe-coding best practices, architecture planning, and initial scaffolding',
    category: 'vibe',
    trigger: 'manual',
    active: true,
    tags: ['vibe', 'init', 'scaffold'],
    source: 'vibe-skill',
    steps: [
      {
        id: 'analyze-requirements',
        type: 'llm',
        name: 'Analyze Requirements',
        config: {
          prompt: 'Analyze the project requirements and create a comprehensive specification',
          temperature: 0.4,
        },
        onFailure: 'stop',
      },
      {
        id: 'plan-architecture',
        type: 'agent',
        name: 'Plan Architecture',
        config: {
          agent: 'vibe-architect',
          task: 'Design the system architecture',
        },
        onFailure: 'retry',
        retryCount: 2,
      },
      {
        id: 'scaffold-project',
        type: 'code',
        name: 'Scaffold Project',
        config: {
          action: 'scaffold',
          createStructure: true,
          initializeGit: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'generate-docs',
        type: 'output',
        name: 'Generate Documentation',
        config: {
          format: 'markdown',
          files: ['README.md', 'ARCHITECTURE.md', 'CONTRIBUTING.md'],
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'vibe-code-review',
    name: 'Vibe Code Review',
    description: 'Comprehensive code review with architecture checks, security scan, and improvement suggestions',
    category: 'vibe',
    trigger: 'manual',
    active: true,
    tags: ['vibe', 'review', 'quality'],
    source: 'vibe-skill',
    steps: [
      {
        id: 'analyze-code',
        type: 'code',
        name: 'Analyze Code',
        config: {
          action: 'analyze',
          checkStyle: true,
          checkComplexity: true,
        },
        onFailure: 'continue',
      },
      {
        id: 'check-architecture',
        type: 'agent',
        name: 'Check Architecture',
        config: {
          agent: 'vibe-architect',
          task: 'Review architecture compliance',
        },
        onFailure: 'continue',
      },
      {
        id: 'security-scan',
        type: 'llm',
        name: 'Security Scan',
        config: {
          prompt: 'Identify security vulnerabilities and potential issues',
          temperature: 0.2,
        },
        onFailure: 'continue',
      },
      {
        id: 'generate-report',
        type: 'output',
        name: 'Generate Review Report',
        config: {
          format: 'markdown',
          template: 'code-review',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'vibe-deploy-pipeline',
    name: 'Vibe Deploy Pipeline',
    description: 'Complete deployment pipeline with pre-deploy checks, deployment, and post-deploy verification',
    category: 'vibe',
    trigger: 'manual',
    active: true,
    tags: ['vibe', 'deploy', 'devops'],
    source: 'vibe-skill',
    steps: [
      {
        id: 'pre-deploy-checks',
        type: 'agent',
        name: 'Pre-Deploy Checks',
        config: {
          agent: 'vibe-deploy',
          task: 'Run pre-deployment checklist',
        },
        onFailure: 'stop',
      },
      {
        id: 'run-tests',
        type: 'code',
        name: 'Run Tests',
        config: {
          action: 'test',
          coverage: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'deploy',
        type: 'api',
        name: 'Deploy',
        config: {
          action: 'deploy',
          environment: 'production',
        },
        onFailure: 'retry',
        retryCount: 3,
      },
      {
        id: 'post-deploy-verify',
        type: 'agent',
        name: 'Post-Deploy Verification',
        config: {
          agent: 'vibe-doctor',
          task: 'Verify deployment health',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'vibe-bug-fix',
    name: 'Vibe Bug Fix',
    description: 'Intelligent bug fixing workflow with diagnosis, fix implementation, and verification',
    category: 'vibe',
    trigger: 'manual',
    active: true,
    tags: ['vibe', 'bug', 'fix'],
    source: 'vibe-skill',
    steps: [
      {
        id: 'diagnose',
        type: 'agent',
        name: 'Diagnose Bug',
        config: {
          agent: 'vibe-doctor',
          task: 'Analyze and diagnose the bug',
        },
        onFailure: 'stop',
      },
      {
        id: 'propose-fix',
        type: 'llm',
        name: 'Propose Fix',
        config: {
          prompt: 'Propose a solution to fix the identified bug with minimal changes',
          temperature: 0.3,
        },
        onFailure: 'continue',
      },
      {
        id: 'implement-fix',
        type: 'code',
        name: 'Implement Fix',
        config: {
          action: 'edit',
          autoFormat: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'verify-fix',
        type: 'code',
        name: 'Verify Fix',
        config: {
          action: 'test',
          runRelated: true,
        },
        onFailure: 'continue',
      },
    ],
  },

  // ============ AI AGENT SKILLS WORKFLOWS ============
  {
    id: 'pr-review-workflow',
    name: 'PR Review Workflow',
    description: 'Full PR review orchestrator that runs blast radius + drift check on changed files',
    category: 'development',
    trigger: 'manual',
    active: true,
    tags: ['pr', 'review', 'git'],
    source: 'ai-agent-skills',
    steps: [
      {
        id: 'fetch-comments',
        type: 'api',
        name: 'Fetch PR Comments',
        config: {
          action: 'fetch-pr-comments',
        },
        onFailure: 'continue',
      },
      {
        id: 'blast-radius',
        type: 'code',
        name: 'Calculate Blast Radius',
        config: {
          action: 'blast-radius',
          analyzeImpact: true,
        },
        onFailure: 'continue',
      },
      {
        id: 'drift-check',
        type: 'agent',
        name: 'Drift Check',
        config: {
          agent: 'brownfield-drift',
          task: 'Check architecture boundaries',
        },
        onFailure: 'continue',
      },
      {
        id: 'categorize',
        type: 'llm',
        name: 'Categorize Comments',
        config: {
          prompt: 'Categorize review comments by impact and priority',
          temperature: 0.2,
        },
        onFailure: 'continue',
      },
      {
        id: 'output-report',
        type: 'output',
        name: 'Output Review Report',
        config: {
          format: 'markdown',
          template: 'pr-review',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'deploy-checklist-workflow',
    name: 'Deploy Checklist Workflow',
    description: 'Pre-deploy and post-deploy checklist verification',
    category: 'automation',
    trigger: 'manual',
    active: true,
    tags: ['deploy', 'checklist', 'devops'],
    source: 'ai-agent-skills',
    steps: [
      {
        id: 'check-env-vars',
        type: 'code',
        name: 'Check Environment Variables',
        config: {
          action: 'check-env',
          required: true,
        },
        onFailure: 'stop',
      },
      {
        id: 'check-migrations',
        type: 'code',
        name: 'Check Migrations',
        config: {
          action: 'check-migrations',
          verifyReady: true,
        },
        onFailure: 'continue',
      },
      {
        id: 'check-ci',
        type: 'api',
        name: 'Check CI Status',
        config: {
          action: 'check-ci',
        },
        onFailure: 'stop',
      },
      {
        id: 'check-rollback',
        type: 'llm',
        name: 'Check Rollback Plan',
        config: {
          prompt: 'Verify rollback plan exists and is documented',
          temperature: 0.2,
        },
        onFailure: 'continue',
      },
      {
        id: 'run-smoke-tests',
        type: 'code',
        name: 'Run Smoke Tests',
        config: {
          action: 'test',
          type: 'smoke',
        },
        onFailure: 'continue',
      },
    ],
  },
  {
    id: 'sprint-init-workflow',
    name: 'Sprint Init Workflow',
    description: 'Sprint initiation workflow that generates branch names and PR templates',
    category: 'automation',
    trigger: 'manual',
    active: true,
    tags: ['sprint', 'agile', 'planning'],
    source: 'ai-agent-skills',
    steps: [
      {
        id: 'parse-ticket',
        type: 'llm',
        name: 'Parse Ticket',
        config: {
          prompt: 'Parse ticket title and description to extract key information',
          temperature: 0.2,
        },
        onFailure: 'stop',
      },
      {
        id: 'generate-branch',
        type: 'code',
        name: 'Generate Branch Name',
        config: {
          action: 'git-branch',
          convention: 'git-os',
        },
        onFailure: 'continue',
      },
      {
        id: 'generate-pr-template',
        type: 'output',
        name: 'Generate PR Template',
        config: {
          format: 'markdown',
          template: 'pr-description',
        },
        onFailure: 'continue',
      },
    ],
  },

  // ============ DEVELOPMENT WORKFLOWS ============
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

  // ============ RESEARCH WORKFLOWS ============
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

  // ============ CONTENT WORKFLOWS ============
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

  // ============ AUTOMATION WORKFLOWS ============
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

  // ============ ANALYSIS WORKFLOWS ============
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

  // ============ COMMUNICATION WORKFLOWS ============
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

// Get workflow count
export function getWorkflowCount(workflows: WorkflowConfig[]): { total: number; active: number; byCategory: Record<WorkflowCategory, number> } {
  const byCategory = workflows.reduce((acc, workflow) => {
    acc[workflow.category] = (acc[workflow.category] || 0) + 1;
    return acc;
  }, {} as Record<WorkflowCategory, number>);

  return {
    total: workflows.length,
    active: workflows.filter(w => w.active).length,
    byCategory,
  };
}
