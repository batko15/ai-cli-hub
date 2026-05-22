import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const agents = await db.agent.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      agents,
    });
  } catch (error: any) {
    console.error('Get agents error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type = 'general', skills = [], config = {} } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const agent = await db.agent.create({
      data: {
        name,
        description,
        type,
        skills: JSON.stringify(skills),
        config: JSON.stringify(config),
      },
    });

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (error: any) {
    console.error('Create agent error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, type, skills, config, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (skills !== undefined) updateData.skills = JSON.stringify(skills);
    if (config !== undefined) updateData.config = JSON.stringify(config);
    if (active !== undefined) updateData.active = active;

    const agent = await db.agent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (error: any) {
    console.error('Update agent error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    await db.agent.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Agent deleted',
    });
  } catch (error: any) {
    console.error('Delete agent error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
