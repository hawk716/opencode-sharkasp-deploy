import { NextRequest, NextResponse } from 'next/server';
import { put, get, del, list } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

// تحميل ملف
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const sessionId = formData.get('sessionId') as string;

    if (!file || !sessionId) {
      return NextResponse.json(
        { error: 'الملف ومعرف الجلسة مطلوبان' },
        { status: 400 }
      );
    }

    const fileId = uuidv4();
    const filename = `sessions/${sessionId}/files/${fileId}-${file.name}`;
    const buffer = await file.arrayBuffer();

    const blob = await put(filename, buffer, {
      access: 'private',
    });

    return NextResponse.json(
      {
        fileId,
        filename: file.name,
        size: file.size,
        type: file.type,
        url: blob.url,
        uploadedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'فشل تحميل الملف' },
      { status: 500 }
    );
  }
}

// قائمة الملفات
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'معرف الجلسة مطلوب' },
        { status: 400 }
      );
    }

    const { blobs } = await list({
      prefix: `sessions/${sessionId}/files/`,
    });

    const files = blobs.map((blob) => ({
      url: blob.url,
      filename: blob.pathname.split('/').pop(),
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'فشل جلب قائمة الملفات' },
      { status: 500 }
    );
  }
}

// حذف ملف
export async function DELETE(request: NextRequest) {
  try {
    const { fileUrl } = await request.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: 'عنوان الملف مطلوب' },
        { status: 400 }
      );
    }

    await del(fileUrl);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'فشل حذف الملف' },
      { status: 500 }
    );
  }
}
