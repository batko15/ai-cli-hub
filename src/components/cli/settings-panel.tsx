'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Moon, 
  Sun, 
  Cpu, 
  Globe, 
  Bell, 
  Shield,
  Database,
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
    <div className="flex-1 flex flex-col h-full p-6 overflow-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Einstellungen</h2>
          <p className="text-sm text-slate-500 mt-1">Konfiguriere dein AI-CLI</p>
        </div>

        {/* Appearance */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-violet-600" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <CardTitle className="text-slate-700 text-base">Darstellung</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Passe das Erscheinungsbild an
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Dark Mode</Label>
                <p className="text-xs text-slate-500">Terminal-Styling aktivieren</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-violet-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Sound-Effekte</Label>
                <p className="text-xs text-slate-500">Töne bei Aktionen abspielen</p>
              </div>
              <Switch
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
                className="data-[state=checked]:bg-violet-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-slate-700 text-base">KI-Modell</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Wähle das KI-Modell für deine Anfragen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Modell</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="default">Default (Automatisch)</SelectItem>
                  <SelectItem value="fast">Fast (Schnell)</SelectItem>
                  <SelectItem value="smart">Smart (Intelligent)</SelectItem>
                  <SelectItem value="creative">Creative (Kreativ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Automatisch speichern</Label>
                <p className="text-xs text-slate-500">Chats automatisch speichern</p>
              </div>
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
                className="data-[state=checked]:bg-violet-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-slate-700 text-base">Benachrichtigungen</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Verwalte deine Benachrichtigungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Push-Benachrichtigungen</Label>
                <p className="text-xs text-slate-500">Benachrichtigungen erhalten</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-violet-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-slate-700 text-base">Daten & Privatsphäre</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Verwalte deine Daten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Chat-Verlauf</Label>
                <p className="text-xs text-slate-500">Lokal gespeicherte Chats</p>
              </div>
              <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                0 Chats
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Generierte Bilder</Label>
                <p className="text-xs text-slate-500">Generierte Bilder speichern</p>
              </div>
              <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                0 Bilder
              </Badge>
            </div>
            <Separator className="bg-slate-200" />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Database className="w-4 h-4 mr-2" />
                Daten exportieren
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                Alle Daten löschen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Status */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-slate-700 text-base">API Status</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
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
                  <span className="text-slate-600">{api.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">{api.status}</span>
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
            className="border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>

        {/* Version */}
        <div className="text-center text-xs text-slate-400 pb-4">
          AI-CLI v1.0.0 | Powered by z-ai-web-dev-sdk
        </div>
      </div>
    </div>
  );
}
