import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';
import { BackgroundGlow } from '@/components/BackgroundGlow';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Rafael' && password === '123834') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', username);
      navigate('/home');
    } else {
      setError('Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <div className="h-screen w-screen bg-gh-bg flex flex-col relative overflow-hidden fixed inset-0 touch-none">
      <BackgroundGlow />
      
      {/* Navbar-style Header */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-gh-border bg-gh-bg/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2 hidden md:flex">
            <ArrowLeft size={16} />
            Voltar
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center md:justify-start md:pt-20 p-4 relative z-10">
        <div className="mb-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-6">
          <svg width="0" height="0" className="absolute">
            <linearGradient id="login-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </svg>
          <CheckCircle2 size={78} stroke="url(#login-logo-gradient)" className="drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Bem-vindo
          </h1>
          <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">
            de volta
          </span>
        </div>
      </div>
      
      <div className="w-full max-w-[270px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gh-border bg-gh-bg px-3 py-2 text-white focus:border-gh-blue focus:ring-2 focus:ring-gh-blue/50 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-white">
                  Senha
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gh-border bg-gh-bg px-3 py-2 text-white focus:border-gh-blue focus:ring-2 focus:ring-gh-blue/50 outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-md p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 hover:opacity-90 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:scale-[1.02]">
              Entrar
            </Button>
          </form>
        </motion.div>
      </div>

      </div>

      <div className="absolute bottom-8 w-full text-center z-10 opacity-60">
        <p className="text-xs md:text-sm text-gh-text-secondary font-medium tracking-wide">
          Transforme sua rotina em resultados extraordinários.
        </p>
      </div>
    </div>
  );
}
