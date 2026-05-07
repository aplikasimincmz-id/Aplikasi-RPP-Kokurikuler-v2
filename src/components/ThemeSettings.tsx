import React from 'react';
import { ThemeSettings } from '../types';
import { Moon, Sun, Monitor, Palette, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeSettingsProps {
  settings: ThemeSettings;
  onChange: (settings: ThemeSettings) => void;
}

const colorSchemes = [
  { id: 'teal', label: 'Teal', bg: 'bg-teal-500', 
    colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e']
  },
  { id: 'blue', label: 'Blue', bg: 'bg-blue-500',
    colors: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554']
  },
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-500',
    colors: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b']
  },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-500',
    colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764']
  },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-500',
    colors: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22']
  }
];

const paletteKeys = [
  '--primary-50', '--primary-100', '--primary-200', '--primary-300', '--primary-400',
  '--primary-500', '--primary-600', '--primary-700', '--primary-800', '--primary-900', '--primary-950'
];

export const ThemeSettingsComponent: React.FC<ThemeSettingsProps> = ({ settings, onChange }) => {
  const applyColors = (schemeId: string) => {
    const scheme = colorSchemes.find(s => s.id === schemeId);
    if (scheme) {
      scheme.colors.forEach((value, index) => {
        document.documentElement.style.setProperty(paletteKeys[index], value);
      });
      onChange({ ...settings, primaryColor: schemeId as any });
    }
  };

  const toggleMode = (mode: 'light' | 'dark' | 'system') => {
    onChange({ ...settings, mode });
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (mode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 w-72 print:hidden overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="text-primary-600" size={18} />
        <h3 className="font-bold text-gray-800 dark:text-neutral-100 text-sm">Tema Aplikasi</h3>
      </div>

      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Tampilan</p>
          <div className="flex bg-gray-50 dark:bg-neutral-800 p-1 rounded-xl border border-gray-100 dark:border-neutral-700">
            <button 
              onClick={() => toggleMode('light')}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg transition-all ${settings.mode === 'light' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Sun size={14} />
            </button>
            <button 
              onClick={() => toggleMode('dark')}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg transition-all ${settings.mode === 'dark' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Moon size={14} />
            </button>
            <button 
              onClick={() => toggleMode('system')}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg transition-all ${settings.mode === 'system' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Monitor size={14} />
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Warna Utama</p>
          <div className="grid grid-cols-5 gap-2 px-1">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => applyColors(scheme.id)}
                className={`w-full aspect-square rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${scheme.bg} ${settings.primaryColor === scheme.id ? 'ring-2 ring-offset-2 ring-primary-500' : ''}`}
                title={scheme.label}
              >
                {settings.primaryColor === scheme.id && <Check size={12} className="text-white" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
