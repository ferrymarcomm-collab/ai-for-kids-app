import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Trophy,
  FolderHeart,
  Award,
  ShieldAlert,
  Menu,
  X,
  Home,
  User,
  Volume2,
  VolumeX,
  Compass,
} from 'lucide-react';
import { StudentProfileModal } from './StudentProfileModal';
import { OnboardingModal } from './OnboardingModal';
import { isSoundEnabled, setSoundEnabled, playSoftClick } from '../utils/audio';
import { AuthModal } from './AuthModal';
import { AdminPanel } from './AdminPanel';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, showAllJilids, progress, authUser, isPremium, setAuthModalOpen, setAuthMode, signOut } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSoundState = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSoftClick();
  };

  const navItems: {
    id: 'beranda' | 'belajar' | 'quiz' | 'challenge' | 'portfolio' | 'badge' | 'safety';
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'belajar', label: 'Belajar', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'challenge', label: 'Challenge', icon: Trophy },
    { id: 'portfolio', label: 'Portfolio', icon: FolderHeart },
    { id: 'badge', label: 'Badge', icon: Award },
    { id: 'safety', label: 'AI Safety', icon: ShieldAlert },
  ];

  const handleTabClick = (tabId: typeof activeTab) => {
    playSoftClick();
    if (tabId === 'belajar') {
      showAllJilids();
    } else {
      setActiveTab(tabId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              onClick={() => handleTabClick('beranda')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                  AI FOR KIDS
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-amber-600 tracking-wider uppercase mt-0.5">
                  Platform Belajar Cilik
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              {/* Sound Toggle (Per Section 27: sound must be optional) */}
              <button
                type="button"
                onClick={toggleSoundState}
                className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title={soundOn ? 'Suara Aktif (Klik untuk Mematikan Suara)' : 'Suara Mati (Klik untuk Menyalakan Suara)'}
                aria-label="Toggle Suara"
              >
                {soundOn ? (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                ) : (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                )}
              </button>

              {/* Onboarding Guide Button */}
              <button
                type="button"
                onClick={() => setOnboardingOpen(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Buka Panduan Petualangan"
              >
                <Compass className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Panduan</span>
              </button>
              {authUser?.email?.toLowerCase() === 'ferrymarcomm@gmail.com' && (
  <button
    onClick={() => setAdminPanelOpen(true)}
    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-black"
  >
    ADMIN
  </button>
)}
              {/* Account Button */}
              {authUser ? (
                <button
                  onClick={signOut}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black"
                  title="Keluar dari akun"
                >
                  <span>{isPremium ? 'PREMIUM' : 'AKUN'}</span>
                  <span className="text-[10px] font-semibold max-w-24 truncate">{authUser.email}</span>
                </button>
              ) : (
                <button
                  onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-black"
                >
                  MASUK / DAFTAR
                </button>
              )}

              {/* Student Profile Quick View Button */}
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pl-2 sm:pr-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 transition-all cursor-pointer group"
                title="Buka Profil Siswa"
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
                  {progress.profile.avatar}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {progress.profile.nickname}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Level {progress.profile.level} Kreator
                  </div>
                </div>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileModalOpen(true);
                }}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Profil</span>
                </div>
                <span className="text-slate-400">→</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOnboardingOpen(true);
                }}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-amber-50 text-amber-900 font-semibold text-xs border border-amber-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Panduan</span>
                </div>
                <span className="text-amber-500">→</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (authUser) signOut();
                  else { setAuthMode('signin'); setAuthModalOpen(true); }
                }}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-indigo-50 text-indigo-800 font-semibold text-xs border border-indigo-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>{authUser ? 'Keluar' : 'Masuk / Daftar'}</span>
                </div>
                <span className="text-indigo-500">→</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Per Section 20 Mobile First & Section 21 Navigation) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg safe-area-pb">
        <div className="grid grid-cols-6 gap-1">
          {navItems.filter(item => item.id !== 'safety').map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-indigo-600 font-black'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] leading-tight mt-0.5 truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AuthModal />
      {adminPanelOpen && (
  <AdminPanel onClose={() => setAdminPanelOpen(false)} />
)}
      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Onboarding Guide Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </>
  );
};
