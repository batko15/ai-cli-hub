'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FolderPlus, 
  Folder, 
  File, 
  Trash2, 
  Code,
  Globe,
  Database,
  Palette,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Project {
  id: string;
  name: string;
  description?: string;
  path: string;
  type: string;
  status: string;
  createdAt: string;
  _count?: {
    files: number;
    chats: number;
  };
}

export function ProjectsPanel() {
  const { addTerminalOutput } = useAppStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'general',
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to fetch projects: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([data.project, ...projects]);
        setCreateOpen(false);
        setNewProject({ name: '', description: '', type: 'general' });
        addTerminalOutput(`[Project] Created: ${newProject.name}`);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to create project: ${error.message}`);
    }
  };

  const deleteProject = async (id: string, name: string) => {
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
      addTerminalOutput(`[Project] Deleted: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to delete project: ${error.message}`);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="w-4 h-4" />;
      case 'api':
        return <Database className="w-4 h-4" />;
      case 'design':
        return <Palette className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'web':
        return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'api':
        return { bg: 'bg-violet-100', text: 'text-violet-600' };
      case 'design':
        return { bg: 'bg-pink-100', text: 'text-pink-600' };
      default:
        return { bg: 'bg-emerald-100', text: 'text-emerald-600' };
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Projekte</h2>
          <p className="text-sm text-slate-500 mt-1">Verwalte deine Projekte und Dateien</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
              <FolderPlus className="w-4 h-4 mr-2" />
              Neues Projekt
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-slate-200 text-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-800">Neues Projekt erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-slate-600">Name</Label>
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Projektname"
                  className="bg-slate-50 border-slate-200 text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Beschreibung</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Projektbeschreibung"
                  className="bg-slate-50 border-slate-200 text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Typ</Label>
                <Select
                  value={newProject.type}
                  onValueChange={(value) => setNewProject({ ...newProject, type: value })}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={createProject}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              >
                Projekt erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade Projekte...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Folder className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500">Keine Projekte vorhanden</p>
            <p className="text-sm text-slate-400 mt-2">Erstelle dein erstes Projekt!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              const colors = getTypeColor(project.type);
              return (
                <Card
                  key={project.id}
                  className="bg-white border-slate-200 hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
                          {getTypeIcon(project.type)}
                        </div>
                        <div>
                          <CardTitle className="text-slate-700 text-base">{project.name}</CardTitle>
                          <p className="text-xs text-slate-400">{project.path}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteProject(project.id, project.name)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {project.description || 'Keine Beschreibung'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <File className="w-3 h-3" />
                        <span>{project._count?.files || 0} Dateien</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{project._count?.chats || 0} Chats</span>
                      </div>
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
