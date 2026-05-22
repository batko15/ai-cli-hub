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
  Code, 
  Wand2, 
  Copy,
  Check,
  Sparkles,
  Globe,
  FileImage,
  Bot,
  User
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    { id: 'chat', label: 'Chat', icon: Sparkles, color: 'violet' },
    { id: 'search', label: 'Search', icon: Globe, color: 'blue' },
    { id: 'image', label: 'Image', icon: FileImage, color: 'pink' },
    { id: 'vision', label: 'Vision', icon: ImageIcon, color: 'emerald' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Mode Selector */}
      <div className="border-b border-slate-200 p-3 flex items-center gap-2 bg-white/80 backdrop-blur-sm">
        {modeButtons.map((btn) => (
          <Button
            key={btn.id}
            variant={mode === btn.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode(btn.id as any)}
            className={`gap-2 ${
              mode === btn.id
                ? `bg-${btn.color}-500 text-white shadow-lg shadow-${btn.color}-500/25 hover:bg-${btn.color}-600`
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            style={mode === btn.id ? { 
              backgroundColor: btn.color === 'violet' ? '#8b5cf6' : btn.color === 'blue' ? '#3b82f6' : btn.color === 'pink' ? '#ec4899' : '#10b981',
            } : {}}
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
                <Wand2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">Willkommen bei AI-CLI</h2>
              <p className="text-slate-500 text-sm mb-8">
                Dein KI-Terminal-Assistent mit allen Skills
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center mb-3">
                    <Code className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Code schreiben</p>
                  <p className="text-xs text-slate-500 mt-1">Code analysieren & erstellen</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Web-Suche</p>
                  <p className="text-xs text-slate-500 mt-1">Recherche & Informationen</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Bilder erstellen</p>
                  <p className="text-xs text-slate-500 mt-1">KI-Bildgenerierung</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Bilder analysieren</p>
                  <p className="text-xs text-slate-500 mt-1">Vision Understanding</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white ml-8 shadow-lg shadow-violet-500/25'
                  : 'bg-white border border-slate-200 mr-8 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-white/20 text-white'
                      : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                  }`}
                >
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs mb-2 font-medium ${
                    message.role === 'user' ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {message.role === 'user' ? 'Du' : 'AI-CLI'}
                  </div>
                  <div className={`prose max-w-none ${message.role === 'user' ? 'prose-invert' : ''}`}>
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const codeString = String(children).replace(/\n$/, '');
                          const id = `code-${message.id}-${Math.random().toString(36).substr(2, 9)}`;
                          
                          return match ? (
                            <div className="relative group">
                              <SyntaxHighlighter
                                style={oneLight}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg !bg-slate-50 border border-slate-200"
                              >
                                {codeString}
                              </SyntaxHighlighter>
                              <button
                                onClick={() => copyToClipboard(codeString, id)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
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
                              className="max-w-full rounded-xl border border-slate-200 shadow-sm"
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
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="text-slate-500">Verarbeite...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-slate-200 p-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {mode === 'vision' && (
            <div className="mb-3">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Bild-URL eingeben (oder Base64 data:image/...)"
                className="bg-slate-50 border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-violet-500 focus:ring-violet-500"
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
              className="bg-slate-50 border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-violet-500 focus:ring-violet-500"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && mode !== 'vision')}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:opacity-90"
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
