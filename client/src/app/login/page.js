'use client';

import { useState } from 'react';
import { login as loginApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await loginApi(formData);
      loginUser(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="tech-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Log in to your GadgetHub account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : <><LogIn size={20} /> Login</>}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}
