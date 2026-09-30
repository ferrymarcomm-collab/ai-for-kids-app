import React, { useState } from 'react';
import { Lock, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';

const WA_NUMBER = '6289506287054';

export const DemoChallenge: React.FC = () => {
  const [done, setDone] = useState(false);
  const message = encodeURIComponent(
    `Assalamu'alaikum, saya ingin mendapatkan akses penuh AI FOR KIDS setelah mencoba demo.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 p-7 sm:p-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
          🎁 MINI CHALLENGE DEMO
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-4">
          Pecahkan Masalah dengan 3 Langkah
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Pilih urutan yang menurutmu paling logis untuk menyelesaikan sebuah tugas. Ini hanya tantangan pengenalan dan tidak menghasilkan Badge resmi.
        </p>

        <div className="mt-6 space-y-2">
          {['Kenali masalahnya', 'Pecah menjadi langkah kecil', 'Kerjakan dan cek hasilnya'].map((step, i) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 p-4">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center">{i + 1}</span>
              <span className="font-bold text-sm text-slate-800">{step}</span>
            </div>
          ))}
        </div>

        {!done ? (
          <button onClick={() => setDone(true)} className="mt-6 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-4 font-black text-sm">
            SELESAIKAN MINI CHALLENGE 🚀
          </button>
        ) : (
          <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-black text-emerald-900">Misi demo selesai! 🎉</h3>
            <p className="text-xs text-emerald-800 mt-1">Badge resmi dan challenge lengkap tersedia pada akses Premium.</p>
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-slate-900 text-white p-7">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-300" />
          <h2 className="font-black">Yang menunggu di versi lengkap</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-xs font-bold">
          {['39 modul lainnya', '77 aktivitas', '117 quiz', '7 challenge', '8 badge', 'Portfolio lengkap'].map(x => (
            <div key={x} className="rounded-xl bg-white/10 border border-white/10 p-3">{x}</div>
          ))}
        </div>
        <a href={`https://wa.me/${WA_NUMBER}?text=${message}`} target="_blank" rel="noreferrer"
          className="mt-5 w-full rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-4 font-black text-sm flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" /> DAPATKAN AKSES PENUH
        </a>
      </div>
    </div>
  );
};
