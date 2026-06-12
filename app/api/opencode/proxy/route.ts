import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENCODE_URL = process.env.OPENCODE_URL || 'http://localhost:3000';
const OPENCODE_PASSWORD = process.env.OPENCODE_SERVER_PASSWORD || 'admin123';

// التحقق من الاتصال بـ opencode
export async function GET(request: NextRequest) {
  try {
    const response = await axios.get(`${OPENCODE_URL}/api/health`, {
      headers: {
        'X-OpenCode-Password': OPENCODE_PASSWORD,
      },
      timeout: 5000,
    });

    return NextResponse.json({
      status: 'connected',
      data: response.data,
    });
  } catch (error) {
    console.error('OpenCode connection error:', error);
    return NextResponse.json(
      {
        status: 'disconnected',
        error: 'فشل الاتصال بـ OpenCode',
      },
      { status: 503 }
    );
  }
}

// توجيه الطلبات إلى opencode
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = request.nextUrl.searchParams.get('path') || '/api/execute';

    const response = await axios.post(
      `${OPENCODE_URL}${path}`,
      body,
      {
        headers: {
          'X-OpenCode-Password': OPENCODE_PASSWORD,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('OpenCode request error:', error);
    return NextResponse.json(
      {
        error: 'فشل الطلب إلى OpenCode',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
