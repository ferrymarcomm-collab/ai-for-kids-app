import React from 'react';
import { Lock, MessageCircle, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WA_NUMBER = '6289506287054';

export const PremiumNotice: React.FC = () => {
  const { premiumNotice, closePremiumNotice } = useApp();
  if (!premiumNotice) return null;

  const message = encodeURIComponent(
    `Assalamu'alaikum, saya tertarik mendapatkan akses penuh AI FOR KIDS. Mohon informasi paket dan cara pembayarannya.`
  );

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white border-2 border-amber-200 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-900 text-white p-7 relative">
          <button onClick={closePremiumNotice} aria-label="Tutup" className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <div className="text-xs font-black uppercase tracking-wider text-amber-300 mb-1">Demo Gratis</div>
          <h2 className="text-2xl font-black font-heading">Petualangan Premium Masih Terkunci</h2>
        </div>

        <div className="p-7 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">{premiumNotice}</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {['40 Modul', '80 Aktivitas', '120 Quiz', '8 Challenge', '8 Badge', 'Portfolio'].map(item => (
              <div key={item} className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {item}
              </div>
            ))}
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-4 flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            DAPATKAN AKSES PENUH VIA WHATSAPP
          </a>
          <button onClick={closePremiumNotice} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800">
            Kembali ke Demo Gratis
          </button>
        </div>
      </div>
    </div>
  );
};
