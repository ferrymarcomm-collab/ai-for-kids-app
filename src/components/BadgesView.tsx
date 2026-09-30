import React from 'react';
import { useApp } from '../context/AppContext';
import { JILID_LIST } from '../data/curriculum';
import { Award, CheckCircle2, Lock, ArrowRight, Clock, UserCheck, Sparkles } from 'lucide-react';
import { playFanfareSound } from '../utils/audio';

export const BadgesView: React.FC = () => {
  const { progress, setActiveTab, simulateTeacherValidation, earnedBadgesCount } = useApp();

  const handleValidate = (jilidId: any) => {
    playFanfareSound();
    simulateTeacherValidation(jilidId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            Galeri Badge Prestasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Galeri Badge 🏆
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Koleksi 8 lencana kehormatan yang kamu peroleh setiap kali berhasil menuntaskan Challenge Jilid dan divalidasi oleh Guru/Tutor!
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 self-start sm:self-auto">
          <Award className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider font-extrabold block">
              Lencana Diraih
            </span>
            <span className="text-sm font-black">{earnedBadgesCount} dari 8 Badge</span>
          </div>
        </div>
      </div>

      {/* Empty State Banner (Per Section 17) */}
      {earnedBadgesCount === 0 && (
        <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-dashed border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              🏆
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 font-heading">
                Badge-mu akan muncul di sini!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Selesaikan challenge dan validasi guru untuk mendapatkannya.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('challenge')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0"
          >
            <span>IKUTI CHALLENGE 🚀</span>
          </button>
        </div>
      )}

      {/* 8 Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {JILID_LIST.map(jilid => {
          const isUnlocked = progress.earnedBadges.includes(jilid.id);
          const challengeSubmission = progress.challengeSubmissions[jilid.id];
          const isWaitingValidation = !isUnlocked && challengeSubmission?.status === 'Menunggu Validasi';

          return (
            <div
              key={jilid.id}
              className={`rounded-3xl p-6 border-2 text-center transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                  : isWaitingValidation
                  ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 opacity-80'
              }`}
            >
              <div>
                {/* Badge Icon Emblem */}
                <div
                  className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4 border-2 shadow-inner transition-transform ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-300 via-amber-100 to-white border-amber-300 scale-105 animate-in zoom-in-95 duration-200'
                      : 'bg-slate-200 border-slate-300 grayscale'
                  }`}
                >
                  {isUnlocked ? jilid.badgeIcon : '🔒'}
                </div>

                {/* Status per Section 13 */}
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>🏆 DIDAPATKAN</span>
                    </span>
                  ) : isWaitingValidation ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider animate-pulse">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>⏳ Menunggu Validasi</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-black uppercase tracking-wider">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>🔒 Masih Terkunci</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  Badge {jilid.id} · Jilid {jilid.id}
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading mb-2 leading-tight">
                  {jilid.badgeName}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {jilid.badgeDescription}
                </p>

                {/* Cara Mendapatkannya (Per Section 13) */}
                <div className="p-2.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-600 leading-snug text-left mb-4">
                  <span className="font-bold text-slate-800 block mb-0.5">🎯 Cara Mendapatkan:</span>
                  Selesaikan Challenge Misi Jilid {jilid.id} & validasi oleh Guru/Tutor.
                </div>
              </div>

              <div className="pt-2">
                {isUnlocked ? (
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-900 text-xs font-black border border-amber-200 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lencana Aktif & Dikuasai</span>
                  </div>
                ) : isWaitingValidation ? (
                  <div className="space-y-2">
                    <div className="text-[11px] text-amber-800 font-medium">
                      Menunggu evaluasi Guru/Tutor
                    </div>
                    <button
                      onClick={() => handleValidate(jilid.id)}
                      className="w-full py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                      title="MODE DEMO: Simulasikan persetujuan guru"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Validasi (Demo Guru)</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTab('challenge')}
                    className="w-full py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Kerjakan Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
