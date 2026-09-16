'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement Supabase login
    setLoading(false);
  };

  return (
    <div className="glass-container w-full space-y-6">
      <h2 className="text-2xl font-bold text-center text-white">Login to PromoteWithAI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="you@domain.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-accent-blue ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-blue-400 hover:text-blue-300">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}