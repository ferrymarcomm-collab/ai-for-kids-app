/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LearningPath } from './components/LearningPath';
import { JilidDetail } from './components/JilidDetail';
import { ModuleView } from './components/ModuleView';
import { QuizHub } from './components/QuizHub';
import { ChallengeViewer } from './components/ChallengeViewer';
import { PortfolioView } from './components/PortfolioView';
import { BadgesView } from './components/BadgesView';
import { AISafetyView } from './components/AISafetyView';
import { CelebrationModal } from './components/CelebrationModal';
import { PremiumNotice } from './components/PremiumNotice';
import { DemoChallenge } from './components/DemoChallenge';
import {
  Sparkles,
  BookOpen,
  Trophy,
  ShieldCheck,
  Award,
  ArrowRight,
  Heart,
} from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ChildFriendlyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AI FOR KIDS App Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-white border-2 border-slate-200 p-8 shadow-xl text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center text-4xl shadow-inner">
              😅
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Ups! Ada sedikit masalah.
            </h2>
            <p className="text-sm text-slate-600">
              Coba lagi sebentar. Robot penjelajah kami sedang menyiapkan ulang petualanganmu!
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>COBA LAGI 🚀</span>
            </button>
            {this.state.error && (
              <details className="text-left text-[11px] text-slate-400 mt-4 border-t border-slate-100 pt-2 cursor-pointer">
                <summary className="font-semibold text-slate-500">Detail Teknis (Developer)</summary>
                <pre className="mt-1 p-2 rounded-lg bg-slate-100 font-mono text-slate-700 overflow-x-auto text-[10px]">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedJilidId,
    selectedModuleId,
    openModule,
    openJilid,
    showAllJilids,
    isDemoMode,
    isPremium,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Universal Top Header */}
      <Navbar />

      {/* Hero section on 'beranda' */}
      {activeTab === 'beranda' && <Hero />}

      {isDemoMode && !isPremium && (
        <div className="sticky top-0 z-40 bg-amber-100 border-b border-amber-200 text-amber-950">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center">
            <span className="text-xs font-black">🎁 MODE DEMO GRATIS</span>
            <span className="text-xs font-semibold">Modul 1 + aktivitas + 3 quiz + mini challenge dapat dicoba.</span>
            <span className="text-xs font-bold">Materi lainnya 🔒 Premium.</span>
          </div>
        </div>
      )}

      {/* Main Container */}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-28 lg:pb-12">
        {/* Tab 1: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="space-y-12">
            {/* Quick Jilid 1–8 Focus Hub */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-900 to-rose-950 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-500/20">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>DEMO GRATIS • JILID 1 / MODUL 1</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading">
                  Logika, Visual, AI, Video, Maker, Otomatisasi, Cyber Safety & Aplikasi Interaktif
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Coba pengalaman belajar gratis: Modul 1, aktivitas, 3 quiz, dan mini challenge. Materi lainnya tersedia dalam akses penuh AI FOR KIDS.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto shrink-0 justify-center">
                <button
                  onClick={() => openJilid(1)}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 1</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(2)}
                  className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 2 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(3)}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 3 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(4)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 4 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(5)}
                  className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 5 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(6)}
                  className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 6 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(7)}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 7 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openJilid(8)}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>Jilid 8 🔒</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveTab('challenge')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Trophy className="w-3 h-3 text-amber-300" />
                  <span>Challenge</span>
                </button>
              </div>
            </div>

            {/* Learning Path Component */}
            <LearningPath />

            {/* Quick Educational Safety & Values Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div
                onClick={() => setActiveTab('safety')}
                className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-rose-400 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  10 Prinsip AI Safety
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pelajari cara aman berselancar di internet dan gunakan AI secara bijak dengan bimbingan pendamping.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('challenge')}
                className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  Master of Routine Challenge
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Susun algoritma 6 langkah rutinitas persiapan tas sekolah dan rebut Badge pertamamu!
                </p>
              </div>

              <div
                onClick={() => setActiveTab('portfolio')}
                className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  Portofolio Kreasi Cilik
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Simpan karya, flowchart, dan catatan analisismu agar dapat dibanggakan ke orang tua dan guru.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: BELAJAR (Module View or Jilid Detail or All Jilids) */}
        {activeTab === 'belajar' && (
          <div>
            {selectedModuleId !== null ? (
              <ModuleView moduleId={selectedModuleId} />
            ) : selectedJilidId !== null ? (
              <JilidDetail jilidId={selectedJilidId} />
            ) : (
              <LearningPath />
            )}
          </div>
        )}

        {/* Tab 3: QUIZ */}
        {activeTab === 'quiz' && <QuizHub />}

        {/* Tab 4: CHALLENGE */}
        {activeTab === 'challenge' && (isDemoMode && !isPremium ? <DemoChallenge /> : <ChallengeViewer />)}

        {/* Tab 5: PORTFOLIO */}
        {activeTab === 'portfolio' && (isDemoMode && !isPremium ? <div /> : <PortfolioView />)}

        {/* Tab 6: BADGE */}
        {activeTab === 'badge' && (isDemoMode && !isPremium ? <div /> : <BadgesView />)}

        {/* Tab 7: AI SAFETY */}
        {activeTab === 'safety' && <AISafetyView />}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-black text-slate-900 text-base">
                  AI FOR KIDS
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Jago Logika, Coding & AI — Usia 8–12 Tahun
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
              <button
                onClick={() => setActiveTab('beranda')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Beranda
              </button>
              <button
                onClick={showAllJilids}
                className="hover:text-indigo-600 cursor-pointer"
              >
                8 Jilid
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Kuis
              </button>
              <button
                onClick={() => setActiveTab('challenge')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Challenge
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                AI Safety
              </button>
            </div>

            <div className="text-xs text-slate-400 text-center sm:text-right">
              Fase 1: Fondasi Logika & Dekomposisi · Ramah & Aman untuk Anak
            </div>
          </div>
        </div>
      </footer>

      {/* Demo/Premium gate */}
      <PremiumNotice />

      {/* Celebration Modal */}
      <CelebrationModal />
    </div>
  );
};

export default function App() {
  return (
    <ChildFriendlyErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ChildFriendlyErrorBoundary>
  );
}
