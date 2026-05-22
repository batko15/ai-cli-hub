'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Sparkles,
  MessageSquare,
  Image,
  Globe,
  Code,
  Palette,
  Search,
  Languages,
  FileText,
  BarChart3,
  Zap,
  Loader2
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  dbId?: string;
}

const SKILL_ICONS: Record<string, any> = {
  'llm': MessageSquare,
  'vlm': Image,
  'image-gen': Image,
  'web-search': Globe,
  'code-gen': Code,
  'design': Palette,
  'research': Search,
  'translate': Languages,
  'summarize': FileText,
  'data-analysis': BarChart3,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'ai': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  'web': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'code': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'design': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
  'general': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
};

export function SkillsPanel() {
  const { addTerminalOutput } = useAppStore();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to fetch skills: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const toggleSkill = async (skillId: string, currentEnabled: boolean) => {
    try {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, enabled: !currentEnabled }),
      });
      setSkills(skills.map(s => 
        s.id === skillId ? { ...s, enabled: !currentEnabled } : s
      ));
      addTerminalOutput(`[Skill] ${!currentEnabled ? 'Enabled' : 'Disabled'}: ${skillId}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to toggle skill: ${error.message}`);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Skills</h2>
        <p className="text-sm text-slate-500 mt-1">Aktiviere und deaktiviere KI-Fähigkeiten</p>
      </div>

      {/* Skills List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade Skills...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    category === 'ai' ? 'bg-violet-500' : 
                    category === 'web' ? 'bg-blue-500' :
                    category === 'code' ? 'bg-emerald-500' :
                    category === 'design' ? 'bg-pink-500' : 'bg-slate-400'
                  }`} />
                  {category === 'ai' ? 'KI-Fähigkeiten' : 
                   category === 'web' ? 'Web & Suche' :
                   category === 'code' ? 'Code & Entwicklung' :
                   category === 'design' ? 'Design' : 'Allgemein'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => {
                    const Icon = SKILL_ICONS[skill.id] || Sparkles;
                    const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.general;
                    return (
                      <Card
                        key={skill.id}
                        className={`bg-white transition-all hover:shadow-md ${
                          skill.enabled 
                            ? `border-2 ${colors.border} shadow-sm` 
                            : 'border-slate-200 opacity-70'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                skill.enabled 
                                  ? `${colors.bg} ${colors.text}` 
                                  : 'bg-slate-100 text-slate-400'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-700">{skill.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{skill.description}</p>
                              </div>
                            </div>
                            <Switch
                              checked={skill.enabled}
                              onCheckedChange={() => toggleSkill(skill.id, skill.enabled)}
                              className="data-[state=checked]:bg-violet-500"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{skills.filter(s => s.enabled).length}</span> von {skills.length} Skills aktiv
          </span>
          <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
            <Zap className="w-3 h-3 mr-1" />
            Alle bereit
          </Badge>
        </div>
      </div>
    </div>
  );
}
