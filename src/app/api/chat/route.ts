import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { db } from '@/lib/db';

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], systemPrompt, chatId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const zai = await getZAI();

    // Build messages array
    const messages: any[] = [];

    // Add system prompt
    if (systemPrompt) {
      messages.push({
        role: 'assistant',
        content: systemPrompt,
      });
    } else {
      messages.push({
        role: 'assistant',
        content: 'Du bist ein hilfreicher KI-Assistent. Du kannst programmieren, designen, recherchieren und bei vielen Aufgaben helfen. Du antwortest auf Deutsch, es sei denn, der Nutzer fragt in einer anderen Sprache.',
      });
    }

    // Add history
    if (history && history.length > 0) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Get completion
    const completion = await zai.chat.completions.create({
      messages: messages,
      thinking: { type: 'disabled' },
    });

    const response = completion.choices[0]?.message?.content || '';

    // Save to database if chatId provided
    if (chatId) {
      try {
        await db.message.create({
          data: {
            role: 'user',
            content: message,
            chatId: chatId,
          },
        });

        await db.message.create({
          data: {
            role: 'assistant',
            content: response,
            chatId: chatId,
          },
        });
      } catch (dbError) {
        console.error('Database save error:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      response: response,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json({ error: 'chatId is required' }, { status: 400 });
    }

    const messages = await db.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
