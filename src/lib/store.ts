import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  path: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  content?: string;
  type: 'file' | 'folder';
  language?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  steps: any[];
  trigger: string;
  active: boolean;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
  type: string;
  skills: string[];
  active: boolean;
}

export interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
}

interface AppState {
  // Current view
  activeView: 'chat' | 'skills' | 'mcp' | 'code' | 'projects' | 'workflows' | 'agents' | 'settings';
  setActiveView: (view: 'chat' | 'skills' | 'mcp' | 'code' | 'projects' | 'workflows' | 'agents' | 'settings') => void;

  // Chat state
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Projects
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;

  // Files
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  currentFile: FileItem | null;
  setCurrentFile: (file: FileItem | null) => void;

  // Workflows
  workflows: Workflow[];
  setWorkflows: (workflows: Workflow[]) => void;

  // Agents
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;

  // Search results
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;

  // Generated images
  generatedImages: string[];
  addGeneratedImage: (image: string) => void;

  // Settings
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;

  // Terminal output
  terminalOutput: string[];
  addTerminalOutput: (output: string) => void;
  clearTerminal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // View
  activeView: 'chat',
  setActiveView: (view) => set({ activeView: view }),

  // Chat
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Projects
  projects: [],
  setProjects: (projects) => set({ projects }),
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),

  // Files
  files: [],
  setFiles: (files) => set({ files }),
  currentFile: null,
  setCurrentFile: (file) => set({ currentFile: file }),

  // Workflows
  workflows: [],
  setWorkflows: (workflows) => set({ workflows }),

  // Agents
  agents: [],
  setAgents: (agents) => set({ agents }),

  // Search
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  // Images
  generatedImages: [],
  addGeneratedImage: (image) =>
    set((state) => ({
      generatedImages: [...state.generatedImages, image],
    })),

  // Settings
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  selectedModel: 'default',
  setSelectedModel: (model) => set({ selectedModel: model }),

  // Terminal
  terminalOutput: [],
  addTerminalOutput: (output) =>
    set((state) => ({
      terminalOutput: [...state.terminalOutput, output],
    })),
  clearTerminal: () => set({ terminalOutput: [] }),
}));
