import React, { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { isSupabaseConfigured } from '../lib-supabase';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    signIn,
    signUp,
  } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!isSupabaseConfigured) {
      setMessage('Sistem akun belum dikonfigurasi. Admin perlu memasukkan URL dan publishable key Supabase terlebih dahulu.');
      return;
    }
    if (authMode === 'signup' && !fullName.trim()) {
      setMessage('Isi nama panggilan siswa terlebih dahulu.');
      return;
    }
    if (!email.trim() || !password) {
      setMessage('Email dan password wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setMessage('Password minimal 6 karakter.');
      return;
    }

    setBusy(true);
    try {
      if (authMode === 'signup') {
        const session = await signUp(email.trim(), password, fullName.trim());
        if (!session?.access_token) {
          setMessage('Akun berhasil dibuat. Silakan login dengan email dan password yang baru dibuat.');
          setAuthMode('signin');
        } else {
          setMessage('Akun berhasil dibuat. Selamat datang di AI FOR KIDS! 🚀');
        }
      } else {
        await signIn(email.trim(), password);
        setMessage('Login berhasil. Selamat belajar! 🎉');
      }
      setPassword('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white border-2 border-indigo-100 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-900 text-white p-7 relative">
          <button onClick={() => setAuthModalOpen(false)} aria-label="Tutup" className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
          <div className="text-4xl mb-3">🚀</div>
          <div className="text-xs font-black uppercase tracking-wider text-amber-300 mb-1">AI FOR KIDS</div>
          <h2 className="text-2xl font-black font-heading">{authMode === 'signup' ? 'Buat Akun Siswa' : 'Masuk ke AI FOR KIDS'}</h2>
          <p className="text-sm text-indigo-100 mt-2">Akun dipakai untuk menyimpan progres dan nantinya mengelola akses premium.</p>
        </div>

        <form onSubmit={submit} className="p-7 space-y-4">
          {authMode === 'signup' && (
            <label className="block">
              <span className="text-xs font-black text-slate-700">Nama panggilan</span>
              <div className="mt-1.5 relative">
                <UserRound className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Contoh: Kiko" />
              </div>
            </label>
          )}

          <label className="block">
            <span className="text-xs font-black text-slate-700">Email</span>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200" placeholder="email@contoh.com" />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-black text-slate-700">Password</span>
            <div className="mt-1.5 relative">
              <LockKeyhole className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input type={showPassword ? 'text' : 'password'} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Minimal 6 karakter" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-3 p-0.5 text-slate-400 hover:text-slate-700">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>

          {message && <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-3 text-xs font-semibold text-indigo-900">{message}</div>}

          <button disabled={busy} className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 shadow-lg shadow-indigo-600/20">
            {busy ? 'MEMPROSES...' : authMode === 'signup' ? 'BUAT AKUN 🚀' : 'MASUK 🚀'}
          </button>

          <button type="button" onClick={() => { setMessage(null); setAuthMode(authMode === 'signup' ? 'signin' : 'signup'); }} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-indigo-700">
            {authMode === 'signup' ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar di sini'}
          </button>
        </form>
      </div>
    </div>
  );
};
