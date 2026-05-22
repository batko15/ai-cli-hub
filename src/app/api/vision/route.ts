import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

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
    const { image, question, history = [] } = body;

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const zai = await getZAI();

    // Build content array
    const content: any[] = [
      {
        type: 'text',
        text: question,
      },
    ];

    // Handle different image formats
    if (image.startsWith('data:')) {
      // Base64 image
      content.push({
        type: 'image_url',
        image_url: {
          url: image,
        },
      });
    } else {
      // URL image
      content.push({
        type: 'image_url',
        image_url: {
          url: image,
        },
      });
    }

    // Build messages
    const messages: any[] = [];

    // Add history
    if (history && history.length > 0) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    // Add current message with image
    messages.push({
      role: 'user',
      content: content,
    });

    const response = await zai.chat.completions.createVision({
      messages: messages,
      thinking: { type: 'disabled' },
    });

    const analysis = response.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      analysis: analysis,
    });
  } catch (error: any) {
    console.error('Vision API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
