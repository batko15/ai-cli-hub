// Comprehensive Skills Configuration
// Integrating skills from awesome-claude-skills, anthropics/skills, and awesome-agent-skills

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  enabled: boolean;
  source: string;
  tags: string[];
  requires?: string[];
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
  | 'ai';

// Skills extracted from repositories
export const DEFAULT_SKILLS: Skill[] = [
  // Document Processing Skills
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

  // Development Skills
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

  // Creative Skills
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

  // Business Skills
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

  // Productivity Skills
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

  // Communication Skills
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

  // AI Skills
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

  // Automation Skills
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
