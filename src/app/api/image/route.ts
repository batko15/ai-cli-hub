import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

const SUPPORTED_SIZES = [
  '1024x1024',
  '768x1344',
  '864x1152',
  '1344x768',
  '1152x864',
  '1440x720',
  '720x1440',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, size = '1024x1024' } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!SUPPORTED_SIZES.includes(size)) {
      return NextResponse.json(
        { error: `Invalid size. Supported sizes: ${SUPPORTED_SIZES.join(', ')}` },
        { status: 400 }
      );
    }

    const zai = await getZAI();

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: size,
    });

    const imageBase64 = response.data[0].base64;

    return NextResponse.json({
      success: true,
      image: imageBase64,
      prompt: prompt,
      size: size,
    });
  } catch (error: any) {
    console.error('Image generation API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
