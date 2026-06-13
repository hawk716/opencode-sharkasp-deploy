export default function Page() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 text-white">
      <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            OpenCode AI
          </h1>
          <p className="text-xl text-slate-300">
            AI Coding Agent built for the terminal
          </p>
        </div>

        <div className="w-full space-y-4">
          <a
            href="/opencode-web"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Open OpenCode Web Interface
          </a>
          <p className="text-sm text-slate-400">
            مدعوم بخادم منفصل • جلسات دائمة • البيانات محفوظة
          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8 pt-8 border-t border-slate-700">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-2">🔧 Agents</h3>
            <p className="text-sm text-slate-400">Specialized AI assistants for specific tasks</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-cyan-300 mb-2">💾 Storage</h3>
            <p className="text-sm text-slate-400">Persistent sessions and files with Vercel Blob</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-300 mb-2">🚀 Deploy</h3>
            <p className="text-sm text-slate-400">Connected to Vercel with custom domain</p>
          </div>
        </div>

        <div className="text-sm text-slate-500 mt-4">
          <p>Documentation: <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">opencode.ai/docs</a></p>
        </div>
      </div>
    </main>
  );
}
