import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, LogIn, Heart, ShieldAlert } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate brief network delay for feel
    setTimeout(() => {
      if (username === 'admin' && password === 'Admin24') {
        onLogin();
      } else {
        setError('Username atau Password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-300/20 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-primary-100 overflow-hidden relative z-10"
      >
        <div className="bg-primary-800 p-8 text-center relative overflow-hidden">
          {/* Wave background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-150 transform rotate-12">
              <path fill="#ffffff" d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,101.3C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>

          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Kementerian_Agama_new_logo.png" 
            alt="Logo Kemenag" 
            className="w-24 h-24 mx-auto mb-6 drop-shadow-lg relative z-10"
          />
          <h1 className="text-2xl font-extrabold text-white leading-tight relative z-10 mb-2">
            Selamat datang di Aplikasi Generate RPP Kokurikuler
          </h1>
          <p className="text-primary-100 text-sm italic opacity-80 relative z-10">
            "Membangun Generasi Beradab & Cinta Ilahi"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3"
            >
              <ShieldAlert className="text-red-500 shrink-0" size={18} />
              <p className="text-xs text-red-700 font-medium">{error}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5 slide-in-bottom">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1.5">
                <User size={14} /> Username
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Masukkan username"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1.5 slide-in-bottom">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1.5">
                <Lock size={14} /> Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Masukkan password"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <LogIn size={20} />
              </motion.div>
            ) : (
              <>
                Login ke Aplikasi <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <footer className="pt-4 text-center border-t border-gray-100 mt-6 pt-6">
            <div className="flex items-center justify-center gap-2 text-primary-800 font-bold mb-1">
              <Heart className="fill-red-400 text-red-400" size={14} />
              <span className="text-sm">MI Berbasis Cinta</span>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-2">
              © 2026 Agus Arifien
            </p>
          </footer>
        </form>
      </motion.div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
