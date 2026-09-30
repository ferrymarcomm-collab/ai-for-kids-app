import React, { useState } from 'react';
import { AI_SAFETY_PRINCIPLES } from '../data/curriculum';
import {
  ShieldAlert,
  ShieldCheck,
  UserX,
  Users,
  Home,
  KeyRound,
  CameraOff,
  AlertCircle,
  BookOpenCheck,
  Link2Off,
  Crown,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  UserX,
  Users,
  Home,
  KeyRound,
  CameraOff,
  AlertCircle,
  BookOpenCheck,
  ShieldCheck,
  Link2Off,
  Crown,
};

export const AISafetyView: React.FC = () => {
  const [pledged, setPledged] = useState<number[]>([1, 2, 3]);
  const [dummyPassword, setDummyPassword] = useState('kucing123');

  const togglePledge = (num: number) => {
    if (pledged.includes(num)) {
      setPledged(pledged.filter(n => n !== num));
    } else {
      setPledged([...pledged, num]);
    }
  };

  // Safe dummy password evaluation (educational only)
  const isLengthOk = dummyPassword.length >= 8;
  const hasNumber = /\d/.test(dummyPassword);
  const hasSymbol = /[!@#$%^&*]/.test(dummyPassword);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-600 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-rose-100">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Zona Keamanan & Etika Digital</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight">
            🛡️ AI SAFETY ZONE
          </h1>

          <p className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed">
            10 Prinsip Emas Menjadi Pengguna AI & Penjelajah Internet yang Cerdas, Kritis, dan Selalu Terlindungi.
          </p>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-amber-200 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-300 shrink-0" />
            <span>Ingat: Kamu adalah BOS-nya! AI hanya alat untuk membantu mencari ide.</span>
          </div>
        </div>
      </div>

      {/* 5 Penekanan Khusus Keselamatan Siber & AI */}
      <div className="p-5 sm:p-6 rounded-3xl bg-rose-50 border-2 border-rose-300 space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <h2 className="text-sm sm:text-base font-black text-rose-950 font-heading">
            5 Pesan Kunci Keselamatan Siber & AI
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-white border border-rose-200 text-xs text-rose-900 font-semibold flex items-start gap-2 shadow-2xs">
            <span className="text-rose-500 font-bold shrink-0">1.</span>
            <span><strong>AI tidak selalu benar:</strong> Selalu cek ulang fakta bersama guru/buku.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-rose-200 text-xs text-rose-900 font-semibold flex items-start gap-2 shadow-2xs">
            <span className="text-rose-500 font-bold shrink-0">2.</span>
            <span><strong>Jangan beri data pribadi:</strong> Nama lengkap, alamat, & kontak bukan untuk AI.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-rose-200 text-xs text-rose-900 font-semibold flex items-start gap-2 shadow-2xs">
            <span className="text-rose-500 font-bold shrink-0">3.</span>
            <span><strong>Tanyakan orang dewasa:</strong> Sebelum mencoba situs AI atau aplikasi baru.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-rose-200 text-xs text-rose-900 font-semibold flex items-start gap-2 shadow-2xs">
            <span className="text-rose-500 font-bold shrink-0">4.</span>
            <span><strong>Jangan klik link mencurigakan:</strong> Waspada terhadap iming-iming hadiah palsu.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-rose-200 text-xs text-rose-900 font-semibold flex items-start gap-2 sm:col-span-2 lg:col-span-2 shadow-2xs">
            <span className="text-rose-500 font-bold shrink-0">5.</span>
            <span><strong>Gunakan Password Dummy Saja:</strong> Jangan pernah memasukkan kata sandi akun aslimu ke dalam simulasi belajar.</span>
          </div>
        </div>
      </div>

      {/* 10 Principles Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            10 Prinsip Keselamatan AI untuk Anak
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Bahasa ramah anak & mudah diingat
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {AI_SAFETY_PRINCIPLES.map(item => {
            const Icon = ICON_MAP[item.icon] || ShieldCheck;
            const isPledged = pledged.includes(item.number);

            return (
              <div
                key={item.number}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  isPledged
                    ? 'bg-white border-emerald-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs ${
                    item.number === 10
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : isPledged
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                      <span>{item.number === 1 ? '🛡️' : item.number === 2 ? '👥' : item.number === 3 ? '🏠' : item.number === 4 ? '🔐' : item.number === 5 ? '📸' : item.number === 6 ? '🧐' : item.number === 7 ? '📚' : item.number === 8 ? '🤝' : item.number === 9 ? '🚫' : '👑'}</span>
                      <span>Rule #{item.number}</span>
                    </span>
                    <button
                      onClick={() => togglePledge(item.number)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        isPledged
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {isPledged ? 'Saya Paham ✓' : 'Tandai Paham'}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-heading leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Rule #18: Aturan Khusus Pendamping & Password Dummy Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Aturan Khusus Pendampingan */}
        <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
              ⚠️
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950 font-heading">
                Aturan Keamanan Khusus
              </h3>
              <p className="text-xs text-amber-800">
                Penting saat berinteraksi dengan teknologi
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs sm:text-sm text-amber-900 font-bold leading-relaxed">
            "Untuk aktivitas yang menggunakan kamera, foto, AI, website eksternal, atau pengecekan password: Lakukan bersama guru, tutor, atau orang tua."
          </div>

          <p className="text-xs text-amber-800 leading-relaxed">
            Internet dan AI adalah tempat belajar yang luar biasa luas. Dengan pendampingan orang dewasa, eksplorasimu akan jauh lebih seru, aman, dan tanpa rasa cemas!
          </p>
        </div>

        {/* Simulasi Password Dummy (Tanpa Password Asli) */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Laboratorium Password Baja
              </h3>
              <p className="text-xs text-slate-400">
                JANGAN PERNAH ketik password aslimu! Uji contoh tiruan saja.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Gunakan password DUMMY. Jangan masukkan password asli akun pribadimu!</span>
            </div>
            <label className="text-xs text-slate-300 font-bold">
              Ketik Contoh Password Dummy:
            </label>
            <input
              type="text"
              value={dummyPassword}
              onChange={e => setDummyPassword(e.target.value)}
              placeholder="Contoh: robot!bintang88"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className={isLengthOk ? 'text-emerald-400' : 'text-slate-500'}>
                {isLengthOk ? '✓' : '○'} Minimal 8 karakter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={hasNumber ? 'text-emerald-400' : 'text-slate-500'}>
                {hasNumber ? '✓' : '○'} Mengandung angka (0–9)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={hasSymbol ? 'text-emerald-400' : 'text-slate-500'}>
                {hasSymbol ? '✓' : '○'} Mengandung simbol unik (!, @, #, $, %)
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Contoh password baja yang kuat: <code className="text-amber-300 font-mono">Buku#Hebat2026</code>
          </p>
        </div>
      </div>
    </div>
  );
};
