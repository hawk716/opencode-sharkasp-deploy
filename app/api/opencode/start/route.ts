import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let processRunning = false;

export async function POST(req: NextRequest) {
  try {
    if (processRunning) {
      return NextResponse.json(
        { message: 'OpenCode is already running', url: 'http://localhost:8080' },
        { status: 200 }
      );
    }

    // تشغيل opencode في الخلفية
    exec('OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080', 
      (error, stdout, stderr) => {
        if (error) {
          console.error(`OpenCode error: ${error.message}`);
          processRunning = false;
          return;
        }
        console.log(`OpenCode output: ${stdout}`);
      }
    );

    processRunning = true;

    return NextResponse.json(
      { 
        message: 'OpenCode started successfully',
        url: 'http://localhost:8080',
        password: 'admin123'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error starting OpenCode:', error);
    return NextResponse.json(
      { error: 'Failed to start OpenCode' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      status: processRunning ? 'running' : 'stopped',
      url: processRunning ? 'http://localhost:8080' : null
    },
    { status: 200 }
  );
}
