'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Puzzle,
  ExternalLink,
  Star,
  GitFork,
  Search,
  Terminal,
  Bot,
  Server,
  Code,
  Globe,
  Sparkles,
  Loader2
} from 'lucide-react';

interface Extension {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'cli' | 'mcp' | 'agent' | 'tool';
  stars?: string;
  featured?: boolean;
}

const extensions: Extension[] = [
  // CLI Tools
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    description: 'Open-source AI agent that brings Gemini directly into your terminal',
    url: 'https://github.com/google-gemini/gemini-cli',
    category: 'cli',
    stars: '15k+',
    featured: true,
  },
  {
    id: 'cline',
    name: 'Cline',
    description: 'Autonomous coding agent as an SDK, IDE extension, and CLI tool',
    url: 'https://github.com/cline/cline',
    category: 'cli',
    stars: '25k+',
    featured: true,
  },
  {
    id: 'aider',
    name: 'Aider',
    description: 'AI pair programming in your terminal - works with any editor',
    url: 'https://github.com/Aider-AI/aider',
    category: 'cli',
    stars: '20k+',
    featured: true,
  },
  {
    id: 'continue',
    name: 'Continue',
    description: 'Source-controlled AI checks and agents for pull requests',
    url: 'https://github.com/continuedev/continue',
    category: 'cli',
    stars: '18k+',
  },
  // MCP Servers
  {
    id: 'mcp-servers',
    name: 'Awesome MCP Servers',
    description: 'Curated list of Model Context Protocol servers',
    url: 'https://github.com/patriksimek/awesome-mcp-servers-2',
    category: 'mcp',
    featured: true,
  },
  {
    id: 'mcp-devtools',
    name: 'MCP DevTools',
    description: 'Developer tools, SDKs, libraries for MCP servers',
    url: 'https://github.com/punkpeye/awesome-mcp-devtools',
    category: 'mcp',
  },
  {
    id: 'mcp-official',
    name: 'Official MCP',
    description: 'Official Model Context Protocol implementations',
    url: 'https://github.com/modelcontextprotocol',
    category: 'mcp',
    featured: true,
  },
  {
    id: 'mcp-market',
    name: 'MCP Market',
    description: 'Top 100 MCP Servers ranked by GitHub stars',
    url: 'https://mcpmarket.com/leaderboards',
    category: 'mcp',
  },
  // Agents
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-powered code editor with intelligent autocomplete',
    url: 'https://cursor.sh',
    category: 'agent',
    featured: true,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'AI-first IDE for modern development workflows',
    url: 'https://codeium.com/windsurf',
    category: 'agent',
  },
  // Tools
  {
    id: 'github-copilot-cli',
    name: 'GitHub Copilot CLI',
    description: 'GitHub Copilot extension for command line',
    url: 'https://docs.github.com/copilot/github-copilot-in-the-cli',
    category: 'tool',
    featured: true,
  },
  {
    id: 'gemini-extensions',
    name: 'Gemini CLI Extensions',
    description: 'Browse extensions for Gemini CLI',
    url: 'https://geminicli.com/extensions',
    category: 'tool',
  },
];

const CATEGORY_CONFIG = {
  cli: { label: 'CLI Tools', icon: Terminal, color: 'violet' },
  mcp: { label: 'MCP Servers', icon: Server, color: 'blue' },
  agent: { label: 'AI Agents', icon: Bot, color: 'emerald' },
  tool: { label: 'Tools', icon: Puzzle, color: 'pink' },
};

const CATEGORY_COLORS = {
  cli: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  mcp: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  agent: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  tool: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
};

export function ExtensionsPanel() {
  const { addTerminalOutput } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ext.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ext.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedExtensions = filteredExtensions.reduce((acc, ext) => {
    if (!acc[ext.category]) {
      acc[ext.category] = [];
    }
    acc[ext.category].push(ext);
    return acc;
  }, {} as Record<string, Extension[]>);

  const openExtension = (url: string, name: string) => {
    window.open(url, '_blank');
    addTerminalOutput(`[Extension] Opened: ${name}`);
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Extensions & Tools</h2>
        <p className="text-sm text-slate-500 mt-1">Entdecke AI-CLI Tools, MCP Server und Erweiterungen</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suche Extensions..."
            className="pl-10 bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-violet-500"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={selectedCategory === key ? 'bg-violet-500 text-white' : 'text-slate-600'}
            >
              <config.icon className="w-4 h-4 mr-1" />
              {config.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Extensions List */}
      <ScrollArea className="flex-1">
        <div className="space-y-6">
          {Object.entries(groupedExtensions).map(([category, categoryExtensions]) => {
            const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
            const colors = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS];
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${config.color}-500`} style={{ backgroundColor: config.color === 'violet' ? '#8b5cf6' : config.color === 'blue' ? '#3b82f6' : config.color === 'emerald' ? '#10b981' : '#ec4899' }} />
                  {config.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryExtensions.map((extension) => (
                    <Card
                      key={extension.id}
                      className={`bg-white transition-all hover:shadow-md cursor-pointer ${
                        extension.featured ? `border-2 ${colors.border}` : 'border-slate-200'
                      }`}
                      onClick={() => openExtension(extension.url, extension.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
                              <config.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-700">{extension.name}</h4>
                                {extension.featured && (
                                  <Badge variant="outline" className="text-xs bg-amber-50 border-amber-200 text-amber-700">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{extension.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {extension.stars && (
                              <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600">
                                <Star className="w-3 h-3 mr-1" />
                                {extension.stars}
                              </Badge>
                            )}
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{extensions.length}</span> Extensions verfügbar
          </span>
          <Badge variant="outline" className="bg-violet-50 border-violet-200 text-violet-700">
            <Sparkles className="w-3 h-3 mr-1" />
            GitHub Discoveries
          </Badge>
        </div>
      </div>
    </div>
  );
}
