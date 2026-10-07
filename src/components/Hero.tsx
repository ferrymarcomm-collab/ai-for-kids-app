import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Compass,
  Star,
  Lock,
  Zap,
} from 'lucide-react';
import { JILID_LIST, MODULES_DATA } from '../data/curriculum';
import aibaRobot from '../assets/aiba-robot.svg';

export const JILID_WORLDS: Record<
  number,
  { worldName: string; emoji: string; badgeColor: string; bgSoft: string; borderSoft: string }
> = {
  1: { worldName: 'Dunia Logika', emoji: '🌱', badgeColor: 'bg-emerald-500', bgSoft: 'bg-emerald-50', borderSoft: 'border-emerald-200' },
  2: { worldName: 'Dunia Visual', emoji: '🎨', badgeColor: 'bg-blue-500', bgSoft: 'bg-blue-50', borderSoft: 'border-blue-200' },
  3: { worldName: 'Dunia AI', emoji: '🤖', badgeColor: 'bg-purple-500', bgSoft: 'bg-purple-50', borderSoft: 'border-purple-200' },
  4: { worldName: 'Dunia Kreator', emoji: '🎬', badgeColor: 'bg-amber-500', bgSoft: 'bg-amber-50', borderSoft: 'border-amber-200' },
  5: { worldName: 'Dunia Maker', emoji: '🔧', badgeColor: 'bg-orange-500', bgSoft: 'bg-orange-50', borderSoft: 'border-orange-200' },
  6: { worldName: 'Dunia Logika & Algoritma', emoji: '🧠', badgeColor: 'bg-teal-500', bgSoft: 'bg-teal-50', borderSoft: 'border-teal-200' },
  7: { worldName: 'Dunia Cyber Safety', emoji: '🛡️', badgeColor: 'bg-rose-500', bgSoft: 'bg-rose-50', borderSoft: 'border-rose-200' },
  8: { worldName: 'Dunia App Creator', emoji: '🚀', badgeColor: 'bg-indigo-500', bgSoft: 'bg-indigo-50', borderSoft: 'border-indigo-200' },
};

