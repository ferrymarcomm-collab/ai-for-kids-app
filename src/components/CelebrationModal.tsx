import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const { celebration, closeCelebration } = useApp();

  if (!celebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-300">
        <button
          onClick={closeCelebration}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-20 h-20 mb-4 rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner border-2 border-amber-200 animate-bounce">
          {celebration.badge || '🎉'}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Pencapaian Baru</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
          {celebration.title}
        </h3>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          {celebration.message}
        </p>

        <button
          onClick={closeCelebration}
          className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Lanjut Hebat!</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
