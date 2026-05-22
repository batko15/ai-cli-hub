'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Terminal, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export function TerminalPanel() {
  const { terminalOutput, clearTerminal } = useAppStore();
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <div className="h-10 bg-gray-950 border-t border-green-900/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-600">Terminal ({terminalOutput.length} lines)</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(true)}
          className="text-green-600 hover:text-green-400 hover:bg-green-500/10 h-6"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-48 bg-gray-950 border-t border-green-900/50 flex flex-col">
      {/* Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-green-900/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-600">Terminal Output</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTerminal}
            className="text-green-600 hover:text-green-400 hover:bg-green-500/10 h-6"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(false)}
            className="text-green-600 hover:text-green-400 hover:bg-green-500/10 h-6"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1 font-mono text-xs">
          <div className="text-green-500">AI-CLI Terminal v1.0.0</div>
          <div className="text-green-600">──────────────────────────────────</div>
          {terminalOutput.length === 0 ? (
            <div className="text-green-700">Bereit für Eingabe...</div>
          ) : (
            terminalOutput.map((output, index) => (
              <div key={index} className="text-green-400">
                {output}
              </div>
            ))
          )}
          <div className="flex items-center gap-1 text-green-400">
            <span className="animate-pulse">▌</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
