'use client';

import { useEffect, useState } from 'react';

export default function OpenCodeWebPage() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // في بيئة الإنتاج، استخدم المتغير البيئي
    const opencodeUrl = process.env.NEXT_PUBLIC_OPENCODE_URL || 'http://localhost:8080';
    setIframeUrl(opencodeUrl);
    setIsLoading(false);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">خطأ في الاتصال</h1>
          <p className="text-slate-300">{error}</p>
          <a href="/" className="text-blue-400 hover:text-blue-300">العودة للرئيسية</a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-full bg-slate-900">
          <div className="text-center text-white">
            <div className="mb-4">جاري تحميل OpenCode...</div>
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      ) : (
        <>
          {iframeUrl && (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-none"
              title="OpenCode Web Interface"
              onError={() => setError('فشل تحميل OpenCode. تأكد من أن الخادم يعمل.')}
            />
          )}
        </>
      )}
    </div>
  );
}
