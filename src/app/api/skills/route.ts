import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Extended skills based on analysis of SuperAGI, Claude Context, Composio, Anthropic skills
const AVAILABLE_SKILLS = [
  // AI Core Skills
  {
    id: 'llm',
    name: 'LLM Chat',
    description: 'Large Language Model für Konversationen und Textgenerierung',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'vlm',
    name: 'Vision Analysis',
    description: 'Bildanalyse und visuelles Verständnis mit AI',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'image-gen',
    name: 'Image Generation',
    description: 'KI-gestützte Bilderstellung aus Textbeschreibungen',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'video-gen',
    name: 'Video Generation',
    description: 'KI-gestützte Videoerstellung aus Text oder Bildern',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'tts',
    name: 'Text to Speech',
    description: 'Text-zu-Sprache Konvertierung',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'asr',
    name: 'Speech Recognition',
    description: 'Sprach-zu-Text Transkription',
    category: 'ai',
    enabled: true,
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    description: 'Schrittweises Denken für komplexe Probleme',
    category: 'ai',
    enabled: true,
  },

  // Web Skills
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Websuche und Informationsbeschaffung',
    category: 'web',
    enabled: true,
  },
  {
    id: 'web-reader',
    name: 'Web Reader',
    description: 'Webseiten-Inhalte extrahieren und analysieren',
    category: 'web',
    enabled: true,
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    description: 'Tiefgehende mehrstufige Recherche',
    category: 'web',
    enabled: true,
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Externe APIs verbinden und nutzen',
    category: 'web',
    enabled: true,
  },

  // Code Skills
  {
    id: 'code-gen',
    name: 'Code Generation',
    description: 'Automatische Codegenerierung',
    category: 'code',
    enabled: true,
  },
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Code-Analyse und Verbesserungsvorschläge',
    category: 'code',
    enabled: true,
  },
  {
    id: 'code-debug',
    name: 'Code Debugging',
    description: 'Fehleranalyse und Bug-Fixing',
    category: 'code',
    enabled: true,
  },
  {
    id: 'code-explain',
    name: 'Code Explanation',
    description: 'Code erklären und dokumentieren',
    category: 'code',
    enabled: true,
  },
  {
    id: 'refactoring',
    name: 'Code Refactoring',
    description: 'Code optimieren und restrukturieren',
    category: 'code',
    enabled: true,
  },
  {
    id: 'test-gen',
    name: 'Test Generation',
    description: 'Unit Tests und Integrationstests generieren',
    category: 'code',
    enabled: true,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Datenanalyse und Visualisierung',
    category: 'code',
    enabled: true,
  },

  // Design Skills
  {
    id: 'design',
    name: 'Design Assistant',
    description: 'UI/UX Design und Styling-Hilfe',
    category: 'design',
    enabled: true,
  },
  {
    id: 'ui-gen',
    name: 'UI Generation',
    description: 'Benutzeroberflächen generieren',
    category: 'design',
    enabled: true,
  },
  {
    id: 'diagram',
    name: 'Diagram Creation',
    description: 'Flowcharts, UML und Diagramme erstellen',
    category: 'design',
    enabled: true,
  },

  // General Skills
  {
    id: 'research',
    name: 'Research Agent',
    description: 'Tiefgehende Recherche und Zusammenfassungen',
    category: 'general',
    enabled: true,
  },
  {
    id: 'translate',
    name: 'Translation',
    description: 'Mehrsprachige Übersetzungen',
    category: 'general',
    enabled: true,
  },
  {
    id: 'summarize',
    name: 'Summarization',
    description: 'Textzusammenfassung und Extraktion',
    category: 'general',
    enabled: true,
  },
  {
    id: 'document-gen',
    name: 'Document Generation',
    description: 'Dokumente erstellen (PDF, DOCX, etc.)',
    category: 'general',
    enabled: true,
  },
  {
    id: 'spreadsheet',
    name: 'Spreadsheet Operations',
    description: 'Excel/CSV Dateien erstellen und bearbeiten',
    category: 'general',
    enabled: true,
  },
  {
    id: 'presentation',
    name: 'Presentation Creator',
    description: 'Präsentationen erstellen',
    category: 'general',
    enabled: true,
  },
  {
    id: 'task-planning',
    name: 'Task Planning',
    description: 'Aufgaben planen und organisieren',
    category: 'general',
    enabled: true,
  },
  {
    id: 'memory',
    name: 'Persistent Memory',
    description: 'Langzeitgedächtnis für Konversationen',
    category: 'general',
    enabled: true,
  },
];

export async function GET() {
  try {
    // Get skills from database
    let dbSkills = await db.skill.findMany();

    // If no skills in DB, initialize with all skills
    if (dbSkills.length === 0) {
      await db.skill.createMany({
        data: AVAILABLE_SKILLS.map(skill => ({
          name: skill.id,
          description: skill.description,
          category: skill.category,
          config: '{}',
          enabled: skill.enabled,
        })),
      });
      dbSkills = await db.skill.findMany();
    }

    // Merge with available skills definition
    const skills = AVAILABLE_SKILLS.map(skill => {
      const dbSkill = dbSkills.find(s => s.name === skill.id);
      return {
        ...skill,
        dbId: dbSkill?.id,
        enabled: dbSkill?.enabled ?? skill.enabled,
      };
    });

    return NextResponse.json({
      success: true,
      skills,
      categories: ['ai', 'web', 'code', 'design', 'general'],
      total: skills.length,
      enabled: skills.filter(s => s.enabled).length,
    });
  } catch (error: any) {
    console.error('Get skills error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, enabled } = body;

    if (!skillId) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    const skill = await db.skill.update({
      where: { name: skillId },
      data: { enabled },
    });

    return NextResponse.json({
      success: true,
      skill,
    });
  } catch (error: any) {
    console.error('Update skill error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
