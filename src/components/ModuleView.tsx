import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA, JILID_LIST } from '../data/curriculum';
import { ActivityType } from '../types';
import { QuizRunner } from './QuizRunner';
import { playChimeSound, playSoftClick } from '../utils/audio';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Trophy,
  FolderHeart,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  Sparkles,
  Layers,
  Send,
} from 'lucide-react';

interface ModuleViewProps {
  moduleId: number;
}

const ACTIVITY_TYPE_STYLES: Record<ActivityType, { bg: string; text: string; label: string }> = {
  UNPLUGGED: { bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', text: 'Unplugged (Tanpa Komputer)', label: 'UNPLUGGED' },
  DIGITAL: { bg: 'bg-blue-100 text-blue-900 border-blue-300', text: 'Digital / Layar', label: 'DIGITAL' },
  AI: { bg: 'bg-purple-100 text-purple-900 border-purple-300', text: 'Kecerdasan Buatan', label: 'AI' },
  CREATIVE: { bg: 'bg-amber-100 text-amber-900 border-amber-300', text: 'Kreativitas & Desain', label: 'CREATIVE' },
  PROJECT: { bg: 'bg-rose-100 text-rose-900 border-rose-300', text: 'Proyek Terapan', label: 'PROJECT' },
  SIMULATION: { bg: 'bg-cyan-100 text-cyan-900 border-cyan-300', text: 'Simulasi Sistem', label: 'SIMULATION' },
};

export const ModuleView: React.FC<ModuleViewProps> = ({ moduleId }) => {
  const {
    openJilid,
    setActiveTab,
    toggleActivity,
    addPortfolioItem,
    progress,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'aktivitas' | 'kuis' | 'portfolio'>('aktivitas');
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioDesc, setPortfolioDesc] = useState('');
  const [portfolioSaved, setPortfolioSaved] = useState(false);

  const mod = MODULES_DATA[moduleId] || MODULES_DATA[1];
  const jilid = JILID_LIST.find(j => j.id === mod.jilidId) || JILID_LIST[0];

  const act1Done = progress.completedActivityIds.includes(mod.activity1.id);
  const act2Done = progress.completedActivityIds.includes(mod.activity2.id);
  const quizResult = progress.quizResults[moduleId];

  const handlePortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portfolioTitle.trim() && portfolioDesc.trim()) {
      addPortfolioItem({
        title: portfolioTitle.trim(),
        jilidId: mod.jilidId,
        moduleId: mod.id,
        moduleTitle: mod.title,
        workType: 'Karya Siswa Modul',
        description: portfolioDesc.trim(),
      });
      setPortfolioSaved(true);
      setPortfolioTitle('');
      setPortfolioDesc('');
    }
  };

  if (!mod.isPhase1Ready) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <button
          onClick={() => openJilid(mod.jilidId)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Jilid {mod.jilidId}</span>
        </button>

        <div className="p-8 sm:p-12 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="text-4xl">🚧</div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              MODUL {mod.id} · SEGERA HADIR
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              {mod.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Modul ini disiapkan untuk Fase berikutnya. Untuk saat ini, silakan tuntaskan Modul aktif pada Jilid 1, 2, 3, 4, 5, 6, 7, dan 8.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => openJilid(1)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 1</span>
            </button>
            <button
              onClick={() => openJilid(2)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 2</span>
            </button>
            <button
              onClick={() => openJilid(3)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 3</span>
            </button>
            <button
              onClick={() => openJilid(4)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 4</span>
            </button>
            <button
              onClick={() => openJilid(5)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 5</span>
            </button>
            <button
              onClick={() => openJilid(6)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-black text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 6</span>
            </button>
            <button
              onClick={() => openJilid(7)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 7</span>
            </button>
            <button
              onClick={() => openJilid(8)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
            >
              <span>Jilid 8</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => openJilid(mod.jilidId)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Jilid {mod.jilidId}: {jilid.title}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status Modul:</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            progress.moduleStatus[mod.id] === 'Dikuasai'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : progress.moduleStatus[mod.id] === 'Selesai'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-blue-100 text-blue-900 border border-blue-300'
          }`}>
            {progress.moduleStatus[mod.id] || 'Belum Mulai'}
          </span>
        </div>
      </div>

      {/* Module Main Header */}
      <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
            MODUL {mod.id}
          </span>
          <span className="text-slate-400 text-xs">/</span>
          <span className="text-xs font-bold text-slate-500">
            JILID {mod.jilidId} ({jilid.theme})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-heading">
          {mod.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {mod.description}
        </p>

        {/* 10. Learning Goal Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 block mb-0.5">
              Tujuan Pembelajaran (Learning Goal)
            </span>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {mod.learningGoal}
            </p>
          </div>
        </div>

        {/* Section Tabs inside module */}
        <div className="flex border-b border-slate-200 gap-2 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('aktivitas')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeSubTab === 'aktivitas'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Aktivitas Belajar (2)</span>
            {act1Done && act2Done && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('kuis')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeSubTab === 'kuis'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Kuis Modul (3 Soal)</span>
            {quizResult && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {quizResult.score} Poin
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('portfolio')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeSubTab === 'portfolio'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderHeart className="w-4 h-4" />
            <span>Karya & Portofolio</span>
          </button>
        </div>
      </div>

      {/* Subtab Content */}
      {activeSubTab === 'aktivitas' && (
        <div className="space-y-8">
          {/* AKTIVITAS 1 */}
          <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs">
                  🎮 MINI GAME AKTIVITAS 1
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    ACTIVITY_TYPE_STYLES[mod.activity1.type].bg
                  }`}
                >
                  {ACTIVITY_TYPE_STYLES[mod.activity1.type].label}
                </span>
              </div>

              {/* Status Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  toggleActivity(mod.activity1.id, mod.id);
                  if (!act1Done) {
                    playChimeSound();
                  } else {
                    playSoftClick();
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                  act1Done
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-300'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${act1Done ? 'text-emerald-600 fill-emerald-100' : 'text-white'}`}
                />
                <span>{act1Done ? '⭐ Aktivitas Selesai! ✓' : 'Tandai Selesai 🚀'}</span>
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                {mod.activity1.title}
              </h3>
            </div>

            {/* Special Safety Warning if required */}
            {mod.activity1.requiresParentGuidance && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-amber-900 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>"Lakukan bersama guru, tutor, atau orang tua."</span>
              </div>
            )}

            {/* 4-Step Mini Game Pattern */}
            <div className="space-y-4">
              {/* STEP 1: 👀 Lihat */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                  <span>STEP 1: 👀 Lihat</span>
                  <span className="text-emerald-400">·</span>
                  <span className="font-semibold text-emerald-700">Tujuan & Pengamatan</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed pt-1">
                  {mod.activity1.goal}
                </p>
              </div>

              {/* STEP 2: 🧠 Pikirkan */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-800">
                  <span>STEP 2: 🧠 Pikirkan</span>
                  <span className="text-blue-400">·</span>
                  <span className="font-semibold text-blue-700">Konsep & Strategi</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed pt-1">
                  {mod.activity1.instruction}
                </p>
              </div>

              {/* STEP 3: 🎮 Coba */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <span>STEP 3: 🎮 Coba</span>
                  <span className="text-amber-400">·</span>
                  <span className="font-semibold text-amber-700">Langkah & Tantangan Praktik</span>
                </div>
                <ol className="space-y-2 pt-1">
                  {mod.activity1.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* STEP 4: ⭐ Dapatkan feedback */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-800">
                  <span>STEP 4: ⭐ Dapatkan Feedback</span>
                  <span className="text-purple-400">·</span>
                  <span className="font-semibold text-purple-700">Karya & Refleksi Cilik</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm text-purple-950">
                  <strong className="text-purple-900 block mb-0.5">Hasil / Output Karya:</strong>
                  {mod.activity1.output}
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Refleksi Cilik: {mod.activity1.reflection}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={reflection1}
                    onChange={e => setReflection1(e.target.value)}
                    placeholder="Tuliskan pemikiran atau jawaban refleksi singkatmu di sini..."
                    className="w-full p-3 rounded-xl border border-purple-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AKTIVITAS 2 */}
          <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs">
                  🎮 MINI GAME AKTIVITAS 2
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    ACTIVITY_TYPE_STYLES[mod.activity2.type].bg
                  }`}
                >
                  {ACTIVITY_TYPE_STYLES[mod.activity2.type].label}
                </span>
              </div>

              {/* Status Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  toggleActivity(mod.activity2.id, mod.id);
                  if (!act2Done) {
                    playChimeSound();
                  } else {
                    playSoftClick();
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                  act2Done
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-300'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${act2Done ? 'text-emerald-600 fill-emerald-100' : 'text-white'}`}
                />
                <span>{act2Done ? '⭐ Aktivitas Selesai! ✓' : 'Tandai Selesai 🚀'}</span>
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                {mod.activity2.title}
              </h3>
            </div>

            {/* Special Safety Warning if required */}
            {mod.activity2.requiresParentGuidance && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-amber-900 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>"Lakukan bersama guru, tutor, atau orang tua."</span>
              </div>
            )}

            {/* 4-Step Mini Game Pattern */}
            <div className="space-y-4">
              {/* STEP 1: 👀 Lihat */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                  <span>STEP 1: 👀 Lihat</span>
                  <span className="text-emerald-400">·</span>
                  <span className="font-semibold text-emerald-700">Tujuan & Pengamatan</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed pt-1">
                  {mod.activity2.goal}
                </p>
              </div>

              {/* STEP 2: 🧠 Pikirkan */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-800">
                  <span>STEP 2: 🧠 Pikirkan</span>
                  <span className="text-blue-400">·</span>
                  <span className="font-semibold text-blue-700">Konsep & Strategi</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed pt-1">
                  {mod.activity2.instruction}
                </p>
              </div>

              {/* STEP 3: 🎮 Coba */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <span>STEP 3: 🎮 Coba</span>
                  <span className="text-amber-400">·</span>
                  <span className="font-semibold text-amber-700">Langkah & Tantangan Praktik</span>
                </div>
                <ol className="space-y-2 pt-1">
                  {mod.activity2.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* STEP 4: ⭐ Dapatkan feedback */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-800">
                  <span>STEP 4: ⭐ Dapatkan Feedback</span>
                  <span className="text-purple-400">·</span>
                  <span className="font-semibold text-purple-700">Karya & Refleksi Cilik</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm text-purple-950">
                  <strong className="text-purple-900 block mb-0.5">Hasil / Output Karya:</strong>
                  {mod.activity2.output}
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Refleksi Cilik: {mod.activity2.reflection}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={reflection2}
                    onChange={e => setReflection2(e.target.value)}
                    placeholder="Tuliskan pemikiran atau ide kreatifmu di sini..."
                    className="w-full p-3 rounded-xl border border-purple-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick jump to Quiz */}
          <div className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-indigo-950 font-heading">
                Sudah selesai mempraktikkan aktivitas?
              </h4>
              <p className="text-xs sm:text-sm text-indigo-700">
                Uji pemahamanmu dengan kuis interaktif 3 pertanyaan untuk Modul {mod.id}.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('kuis')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 shrink-0 cursor-pointer"
            >
              Mulai Kuis Modul →
            </button>
          </div>
        </div>
      )}

      {/* Subtab Kuis */}
      {activeSubTab === 'kuis' && (
        <QuizRunner
          moduleId={mod.id}
          onFinish={() => setActiveSubTab('portfolio')}
        />
      )}

      {/* Subtab Portfolio */}
      {activeSubTab === 'portfolio' && (
        <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold">
              📁
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Simpan Karya Modul {mod.id}
              </h3>
              <p className="text-xs text-slate-500">
                Dokumentasikan hasil karya atau refleksi belajarmu ke Portofolio Cilik
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong className="text-slate-900">Saran Karya untuk Modul ini: </strong>
            {mod.portfolioPrompt}
          </div>

          {portfolioSaved && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Karya berhasil disimpan ke tab <strong>Portfolio</strong>! Tutor akan memvalidasinya.</span>
            </div>
          )}

          <form onSubmit={handlePortfolioSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Karya
              </label>
              <input
                type="text"
                required
                value={portfolioTitle}
                onChange={e => setPortfolioTitle(e.target.value)}
                placeholder={`Contoh: Proyek ${mod.title} Ciptaanku`}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Cerita / Penjelasan Karyamu
              </label>
              <textarea
                required
                rows={3}
                value={portfolioDesc}
                onChange={e => setPortfolioDesc(e.target.value)}
                placeholder="Ceritakan apa yang kamu buat, alat apa yang digunakan, dan hal menarik apa yang kamu pelajari..."
                className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('portfolio')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Buka Semua Portofolio
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Simpan ke Portofolio</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
