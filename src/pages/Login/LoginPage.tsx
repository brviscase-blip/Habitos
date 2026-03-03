import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
    <div className="h-[100dvh] w-screen flex flex-col relative overflow-hidden bg-gh-bg">
      
      {/* Top Section - Vibrant Gradient Background */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 relative flex flex-col items-center justify-center p-6 text-center">
        {/* Abstract shapes/glow for depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/20 rounded-full blur-[80px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-sm shadow-xl mb-6 border border-white/30">
            <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
            Habit Tracker
          </h1>
          <p className="text-white/80 text-sm font-medium max-w-[200px]">
            Transforme sua rotina em resultados extraordinários.
          </p>
        </motion.div>
      </div>

      {/* Bottom Sheet - Login Form */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
        className="bg-gh-bg relative z-20 rounded-t-[32px] -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-white/5"
      >
        <div className="p-8 pb-10">
          <div className="w-12 h-1.5 bg-gh-border rounded-full mx-auto mb-8 opacity-50" />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Bem-vindo</h2>
            <p className="text-gh-text-secondary text-sm">Insira seus dados para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-text-secondary group-focus-within:text-gh-blue transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gh-card border border-gh-border rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gh-text-secondary/50 focus:outline-none focus:border-gh-blue focus:ring-1 focus:ring-gh-blue transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-text-secondary group-focus-within:text-gh-blue transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gh-card border border-gh-border rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gh-text-secondary/50 focus:outline-none focus:border-gh-blue focus:ring-1 focus:ring-gh-blue transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-xs font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-between px-6 group"
              >
                <span>Acessar conta</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="pt-4 text-center">
              <button type="button" className="text-sm text-gh-text-secondary hover:text-white transition-colors font-medium">
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
