'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Server, 
  Plus, 
  RefreshCw,
  Terminal,
  Globe,
  Database,
  Brain,
  Search,
  MessageSquare,
  Map,
  Play,
  Settings
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

const CATEGORY_COLORS: Record<string, string> = {
  'filesystem': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'github': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'memory': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'search': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'browser': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'communication': 'bg-green-500/20 text-green-400 border-green-500/30',
  'default': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
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
    <div className="flex-1 flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-green-400">MCP Servers</h2>
          <p className="text-sm text-green-600">Model Context Protocol Integration</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchServers}
            className="border-green-900/50 text-green-400 hover:bg-green-500/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <Card className="bg-gray-900/30 border-green-900/50 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-green-400 mt-0.5" />
            <div className="text-sm text-green-600">
              <p className="font-medium text-green-400 mb-1">Was ist MCP?</p>
              <p>Model Context Protocol ermöglicht die Integration externer Tools und Datenquellen. 
              Aktiviere Server um zusätzliche Fähigkeiten freizuschalten.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Servers List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="text-center py-12 text-green-600">Lade MCP Server...</div>
        ) : (
          <div className="space-y-3">
            {servers.map((server) => {
              const Icon = getServerIcon(server.name);
              return (
                <Card
                  key={server.id}
                  className={`bg-gray-900/50 transition-all ${
                    server.enabled 
                      ? 'border-green-500/50' 
                      : 'border-green-900/50 opacity-60'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          server.enabled 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-800 text-green-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-400">{server.name}</h3>
                          <p className="text-xs text-green-600">{server.description || 'Keine Beschreibung'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(server.name)}`}>
                          {server.type}
                        </Badge>
                        <Switch
                          checked={server.enabled}
                          onCheckedChange={() => toggleServer(server.id, server.enabled, server.name)}
                          className="data-[state=checked]:bg-green-500"
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
      <div className="mt-4 pt-4 border-t border-green-900/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600">
            {servers.filter(s => s.enabled).length} von {servers.length} Servern aktiv
          </span>
          <Badge variant="outline" className="border-green-900/50 text-green-600">
            <Server className="w-3 h-3 mr-1" />
            MCP Ready
          </Badge>
        </div>
      </div>
    </div>
  );
}
