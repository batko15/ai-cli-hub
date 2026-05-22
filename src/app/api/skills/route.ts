import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Define available skills
const AVAILABLE_SKILLS = [
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
    id: 'web-search',
    name: 'Web Search',
    description: 'Websuche und Informationsbeschaffung',
    category: 'web',
    enabled: true,
  },
  {
    id: 'code-gen',
    name: 'Code Generation',
    description: 'Automatische Codegenerierung und -analyse',
    category: 'code',
    enabled: true,
  },
  {
    id: 'design',
    name: 'Design Assistant',
    description: 'UI/UX Design und Styling-Hilfe',
    category: 'design',
    enabled: true,
  },
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
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Datenanalyse und Visualisierung',
    category: 'code',
    enabled: true,
  },
];

export async function GET() {
  try {
    // Get skills from database
    let dbSkills = await db.skill.findMany();

    // If no skills in DB, initialize with default skills
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
