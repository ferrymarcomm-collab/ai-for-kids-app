import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Compass, Palette, ShieldCheck, Check } from 'lucide-react';
import { playSoftClick, playChimeSound } from '../utils/audio';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ONBOARDING_STEPS = [
  {
    step: 1,
    badge: 'LANGKAH 1 DARI 4',
    title: '👋 Selamat Datang, Coder!',
    subtitle: 'Siap memulai petualangan seru di dunia logika, coding, dan AI?',
    desc: 'Di sini kamu akan belajar cara komputer berpikir, membuat animasi warna-warni, melatih kecerdasan buatan, sampai merakit aplikasi kuis karyamu sendiri!',
    icon: '🤖',
    color: 'from-amber-400 to-amber-200 text-slate-900',
  },
  {
    step: 2,
    badge: 'LANGKAH 2 DARI 4',
    title: '🚀 Jelajahi 8 Dunia Belajar',
    subtitle: 'Petualangan berjenjang yang dirancang seperti menjelajahi 8 planet baru.',
    desc: 'Dari 🌱 Dunia Logika hingga 🚀 Dunia App Creator. Setiap dunia punya 5 modul terstruktur, kuis pemahaman, dan tantangan misi berhadiah lencana kehormatan!',
    icon: '🪐',
    color: 'from-indigo-500 to-purple-500 text-white',
  },
  {
    step: 3,
    badge: 'LANGKAH 3 DARI 4',
    title: '🎨 Buat Karyamu',
    subtitle: 'Kamu bukan cuma penonton, tapi seorang pembuat karya nyata!',
    desc: 'Setiap karya dari diagram alur, gambar animasi, purwarupa kardus, hingga poster edukasi akan tersimpan rapi di Galeri Portofoliomu untuk ditunjukkan ke orang tua & guru.',
    icon: '📁',
    color: 'from-blue-500 to-teal-400 text-white',
  },
  {
    step: 4,
    badge: 'LANGKAH 4 DARI 4',
    title: '🛡️ Belajar AI dengan Aman',
    subtitle: 'Kamu adalah BOS-nya! Selalu terlindungi dengan 10 Prinsip Emas.',
    desc: 'Jangan pernah membagikan nama lengkap, alamat, atau password asli. AI adalah teman berdiskusi dan sahabat mencari ide, bukan pengganti berpikirmu sendiri!',
    icon: '🛡️',
    color: 'from-rose-500 to-pink-500 text-white',
  },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const isLast = currentStepIndex === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    playSoftClick();
    if (isLast) {
      playChimeSound();
      onClose();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    playSoftClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-200 text-slate-800 space-y-6">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Tutup Onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-2">
            {ONBOARDING_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-8 bg-indigo-600'
                    : idx < currentStepIndex
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
            {currentStep.badge}
          </span>
        </div>

        {/* Illustration & Badge */}
        <div className="text-center space-y-3">
          <div
            className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr ${currentStep.color} flex items-center justify-center text-5xl shadow-lg border-2 border-white/40 animate-in zoom-in-95 duration-200`}
          >
            <span>{currentStep.icon}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading leading-tight">
            {currentStep.title}
          </h3>

          <p className="text-sm font-bold text-indigo-700">
            {currentStep.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {currentStep.desc}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {!isLast ? (
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 cursor-pointer transition-colors"
            >
              Lewati Tur
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all ml-auto"
          >
            <span>{isLast ? 'MULAI PETUALANGAN 🚀' : 'Lanjut →'}</span>
            {!isLast && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
