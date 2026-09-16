'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement Supabase registration
    setLoading(false);
  };

  return (
    <div className="glass-container w-full space-y-6">
      <h2 className="text-2xl font-bold text-center text-white">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Your full name"
            required
          />
        </div>
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
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-accent-blue ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-400 hover:text-blue-300">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}