export const Hero: React.FC = () => {
  const {
    openJilid,
    openModule,
    setActiveTab,
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
    completedModulesCount,
    earnedBadgesCount,
  } = useApp();

  // Find next module to learn across all 40 modules (Modul 1 - 40)
  let nextModuleId = 1;
  for (let m = 1; m <= 40; m++) {
    const status = progress.moduleStatus[m];
    if (status !== 'Selesai' && status !== 'Dikuasai') {
      nextModuleId = m;
      break;
    }
  }

  const nextModule = MODULES_DATA[nextModuleId] || MODULES_DATA[1];
  const activeJilidId = nextModule.jilidId;
  const activeJilid = JILID_LIST.find(j => j.id === activeJilidId) || JILID_LIST[0];
  const activeWorld = JILID_WORLDS[activeJilidId] || JILID_WORLDS[1];

  const currentProgressPercent =
    activeJilidId === 8
      ? jilid8ProgressPercent
      : activeJilidId === 7
      ? jilid7ProgressPercent
      : activeJilidId === 6
      ? jilid6ProgressPercent
      : activeJilidId === 5
      ? jilid5ProgressPercent
      : activeJilidId === 4
      ? jilid4ProgressPercent
      : activeJilidId === 3
      ? jilid3ProgressPercent
      : activeJilidId === 2
      ? jilid2ProgressPercent
      : jilid1ProgressPercent;

  // Total quizzes taken
  const completedQuizCount = Object.keys(progress.quizResults).length;

  const getJilidProgressInfo = (jId: number) => {
    let pct = 0;
    let unlocked = true;
    if (jId === 1) {
      pct = jilid1ProgressPercent;
    } else if (jId === 2) {
      pct = jilid2ProgressPercent;
      unlocked = isJilid2Unlocked;
    } else if (jId === 3) {
      pct = jilid3ProgressPercent;
      unlocked = isJilid3Unlocked;
    } else if (jId === 4) {
      pct = jilid4ProgressPercent;
      unlocked = isJilid4Unlocked;
    } else if (jId === 5) {
      pct = jilid5ProgressPercent;
      unlocked = isJilid5Unlocked;
    } else if (jId === 6) {
      pct = jilid6ProgressPercent;
      unlocked = isJilid6Unlocked;
    } else if (jId === 7) {
      pct = jilid7ProgressPercent;
      unlocked = isJilid7Unlocked;
    } else if (jId === 8) {
      pct = jilid8ProgressPercent;
      unlocked = isJilid8Unlocked;
    }

    const isMastered = progress.earnedBadges.includes(jId) && pct >= 100;
    const isDone = pct >= 100;
    const isLearning = pct > 0;

    let iconText = '🔒';
    let statusLabel = 'Terkunci';
    let statusColor = 'text-slate-400 bg-slate-100';

    if (isMastered) {
      iconText = '🏆';
      statusLabel = 'Dikuasai';
      statusColor = 'text-amber-700 bg-amber-100 border border-amber-300';
    } else if (isDone) {
      iconText = '✅';
      statusLabel = 'Selesai';
      statusColor = 'text-emerald-700 bg-emerald-100 border border-emerald-300';
    } else if (isLearning || (unlocked && jId === activeJilidId)) {
      iconText = '⚡';
      statusLabel = 'Sedang Belajar';
      statusColor = 'text-indigo-700 bg-indigo-100 border border-indigo-300';
    } else if (unlocked) {
      iconText = '⭐';
      statusLabel = 'Siap Dimulai';
      statusColor = 'text-slate-700 bg-slate-100 border border-slate-200';
    }

    return { pct, unlocked, iconText, statusLabel, statusColor };
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white pt-8 pb-14 sm:pt-12 sm:pb-18">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Split: Child-Friendly Greeting & Current Learning Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Greeting (Child-friendly, growth-mindset) */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-amber-300">
              <img
                src={aibaRobot}
                alt="AIBA"
                className="w-8 h-9 object-cover rounded-xl shadow-md animate-bounce"
                style={{ animationDuration: '3s' }}
              />
              <span>AIBA Si Pendamping Cerdas Siap Membantumu!</span>
            </div>

            {/* Sapaan sesuai brief: "Halo, Coder! 👋" dan "Siap menjelajah dunia AI hari ini?" */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.1] text-white">
              Halo, Coder {progress.profile.nickname ? `${progress.profile.nickname}` : ''}! 👋
            </h1>

            <p className="text-lg sm:text-2xl font-bold text-amber-300">
              Siap menjelajah dunia AI hari ini?
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Belajar logika, koding, dan kecerdasan buatan sambil berpetualang melewati 8 dunia penuh tantangan mini game seru!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Aman & Ramah Anak
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Star className="w-4 h-4 text-amber-400" />
                Fokus Kemajuan Sendiri
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Trophy className="w-4 h-4 text-indigo-300" />
                8 Lencana Kehormatan
              </span>
            </div>
          </div>

          {/* CURRENT LEARNING CARD (Per Requirement #5) */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border-2 border-amber-300/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left text-white relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{activeWorld.emoji}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                      Lanjut Belajar
                    </span>
                    <span className="text-xs text-indigo-200 font-semibold">
                      Jilid {activeJilid.id} · {activeWorld.worldName}
                    </span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/20">
                  Modul {nextModule.id} / 40
                </div>
              </div>

              {/* Module Info & Title */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  Misi Saat Ini:
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white font-heading leading-snug">
                  Modul {nextModule.id} — {nextModule.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {nextModule.description}
                </p>
              </div>

              {/* Progress visual bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-indigo-200">
                  <span>Kemajuan Jilid {activeJilid.id}</span>
                  <span className="text-amber-300 font-mono">{currentProgressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(currentProgressPercent, 8)}%` }}
                  />
                </div>
              </div>

              {/* Tombol LANJUTKAN 🚀 (Sesuai Spesifikasi) */}
              <button
                type="button"
                onClick={() => openModule(nextModule.id)}
                className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-base shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <span>LANJUTKAN 🚀</span>
              </button>
            </div>
          </div>
        </div>

        {/* PROGRESS VISUAL: 🚀 Petualanganmu (Per Requirement #6 & #7) */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="text-lg font-black font-heading text-white tracking-wide">
                  Petualanganmu
                </h3>
                <p className="text-xs text-slate-300">
                  8 Dunia Penjelajahan · Tuntaskan misi dan kumpulkan 8 lencana kebanggaan
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-indigo-200 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
              Perkembangan Diri Sendiri · Tanpa Ranking
            </div>
          </div>

          {/* Visual Milestone Trail (Jilid 1 → Jilid 2 → ... → Jilid 8) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
            {JILID_LIST.map(jilid => {
              const world = JILID_WORLDS[jilid.id] || JILID_WORLDS[1];
              const { pct, unlocked, iconText, statusLabel, statusColor } = getJilidProgressInfo(jilid.id);
              const isActive = jilid.id === activeJilidId;

              return (
                <button
                  type="button"
                  key={jilid.id}
                  disabled={!unlocked}
                  onClick={() => openJilid(jilid.id)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 border-amber-300 ring-2 ring-amber-300/30 scale-102'
                      : unlocked
                      ? 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                      : 'bg-white/5 border-white/5 text-slate-500 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-xl">{world.emoji}</span>
                    <span className="text-sm" title={statusLabel}>
                      {iconText}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                      Jilid {jilid.id}
                    </span>
                    <span className="text-xs font-bold text-white block truncate">
                      {world.worldName}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className="text-slate-300">{pct}%</span>
                    <span className="font-semibold text-indigo-200 truncate ml-1">{statusLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Personal Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-slate-300 block mb-0.5">Modul Dituntaskan</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {completedModulesCount}/40
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-slate-300 block mb-0.5">Lencana Diraih</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {earnedBadgesCount}/8
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-slate-300 block mb-0.5">Karya Tersimpan</span>
              <span className="text-xl sm:text-2xl font-black text-indigo-300 font-mono">
                {progress.portfolios.length}/40
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-slate-300 block mb-0.5">Kuis Dikerjakan</span>
              <span className="text-xl sm:text-2xl font-black text-pink-400 font-mono">
                {completedQuizCount}/40
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

