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
    const { query, num = 10, recency_days } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const zai = await getZAI();

    const searchParams: any = {
      query: query,
      num: Math.min(num, 20),
    };

    if (recency_days) {
      searchParams.recency_days = recency_days;
    }

    const results = await zai.functions.invoke('web_search', searchParams);

    return NextResponse.json({
      success: true,
      query: query,
      totalResults: results.length,
      results: results,
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
