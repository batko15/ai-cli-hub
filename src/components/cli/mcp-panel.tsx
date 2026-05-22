'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Server, 
  RefreshCw,
  Info,
  Database,
  Brain,
  Search,
  MessageSquare,
  Map,
  Play,
  Globe,
  Loader2
} from 'lucide-react';

interface MCPServer {
  id: string;
  name: string;
  description?: string;
  type: string;
  command?: string;
  url?: string;
  config: string;
  enabled: boolean;
}

const SERVER_ICONS: Record<string, any> = {
  'filesystem': Database,
  'github': Globe,
  'memory': Brain,
  'sequential-thinking': Brain,
  'postgres': Database,
  'playwright': Play,
  'brave-search': Search,
  'slack': MessageSquare,
  'google-maps': Map,
  'default': Server,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'filesystem': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  'github': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  'memory': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  'search': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'browser': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  'communication': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'default': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
};

export function MCPPanel() {
  const { addTerminalOutput } = useAppStore();
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServers = async () => {
    try {
      const res = await fetch('/api/mcp');
      const data = await res.json();
      if (data.success) {
        setServers(data.servers);
      }
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to fetch MCP servers: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const toggleServer = async (id: string, currentEnabled: boolean, name: string) => {
    try {
      await fetch('/api/mcp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, enabled: !currentEnabled }),
      });
      setServers(servers.map(s => 
        s.id === id ? { ...s, enabled: !currentEnabled } : s
      ));
      addTerminalOutput(`[MCP] ${!currentEnabled ? 'Enabled' : 'Disabled'}: ${name}`);
    } catch (error: any) {
      addTerminalOutput(`[Error] Failed to toggle server: ${error.message}`);
    }
  };

  const getServerIcon = (name: string) => {
    return SERVER_ICONS[name] || SERVER_ICONS['default'];
  };

  const getCategoryColor = (name: string) => {
    return CATEGORY_COLORS[name] || CATEGORY_COLORS['default'];
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">MCP Servers</h2>
          <p className="text-sm text-slate-500 mt-1">Model Context Protocol Integration</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchServers}
            className="border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Info className="w-4 h-4" />
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Was ist MCP?</p>
              <p className="text-blue-600">Model Context Protocol ermöglicht die Integration externer Tools und Datenquellen. 
              Aktiviere Server um zusätzliche Fähigkeiten freizuschalten.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Servers List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade MCP Server...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servers.map((server) => {
              const Icon = getServerIcon(server.name);
              const colors = getCategoryColor(server.name);
              return (
                <Card
                  key={server.id}
                  className={`bg-white transition-all hover:shadow-md ${
                    server.enabled 
                      ? `border-2 ${colors.border}` 
                      : 'border-slate-200 opacity-70'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${
                          server.enabled 
                            ? `${colors.bg} ${colors.text}` 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-700">{server.name}</h3>
                          <p className="text-xs text-slate-500">{server.description || 'Keine Beschreibung'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs ${colors.bg} ${colors.text} ${colors.border}`}>
                          {server.type}
                        </Badge>
                        <Switch
                          checked={server.enabled}
                          onCheckedChange={() => toggleServer(server.id, server.enabled, server.name)}
                          className="data-[state=checked]:bg-blue-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{servers.filter(s => s.enabled).length}</span> von {servers.length} Servern aktiv
          </span>
          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
            <Server className="w-3 h-3 mr-1" />
            MCP Ready
          </Badge>
        </div>
      </div>
    </div>
  );
}
