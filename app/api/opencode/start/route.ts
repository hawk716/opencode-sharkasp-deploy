import { NextRequest, NextResponse } from 'next/server';

// Note: OpenCode AI should be run separately in development/production
// This API route provides status information only

export async function POST(req: NextRequest) {
  try {
    const opencodeUrl = process.env.NEXT_PUBLIC_OPENCODE_URL || 'http://localhost:8080';
    
    return NextResponse.json(
      { 
        message: 'OpenCode is available',
        status: 'ready',
        url: opencodeUrl,
        password: process.env.OPENCODE_SERVER_PASSWORD || 'admin123',
        info: 'Run: OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get OpenCode status' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const opencodeUrl = process.env.NEXT_PUBLIC_OPENCODE_URL || 'http://localhost:8080';
  
  return NextResponse.json(
    { 
      status: 'ready',
      url: opencodeUrl,
      password: process.env.OPENCODE_SERVER_PASSWORD || 'admin123'
    },
    { status: 200 }
  );
}
