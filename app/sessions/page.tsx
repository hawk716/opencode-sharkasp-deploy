'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Session {
  id: string;
  timestamp: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/opencode/storage?action=list-sessions');
      const data = await response.json();
      
      if (Array.isArray(data.sessions)) {
        setSessions(data.sessions.map(id => ({ id, timestamp: new Date().toISOString() })));
      }
    } catch (err) {
      setError('Failed to load sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    
    try {
      const response = await fetch('/api/opencode/storage', {
        method: 'DELETE',
        body: JSON.stringify({ sessionId })
      });
      
      if (response.ok) {
        setSessions(sessions.filter(s => s.id !== sessionId));
      }
    } catch (err) {
      setError('Failed to delete session');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Sessions</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Home
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400 mb-4">No sessions yet</p>
            <p className="text-sm text-slate-500">
              Start OpenCode to create your first session
            </p>
            <Link href="/" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
              Go to OpenCode
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {sessions.map(session => (
              <div key={session.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{session.id}</h3>
                    <p className="text-sm text-slate-400">
                      {new Date(session.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-500/10 border border-blue-500/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Storage Information</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Sessions are stored in Vercel Blob storage</li>
            <li>• Each session includes metadata and associated files</li>
            <li>• Files are automatically backed up and can be restored</li>
            <li>• Storage is private and encrypted</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
