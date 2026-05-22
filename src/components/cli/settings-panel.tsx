'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Moon, 
  Sun, 
  Cpu, 
  Globe, 
  Bell, 
  Shield,
  Database,
  Key,
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export function SettingsPanel() {
  const { addTerminalOutput, theme, toggleTheme, selectedModel, setSelectedModel } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  const handleReset = () => {
    addTerminalOutput('[Settings] Reset to defaults...');
    setNotifications(true);
    setAutoSave(true);
    setSoundEffects(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full p-4 overflow-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-green-400">Einstellungen</h2>
          <p className="text-sm text-green-600">Konfiguriere dein AI-CLI</p>
        </div>

        {/* Appearance */}
        <Card className="bg-gray-900/50 border-green-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-green-400" />
              ) : (
                <Sun className="w-5 h-5 text-green-400" />
              )}
              <CardTitle className="text-green-400 text-base">Darstellung</CardTitle>
            </div>
            <CardDescription className="text-green-600">
              Passe das Erscheinungsbild an
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Dark Mode</Label>
                <p className="text-xs text-green-600">Terminal-Styling aktivieren</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Sound-Effekte</Label>
                <p className="text-xs text-green-600">Töne bei Aktionen abspielen</p>
              </div>
              <Switch
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card className="bg-gray-900/50 border-green-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-400" />
              <CardTitle className="text-green-400 text-base">KI-Modell</CardTitle>
            </div>
            <CardDescription className="text-green-600">
              Wähle das KI-Modell für deine Anfragen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-green-400">Modell</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-gray-900 border-green-900/50 text-green-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-green-900/50 text-green-400">
                  <SelectItem value="default">Default (Automatisch)</SelectItem>
                  <SelectItem value="fast">Fast (Schnell)</SelectItem>
                  <SelectItem value="smart">Smart (Intelligent)</SelectItem>
                  <SelectItem value="creative">Creative (Kreativ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Automatisch speichern</Label>
                <p className="text-xs text-green-600">Chats automatisch speichern</p>
              </div>
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-900/50 border-green-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-green-400" />
              <CardTitle className="text-green-400 text-base">Benachrichtigungen</CardTitle>
            </div>
            <CardDescription className="text-green-600">
              Verwalte deine Benachrichtigungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Push-Benachrichtigungen</Label>
                <p className="text-xs text-green-600">Benachrichtigungen erhalten</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-gray-900/50 border-green-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <CardTitle className="text-green-400 text-base">Daten & Privatsphäre</CardTitle>
            </div>
            <CardDescription className="text-green-600">
              Verwalte deine Daten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Chat-Verlauf</Label>
                <p className="text-xs text-green-600">Lokal gespeicherte Chats</p>
              </div>
              <Badge variant="outline" className="border-green-900/50 text-green-600">
                0 Chats
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-green-400">Generierte Bilder</Label>
                <p className="text-xs text-green-600">Generierte Bilder speichern</p>
              </div>
              <Badge variant="outline" className="border-green-900/50 text-green-600">
                0 Bilder
              </Badge>
            </div>
            <Separator className="bg-green-900/50" />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-green-900/50 text-green-400 hover:bg-green-500/10"
              >
                <Database className="w-4 h-4 mr-2" />
                Daten exportieren
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-900/50 text-red-400 hover:bg-red-500/10"
              >
                Alle Daten löschen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Status */}
        <Card className="bg-gray-900/50 border-green-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              <CardTitle className="text-green-400 text-base">API Status</CardTitle>
            </div>
            <CardDescription className="text-green-600">
              Status der verbundenen Dienste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'LLM Chat', status: 'online' },
                { name: 'Vision', status: 'online' },
                { name: 'Image Gen', status: 'online' },
                { name: 'Web Search', status: 'online' },
              ].map((api) => (
                <div key={api.name} className="flex items-center justify-between">
                  <span className="text-green-400">{api.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600">{api.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reset */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-green-900/50 text-green-400 hover:bg-green-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>

        {/* Version */}
        <div className="text-center text-xs text-green-700 pb-4">
          AI-CLI v1.0.0 | Powered by z-ai-web-dev-sdk
        </div>
      </div>
    </div>
  );
}
