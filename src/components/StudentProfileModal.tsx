import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Award, BookOpen, Layers, Check } from 'lucide-react';

const AVATAR_OPTIONS = [
  { emoji: '🤖', name: 'Robo Cilik' },
  { emoji: '🐱', name: 'Kucing Coder' },
  { emoji: '🚀', name: 'Astronot Tech' },
  { emoji: '🕵️', name: 'Detektif Data' },
  { emoji: '🦖', name: 'Dino Cerdas' },
  { emoji: '🦸', name: 'Hero Logika' },
];

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ isOpen, onClose }) => {
  const { progress, updateProfile, resetProgress, completedModulesCount, earnedBadgesCount } = useApp();
  const [nickname, setNickname] = useState(progress.profile.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(progress.profile.avatar);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  if (!isOpen) return null;

  const completedQuizCount = Object.keys(progress.quizResults).length * 3;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      updateProfile({
        nickname: nickname.trim(),
        avatar: selectedAvatar,
      });
      onClose();
    }
  };

  const handleConfirmReset = () => {
    resetProgress();
    setIsConfirmingReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
            {progress.profile.avatar}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 font-heading">
              👋 Coder Profile
            </h3>
            <p className="text-xs text-slate-500">
              Avatar & pencapaian perjalanan belajarmu
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Avatar Karakter
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map(opt => (
                <button
                  type="button"
                  key={opt.emoji}
                  onClick={() => setSelectedAvatar(opt.emoji)}
                  className={`p-3 rounded-2xl text-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedAvatar === opt.emoji
                      ? 'border-indigo-600 bg-indigo-50 shadow-xs scale-105'
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  <span className="text-[10px] text-slate-600 mt-1 font-medium truncate w-full text-center">
                    {opt.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Nama Panggilan
            </label>
            <input
              type="text"
              maxLength={20}
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="Contoh: Kiko Coder"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 text-sm"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Gunakan nama panggilan kerenmu, jangan gunakan nama lengkap asli demi keamanan privasimu.
            </p>
          </div>

          {/* Statistics summary (Per Requirement #16: Petualangan, Badge, Portfolio, Quiz) */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-3">
              Perkembangan Belajarmu
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <span className="text-xl block mb-1">🚀</span>
                <span className="text-base sm:text-lg font-black text-indigo-700 block font-mono">
                  {completedModulesCount}/40
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Petualangan</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <span className="text-xl block mb-1">🏆</span>
                <span className="text-base sm:text-lg font-black text-amber-600 block font-mono">
                  {earnedBadgesCount}/8
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Badge</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <span className="text-xl block mb-1">🎨</span>
                <span className="text-base sm:text-lg font-black text-emerald-600 block font-mono">
                  {progress.portfolios.length}/40
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Portfolio</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <span className="text-xl block mb-1">🎯</span>
                <span className="text-base sm:text-lg font-black text-purple-600 block font-mono">
                  {completedQuizCount}/120
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Quiz</span>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-xs leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Aman & Terjaga:</strong> AI FOR KIDS tidak pernah meminta data pribadi sensitif seperti alamat, nomor HP, atau foto kartu identitasmu.
            </span>
          </div>

          {/* Reset progress section (Inline without window.confirm) */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            {isConfirmingReset ? (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2 text-xs">
                <p className="font-bold">Apakah kamu yakin ingin mereset seluruh progres belajar ke awal?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 cursor-pointer"
                  >
                    Ya, Reset Sekarang
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConfirmingReset(false)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsConfirmingReset(true)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
                >
                  Reset Data Progres
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Profil</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
