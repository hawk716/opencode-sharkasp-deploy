'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'error'>('idle');
  const [opencodeUrl, setOpencodeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/opencode/start');
      const data = await response.json();
      if (data.status === 'running') {
        setStatus('running');
        setOpencodeUrl(data.url);
      }
    } catch (err) {
      console.error('Error checking status:', err);
    }
  };

  const startOpenCode = async () => {
    setStatus('loading');
    setError(null);
    try {
      const response = await fetch('/api/opencode/start', { method: 'POST' });
      const data = await response.json();
      
      if (response.ok) {
        setStatus('running');
        setOpencodeUrl(data.url);
      } else {
        setError(data.error || 'Failed to start OpenCode');
        setStatus('error');
      }
    } catch (err) {
      setError('Connection error');
      setStatus('error');
    }
  };

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

        {status === 'running' && opencodeUrl ? (
          <div className="w-full space-y-4">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-300 font-medium">✓ OpenCode is running</p>
            </div>
            <a
              href={opencodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Open OpenCode Web Interface
            </a>
            <p className="text-sm text-slate-400">
              Password: <code className="bg-slate-700 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        ) : status === 'loading' ? (
          <div className="space-y-4 w-full">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-700 rounded-lg"></div>
            </div>
            <p className="text-slate-400">Starting OpenCode...</p>
          </div>
        ) : (
          <button
            onClick={startOpenCode}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
            disabled={status === 'loading'}
          >
            Start OpenCode
          </button>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 w-full">
            <p className="text-red-300">{error}</p>
          </div>
        )}

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
