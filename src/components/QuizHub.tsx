import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA, JILID_LIST } from '../data/curriculum';
import { QuizRunner } from './QuizRunner';
import {
  HelpCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Lock,
} from 'lucide-react';

export const QuizHub: React.FC = () => {
  const { progress, isDemoMode, isPremium, requestPremium, isJilid2Unlocked, isJilid3Unlocked, isJilid4Unlocked, isJilid5Unlocked, isJilid6Unlocked, isJilid7Unlocked, isJilid8Unlocked } = useApp();
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState<number | null>(null);
  const [activeJilidQuizTab, setActiveJilidQuizTab] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);

  if (isDemoMode && !isPremium) {
    if (selectedModuleForQuiz !== null && selectedModuleForQuiz !== 1) {
      setSelectedModuleForQuiz(null);
    }

    if (selectedModuleForQuiz === 1) {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedModuleForQuiz(null)}
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer"
          >
            ← Kembali ke Demo Kuis
          </button>
          <QuizRunner moduleId={1} onFinish={() => setSelectedModuleForQuiz(null)} />
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div className="rounded-3xl bg-white border-2 border-emerald-200 p-7 sm:p-10 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700">KUIS DEMO GRATIS</div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-2">Coba 3 Soal dari Modul 1</h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Rasakan sistem kuis AI FOR KIDS. Modul lainnya dan 117 quiz berikutnya tersedia pada akses Premium.
          </p>
          <button
            onClick={() => setSelectedModuleForQuiz(1)}
            className="mt-6 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg"
          >
            MULAI 3 QUIZ 🚀
          </button>
        </div>
        <div className="rounded-3xl bg-slate-900 text-white p-7">
          <div className="flex items-center gap-2 font-black"><Lock className="w-5 h-5 text-amber-300" /> Kuis Premium</div>
          <p className="text-sm text-slate-300 mt-2">117 soal lainnya terkunci untuk Demo Gratis.</p>
          <button onClick={() => requestPremium('Pusat Kuis Lengkap')} className="mt-4 px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
            BUKA AKSES PREMIUM
          </button>
        </div>
      </div>
    );
  }

  if (selectedModuleForQuiz !== null) {
    const mod = MODULES_DATA[selectedModuleForQuiz];
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedModuleForQuiz(null)}
          className="text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer"
        >
          ← Kembali ke Pilihan Kuis Modul
        </button>
        <QuizRunner
          moduleId={selectedModuleForQuiz}
          onFinish={() => setSelectedModuleForQuiz(null)}
        />
      </div>
    );
  }

  const jilid1Modules = [1, 2, 3, 4, 5].map(id => MODULES_DATA[id]);
  const jilid2Modules = [6, 7, 8, 9, 10].map(id => MODULES_DATA[id]);
  const jilid3Modules = [11, 12, 13, 14, 15].map(id => MODULES_DATA[id]);
  const jilid4Modules = [16, 17, 18, 19, 20].map(id => MODULES_DATA[id]);
  const jilid5Modules = [21, 22, 23, 24, 25].map(id => MODULES_DATA[id]);
  const jilid6Modules = [26, 27, 28, 29, 30].map(id => MODULES_DATA[id]);
  const jilid7Modules = [31, 32, 33, 34, 35].map(id => MODULES_DATA[id]);
  const jilid8Modules = [36, 37, 38, 39, 40].map(id => MODULES_DATA[id]);
  const activeModules =
    activeJilidQuizTab === 1
      ? jilid1Modules
      : activeJilidQuizTab === 2
      ? jilid2Modules
      : activeJilidQuizTab === 3
      ? jilid3Modules
      : activeJilidQuizTab === 4
      ? jilid4Modules
      : activeJilidQuizTab === 5
      ? jilid5Modules
      : activeJilidQuizTab === 6
      ? jilid6Modules
      : activeJilidQuizTab === 7
      ? jilid7Modules
      : jilid8Modules;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
          Latihan & Uji Pemahaman
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
          Pusat Kuis Interaktif
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-xl">
          Setiap modul dilengkapi 3 soal (2 Pilihan Ganda & 1 Pemecahan Masalah) dengan passing grade 70%. Uji pemahaman logikamu secara instan!
        </p>

        {/* Tab selection for Jilid 1, 2, 3, 4, 5, and 6 */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setActiveJilidQuizTab(1)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 1
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 1: Fondasi Logika</span>
            <span className="text-[10px] bg-emerald-800 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 1–5
            </span>
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(2)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 2
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 2: Dunia Visual</span>
            <span className="text-[10px] bg-blue-800 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 6–10
            </span>
            {!isJilid2Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(3)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 3
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 3: Kecerdasan Mesin</span>
            <span className="text-[10px] bg-purple-800 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 11–15
            </span>
            {!isJilid3Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(4)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 4
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 4: Kreator Digital</span>
            <span className="text-[10px] bg-amber-900 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 16–20
            </span>
            {!isJilid4Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(5)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 5
                ? 'bg-orange-500 text-white font-black shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 5: Arsitektur Mesin</span>
            <span className="text-[10px] bg-orange-900 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 21–25
            </span>
            {!isJilid5Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(6)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 6
                ? 'bg-teal-600 text-white font-black shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 6: Logika & Otomatisasi</span>
            <span className="text-[10px] bg-teal-900 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 26–30
            </span>
            {!isJilid6Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(7)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 7
                ? 'bg-rose-600 text-white font-black shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 7: Keamanan Siber</span>
            <span className="text-[10px] bg-rose-900 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 31–35
            </span>
            {!isJilid7Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveJilidQuizTab(8)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeJilidQuizTab === 8
                ? 'bg-indigo-600 text-white font-black shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Kuis Jilid 8: Fungsi & Aplikasi</span>
            <span className="text-[10px] bg-indigo-900 text-white px-1.5 py-0.5 rounded-md font-bold">
              Modul 36–40
            </span>
            {!isJilid8Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Grid of Quizzes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            {activeJilidQuizTab === 1
              ? 'Daftar Kuis Jilid 1 (Modul 1–5)'
              : activeJilidQuizTab === 2
              ? 'Daftar Kuis Jilid 2 (Modul 6–10)'
              : activeJilidQuizTab === 3
              ? 'Daftar Kuis Jilid 3 (Modul 11–15)'
              : activeJilidQuizTab === 4
              ? 'Daftar Kuis Jilid 4 (Modul 16–20)'
              : activeJilidQuizTab === 5
              ? 'Daftar Kuis Jilid 5 (Modul 21–25)'
              : activeJilidQuizTab === 6
              ? 'Daftar Kuis Jilid 6 (Modul 26–30)'
              : activeJilidQuizTab === 7
              ? 'Daftar Kuis Jilid 7 (Modul 31–35)'
              : 'Daftar Kuis Jilid 8 (Modul 36–40)'}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Passing Grade: 70%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeModules.map(mod => {
            const result = progress.quizResults[mod.id];
            const hasTaken = !!result;
            const isPassed = (result?.score ?? 0) >= 70;

            return (
              <div
                key={mod.id}
                className="rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                      MODUL {mod.id}
                    </span>
                    {hasTaken ? (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isPassed
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        Skor: {result.score} Poin
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400">
                        Belum Dikerjakan
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-2 leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {mod.description}
                  </p>

                  <div className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>3 Soal · Umpan balik langsung</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModuleForQuiz(mod.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    hasTaken
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : activeJilidQuizTab === 1
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-98'
                      : activeJilidQuizTab === 2
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-98'
                      : activeJilidQuizTab === 3
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 active:scale-98'
                      : activeJilidQuizTab === 4
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20 active:scale-98'
                      : activeJilidQuizTab === 5
                      ? 'bg-orange-500 hover:bg-orange-600 text-white font-black shadow-md shadow-orange-500/20 active:scale-98'
                      : activeJilidQuizTab === 6
                      ? 'bg-teal-600 hover:bg-teal-700 text-white font-black shadow-md shadow-teal-600/20 active:scale-98'
                      : 'bg-rose-600 hover:bg-rose-700 text-white font-black shadow-md shadow-rose-600/20 active:scale-98'
                  }`}
                >
                  {hasTaken ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Kuis Modul {mod.id}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Mulai Kuis Modul {mod.id}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

