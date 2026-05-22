import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const workflows = await db.workflow.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { runs: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      workflows,
    });
  } catch (error: any) {
    console.error('Get workflows error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, steps = [], trigger = 'manual', schedule } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const workflow = await db.workflow.create({
      data: {
        name,
        description,
        steps: JSON.stringify(steps),
        trigger,
        schedule,
      },
    });

    return NextResponse.json({
      success: true,
      workflow,
    });
  } catch (error: any) {
    console.error('Create workflow error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, steps, trigger, schedule, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (steps !== undefined) updateData.steps = JSON.stringify(steps);
    if (trigger !== undefined) updateData.trigger = trigger;
    if (schedule !== undefined) updateData.schedule = schedule;
    if (active !== undefined) updateData.active = active;

    const workflow = await db.workflow.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      workflow,
    });
  } catch (error: any) {
    console.error('Update workflow error:', error);
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
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    await db.workflow.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Workflow deleted',
    });
  } catch (error: any) {
    console.error('Delete workflow error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
