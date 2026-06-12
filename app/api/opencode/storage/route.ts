import { NextRequest, NextResponse } from 'next/server';
import { put, get, delete as deleteBlob, list } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

// حفظ الجلسة
export async function POST(req: NextRequest) {
  try {
    const { action, sessionId, data, fileName } = await req.json();

    if (action === 'save-session') {
      const id = sessionId || uuidv4();
      const timestamp = new Date().toISOString();
      
      const blob = await put(
        `sessions/${id}/data.json`,
        JSON.stringify({ ...data, timestamp, id }),
        { access: 'private' }
      );

      return NextResponse.json(
        { message: 'Session saved', sessionId: id, url: blob.url },
        { status: 200 }
      );
    }

    if (action === 'save-file') {
      const sessionId = sessionId || 'default';
      const fileId = uuidv4();
      
      const blob = await put(
        `sessions/${sessionId}/files/${fileId}-${fileName}`,
        data,
        { access: 'private' }
      );

      return NextResponse.json(
        { message: 'File saved', fileId, url: blob.url },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Storage error:', error);
    return NextResponse.json(
      { error: 'Storage operation failed' },
      { status: 500 }
    );
  }
}

// استرجاع الجلسة
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const action = searchParams.get('action');

    if (action === 'list-sessions') {
      const blobs = await list({ prefix: 'sessions/' });
      const sessions = blobs.blobs
        .filter(b => b.pathname.endsWith('data.json'))
        .map(b => b.pathname.split('/')[1]);

      return NextResponse.json({ sessions: [...new Set(sessions)] }, { status: 200 });
    }

    if (action === 'get-session' && sessionId) {
      const blob = await get(`sessions/${sessionId}/data.json`);
      
      if (!blob) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      const data = JSON.parse(blob.toString());
      return NextResponse.json(data, { status: 200 });
    }

    if (action === 'list-files' && sessionId) {
      const blobs = await list({ prefix: `sessions/${sessionId}/files/` });
      const files = blobs.blobs.map(b => ({
        name: b.pathname.split('/').pop(),
        size: b.size,
        uploadedAt: b.uploadedAt
      }));

      return NextResponse.json({ files }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data' },
      { status: 500 }
    );
  }
}

// حذف الجلسة
export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // حذف ملف البيانات والملفات
    const blobs = await list({ prefix: `sessions/${sessionId}/` });
    
    for (const blob of blobs.blobs) {
      await deleteBlob(blob.pathname);
    }

    return NextResponse.json(
      { message: 'Session deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}
