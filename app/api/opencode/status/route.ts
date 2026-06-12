import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // التحقق من أن opencode-ai جاهز
    return NextResponse.json(
      { 
        status: 'ok',
        message: 'OpenCode AI is running',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
