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
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CLIDashboard() {
  const { activeView, setActiveView } = useAppStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'chat', label: 'Chat', icon: Command },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'mcp', label: 'MCP', icon: Server },
    { id: 'projects', label: 'Projects', icon: FolderTree },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-950 border-r border-green-900/50 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-green-900/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-green-400" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-green-400">AI-CLI</h1>
              <p className="text-xs text-green-600">Terminal Assistant</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeView === item.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-green-600 hover:bg-green-500/10 hover:text-green-400'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-2 border-t border-green-900/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full text-green-600 hover:text-green-400 hover:bg-green-500/10"
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
        <header className="h-12 bg-gray-950 border-b border-green-900/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-600">
              AI-CLI v1.0.0 | Ready
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-green-600">
            <span>Model: Default</span>
            <span>|</span>
            <span>28 Skills | 9 MCP Servers</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex overflow-hidden">
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
