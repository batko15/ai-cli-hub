'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Terminal,
  RefreshCw,
  Info,
  Check,
  ExternalLink,
  Download,
  Play,
  Copy,
  CheckCheck,
  Loader2
} from 'lucide-react';
import {
  CLI_PROVIDERS,
  getEnabledCLIProviders,
  type CLIProvider,
} from '@/lib/cli/cli-providers-config';

const PLATFORM_ICONS: Record<string, string> = {
  'windows': '🪟',
  'linux': '🐧',
  'macos': '🍎',
  'termux': '📱',
};

const PROVIDER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'mistral-cli': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  'vibe-cli': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'gemini-cli': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'codex-cli': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'claude-cli': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  'deepseek-cli': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
  'default': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
};

export function CLIProvidersPanel() {
  const { addTerminalOutput } = useAppStore();
  const [providers, setProviders] = useState<CLIProvider[]>(CLI_PROVIDERS);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'linux' | 'termux'>('linux');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const toggleProvider = (id: string, currentEnabled: boolean, name: string) => {
    setProviders(providers.map(p => 
      p.id === id ? { ...p, enabled: !currentEnabled } : p
    ));
    addTerminalOutput(`[CLI Providers] ${!currentEnabled ? 'Enabled' : 'Disabled'}: ${name}`);
  };

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 2000);
      addTerminalOutput(`[Clipboard] Copied: ${command}`);
    } catch (error) {
      addTerminalOutput(`[Error] Failed to copy to clipboard`);
    }
  };

  const getProviderColor = (id: string) => {
    return PROVIDER_COLORS[id] || PROVIDER_COLORS.default;
  };

  const filteredProviders = providers.filter(p => p.platform.includes(selectedPlatform));

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CLI Providers</h2>
          <p className="text-sm text-slate-500 mt-1">Mistral CLI, Vibe CLI, Gemini CLI, Codex CLI & More</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProviders(CLI_PROVIDERS)}
            className="border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <Card className="bg-purple-50 border-purple-200 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <Info className="w-4 h-4" />
            </div>
            <div className="text-sm text-purple-700">
              <p className="font-medium mb-1">CLI Providers Integration</p>
              <p className="text-purple-600">Verbinde verschiedene AI-CLI-Tools wie Mistral CLI, Vibe CLI, Gemini CLI und mehr. 
              Kopiere die Installationsbefehle und starte direkt.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Tabs */}
      <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as any)} className="flex-1 flex flex-col">
        <TabsList className="bg-slate-100 p-1 mb-4">
          <TabsTrigger value="linux" className="flex items-center gap-2 px-4">
            <span>🐧</span>
            <span>Linux</span>
          </TabsTrigger>
          <TabsTrigger value="windows" className="flex items-center gap-2 px-4">
            <span>🪟</span>
            <span>Windows</span>
          </TabsTrigger>
          <TabsTrigger value="termux" className="flex items-center gap-2 px-4">
            <span>📱</span>
            <span>Termux</span>
          </TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
            <span className="ml-2 text-slate-500">Lade CLI Provider...</span>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {filteredProviders.map((provider) => {
                const colors = getProviderColor(provider.id);
                return (
                  <Card
                    key={provider.id}
                    className={`bg-white transition-all hover:shadow-md ${
                      provider.enabled 
                        ? `border-2 ${colors.border}` 
                        : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${
                            provider.enabled 
                              ? `${colors.bg} ${colors.text}` 
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            <Terminal className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-700">{provider.name}</h3>
                              {provider.enabled && (
                                <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border}`}>
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-500">{provider.description}</p>
                            {provider.website && (
                              <a 
                                href={provider.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {provider.website}
                              </a>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={provider.enabled}
                          onCheckedChange={() => toggleProvider(provider.id, provider.enabled, provider.name)}
                          className="data-[state=checked]:bg-purple-500"
                        />
                      </div>

                      {/* Install Command */}
                      <div className="bg-slate-900 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Install Command</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-slate-400 hover:text-white"
                            onClick={() => copyToClipboard(provider.installCommand)}
                          >
                            {copiedCommand === provider.installCommand ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                        <code className="text-sm text-emerald-400 font-mono">
                          {provider.installCommand}
                        </code>
                      </div>

                      {/* Run Command */}
                      <div className="bg-slate-900 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Run Command</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-slate-400 hover:text-white"
                            onClick={() => copyToClipboard(provider.runCommand)}
                          >
                            {copiedCommand === provider.runCommand ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                        <code className="text-sm text-cyan-400 font-mono">
                          {provider.runCommand}
                        </code>
                      </div>

                      {/* Models */}
                      <div className="flex flex-wrap gap-2">
                        {provider.models.slice(0, 4).map((model) => (
                          <Badge key={model.id} variant="outline" className="text-xs bg-slate-50">
                            {model.name}
                          </Badge>
                        ))}
                        {provider.models.length > 4 && (
                          <Badge variant="outline" className="text-xs bg-slate-50">
                            +{provider.models.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </Tabs>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{providers.filter(p => p.enabled).length}</span> von {providers.length} Providern aktiv
          </span>
          <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
            <Terminal className="w-3 h-3 mr-1" />
            CLI Ready
          </Badge>
        </div>
      </div>
    </div>
  );
}
