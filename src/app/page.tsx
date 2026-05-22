'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ChatPanel } from '@/components/cli/chat-panel';
import { TerminalPanel } from '@/components/cli/terminal-panel';
import { ProjectsPanel } from '@/components/cli/projects-panel';
import { WorkflowsPanel } from '@/components/cli/workflows-panel';
import { AgentsPanel } from '@/components/cli/agents-panel';
import { SettingsPanel } from '@/components/cli/settings-panel';
import { SkillsPanel } from '@/components/cli/skills-panel';
import { MCPPanel } from '@/components/cli/mcp-panel';
import { ExtensionsPanel } from '@/components/cli/extensions-panel';
import { 
  Command, 
  Sparkles, 
  FolderTree, 
  Workflow, 
  Bot, 
  Settings, 
  Wand2,
  PanelLeftClose,
  PanelLeft,
  Server,
  Puzzle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CLIDashboard() {
  const { activeView, setActiveView } = useAppStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'chat', label: 'Chat', icon: Command },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'mcp', label: 'MCP Servers', icon: Server },
    { id: 'extensions', label: 'Extensions', icon: Puzzle },
    { id: 'projects', label: 'Projects', icon: FolderTree },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 font-sans flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">AI-CLI</h1>
              <p className="text-xs text-slate-500">Terminal Assistant</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-2 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            {sidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-slate-600 font-medium">
              AI-CLI v1.0.0 | Ready
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-medium">Model: Default</span>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">28 Skills</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">9 MCP Servers</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex overflow-hidden bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex overflow-hidden"
            >
              {activeView === 'chat' && <ChatPanel />}
              {activeView === 'skills' && <SkillsPanel />}
              {activeView === 'mcp' && <MCPPanel />}
              {activeView === 'extensions' && <ExtensionsPanel />}
              {activeView === 'projects' && <ProjectsPanel />}
              {activeView === 'workflows' && <WorkflowsPanel />}
              {activeView === 'agents' && <AgentsPanel />}
              {activeView === 'settings' && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Terminal Output */}
        <TerminalPanel />
      </div>
    </div>
  );
}
