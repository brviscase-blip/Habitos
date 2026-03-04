import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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
      navigate('/habits');
    } else {
      setError('Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen flex flex-col relative overflow-hidden bg-[#0a0a0a] touch-none">
      
      {/* Top Section - Dark Background */}
      <div className="flex-1 bg-[#070e18] flex flex-col items-center justify-center p-6 pb-10 relative">
        {/* Subtle radial glow to prevent it from being too flat */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="flex flex-col items-center gap-3 z-10">
          {/* Logo Container */}
          <div className="w-14 h-14 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/10">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <Check size={18} className="text-[#070e18] stroke-[4]" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white mb-1 tracking-tight">
              Habit Tracker
            </h1>
            <p className="text-white/60 text-[10px] font-medium max-w-[180px] mx-auto leading-relaxed">
              Transforme sua rotina em resultados extraordinários.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark Sheet */}
      <div className="bg-[#050505] rounded-t-[32px] -mt-6 relative z-20 px-6 pt-8 pb-14 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white mb-0.5">Bem-vindo</h2>
          <p className="text-gray-500 text-[10px]">Insira seus dados para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
          {/* Username Input */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome de usuário"
                className="w-full bg-[#0f1218] text-white placeholder-gray-600 rounded-xl py-4 pl-12 pr-4 border border-white/5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-[#0f1218] text-white placeholder-gray-600 rounded-xl py-4 pl-12 pr-4 border border-white/5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium"
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-[10px] font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-between px-6 hover:bg-blue-500 transition-all active:scale-[0.98] mt-4"
          >
            <span className="text-sm">Acessar conta</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-5 text-center">
          <button className="text-gray-500 text-[9px] hover:text-white transition-colors">
            Esqueci minha senha
          </button>
        </div>
      </div>
    </div>
  );
}
