'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Zap
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

const CATEGORY_COLORS: Record<string, string> = {
  'ai': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'web': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'code': 'bg-green-500/20 text-green-400 border-green-500/30',
  'design': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'general': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
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
    <div className="flex-1 flex flex-col h-full p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-green-400">Skills</h2>
        <p className="text-sm text-green-600">Aktiviere und deaktiviere KI-Fähigkeiten</p>
      </div>

      {/* Skills List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="text-center py-12 text-green-600">Lade Skills...</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-3">
                  {category === 'ai' ? 'KI-Fähigkeiten' : 
                   category === 'web' ? 'Web & Suche' :
                   category === 'code' ? 'Code & Entwicklung' :
                   category === 'design' ? 'Design' : 'Allgemein'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categorySkills.map((skill) => {
                    const Icon = SKILL_ICONS[skill.id] || Sparkles;
                    return (
                      <Card
                        key={skill.id}
                        className={`bg-gray-900/50 transition-all ${
                          skill.enabled 
                            ? 'border-green-500/50' 
                            : 'border-green-900/50 opacity-60'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                skill.enabled 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-gray-800 text-green-600'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-green-400">{skill.name}</h4>
                                <p className="text-xs text-green-600 mt-1">{skill.description}</p>
                              </div>
                            </div>
                            <Switch
                              checked={skill.enabled}
                              onCheckedChange={() => toggleSkill(skill.id, skill.enabled)}
                              className="data-[state=checked]:bg-green-500"
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
      <div className="mt-4 pt-4 border-t border-green-900/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600">
            {skills.filter(s => s.enabled).length} von {skills.length} Skills aktiv
          </span>
          <Badge variant="outline" className="border-green-900/50 text-green-600">
            <Zap className="w-3 h-3 mr-1" />
            Alle bereit
          </Badge>
        </div>
      </div>
    </div>
  );
}
