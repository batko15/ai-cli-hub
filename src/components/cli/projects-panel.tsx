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
  ExternalLink,
  Code,
  Globe,
  Database,
  Palette,
  MoreVertical
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
        return 'text-blue-400 bg-blue-500/20';
      case 'api':
        return 'text-purple-400 bg-purple-500/20';
      case 'design':
        return 'text-pink-400 bg-pink-500/20';
      default:
        return 'text-green-400 bg-green-500/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-green-400">Projekte</h2>
          <p className="text-sm text-green-600">Verwalte deine Projekte und Dateien</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
              <FolderPlus className="w-4 h-4 mr-2" />
              Neues Projekt
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-950 border-green-900/50 text-green-400">
            <DialogHeader>
              <DialogTitle>Neues Projekt erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-green-600">Name</Label>
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Projektname"
                  className="bg-gray-900 border-green-900/50 text-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-green-600">Beschreibung</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Projektbeschreibung"
                  className="bg-gray-900 border-green-900/50 text-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-green-600">Typ</Label>
                <Select
                  value={newProject.type}
                  onValueChange={(value) => setNewProject({ ...newProject, type: value })}
                >
                  <SelectTrigger className="bg-gray-900 border-green-900/50 text-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-green-900/50 text-green-400">
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
                className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
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
          <div className="text-center py-12 text-green-600">Lade Projekte...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto mb-4 text-green-700" />
            <p className="text-green-600">Keine Projekte vorhanden</p>
            <p className="text-sm text-green-700 mt-2">Erstelle dein erstes Projekt!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gray-900/50 border-green-900/50 hover:border-green-500/50 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(project.type)}`}>
                        {getTypeIcon(project.type)}
                      </div>
                      <div>
                        <CardTitle className="text-green-400 text-base">{project.name}</CardTitle>
                        <p className="text-xs text-green-600">{project.path}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id, project.name)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-600 mb-3 line-clamp-2">
                    {project.description || 'Keine Beschreibung'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-green-600">
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
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
