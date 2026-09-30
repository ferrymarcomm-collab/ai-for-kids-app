import React from 'react';
import { useApp } from '../context/AppContext';
import { JILID_LIST, MODULES_DATA } from '../data/curriculum';
import { JilidId, LearningStatus } from '../types';
import { JILID_WORLDS } from './Hero';
import {
  Cpu,
  Palette,
  Bot,
  Sparkles,
  Wrench,
  GitBranch,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Palette,
  Bot,
  Sparkles,
  Wrench,
  GitBranch,
  ShieldAlert,
  Layers,
};

export const LearningPath: React.FC = () => {
  const {
    openJilid,
    openModule,
    progress,
    jilid1ProgressPercent,
    jilid2ProgressPercent,
    jilid3ProgressPercent,
    jilid4ProgressPercent,
    jilid5ProgressPercent,
    jilid6ProgressPercent,
    jilid7ProgressPercent,
    jilid8ProgressPercent,
    isJilid2Unlocked,
    isJilid3Unlocked,
    isJilid4Unlocked,
    isJilid5Unlocked,
    isJilid6Unlocked,
    isJilid7Unlocked,
    isJilid8Unlocked,
    isJilidUnlocked,
    isModuleAccessible,
  } = useApp();

  const getJilidStatus = (jilidId: JilidId): LearningStatus => {
    if (jilidId === 1) {
      const isBadgeEarned = progress.earnedBadges.includes(1);
      const jilid1Statuses = [1, 2, 3, 4, 5].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid1Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid1Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid1Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai') || progress.completedActivityIds.length > 0) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 2) {
      if (!isJilid2Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(2);
      const jilid2Statuses = [6, 7, 8, 9, 10].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid2Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid2Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid2Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 3) {
      if (!isJilid3Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(3);
      const jilid3Statuses = [11, 12, 13, 14, 15].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid3Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid3Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid3Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 4) {
      if (!isJilid4Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(4);
      const jilid4Statuses = [16, 17, 18, 19, 20].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid4Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid4Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid4Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 5) {
      if (!isJilid5Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(5);
      const jilid5Statuses = [21, 22, 23, 24, 25].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid5Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid5Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid5Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 6) {
      if (!isJilid6Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(6);
      const jilid6Statuses = [26, 27, 28, 29, 30].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid6Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid6Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid6Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 7) {
      if (!isJilid7Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(7);
      const jilid7Statuses = [31, 32, 33, 34, 35].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid7Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid7Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid7Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    if (jilidId === 8) {
      if (!isJilid8Unlocked) {
        return 'Belum Mulai';
      }
      const isBadgeEarned = progress.earnedBadges.includes(8);
      const jilid8Statuses = [36, 37, 38, 39, 40].map(id => progress.moduleStatus[id] || 'Belum Mulai');

      if (isBadgeEarned && jilid8Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Dikuasai';
      }
      if (jilid8Statuses.every(s => s === 'Selesai' || s === 'Dikuasai')) {
        return 'Selesai';
      }
      if (jilid8Statuses.some(s => s === 'Sedang Belajar' || s === 'Selesai' || s === 'Dikuasai')) {
        return 'Sedang Belajar';
      }
      return 'Belum Mulai';
    }

    return 'Belum Mulai';
  };

  const getStatusBadge = (jilidId: JilidId, status: LearningStatus) => {
    if (jilidId === 2 && !isJilid2Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 3 && !isJilid3Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 4 && !isJilid4Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 5 && !isJilid5Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 6 && !isJilid6Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 7 && !isJilid7Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    if (jilidId === 8 && !isJilid8Unlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Terkunci</span>
        </span>
      );
    }

    switch (status) {
      case 'Dikuasai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <span>🏆 Dikuasai</span>
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            <span>🟢 Selesai</span>
          </span>
        );
      case 'Sedang Belajar':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
            <span>🟡 Sedang Belajar</span>
          </span>
        );
      case 'Belum Mulai':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <span>⚪ Belum Mulai</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Kurikulum Berjenjang
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            8 Jilid Pembelajaran
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Langkah demi langkah menuju kemahiran logika, koding, dan AI. Setiap Jilid berisi 5 modul terstruktur, kuis pemahaman, dan sebuah tantangan proyek akhir.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl shrink-0">
          <span>Kurikulum Aktif:</span>
          <span className="font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md">
            Semua 8 Jilid Aktif (Modul 1–40)
          </span>
        </div>
      </div>

      {/* Jilid Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {JILID_LIST.map(jilid => {
          const Icon = ICON_MAP[jilid.iconName] || Cpu;
          const status = getJilidStatus(jilid.id);
          const isJilid1 = jilid.id === 1;
          const isJilid2 = jilid.id === 2;
          const isJilid3 = jilid.id === 3;
          const isJilid4 = jilid.id === 4;
          const isJilid5 = jilid.id === 5;
          const isJilid6 = jilid.id === 6;
          const isJilid7 = jilid.id === 7;
          const isJilid8 = jilid.id === 8;
          const isPlaceholder = false;
          const isLocked =
            (isJilid2 && !isJilid2Unlocked) ||
            (isJilid3 && !isJilid3Unlocked) ||
            (isJilid4 && !isJilid4Unlocked) ||
            (isJilid5 && !isJilid5Unlocked) ||
            (isJilid6 && !isJilid6Unlocked) ||
            (isJilid7 && !isJilid7Unlocked) ||
            (isJilid8 && !isJilid8Unlocked);

          // Progress calculation
          let progressPercent = 0;
          if (isJilid1) {
            progressPercent = jilid1ProgressPercent;
          } else if (isJilid2) {
            progressPercent = jilid2ProgressPercent;
          } else if (isJilid3) {
            progressPercent = jilid3ProgressPercent;
          } else if (isJilid4) {
            progressPercent = jilid4ProgressPercent;
          } else if (isJilid5) {
            progressPercent = jilid5ProgressPercent;
          } else if (isJilid6) {
            progressPercent = jilid6ProgressPercent;
          } else if (isJilid7) {
            progressPercent = jilid7ProgressPercent;
          } else if (isJilid8) {
            progressPercent = jilid8ProgressPercent;
          }

          return (
            <div
              key={jilid.id}
              className={`relative rounded-3xl bg-white border-2 p-6 transition-all hover:shadow-lg ${
                isJilid1
                  ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10'
                  : isJilid2 && !isLocked
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-500/10'
                  : isJilid3 && !isLocked
                  ? 'border-purple-500 shadow-md ring-2 ring-purple-500/10'
                  : isJilid4 && !isLocked
                  ? 'border-amber-500 shadow-md ring-2 ring-amber-500/10'
                  : isJilid5 && !isLocked
                  ? 'border-orange-500 shadow-md ring-2 ring-orange-500/10'
                  : isJilid6 && !isLocked
                  ? 'border-teal-500 shadow-md ring-2 ring-teal-500/10'
                  : isJilid7 && !isLocked
                  ? 'border-rose-500 shadow-md ring-2 ring-rose-500/10'
                  : isJilid8 && !isLocked
                  ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : isLocked
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200 hover:border-slate-300 opacity-90'
              }`}
            >
              {/* Card Top: Number, Icon, Status & Dunia badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-xs shrink-0 ${
                      isJilid1
                        ? 'bg-emerald-600 text-white'
                        : isJilid2 && !isLocked
                        ? 'bg-blue-600 text-white'
                        : isJilid3 && !isLocked
                        ? 'bg-purple-600 text-white'
                        : isJilid4 && !isLocked
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : isJilid5 && !isLocked
                        ? 'bg-orange-500 text-white font-black'
                        : isJilid6 && !isLocked
                        ? 'bg-teal-600 text-white font-black'
                        : isJilid7 && !isLocked
                        ? 'bg-rose-600 text-white font-black'
                        : isJilid8 && !isLocked
                        ? 'bg-indigo-600 text-white font-black'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-600 mb-0.5">
                      <span>{JILID_WORLDS[jilid.id]?.emoji}</span>
                      <span>{JILID_WORLDS[jilid.id]?.worldName}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">JILID {jilid.id}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading leading-tight">
                      {jilid.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0">{getStatusBadge(jilid.id, status)}</div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                {jilid.description}
              </p>

              {/* Modules List Preview */}
              <div className="space-y-1.5 mb-5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
                  <span>5 Modul Belajar</span>
                  <span className="text-indigo-600 font-bold">{jilid.theme}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {jilid.moduleIds.map(moduleId => {
                    const mod = MODULES_DATA[moduleId];
                    const modStatus = progress.moduleStatus[moduleId] || 'Belum Mulai';
                    const isDone = modStatus === 'Selesai' || modStatus === 'Dikuasai';
                    const isLearning = modStatus === 'Sedang Belajar';

                    const isModuleLocked = isLocked || !isModuleAccessible(moduleId);

                    return (
                      <button
                        type="button"
                        key={moduleId}
                        disabled={isModuleLocked}
                        onClick={() => openModule(moduleId)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between gap-1 transition-colors ${
                          isDone
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : isLearning
                            ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold'
                            : isModuleLocked
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'hover:bg-slate-200/60 text-slate-600 cursor-pointer'
                        }`}
                      >
                        <span className="truncate">
                          {moduleId}. {mod.title}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : isModuleLocked ? (
                          <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Kemajuan Jilid {jilid.id}</span>
                  <span
                    className={
                      isJilid1
                        ? 'text-emerald-600'
                        : isJilid2
                        ? 'text-blue-600'
                        : isJilid3
                        ? 'text-purple-600'
                        : isJilid4
                        ? 'text-amber-600'
                        : isJilid5
                        ? 'text-orange-600'
                        : isJilid6
                        ? 'text-teal-600'
                        : isJilid7
                        ? 'text-rose-600'
                        : 'text-indigo-600'
                    }
                  >
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isJilid1
                        ? 'bg-emerald-500'
                        : isJilid2
                        ? 'bg-blue-500'
                        : isJilid3
                        ? 'bg-purple-500'
                        : isJilid4
                        ? 'bg-amber-500'
                        : isJilid5
                        ? 'bg-orange-500'
                        : isJilid6
                        ? 'bg-teal-500'
                        : isJilid7
                        ? 'bg-rose-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Challenge summary callout */}
              <div className="flex items-center gap-2 p-2.5 mb-5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                <span className="text-base shrink-0">{jilid.badgeIcon}</span>
                <span className="truncate">
                  <strong>Challenge:</strong> {jilid.challengeTitle}
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isLocked ? (
                  <button
                    type="button"
                    onClick={() => openJilid(isJilid8 ? 7 : isJilid7 ? 6 : isJilid6 ? 5 : isJilid5 ? 4 : isJilid4 ? 3 : isJilid3 ? 2 : 1)}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-amber-700" />
                    <span>Selesaikan Jilid {isJilid8 ? '7' : isJilid7 ? '6' : isJilid6 ? '5' : isJilid5 ? '4' : isJilid4 ? '3' : isJilid3 ? '2' : '1'} Terlebih Dahulu</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openJilid(jilid.id)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isJilid1
                        ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-md shadow-emerald-600/20'
                        : isJilid2
                        ? 'bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-md shadow-blue-600/20'
                        : isJilid3
                        ? 'bg-purple-600 hover:bg-purple-700 active:scale-98 text-white shadow-md shadow-purple-600/20'
                        : isJilid4
                        ? 'bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                        : isJilid5
                        ? 'bg-orange-500 hover:bg-orange-600 active:scale-98 text-white shadow-md shadow-orange-500/20 font-black'
                        : isJilid6
                        ? 'bg-teal-600 hover:bg-teal-700 active:scale-98 text-white shadow-md shadow-teal-600/20 font-black'
                        : isJilid7
                        ? 'bg-rose-600 hover:bg-rose-700 active:scale-98 text-white shadow-md shadow-rose-600/20 font-black'
                        : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white shadow-md shadow-indigo-600/20 font-black'
                    }`}
                  >
                    <span>Buka Modul Jilid {jilid.id}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
