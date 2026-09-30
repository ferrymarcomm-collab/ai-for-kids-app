import React from 'react';
import { useApp } from '../context/AppContext';
import { JILID_LIST, MODULES_DATA } from '../data/curriculum';
import { JilidId, LearningStatus } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Trophy,
  ArrowRight,
  Sparkles,
  Lock,
  Clock,
} from 'lucide-react';

interface JilidDetailProps {
  jilidId: JilidId;
}

export const JilidDetail: React.FC<JilidDetailProps> = ({ jilidId }) => {
  const {
    openModule,
    openJilid,
    showAllJilids,
    setActiveTab,
    progress,
    isJilid2Unlocked,
    isJilid3Unlocked,
    isJilid4Unlocked,
    isJilid5Unlocked,
    isJilid6Unlocked,
    isJilid7Unlocked,
    isJilid8Unlocked,
    isModuleAccessible,
  } = useApp();

  const jilid = JILID_LIST.find(j => j.id === jilidId) || JILID_LIST[0];
  const isJilid1 = jilid.id === 1;
  const isJilid2 = jilid.id === 2;
  const isJilid3 = jilid.id === 3;
  const isJilid4 = jilid.id === 4;
  const isJilid5 = jilid.id === 5;
  const isJilid6 = jilid.id === 6;
  const isJilid7 = jilid.id === 7;
  const isJilid8 = jilid.id === 8;

  const getModuleStatus = (moduleId: number): LearningStatus => {
    return progress.moduleStatus[moduleId] || 'Belum Mulai';
  };

  const getModuleProgressPercent = (moduleId: number): number => {
    const mod = MODULES_DATA[moduleId];
    if (!mod || !mod.isPhase1Ready) return 0;

    let itemsDone = 0;
    if (progress.completedActivityIds.includes(mod.activity1.id)) itemsDone++;
    if (progress.completedActivityIds.includes(mod.activity2.id)) itemsDone++;
    if ((progress.quizResults[moduleId]?.score ?? 0) >= 70) itemsDone++;

    return Math.round((itemsDone / 3) * 100);
  };

  const getStatusBadge = (status: LearningStatus) => {
    switch (status) {
      case 'Dikuasai':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <span>🏆 Dikuasai</span>
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            <span>✅ Selesai</span>
          </span>
        );
      case 'Sedang Belajar':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-300 animate-pulse">
            <span>⚡ Sedang Belajar</span>
          </span>
        );
      case 'Belum Mulai':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <span>🔒 Belum Mulai</span>
          </span>
        );
    }
  };

  // If opening Jilid 8 but Jilid 7 is not yet finished
  if (isJilid8 && !isJilid8Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 8 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 8 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-indigo-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 7 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 8, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 7 — Keamanan Siber & Desain Grafis</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(7)}
              className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 7</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 8 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 2 but Jilid 1 is not yet finished
  if (isJilid2 && !isJilid2Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 2 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 2 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-blue-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 1 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 2, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 1 — Fondasi Logika & Dekomposisi</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(1)}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 2 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 3 but Jilid 2 is not yet finished
  if (isJilid3 && !isJilid3Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 3 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 3 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-purple-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 2 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 3, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 2 — Dunia Visual & Identitas Digital</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(2)}
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 3 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 4 but Jilid 3 is not yet finished
  if (isJilid4 && !isJilid4Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 4 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 4 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-amber-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 3 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 4, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 3 — Kecerdasan Mesin & Kolaborasi</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(3)}
              className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-purple-600/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 4 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 5 but Jilid 4 is not yet finished
  if (isJilid5 && !isJilid5Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 5 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 5 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-orange-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 4 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 5, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 4 — Kreator Digital & Event Pemicu</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(4)}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 5 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 6 but Jilid 5 is not yet finished
  if (isJilid6 && !isJilid6Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 6 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 6 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-teal-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 5 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 6, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 5 — Arsitektur Mesin & Rekayasa Maker</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(5)}
              className="px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 5</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 6 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If opening Jilid 7 but Jilid 6 is not yet finished
  if (isJilid7 && !isJilid7Unlocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={showAllJilids}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Jilid</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Jilid 7 dari 8</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 border-2 border-amber-300 bg-amber-50/40 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔒
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
              JILID 7 TERKUNCI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h2>
            <p className="text-sm font-semibold text-rose-700 mt-1">
              {jilid.theme}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-sm leading-relaxed font-medium">
            <h3 className="font-extrabold text-base mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Selesaikan Jilid 6 Terlebih Dahulu</span>
            </h3>
            <p>
              Untuk menguasai Jilid 7, kamu perlu menuntaskan aktivitas & kuis pada <strong>Jilid 6 — Logika Benar/Salah & Otomatisasi</strong> terlebih dahulu.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openJilid(6)}
              className="px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-teal-600/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Lanjut Belajar Jilid 6</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Modules list preview */}
        <div className="max-w-2xl mx-auto space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">
            Daftar Modul Jilid 7 (Terkunci)
          </div>
          <div className="space-y-2">
            {jilid.moduleIds.map(mId => {
              const m = MODULES_DATA[mId];
              return (
                <div
                  key={mId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-slate-600 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {mId}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {m?.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Terkunci 🔒
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // JILID 1, 2, 3, 4, 5, 6 OR UNLOCKED JILID 7 (FULLY ACTIVE)
  const isBadgeEarned = progress.earnedBadges.includes(jilid.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={showAllJilids}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Jilid</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Jilid {jilid.id} dari 8 (Aktif)</span>
        </div>
      </div>

      {/* Jilid Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border-2 shadow-sm ${
          isJilid1
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-emerald-200'
            : isJilid2
            ? 'bg-gradient-to-br from-blue-50 via-sky-50/50 to-white border-blue-200'
            : isJilid3
            ? 'bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-white border-purple-200'
            : isJilid4
            ? 'bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-amber-200'
            : isJilid5
            ? 'bg-gradient-to-br from-orange-50 via-amber-50/50 to-white border-orange-200'
            : isJilid6
            ? 'bg-gradient-to-br from-teal-50 via-cyan-50/50 to-white border-teal-200'
            : isJilid7
            ? 'bg-gradient-to-br from-rose-50 via-pink-50/50 to-white border-rose-200'
            : 'bg-gradient-to-br from-indigo-50 via-purple-50/50 to-white border-indigo-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold border border-slate-200 text-slate-700 shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${isJilid1 ? 'bg-emerald-500' : isJilid2 ? 'bg-blue-500' : isJilid3 ? 'bg-purple-500' : isJilid4 ? 'bg-amber-500' : isJilid5 ? 'bg-orange-500' : isJilid6 ? 'bg-teal-500' : isJilid7 ? 'bg-rose-500' : 'bg-indigo-500'}`} />
              <span>JILID {jilid.id}</span>
              <span className="text-slate-300">·</span>
              <span className={isJilid1 ? 'text-emerald-700' : isJilid2 ? 'text-blue-700' : isJilid3 ? 'text-purple-700' : isJilid4 ? 'text-amber-700' : isJilid5 ? 'text-orange-700' : isJilid6 ? 'text-teal-700' : isJilid7 ? 'text-rose-700' : 'text-indigo-700'}>{jilid.theme}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              {jilid.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {jilid.description}
            </p>
          </div>

          {/* Badge & Challenge Goal Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs md:w-80 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner border border-amber-200">
                {isBadgeEarned ? '🏆' : '🔒'}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Target Badge Jilid {jilid.id}
                </div>
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {jilid.badgeName}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {isBadgeEarned ? 'Status: Terbuka' : 'Status: Belum Divalidasi'}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-normal mb-3">
              {jilid.challengeDescription}
            </p>
            <button
              onClick={() => setActiveTab('challenge')}
              className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Lihat Challenge Jilid {jilid.id}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Modules List Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Daftar 5 Modul Pembelajaran Jilid {jilid.id}
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Selesaikan 2 aktivitas & kuis per modul (lulus ≥70%)
          </span>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jilid.moduleIds.map(moduleId => {
            const mod = MODULES_DATA[moduleId];
            const status = getModuleStatus(moduleId);
            const progressPercent = getModuleProgressPercent(moduleId);
            const isFinished = status === 'Selesai' || status === 'Dikuasai';
            const isLearning = status === 'Sedang Belajar';
            const moduleLocked = !isModuleAccessible(moduleId);

            // Contextual module icon
            const moduleEmojis = ['💻', '🧩', '🔍', '📋', '🤖', '🎨', '🏃', '🎭', '🛡️', '📰', '🧠', '👁️', '💡', '🤝', '⚙️', '⚡', '⌨️', '🎬', '✂️', '🌟', '🔌', '🖥️', '📦', '🛠️', '🎲', '⚖️', '🔄', '❓', '🕹️', '🏆', '🔐', '🔑', '🎣', '📢', '🚨', '📦', '📥', '🧮', '📤', '🚀'];
            const modEmoji = moduleEmojis[(moduleId - 1) % moduleEmojis.length] || '🧠';

            return (
              <div
                key={moduleId}
                className="rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg shadow-2xs group-hover:scale-110 transition-transform">
                        {modEmoji}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                        MODUL {mod.id}
                      </span>
                    </div>
                    {getStatusBadge(status)}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-heading mb-2 leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Activity count pill */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span>🎮 2 Aktivitas Interaktif</span>
                    <span>·</span>
                    <span>🎯 3 Soal Kuis</span>
                  </div>

                  {/* Progress indicator */}
                  <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Progres Belajar</span>
                      <span className="text-indigo-600 font-mono">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <button
                  type="button"
                  disabled={moduleLocked}
                  onClick={() => openModule(moduleId)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${moduleLocked ? 'bg-amber-50 text-amber-800 border border-amber-300 cursor-not-allowed' : 'cursor-pointer'} ${
                    isFinished
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 active:scale-98'
                      : isLearning
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 active:scale-98'
                      : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
                  }`}
                >
                  {moduleLocked ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>
                    {moduleLocked
                      ? 'TERKUNCI 🔒'
                      : isFinished
                      ? 'TINJAU ULANG ✅'
                      : isLearning
                      ? 'LANJUTKAN 🚀'
                      : 'MULAI BELAJAR 🚀'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
