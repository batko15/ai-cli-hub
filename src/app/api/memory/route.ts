import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Memory API for persistent storage across sessions

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const category = searchParams.get('category');
    const key = searchParams.get('key');

    if (key && sessionId) {
      // Get specific memory
      const memory = await db.conversationMemory.findFirst({
        where: { sessionId, key },
      });
      return NextResponse.json({
        success: true,
        memory,
      });
    }

    if (sessionId) {
      // Get all memories for session
      const memories = await db.conversationMemory.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({
        success: true,
        memories,
        total: memories.length,
      });
    }

    if (category) {
      // Get memories by category
      const memories = await db.memory.findMany({
        where: { category },
        orderBy: { updatedAt: 'desc' },
      });
      return NextResponse.json({
        success: true,
        memories,
        total: memories.length,
      });
    }

    // Get all global memories
    const memories = await db.memory.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      memories,
      total: memories.length,
    });
  } catch (error: any) {
    console.error('Get memory error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, category, sessionId, expiresAt } = body;

    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    if (sessionId) {
      // Session-specific memory (conversation memory)
      const existing = await db.conversationMemory.findFirst({
        where: { sessionId, key },
      });

      if (existing) {
        const memory = await db.conversationMemory.update({
          where: { id: existing.id },
          data: { 
            value: typeof value === 'string' ? value : JSON.stringify(value),
            expiresAt: expiresAt ? new Date(expiresAt) : null,
          },
        });
        return NextResponse.json({ success: true, memory, updated: true });
      }

      const memory = await db.conversationMemory.create({
        data: {
          sessionId,
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value),
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        },
      });
      return NextResponse.json({ success: true, memory, created: true });
    }

    // Global memory
    const existing = await db.memory.findUnique({
      where: { key },
    });

    if (existing) {
      const memory = await db.memory.update({
        where: { key },
        data: {
          value: typeof value === 'string' ? value : JSON.stringify(value),
          category: category || existing.category,
        },
      });
      return NextResponse.json({ success: true, memory, updated: true });
    }

    const memory = await db.memory.create({
      data: {
        key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
        category: category || 'general',
      },
    });
    return NextResponse.json({ success: true, memory, created: true });
  } catch (error: any) {
    console.error('Set memory error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const sessionId = searchParams.get('sessionId');
    const id = searchParams.get('id');

    if (id) {
      await db.memory.delete({ where: { id } });
      return NextResponse.json({ success: true, message: 'Memory deleted' });
    }

    if (key && sessionId) {
      await db.conversationMemory.deleteMany({
        where: { sessionId, key },
      });
      return NextResponse.json({ success: true, message: 'Session memory deleted' });
    }

    if (key) {
      await db.memory.delete({ where: { key } });
      return NextResponse.json({ success: true, message: 'Memory deleted' });
    }

    if (sessionId) {
      await db.conversationMemory.deleteMany({
        where: { sessionId },
      });
      return NextResponse.json({ success: true, message: 'All session memories deleted' });
    }

    return NextResponse.json({ error: 'Key, sessionId, or id is required' }, { status: 400 });
  } catch (error: any) {
    console.error('Delete memory error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
