'use client'

import { useEffect, useState } from 'react'

export default function OpencodePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // تحميل opencode web interface
    const loadOpencode = async () => {
      try {
        // محاولة الاتصال بـ opencode-ai API
        const response = await fetch('/api/opencode/status')
        if (!response.ok) {
          throw new Error('Failed to connect to OpenCode AI')
        }
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setIsLoading(false)
      }
    }

    loadOpencode()
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="animate-spin">
            <svg
              className="size-20"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" fill="none" />
            </svg>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            جاري تحميل OpenCode AI...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-red-500">خطأ</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card p-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">OpenCode AI</h1>
          <p className="text-sm text-muted-foreground">
            واجهة التطوير الذكية
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl flex-1 p-4">
        <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <svg
              className="size-16"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-medium text-muted-foreground">
              OpenCode AI متاح وجاهز للاستخدام
            </p>
            <a
              href="http://localhost:8080"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:opacity-90 inline-block"
            >
              افتح OpenCode Web
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
