// Comprehensive Skills Configuration
// Integrating skills from awesome-claude-skills, anthropics/skills, awesome-agent-skills, vibe-skill, and more

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  enabled: boolean;
  source: string;
  tags: string[];
  requires?: string[];
  version?: string;
  author?: string;
}

export type SkillCategory = 
  | 'document'
  | 'development'
  | 'data'
  | 'business'
  | 'communication'
  | 'creative'
  | 'productivity'
  | 'security'
  | 'automation'
  | 'ai'
  | 'vibe';

// Skills extracted from repositories
export const DEFAULT_SKILLS: Skill[] = [
  // ============ VIBE SKILLS (from vibe-skill repo) ============
  {
    id: 'vibe-agent',
    name: 'Vibe Agent',
    description: 'Standalone agentic architecture skill. Designs complete multi-agent AI systems with LangGraph, LangChain, CrewAI, AutoGen, Vercel AI SDK.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['agent', 'architecture', 'multi-agent'],
    version: '1.0.0',
  },
  {
    id: 'vibe-architect',
    name: 'Vibe Architect',
    description: 'Architecture planning and design skill for vibe coding projects.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['architecture', 'planning', 'design'],
    version: '1.0.0',
  },
  {
    id: 'vibe-brainstorm',
    name: 'Vibe Brainstorm',
    description: 'Brainstorming and ideation skill for vibe coding.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['brainstorm', 'ideation', 'creativity'],
    version: '1.0.0',
  },
  {
    id: 'vibe-deploy',
    name: 'Vibe Deploy',
    description: 'Deployment automation and management skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['deploy', 'devops', 'automation'],
    version: '1.0.0',
  },
  {
    id: 'vibe-design',
    name: 'Vibe Design',
    description: 'Design and UI/UX skill for vibe coding projects.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['design', 'ui', 'ux'],
    version: '1.0.0',
  },
  {
    id: 'vibe-doctor',
    name: 'Vibe Doctor',
    description: 'System health check and diagnostics skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['diagnostics', 'health', 'debugging'],
    version: '1.0.0',
  },
  {
    id: 'vibe-document',
    name: 'Vibe Document',
    description: 'Documentation generation and management skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['documentation', 'docs', 'writing'],
    version: '1.0.0',
  },
  {
    id: 'vibe-e2e',
    name: 'Vibe E2E Testing',
    description: 'End-to-end testing skill for vibe coding projects.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['testing', 'e2e', 'playwright'],
    version: '1.0.0',
  },
  {
    id: 'vibe-fix-bug',
    name: 'Vibe Bug Fix',
    description: 'Bug fixing and debugging skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['bug', 'debugging', 'fix'],
    version: '1.0.0',
  },
  {
    id: 'vibe-init',
    name: 'Vibe Init',
    description: 'Project initialization skill for vibe coding.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['init', 'scaffold', 'project'],
    version: '1.0.0',
  },
  {
    id: 'vibe-perf',
    name: 'Vibe Performance',
    description: 'Performance optimization skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['performance', 'optimization', 'speed'],
    version: '1.0.0',
  },
  {
    id: 'vibe-review',
    name: 'Vibe Review',
    description: 'Code review skill for vibe coding projects.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['review', 'quality', 'code'],
    version: '1.0.0',
  },
  {
    id: 'vibe-test',
    name: 'Vibe Test',
    description: 'Testing skill for vibe coding projects.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['testing', 'unit', 'integration'],
    version: '1.0.0',
  },
  {
    id: 'vibe-new-app',
    name: 'Vibe New App',
    description: 'New application scaffolding skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['scaffold', 'new', 'app'],
    version: '1.0.0',
  },
  {
    id: 'vibe-parallel',
    name: 'Vibe Parallel',
    description: 'Parallel task execution skill.',
    category: 'vibe',
    enabled: true,
    source: 'vibe-skill',
    tags: ['parallel', 'concurrent', 'tasks'],
    version: '1.0.0',
  },

  // ============ AI AGENT SKILLS (from ai-agent-skills repo) ============
  {
    id: 'brownfield-chat',
    name: 'Brownfield Chat',
    description: 'Natural-language Q&A across the full codebase. Multi-module questions, git history, cross-cutting queries.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['codebase', 'chat', 'analysis'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'brownfield-drift',
    name: 'Brownfield Drift',
    description: 'Enforces architecture boundaries defined in PLAN.md. Detects when PR crosses module/service boundaries.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['architecture', 'boundaries', 'drift'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'brownfield-fix',
    name: 'Brownfield Fix',
    description: 'Use before editing any file in a brownfield project. Runs risk check and blast radius analysis.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['fix', 'risk', 'analysis'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'greenfield',
    name: 'Greenfield Planning',
    description: 'Parallel persona planning for new projects. Research agent runs first, then Architect, PM, and Security agents run in parallel.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['planning', 'new-project', 'architecture'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'deploy-checklist',
    name: 'Deploy Checklist',
    description: 'Pre-deploy and post-deploy checklist skill. Ensures env vars, migrations, CI, rollback plan, smoke tests.',
    category: 'automation',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['deploy', 'checklist', 'devops'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'git-os',
    name: 'GIT-OS Workflow',
    description: 'Enforces conventional commits, atomic changes, and GIT-OS workflow.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['git', 'commits', 'workflow'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'pr-create',
    name: 'PR Create',
    description: 'Agent-driven PR creation skill. Validates branch, runs pre-push checklist, generates GIT-OS compliant PR.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['pr', 'git', 'automation'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'pr-review',
    name: 'PR Review',
    description: 'Fix engine for PR review comments. Fetches comments, categorizes by impact, posts fix queue.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['pr', 'review', 'automation'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'sprint',
    name: 'Sprint Init',
    description: 'Sprint initiation skill. Generates GIT-OS-compliant branch name and PR description template.',
    category: 'productivity',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['sprint', 'agile', 'workflow'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'wednesday-dev',
    name: 'Wednesday Dev Guidelines',
    description: 'Technical development guidelines. Enforces import ordering, complexity limits, naming conventions.',
    category: 'development',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['guidelines', 'standards', 'code-quality'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },
  {
    id: 'wednesday-design',
    name: 'Wednesday Design Guidelines',
    description: 'Design and UX guidelines. Covers visual design tokens, animation patterns, component standards.',
    category: 'creative',
    enabled: true,
    source: 'ai-agent-skills',
    tags: ['design', 'ux', 'guidelines'],
    version: '1.0.0',
    author: 'wednesday-solutions',
  },

  // ============ Document Processing Skills ============
  {
    id: 'docx',
    name: 'DOCX Processing',
    description: 'Create, edit, analyze Word docs with tracked changes, comments, formatting',
    category: 'document',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['word', 'documents', 'editing'],
  },
  {
    id: 'pdf',
    name: 'PDF Processing',
    description: 'Extract text, tables, metadata, merge & annotate PDFs',
    category: 'document',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['pdf', 'documents', 'extraction'],
  },
  {
    id: 'pptx',
    name: 'PowerPoint Processing',
    description: 'Read, generate, and adjust slides, layouts, templates',
    category: 'document',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['powerpoint', 'slides', 'presentations'],
  },
  {
    id: 'xlsx',
    name: 'Excel Processing',
    description: 'Spreadsheet manipulation: formulas, charts, data transformations',
    category: 'document',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['excel', 'spreadsheet', 'data'],
  },

  // ============ Development Skills ============
  {
    id: 'artifacts-builder',
    name: 'Artifacts Builder',
    description: 'Create elaborate multi-component HTML artifacts with React, Tailwind, shadcn/ui',
    category: 'development',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['react', 'frontend', 'ui'],
  },
  {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Create high-quality MCP servers for integrating external APIs and services',
    category: 'development',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['mcp', 'api', 'integration'],
  },
  {
    id: 'webapp-testing',
    name: 'Webapp Testing',
    description: 'Test local web applications using Playwright for frontend verification',
    category: 'development',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['testing', 'playwright', 'automation'],
  },
  {
    id: 'skill-creator',
    name: 'Skill Creator',
    description: 'Create effective Claude Skills with specialized knowledge and workflows',
    category: 'development',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['skills', 'creation', 'meta'],
  },
  {
    id: 'changelog-generator',
    name: 'Changelog Generator',
    description: 'Create user-facing changelogs from git commits',
    category: 'development',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['git', 'changelog', 'automation'],
  },

  // ============ Creative Skills ============
  {
    id: 'canvas-design',
    name: 'Canvas Design',
    description: 'Create beautiful visual art in PNG and PDF documents',
    category: 'creative',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['design', 'art', 'visual'],
  },
  {
    id: 'slack-gif-creator',
    name: 'Slack GIF Creator',
    description: 'Create animated GIFs optimized for Slack',
    category: 'creative',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['gif', 'animation', 'slack'],
  },
  {
    id: 'theme-factory',
    name: 'Theme Factory',
    description: 'Apply professional font and color themes to artifacts',
    category: 'creative',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['themes', 'design', 'colors'],
  },
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    description: 'Improve image and screenshot quality',
    category: 'creative',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['image', 'enhancement', 'quality'],
  },

  // ============ Business Skills ============
  {
    id: 'brand-guidelines',
    name: 'Brand Guidelines',
    description: 'Apply brand colors and typography for consistent visual identity',
    category: 'business',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['brand', 'design', 'identity'],
  },
  {
    id: 'internal-comms',
    name: 'Internal Communications',
    description: 'Write internal communications including newsletters, FAQs, status reports',
    category: 'business',
    enabled: true,
    source: 'anthropics/skills',
    tags: ['communication', 'internal', 'newsletters'],
  },
  {
    id: 'lead-research',
    name: 'Lead Research Assistant',
    description: 'Identify and qualify high-quality leads with actionable outreach strategies',
    category: 'business',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['leads', 'research', 'sales'],
  },
  {
    id: 'competitive-ads',
    name: 'Competitive Ads Extractor',
    description: 'Extract and analyze competitors ads from ad libraries',
    category: 'business',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['ads', 'competition', 'analysis'],
  },

  // ============ Productivity Skills ============
  {
    id: 'file-organizer',
    name: 'File Organizer',
    description: 'Intelligently organize files and folders by context',
    category: 'productivity',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['files', 'organization', 'management'],
  },
  {
    id: 'invoice-organizer',
    name: 'Invoice Organizer',
    description: 'Organize invoices and receipts for tax preparation',
    category: 'productivity',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['invoices', 'tax', 'finance'],
  },
  {
    id: 'domain-brainstormer',
    name: 'Domain Name Brainstormer',
    description: 'Generate creative domain name ideas and check availability',
    category: 'productivity',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['domains', 'naming', 'ideas'],
  },

  // ============ Communication Skills ============
  {
    id: 'content-research-writer',
    name: 'Content Research Writer',
    description: 'Write high-quality content with research and citations',
    category: 'communication',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['writing', 'content', 'research'],
  },
  {
    id: 'meeting-insights',
    name: 'Meeting Insights Analyzer',
    description: 'Analyze meeting transcripts for behavioral patterns',
    category: 'communication',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['meetings', 'analysis', 'transcripts'],
  },
  {
    id: 'twitter-optimizer',
    name: 'Twitter Algorithm Optimizer',
    description: 'Optimize tweets for maximum reach using Twitter algorithm insights',
    category: 'communication',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['twitter', 'social', 'optimization'],
  },

  // ============ AI Skills ============
  {
    id: 'llm-chat',
    name: 'LLM Chat',
    description: 'Advanced conversation with language models',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['chat', 'conversation', 'llm'],
  },
  {
    id: 'vlm-vision',
    name: 'Vision Analysis',
    description: 'Analyze and understand images with vision models',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['vision', 'image', 'analysis'],
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    description: 'Generate images from text descriptions',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['image', 'generation', 'ai'],
  },
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the web for current information',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['search', 'web', 'research'],
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    description: 'Execute autonomous multi-step research',
    category: 'ai',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['research', 'analysis', 'deep'],
  },
  {
    id: 'video-understand',
    name: 'Video Understanding',
    description: 'Analyze and understand video content',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['video', 'analysis', 'understanding'],
  },
  {
    id: 'asr-speech',
    name: 'Speech Recognition',
    description: 'Convert speech to text using ASR models',
    category: 'ai',
    enabled: true,
    source: 'builtin',
    tags: ['speech', 'asr', 'transcription'],
  },

  // ============ Automation Skills ============
  {
    id: 'connect-apps',
    name: 'Connect Apps',
    description: 'Connect to 500+ apps via Composio for real actions',
    category: 'automation',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['integration', 'apps', 'automation'],
  },
  {
    id: 'video-downloader',
    name: 'Video Downloader',
    description: 'Download videos from YouTube and other platforms',
    category: 'automation',
    enabled: true,
    source: 'awesome-claude-skills',
    tags: ['video', 'download', 'youtube'],
  },

  // ============ Security Skills ============
  {
    id: 'security-audit',
    name: 'Security Audit',
    description: 'Perform security audits and vulnerability assessments',
    category: 'security',
    enabled: true,
    source: 'builtin',
    tags: ['security', 'audit', 'vulnerability'],
  },
  {
    id: 'code-security',
    name: 'Code Security Scan',
    description: 'Scan code for security vulnerabilities and issues',
    category: 'security',
    enabled: true,
    source: 'builtin',
    tags: ['security', 'scan', 'code'],
  },
];

// Group skills by category
export function getSkillsByCategory(skills: Skill[]): Record<SkillCategory, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
}

// Get enabled skills
export function getEnabledSkills(skills: Skill[]): Skill[] {
  return skills.filter(s => s.enabled);
}

// Get skills by source
export function getSkillsBySource(skills: Skill[], source: string): Skill[] {
  return skills.filter(s => s.source === source);
}

// Get skill by ID
export function getSkillById(skills: Skill[], id: string): Skill | undefined {
  return skills.find(s => s.id === id);
}

// Get total skill count
export function getSkillCount(skills: Skill[]): { total: number; enabled: number; byCategory: Record<SkillCategory, number> } {
  const byCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<SkillCategory, number>);

  return {
    total: skills.length,
    enabled: skills.filter(s => s.enabled).length,
    byCategory,
  };
}
