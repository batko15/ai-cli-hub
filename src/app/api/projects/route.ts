import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: { status: 'active' },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { files: true, chats: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error: any) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type = 'general' } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const path = `/${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    const project = await db.project.create({
      data: {
        name,
        description,
        path,
        type,
      },
    });

    // Create default files
    await db.file.create({
      data: {
        name: 'README.md',
        path: '/README.md',
        content: `# ${name}\n\n${description || 'Ein neues Projekt.'}`,
        type: 'file',
        language: 'markdown',
        projectId: project.id,
      },
    });

    await db.file.create({
      data: {
        name: 'src',
        path: '/src',
        type: 'folder',
        projectId: project.id,
      },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error: any) {
    console.error('Create project error:', error);
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
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await db.project.update({
      where: { id },
      data: { status: 'deleted' },
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted',
    });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
