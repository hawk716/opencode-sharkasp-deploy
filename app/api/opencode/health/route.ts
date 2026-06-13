import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const opencodeUrl = process.env.NEXT_PUBLIC_OPENCODE_URL || 'http://localhost:8080';
    
    // محاولة التحقق من حالة الخادم
    const response = await fetch(`${opencodeUrl}/health`, {
      method: 'GET',
      timeout: 5000,
    }).catch(() => null);

    if (response?.ok) {
      return NextResponse.json(
        { 
          status: 'healthy',
          url: opencodeUrl,
          message: 'OpenCode server is running'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        status: 'unavailable',
        url: opencodeUrl,
        message: 'OpenCode server is not responding'
      },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to check OpenCode health'
      },
      { status: 500 }
    );
  }
}
