import { NextRequest, NextResponse } from 'next/server';
import { put, get, list, del } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

// إنشاء جلسة جديدة
export async function POST(request: NextRequest) {
  try {
    const sessionId = uuidv4();
    const sessionData = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      files: [],
      state: {},
    };

    await put(`sessions/${sessionId}.json`, JSON.stringify(sessionData), {
      access: 'private',
    });

    return NextResponse.json({ sessionId, ...sessionData }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'فشل إنشاء الجلسة' },
      { status: 500 }
    );
  }
}

// الحصول على بيانات الجلسة
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'معرف الجلسة مطلوب' },
        { status: 400 }
      );
    }

    const blob = await get(`sessions/${sessionId}.json`);
    if (!blob) {
      return NextResponse.json(
        { error: 'الجلسة غير موجودة' },
        { status: 404 }
      );
    }

    const sessionData = JSON.parse(await blob.text());
    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'فشل جلب الجلسة' },
      { status: 500 }
    );
  }
}

// تحديث الجلسة
export async function PUT(request: NextRequest) {
  try {
    const { sessionId, data } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'معرف الجلسة مطلوب' },
        { status: 400 }
      );
    }

    const blob = await get(`sessions/${sessionId}.json`);
    if (!blob) {
      return NextResponse.json(
        { error: 'الجلسة غير موجودة' },
        { status: 404 }
      );
    }

    const sessionData = JSON.parse(await blob.text());
    const updatedSession = {
      ...sessionData,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await put(`sessions/${sessionId}.json`, JSON.stringify(updatedSession), {
      access: 'private',
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'فشل تحديث الجلسة' },
      { status: 500 }
    );
  }
}

// حذف الجلسة
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'معرف الجلسة مطلوب' },
        { status: 400 }
      );
    }

    await del(`sessions/${sessionId}.json`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'فشل حذف الجلسة' },
      { status: 500 }
    );
  }
}
