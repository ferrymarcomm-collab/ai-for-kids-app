import React, { useState } from 'react';
import { getStoredSession, activatePremiumForUser } from '../lib-supabase';

export const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activate = async () => {
    setBusy(true); setMessage(null); setError(null);
    try {
      const session = getStoredSession();
      if (!session?.access_token) throw new Error('Sesi admin tidak ditemukan. Silakan login kembali.');
      const result = await activatePremiumForUser(email, session.access_token);
      setMessage(`Premium aktif untuk ${result.email}. Minta pembeli refresh atau login ulang.`);
      setEmail('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Aktivasi gagal.');
    } finally { setBusy(false); }
  };

  return <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-700 to-purple-700 text-white flex items-center justify-between">
        <div><div className="text-xs font-black uppercase tracking-wider text-indigo-100">AIB Admin</div><h2 className="text-2xl font-black mt-1">Aktifkan Premium</h2></div>
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 font-black">×</button>
      </div>
      <div className="p-6 space-y-5">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">Setelah pembayaran transfer diverifikasi, masukkan email akun pembeli lalu aktifkan Premium.</div>
        <label className="block"><span className="text-sm font-bold text-slate-700">Email akun pembeli</span>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="contoh@email.com" className="mt-2 w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 outline-none" />
        </label>
        {message && <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800">✅ {message}</div>}
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm font-semibold text-rose-800">⚠️ {error}</div>}
        <button disabled={busy || !email.trim()} onClick={activate} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black">{busy ? 'MEMPROSES…' : 'AKTIFKAN PREMIUM 🚀'}</button>
        <p className="text-[11px] text-slate-400 text-center">Aktivasi dilakukan melalui backend Supabase, bukan langsung dari browser.</p>
      </div>
    </div>
  </div>;
};