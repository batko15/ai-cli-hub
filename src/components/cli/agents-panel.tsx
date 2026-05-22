'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Plus, 
  Play, 
  Pause, 
  Trash2,
  Code,
  Search,
  Palette,
  FileText,
  MessageSquare,
  Cpu,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Agent {
  id: string;
  name: string;
  description?: string;
  type: string;
  skills: string[];
  active: boolean;
}

const AGENT_TYPES = [
  { id: 'coder', name: 'Code Agent', icon: Code, description: 'Code schreiben und debuggen', color: 'violet' },
  { id: 'researcher', name: 'Research Agent', icon: Search, description: 'Recherche und Analyse', color: 'blue' },
  { id: 'designer', name: 'Design Agent', icon: Palette, description: 'UI/UX Design', color: 'pink' },
  { id: 'writer', name: 'Writer Agent', icon: FileText, description: 'Content-Erstellung', color: 'amber' },
  { id: 'chat', name: 'Chat Agent', icon: MessageSquare, description: 'Konversationen führen', color: 'emerald' },
  { id: 'general', name: 'General Agent', icon: Cpu, description: 'Allgemeine Aufgaben', color: 'slate' },
];

const AVAILABLE_SKILLS = [
  { id: 'llm', name: 'LLM Chat' },
  { id: 'vlm', name: 'Vision' },
  { id: 'image-gen', name: 'Image Gen' },
  { id: 'web-search', name: 'Web Search' },
  { id: 'code-gen', name: 'Code Gen' },
  { id: 'translate', name: 'Translation' },
  { id: 'summarize', name: 'Summarize' },
];

export function AgentsPanel() {
  const { addTerminalOutput } = useAppStore();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    type: 'general',
    skills: [] as string[],
  });

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      if (data.success) {
        setAgents(data.agents.map((a: any) => ({
          ...a,
          skills: JSON.parse(a.skills)
        })));
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to fetch agents: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const createAgent = async () => {
    if (!newAgent.name.trim()) return;

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent),
      });
      const data = await res.json();
      if (data.success) {
        setAgents([data.agent, ...agents]);
        setCreateOpen(false);
        setNewAgent({ name: '', description: '', type: 'general', skills: [] });
        addTerminalOutput(`[Agent] Created: ${newAgent.name}`);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to create agent: ${error.message}`);
    }
  };

  const toggleAgent = async (id: string, currentActive: boolean, name: string) => {
    try {
      await fetch('/api/agents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentActive }),
      });
      setAgents(agents.map(a => 
        a.id === id ? { ...a, active: !currentActive } : a
      ));
      addTerminalOutput(`[Agent] ${!currentActive ? 'Activated' : 'Deactivated'}: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to toggle agent: ${error.message}`);
    }
  };

  const deleteAgent = async (id: string, name: string) => {
    try {
      await fetch(`/api/agents?id=${id}`, { method: 'DELETE' });
      setAgents(agents.filter(a => a.id !== id));
      addTerminalOutput(`[Agent] Deleted: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to delete agent: ${error.message}`);
    }
  };

  const toggleSkill = (skillId: string) => {
    if (newAgent.skills.includes(skillId)) {
      setNewAgent({ ...newAgent, skills: newAgent.skills.filter(s => s !== skillId) });
    } else {
      setNewAgent({ ...newAgent, skills: [...newAgent.skills, skillId] });
    }
  };

  const getTypeInfo = (type: string) => {
    return AGENT_TYPES.find(t => t.id === type) || AGENT_TYPES[5];
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Agents</h2>
          <p className="text-sm text-slate-500 mt-1">Deine spezialisierten KI-Assistenten</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40">
              <Plus className="w-4 h-4 mr-2" />
              Neuer Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-slate-200 text-slate-700 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-slate-800">Neuen Agent erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-slate-600">Typ</Label>
                <div className="grid grid-cols-2 gap-2">
                  {AGENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNewAgent({ ...newAgent, type: type.id })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        newAgent.type === type.id
                          ? 'border-rose-500 bg-rose-50 shadow-sm'
                          : 'border-slate-200 hover:border-rose-300 hover:bg-rose-50/50'
                      }`}
                    >
                      <type.icon className="w-4 h-4 text-slate-600 mb-1" />
                      <p className="text-sm font-medium text-slate-700">{type.name}</p>
                      <p className="text-xs text-slate-500">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600">Name</Label>
                <Input
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="Agent-Name"
                  className="bg-slate-50 border-slate-200 text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600">Beschreibung</Label>
                <Textarea
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Agent-Beschreibung"
                  className="bg-slate-50 border-slate-200 text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SKILLS.map((skill) => (
                    <Badge
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`cursor-pointer transition-all ${
                        newAgent.skills.includes(skill.id)
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={createAgent}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white"
              >
                Agent erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agents Grid */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade Agents...</span>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Bot className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500">Keine Agents vorhanden</p>
            <p className="text-sm text-slate-400 mt-2">Erstelle deinen ersten Agent!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const typeInfo = getTypeInfo(agent.type);
              return (
                <Card
                  key={agent.id}
                  className={`bg-white transition-all hover:shadow-md ${
                    agent.active ? 'border-rose-300' : 'border-slate-200'
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${
                          agent.active 
                            ? 'bg-rose-100 text-rose-600' 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          <typeInfo.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-slate-700 text-base">{agent.name}</CardTitle>
                          <p className="text-xs text-slate-400">{typeInfo.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAgent(agent.id, agent.active, agent.name)}
                          className={agent.active ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}
                        >
                          {agent.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAgent(agent.id, agent.name)}
                          className="text-red-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {agent.description || 'Keine Beschreibung'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {agent.skills.length > 0 ? (
                        agent.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs bg-slate-50 border-slate-200 text-slate-600"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">Keine Skills</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
