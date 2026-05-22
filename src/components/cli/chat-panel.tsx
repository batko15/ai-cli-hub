'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Loader2, 
  Image as ImageIcon, 
  Search, 
  Code, 
  Wand2, 
  Copy,
  Check,
  Sparkles,
  Globe,
  FileImage
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ChatPanel() {
  const { messages, addMessage, isLoading, setIsLoading, addTerminalOutput } = useAppStore();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'search' | 'image' | 'vision'>('chat');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && mode !== 'vision') return;
    if (mode === 'vision' && !imageUrl.trim()) return;
    if (isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({ role: 'user', content: mode === 'vision' ? `[Image Analysis] ${userMessage}` : userMessage });
    setIsLoading(true);
    addTerminalOutput(`[${new Date().toLocaleTimeString()}] Processing ${mode} request...`);

    try {
      let response = '';

      if (mode === 'chat') {
        // Chat with LLM
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();
        response = data.response || 'Keine Antwort erhalten.';
      } else if (mode === 'search') {
        // Web search
        addMessage({ role: 'user', content: `[Web Search] ${userMessage}` });
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userMessage, num: 5 }),
        });
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
          response = `## Suchergebnisse für "${userMessage}"\n\n`;
          data.results.forEach((result: any, i: number) => {
            response += `### ${i + 1}. ${result.name}\n`;
            response += `**URL:** ${result.url}\n\n`;
            response += `${result.snippet}\n\n---\n\n`;
          });
        } else {
          response = 'Keine Suchergebnisse gefunden.';
        }
      } else if (mode === 'image') {
        // Generate image
        addMessage({ role: 'user', content: `[Image Generation] ${userMessage}` });
        const res = await fetch('/api/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userMessage, size: '1024x1024' }),
        });
        const data = await res.json();
        
        if (data.success && data.image) {
          response = `![Generated Image](data:image/png;base64,${data.image})`;
          addTerminalOutput(`[${new Date().toLocaleTimeString()}] Image generated successfully!`);
        } else {
          response = 'Bild konnte nicht generiert werden.';
        }
      } else if (mode === 'vision') {
        // Vision analysis
        const res = await fetch('/api/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: imageUrl,
            question: userMessage || 'Was ist in diesem Bild?',
          }),
        });
        const data = await res.json();
        response = data.analysis || 'Bild konnte nicht analysiert werden.';
        setImageUrl('');
      }

      addMessage({ role: 'assistant', content: response });
      addTerminalOutput(`[${new Date().toLocaleTimeString()}] Response received.`);
    } catch (error: any) {
      addMessage({ role: 'assistant', content: `Fehler: ${error.message}` });
      addTerminalOutput(`[${new Date().toLocaleTimeString()}] Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const modeButtons = [
    { id: 'chat', label: 'Chat', icon: Sparkles },
    { id: 'search', label: 'Search', icon: Globe },
    { id: 'image', label: 'Image', icon: FileImage },
    { id: 'vision', label: 'Vision', icon: ImageIcon },
  ];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Mode Selector */}
      <div className="border-b border-green-900/50 p-3 flex items-center gap-2 bg-gray-950/50">
        {modeButtons.map((btn) => (
          <Button
            key={btn.id}
            variant={mode === btn.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode(btn.id as any)}
            className={`gap-2 ${
              mode === btn.id
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                : 'text-green-600 hover:text-green-400 hover:bg-green-500/10'
            }`}
          >
            <btn.icon className="w-4 h-4" />
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-green-400 mb-2">Willkommen bei AI-CLI</h2>
              <p className="text-green-600 text-sm mb-6">
                Dein KI-Terminal-Assistent mit allen Skills
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                <div className="p-3 rounded-lg border border-green-900/50 bg-green-500/5 text-left">
                  <Code className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-xs text-green-600">Code schreiben & analysieren</p>
                </div>
                <div className="p-3 rounded-lg border border-green-900/50 bg-green-500/5 text-left">
                  <Globe className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-xs text-green-600">Web-Suche & Recherche</p>
                </div>
                <div className="p-3 rounded-lg border border-green-900/50 bg-green-500/5 text-left">
                  <FileImage className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-xs text-green-600">Bilder generieren</p>
                </div>
                <div className="p-3 rounded-lg border border-green-900/50 bg-green-500/5 text-left">
                  <ImageIcon className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-xs text-green-600">Bilder analysieren</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border ${
                message.role === 'user'
                  ? 'bg-green-500/10 border-green-500/30 ml-8'
                  : 'bg-gray-900/50 border-green-900/50 mr-8'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-800 text-green-400'
                  }`}
                >
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-green-600 mb-2">
                    {message.role === 'user' ? 'Du' : 'AI-CLI'}
                  </div>
                  <div className="prose prose-invert prose-green max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const codeString = String(children).replace(/\n$/, '');
                          const id = `code-${message.id}-${Math.random().toString(36).substr(2, 9)}`;
                          
                          return match ? (
                            <div className="relative group">
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg !bg-gray-900"
                              >
                                {codeString}
                              </SyntaxHighlighter>
                              <button
                                onClick={() => copyToClipboard(codeString, id)}
                                className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {copiedId === id ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        img({ src, alt }) {
                          return (
                            <img
                              src={src}
                              alt={alt || 'Generated image'}
                              className="max-w-full rounded-lg border border-green-900/50"
                            />
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-900/50 border border-green-900/50">
              <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
              <span className="text-green-600">Verarbeite...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-green-900/50 p-4 bg-gray-950/50">
        <div className="max-w-4xl mx-auto">
          {mode === 'vision' && (
            <div className="mb-3">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Bild-URL eingeben (oder Base64 data:image/...)"
                className="bg-gray-900 border-green-900/50 text-green-400 placeholder:text-green-700 focus:border-green-500"
              />
            </div>
          )}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={
                mode === 'chat'
                  ? 'Nachricht eingeben...'
                  : mode === 'search'
                  ? 'Suchbegriff eingeben...'
                  : mode === 'image'
                  ? 'Bild-Prompt eingeben...'
                  : 'Frage zum Bild...'
              }
              className="bg-gray-900 border-green-900/50 text-green-400 placeholder:text-green-700 focus:border-green-500"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && mode !== 'vision')}
              className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
