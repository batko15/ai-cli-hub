'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Workflow, 
  Plus, 
  Play, 
  Pause, 
  Trash2,
  Zap,
  Calendar,
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

interface WorkflowItem {
  id: string;
  name: string;
  description?: string;
  steps: any[];
  trigger: string;
  schedule?: string;
  active: boolean;
  _count?: {
    runs: number;
  };
}

const WORKFLOW_TEMPLATES = [
  {
    name: 'Code Review',
    description: 'Automatischer Code-Review Workflow',
    steps: [
      { type: 'llm', prompt: 'Review this code for bugs and improvements:' },
      { type: 'output', format: 'markdown' }
    ],
    trigger: 'manual'
  },
  {
    name: 'Daily Report',
    description: 'Tägliche Zusammenfassung generieren',
    steps: [
      { type: 'search', query: 'latest tech news' },
      { type: 'llm', prompt: 'Summarize these findings:' },
      { type: 'output', format: 'report' }
    ],
    trigger: 'schedule'
  },
  {
    name: 'Image Generation Pipeline',
    description: 'Mehrere Bilder generieren',
    steps: [
      { type: 'image', prompt: 'Create variations of:' },
      { type: 'save', destination: '/generated' }
    ],
    trigger: 'manual'
  },
  {
    name: 'Research Agent',
    description: 'Tiefgehende Recherche durchführen',
    steps: [
      { type: 'search', depth: 'deep' },
      { type: 'llm', prompt: 'Analyze and summarize findings:' },
      { type: 'output', format: 'report' }
    ],
    trigger: 'manual'
  }
];

export function WorkflowsPanel() {
  const { addTerminalOutput } = useAppStore();
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'manual',
    schedule: '',
  });

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows');
      const data = await res.json();
      if (data.success) {
        setWorkflows(data.workflows.map((w: any) => ({
          ...w,
          steps: JSON.parse(w.steps)
        })));
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to fetch workflows: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const createWorkflow = async () => {
    if (!newWorkflow.name.trim()) return;

    const template = selectedTemplate !== null ? WORKFLOW_TEMPLATES[selectedTemplate] : null;

    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newWorkflow,
          steps: template?.steps || [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkflows([data.workflow, ...workflows]);
        setCreateOpen(false);
        setNewWorkflow({ name: '', description: '', trigger: 'manual', schedule: '' });
        setSelectedTemplate(null);
        addTerminalOutput(`[Workflow] Created: ${newWorkflow.name}`);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to create workflow: ${error.message}`);
    }
  };

  const toggleWorkflow = async (id: string, currentActive: boolean, name: string) => {
    try {
      await fetch('/api/workflows', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentActive }),
      });
      setWorkflows(workflows.map(w => 
        w.id === id ? { ...w, active: !currentActive } : w
      ));
      addTerminalOutput(`[Workflow] ${!currentActive ? 'Activated' : 'Deactivated'}: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to toggle workflow: ${error.message}`);
    }
  };

  const deleteWorkflow = async (id: string, name: string) => {
    try {
      await fetch(`/api/workflows?id=${id}`, { method: 'DELETE' });
      setWorkflows(workflows.filter(w => w.id !== id));
      addTerminalOutput(`[Workflow] Deleted: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to delete workflow: ${error.message}`);
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'schedule':
        return <Calendar className="w-4 h-4" />;
      case 'webhook':
        return <Zap className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Workflows</h2>
          <p className="text-sm text-slate-500 mt-1">Automatisiere deine Tasks</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40">
              <Plus className="w-4 h-4 mr-2" />
              Neuer Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-slate-200 text-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-slate-800">Neuen Workflow erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {/* Templates */}
              <div className="space-y-2">
                <Label className="text-slate-600">Vorlagen</Label>
                <div className="grid grid-cols-2 gap-2">
                  {WORKFLOW_TEMPLATES.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedTemplate(index);
                        setNewWorkflow({
                          ...newWorkflow,
                          name: template.name,
                          description: template.description,
                          trigger: template.trigger
                        });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedTemplate === index
                          ? 'border-amber-500 bg-amber-50 shadow-sm'
                          : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700">{template.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600">Name</Label>
                  <Input
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                    placeholder="Workflow-Name"
                    className="bg-slate-50 border-slate-200 text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-600">Trigger</Label>
                  <Select
                    value={newWorkflow.trigger}
                    onValueChange={(value) => setNewWorkflow({ ...newWorkflow, trigger: value })}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="manual">Manuell</SelectItem>
                      <SelectItem value="schedule">Zeitplan</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600">Beschreibung</Label>
                <Textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  placeholder="Workflow-Beschreibung"
                  className="bg-slate-50 border-slate-200 text-slate-700"
                />
              </div>

              <Button
                onClick={createWorkflow}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              >
                Workflow erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workflows List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade Workflows...</span>
          </div>
        ) : workflows.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Workflow className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500">Keine Workflows vorhanden</p>
            <p className="text-sm text-slate-400 mt-2">Erstelle deinen ersten Workflow!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`bg-white transition-all hover:shadow-md ${
                  workflow.active ? 'border-amber-300' : 'border-slate-200'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        workflow.active 
                          ? 'bg-amber-100 text-amber-600' 
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {getTriggerIcon(workflow.trigger)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-700">{workflow.name}</h3>
                        <p className="text-sm text-slate-500">{workflow.description || 'Keine Beschreibung'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                        {workflow.steps.length} Steps
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                        {workflow._count?.runs || 0} Runs
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWorkflow(workflow.id, workflow.active, workflow.name)}
                        className={workflow.active ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}
                      >
                        {workflow.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWorkflow(workflow.id, workflow.name)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
