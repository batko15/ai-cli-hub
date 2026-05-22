import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Default MCP servers from config
const DEFAULT_MCP_SERVERS = [
  {
    id: 'filesystem',
    name: 'filesystem',
    description: 'File system access for reading and writing files',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ args: ['-y', '@modelcontextprotocol/server-filesystem', '.'] }),
    enabled: true,
  },
  {
    id: 'github',
    name: 'github',
    description: 'GitHub API integration for repos, issues, PRs',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ 
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: { GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}' }
    }),
    enabled: false,
  },
  {
    id: 'memory',
    name: 'memory',
    description: 'Persistent memory storage across sessions',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ args: ['-y', '@modelcontextprotocol/server-memory'] }),
    enabled: true,
  },
  {
    id: 'sequential-thinking',
    name: 'sequential-thinking',
    description: 'Step-by-step reasoning for complex problems',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ args: ['-y', '@modelcontextprotocol/server-sequential-thinking'] }),
    enabled: true,
  },
  {
    id: 'postgres',
    name: 'postgres',
    description: 'PostgreSQL database operations',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ 
      args: ['-y', '@crystaldba/postgres-mcp'],
      env: { DATABASE_URL: '${DATABASE_URL}' }
    }),
    enabled: false,
  },
  {
    id: 'playwright',
    name: 'playwright',
    description: 'Browser automation with Playwright',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ args: ['-y', '@playwright/mcp'] }),
    enabled: false,
  },
  {
    id: 'brave-search',
    name: 'brave-search',
    description: 'Web search capabilities',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ 
      args: ['-y', '@modelcontextprotocol/server-brave-search'],
      env: { BRAVE_API_KEY: '${BRAVE_API_KEY}' }
    }),
    enabled: false,
  },
  {
    id: 'slack',
    name: 'slack',
    description: 'Slack integration',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ 
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: { 
        SLACK_BOT_TOKEN: '${SLACK_BOT_TOKEN}',
        SLACK_TEAM_ID: '${SLACK_TEAM_ID}'
      }
    }),
    enabled: false,
  },
  {
    id: 'google-maps',
    name: 'google-maps',
    description: 'Google Maps API',
    type: 'stdio',
    command: 'npx',
    config: JSON.stringify({ 
      args: ['-y', '@modelcontextprotocol/server-google-maps'],
      env: { GOOGLE_MAPS_API_KEY: '${GOOGLE_MAPS_API_KEY}' }
    }),
    enabled: false,
  },
];

export async function GET() {
  try {
    let mcpServers = await db.mCPServer.findMany();

    // Initialize with default servers if empty
    if (mcpServers.length === 0) {
      await db.mCPServer.createMany({
        data: DEFAULT_MCP_SERVERS,
      });
      mcpServers = await db.mCPServer.findMany();
    }

    return NextResponse.json({
      success: true,
      servers: mcpServers,
      total: mcpServers.length,
      enabled: mcpServers.filter(s => s.enabled).length,
    });
  } catch (error: any) {
    console.error('Get MCP servers error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, command, url, config } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const server = await db.mCPServer.create({
      data: {
        name,
        description,
        type: type || 'stdio',
        command,
        url,
        config: config || '{}',
      },
    });

    return NextResponse.json({
      success: true,
      server,
    });
  } catch (error: any) {
    console.error('Create MCP server error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, enabled, name, description, config } = body;

    if (!id) {
      return NextResponse.json({ error: 'Server ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (enabled !== undefined) updateData.enabled = enabled;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (config !== undefined) updateData.config = config;

    const server = await db.mCPServer.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      server,
    });
  } catch (error: any) {
    console.error('Update MCP server error:', error);
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
      return NextResponse.json({ error: 'Server ID is required' }, { status: 400 });
    }

    await db.mCPServer.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'MCP server deleted',
    });
  } catch (error: any) {
    console.error('Delete MCP server error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
