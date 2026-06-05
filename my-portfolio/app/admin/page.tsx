"use client";
import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('muzfs1@gmail.com'); // Pre-filled with your business contact
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Save the JWT token to local storage
        localStorage.setItem('adminToken', data.token);
        // Redirect to the actual dashboard (we will build this next)
        window.location.href = '/admin/dashboard'; 
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to the server. Is your backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full"></div>

      {/* Glassmorphism Login Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 relative z-10 shadow-2xl shadow-cyan-900/20">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center">
            <Shield className="text-cyan-400 w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">System Access</h2>
        <p className="text-slate-400 text-center text-sm mb-8">Enter your credentials to access the command center.</p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            Authenticate <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}