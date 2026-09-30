import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  JilidId,
  LearningStatus,
  PortfolioItem,
  QuizResult,
  StudentProfile,
  UserProgress,
  ChallengeStatus,
} from '../types';
import { JILID_LIST, MODULES_DATA, INITIAL_PORTFOLIO_ITEMS } from '../data/curriculum';
import {
  AuthSession,
  AuthUser,
  getPremiumStatus,
  getStoredSession,
  isSupabaseConfigured,
  refreshSession,
  signIn as supabaseSignIn,
  signOut as supabaseSignOut,
  signUp as supabaseSignUp,
} from '../lib-supabase';

interface CelebrationPayload {
  title: string;
  message: string;
  badge?: string;
  type?: 'activity' | 'quiz' | 'module' | 'challenge' | 'badge';
}

interface AppContextType {
  // Navigation
  activeTab: 'beranda' | 'belajar' | 'quiz' | 'challenge' | 'portfolio' | 'badge' | 'safety';
  setActiveTab: (tab: 'beranda' | 'belajar' | 'quiz' | 'challenge' | 'portfolio' | 'badge' | 'safety') => void;
  selectedJilidId: JilidId | null;
  setSelectedJilidId: (id: JilidId | null) => void;
  selectedModuleId: number | null;
  setSelectedModuleId: (id: number | null) => void;
  openModule: (moduleId: number) => void;
  openJilid: (jilidId: JilidId) => void;
  showAllJilids: () => void;

  // State
  progress: UserProgress;
  toggleActivity: (activityId: string, moduleId: number) => void;
  saveQuizScore: (moduleId: number, score: number, correctAnswers: number, totalQuestions: number) => void;
  submitJilidChallenge: (jilidId: JilidId, steps: string[], reflection?: string) => void;
  simulateTeacherValidation: (jilidId: JilidId) => void;
  addPortfolioItem: (item: { title: string; jilidId: JilidId; moduleId: number; moduleTitle: string; workType: string; description: string }) => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  resetProgress: () => void;

  // Stats
  jilid1ProgressPercent: number;
  jilid1CompletedItemsCount: number;
  jilid2ProgressPercent: number;
  jilid2CompletedItemsCount: number;
  jilid3ProgressPercent: number;
  jilid3CompletedItemsCount: number;
  jilid4ProgressPercent: number;
  jilid4CompletedItemsCount: number;
  jilid5ProgressPercent: number;
  jilid5CompletedItemsCount: number;
  jilid6ProgressPercent: number;
  jilid6CompletedItemsCount: number;
  jilid7ProgressPercent: number;
  jilid7CompletedItemsCount: number;
  jilid8ProgressPercent: number;
  jilid8CompletedItemsCount: number;
  isJilid2Unlocked: boolean;
  isJilid3Unlocked: boolean;
  isJilid4Unlocked: boolean;
  isJilid5Unlocked: boolean;
  isJilid6Unlocked: boolean;
  isJilid7Unlocked: boolean;
  isJilid8Unlocked: boolean;
  isJilidUnlocked: (jilidId: JilidId) => boolean;
  isModuleAccessible: (moduleId: number) => boolean;
  isDemoMode: boolean;
  isPremium: boolean;
  completedModulesCount: number;
  earnedBadgesCount: number;

  // Celebration modal
  celebration: CelebrationPayload | null;
  closeCelebration: () => void;
  triggerCelebration: (payload: CelebrationPayload) => void;

  // Authentication
  authUser: AuthUser | null;
  authLoading: boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'signin' | 'signup';
  setAuthMode: (mode: 'signin' | 'signup') => void;
  signIn: (email: string, password: string) => Promise<AuthSession>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthSession | null>;
  signOut: () => void;
}

export const STORAGE_KEY = 'AI_FOR_KIDS_PROGRESS_V1';

const defaultProfile: StudentProfile = {
  nickname: 'Kiko Coder',
  avatar: '🤖',
  level: 1,
};

// Clean initial progress - Fresh state without artificial initial completions
const initialProgress: UserProgress = {
  completedActivityIds: [],
  moduleStatus: {
    1: 'Belum Mulai',
    2: 'Belum Mulai',
    3: 'Belum Mulai',
    4: 'Belum Mulai',
    5: 'Belum Mulai',
    6: 'Belum Mulai',
    7: 'Belum Mulai',
    8: 'Belum Mulai',
    9: 'Belum Mulai',
    10: 'Belum Mulai',
    11: 'Belum Mulai',
    12: 'Belum Mulai',
    13: 'Belum Mulai',
    14: 'Belum Mulai',
    15: 'Belum Mulai',
    16: 'Belum Mulai',
    17: 'Belum Mulai',
    18: 'Belum Mulai',
    19: 'Belum Mulai',
    20: 'Belum Mulai',
    21: 'Belum Mulai',
    22: 'Belum Mulai',
    23: 'Belum Mulai',
    24: 'Belum Mulai',
    25: 'Belum Mulai',
    26: 'Belum Mulai',
    27: 'Belum Mulai',
    28: 'Belum Mulai',
    29: 'Belum Mulai',
    30: 'Belum Mulai',
    31: 'Belum Mulai',
    32: 'Belum Mulai',
    33: 'Belum Mulai',
    34: 'Belum Mulai',
    35: 'Belum Mulai',
    36: 'Belum Mulai',
    37: 'Belum Mulai',
    38: 'Belum Mulai',
    39: 'Belum Mulai',
    40: 'Belum Mulai',
  },
  quizResults: {},
  challengeSubmissions: {},
  earnedBadges: [],
  portfolios: INITIAL_PORTFOLIO_ITEMS,
  profile: defaultProfile,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'beranda' | 'belajar' | 'quiz' | 'challenge' | 'portfolio' | 'badge' | 'safety'>('beranda');
  const [selectedJilidId, setSelectedJilidId] = useState<JilidId | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [celebration, setCelebration] = useState<CelebrationPayload | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getStoredSession()?.user ?? null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic validation of parsed object
        if (parsed && Array.isArray(parsed.completedActivityIds)) {
          return parsed;
        }
      }
    } catch {
      // LocalStorage access fallback
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage error
    }
  }, [progress]);

  const openModule = (moduleId: number) => {
    if (isDemoMode && !isPremium && moduleId !== 1) {
      requestPremium(`Modul ${moduleId}`);
      return;
    }
    const mod = MODULES_DATA[moduleId];
    if (mod) {
      setSelectedJilidId(mod.jilidId);
      setSelectedModuleId(moduleId);
      setActiveTab('belajar');

      // Update module status from Belum Mulai to Sedang Belajar if not already completed/mastered
      if (!progress.moduleStatus[moduleId] || progress.moduleStatus[moduleId] === 'Belum Mulai') {
        setProgress(prev => ({
          ...prev,
          moduleStatus: {
            ...prev.moduleStatus,
            [moduleId]: 'Sedang Belajar',
          },
        }));
      }
    }
  };

  const openJilid = (jilidId: JilidId) => {
    if (isDemoMode && !isPremium && jilidId !== 1) {
      requestPremium(`Jilid ${jilidId}`);
      return;
    }
    setSelectedJilidId(jilidId);
    setSelectedModuleId(null);
    setActiveTab('belajar');
  };

  const showAllJilids = () => {
    setSelectedJilidId(null);
    setSelectedModuleId(null);
    setActiveTab('belajar');
  };

  const [premiumNotice, setPremiumNotice] = useState<string | null>(null);
  const isDemoMode = true;
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadAccess = async () => {
      if (!isSupabaseConfigured) {
        setIsPremium(false);
        return;
      }
      const stored = getStoredSession();
      if (!stored) {
        setAuthUser(null);
        setIsPremium(false);
        return;
      }

      try {
        let session = stored;
        if (session.expires_at && session.expires_at * 1000 < Date.now() + 30_000 && session.refresh_token) {
          session = await refreshSession(session.refresh_token);
        }
        if (cancelled) return;
        setAuthUser(session.user);
        const premium = await getPremiumStatus(session.user.id, session.access_token);
        if (!cancelled) setIsPremium(premium);
      } catch {
        if (!cancelled) {
          setAuthUser(null);
          setIsPremium(false);
        }
      }
    };

    loadAccess();
    return () => { cancelled = true; };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const session = await supabaseSignIn(email, password);
      setAuthUser(session.user);
      const fullName = typeof session.user.user_metadata?.full_name === 'string' ? session.user.user_metadata.full_name : '';
      if (fullName) {
        setProgress(prev => ({ ...prev, profile: { ...prev.profile, nickname: fullName } }));
      }
      const premium = await getPremiumStatus(session.user.id, session.access_token);
      setIsPremium(premium);
      setAuthModalOpen(false);
      return session;
    } finally {
      setAuthLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setAuthLoading(true);
    try {
      const session = await supabaseSignUp(email, password, fullName);
      if (session?.user) {
        setAuthUser(session.user);
        const fullName = typeof session.user.user_metadata?.full_name === 'string' ? session.user.user_metadata.full_name : '';
        if (fullName) {
          setProgress(prev => ({ ...prev, profile: { ...prev.profile, nickname: fullName } }));
        }
        setIsPremium(false);
        setAuthModalOpen(false);
      }
      return session;
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = () => {
    supabaseSignOut();
    setAuthUser(null);
    setIsPremium(false);
    setAuthModalOpen(false);
  };

  const requestPremium = (feature?: string) => {
    setPremiumNotice(
      feature
        ? `Fitur "${feature}" termasuk akses penuh AI FOR KIDS. Demo gratis hanya membuka bagian pengenalan.`
        : 'Bagian ini termasuk akses penuh AI FOR KIDS. Demo gratis hanya membuka sebagian pengalaman belajar.'
    );
  };

  const closePremiumNotice = () => setPremiumNotice(null);

  const navigateTab = (tab: 'beranda' | 'belajar' | 'quiz' | 'challenge' | 'portfolio' | 'badge' | 'safety') => {
    if (isDemoMode && !isPremium && (tab === 'portfolio' || tab === 'badge')) {
      requestPremium(tab === 'portfolio' ? 'Galeri Portfolio' : 'Galeri Badge');
      return;
    }
    setActiveTab(tab);
  };

  // Helper to recompute single module status based on activities, quiz, and teacher-validated challenge
  const computeModuleStatus = (
    moduleId: number,
    completedActs: string[],
    quizMap: Record<number, QuizResult>,
    badges: number[]
  ): LearningStatus => {
    const mod = MODULES_DATA[moduleId];
    if (!mod || !mod.isPhase1Ready) {
      return 'Belum Mulai';
    }

    const act1 = completedActs.includes(mod.activity1.id);
    const act2 = completedActs.includes(mod.activity2.id);
    const quizScore = quizMap[moduleId]?.score ?? 0;
    const isQuizPassed = quizScore >= 70;

    const isChallengeValidated = badges.includes(mod.jilidId);

    // If both activities are done and quiz >= 70%
    if (act1 && act2 && isQuizPassed) {
      // Elevated to Dikuasai only if Challenge has been validated by Tutor & Badge earned
      return isChallengeValidated ? 'Dikuasai' : 'Selesai';
    }

    // If any activity is started/checked or quiz attempted or opened
    if (act1 || act2 || quizMap[moduleId] !== undefined) {
      return 'Sedang Belajar';
    }

    return progress.moduleStatus[moduleId] || 'Belum Mulai';
  };

  const toggleActivity = (activityId: string, moduleId: number) => {
    setProgress(prev => {
      const exists = prev.completedActivityIds.includes(activityId);
      const newActivities = exists
        ? prev.completedActivityIds.filter(id => id !== activityId)
        : [...prev.completedActivityIds, activityId];

      const newModStatus = computeModuleStatus(
        moduleId,
        newActivities,
        prev.quizResults,
        prev.earnedBadges
      );

      if (!exists) {
        setCelebration({
          title: 'Aktivitas Selesai! 🌟',
          message: 'Langkah hebat! Terus eksplorasi materi berikutnya.',
          type: 'activity',
        });
      }

      return {
        ...prev,
        completedActivityIds: newActivities,
        moduleStatus: {
          ...prev.moduleStatus,
          [moduleId]: newModStatus,
        },
      };
    });
  };

  const saveQuizScore = (
    moduleId: number,
    score: number,
    correctAnswers: number,
    totalQuestions: number
  ) => {
    setProgress(prev => {
      const updatedQuizResults: Record<number, QuizResult> = {
        ...prev.quizResults,
        [moduleId]: {
          moduleId,
          score,
          correctAnswers,
          totalQuestions,
          completedAt: new Date().toLocaleDateString('id-ID'),
        },
      };

      const newModStatus = computeModuleStatus(
        moduleId,
        prev.completedActivityIds,
        updatedQuizResults,
        prev.earnedBadges
      );

      const isPassed = score >= 70;
      if (isPassed) {
        setCelebration({
          title: 'Kuis Berhasil! 🎉',
          message: `Nilaimu ${score}! Kamu berhasil menjawab ${correctAnswers} dari ${totalQuestions} soal dengan benar!`,
          type: 'quiz',
        });
      }

      return {
        ...prev,
        quizResults: updatedQuizResults,
        moduleStatus: {
          ...prev.moduleStatus,
          [moduleId]: newModStatus,
        },
      };
    });
  };

  // SUBMIT CHALLENGE:
  // Status becomes 'Menunggu Validasi'
  // Badge is NOT yet awarded!
  // Portfolio item created with status 'Menunggu Validasi'
  const submitJilidChallenge = (jilidId: JilidId, steps: string[], reflection?: string) => {
    setProgress(prev => {
      const jilid = JILID_LIST.find(j => j.id === jilidId);

      const portfolioEntry: PortfolioItem = {
        id: `port-chal-${jilidId}-${Date.now()}`,
        title: `Challenge Jilid ${jilidId}: ${jilid?.challengeTitle ?? 'Tantangan Jilid'}`,
        jilidId,
        moduleId: jilid?.moduleIds[jilid.moduleIds.length - 1] || 1,
        moduleTitle: `Jilid ${jilidId} Final Challenge`,
        date: new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }),
        workType: 'Penyelesaian Challenge',
        description:
          jilidId === 8
            ? `Aplikasi Kuis Interaktif "Interactive App Creator" (${steps.length} balok: Function Tanya_Soal & Skor +10/-5)`
            : jilidId === 7
            ? `5 Misi Keamanan Digital Cyber Safety Hero (${steps.length} misi: Peta Privasi, Password Baja Dummy, Detektif Phishing, Poster Visual, Protokol Darurat)`
            : jilidId === 6
            ? `Penyelesaian Robot Maze Labirin Master (${steps.length} balok: Repeat Until & If/Else)`
            : jilidId === 5
            ? `Purwarupa rekayasa maker kardus 7 langkah: "${steps.join(' -> ')}"`
            : jilidId === 4
            ? `Produksi video edukasi 5 langkah: "${steps.join(' -> ')}"`
            : jilidId === 3
            ? `Simulasi training AI klasifikasi 2 kategori: "${steps.join(' -> ')}"`
            : jilidId === 2
            ? `Animasi karakter Scratch 5 langkah: "${steps.join(' -> ')}"`
            : `Algoritma persiapan tas sekolah 6 langkah: "${steps.join(' -> ')}"`,
        status: 'Menunggu Validasi', // Crucial: NOT validated yet!
        thumbnailEmoji: jilidId === 8 ? '🚀' : jilidId === 7 ? '🛡️' : jilidId === 6 ? '🧭' : jilidId === 5 ? '🛠️' : jilidId === 4 ? '🎬' : jilidId === 3 ? '🤖' : jilidId === 2 ? '🎨' : '🎒',
        notes: 'Menunggu penilaian dan validasi dari Guru/Tutor.',
      };

      // Module status check: if modules are completed, they remain 'Selesai' until validated
      return {
        ...prev,
        challengeSubmissions: {
          ...prev.challengeSubmissions,
          [jilidId]: {
            jilidId,
            completed: true,
            status: 'Menunggu Validasi',
            completedAt: new Date().toISOString(),
            steps,
            reflection,
          },
        },
        portfolios: [portfolioEntry, ...prev.portfolios.filter(p => !p.id.startsWith(`port-chal-${jilidId}`))],
      };
    });
  };

  // SIMULATE TEACHER VALIDATION (MODE DEMO)
  // When clicked:
  // Challenge: Menunggu Validasi -> Divalidasi
  // Portfolio: Menunggu Validasi -> Divalidasi
  // Badge: 🔒 -> 🏆 (awarded!)
  // Status: Selesai -> Dikuasai
  const simulateTeacherValidation = (jilidId: JilidId) => {
    setProgress(prev => {
      const jilid = JILID_LIST.find(j => j.id === jilidId);
      const isAlreadyBadged = prev.earnedBadges.includes(jilidId);
      const newBadges = isAlreadyBadged ? prev.earnedBadges : [...prev.earnedBadges, jilidId];

      // Update challenge submission
      const updatedSubmissions = {
        ...prev.challengeSubmissions,
        [jilidId]: {
          ...prev.challengeSubmissions[jilidId],
          jilidId,
          completed: true,
          status: 'Divalidasi' as ChallengeStatus,
          completedAt: prev.challengeSubmissions[jilidId]?.completedAt || new Date().toISOString(),
          feedback:
            jilidId === 8
              ? 'Validasi Tutor (Mode Demo): Aplikasi Kuis Interaktif "Interactive App Creator" karya siswa berhasil dirakit dengan sangat baik! Fungsi Tanya_Soal dipanggil berulang, penanganan input-output tepat, dan sistem skor otomatis (+10/-5) bekerja sempurna. Selamat atas kelulusan pamungkas!'
              : jilidId === 7
              ? 'Validasi Tutor (Mode Demo): 5 Misi Keamanan Digital "Cyber Safety Hero" diselesaikan dengan sangat teliti! Pemahaman tentang privasi data, password baja dummy, deteksi phishing, dan desain poster sangat membanggakan. Lencana kehormatan diberikan!'
              : jilidId === 6
              ? 'Validasi Tutor (Mode Demo): Robot berhasil keluar dari Labirin Master menggunakan blok Repeat Until dan percabangan If/Else dengan logika algoritma yang solid. Luar biasa!'
              : jilidId === 5
              ? 'Validasi Tutor (Mode Demo): Purwarupa rekayasa kardus V2 "Insinyur Maker" teruji kokoh, kreatif, aman, dan menerapkan siklus rekayasa dengan sempurna. Luar biasa!'
              : jilidId === 4
              ? 'Validasi Tutor (Mode Demo): Alur produksi video dan storyboard 5 langkah "Sutradara Cilik" sangat kreatif, stabil, terarah, dan terjaga privasinya. Luar biasa!'
              : jilidId === 3
              ? 'Validasi Tutor (Mode Demo): Model klasifikasi dua kategori teruji dengan akurasi 100%. Kerja luar biasa!'
              : jilidId === 2
              ? 'Validasi Tutor (Mode Demo): Animasi karakter Scratch 5 langkah runtut dan interaktif. Kerja luar biasa!'
              : 'Validasi Tutor (Mode Demo): Algoritma runtut, logis, dan bebas bug. Kerja luar biasa!',
        },
      };

      // Update associated portfolio items to 'Divalidasi'
      const updatedPortfolios = prev.portfolios.map(item => {
        if (item.jilidId === jilidId) {
          return {
            ...item,
            status: 'Divalidasi' as const,
            notes: 'Divalidasi oleh Guru/Tutor (Mode Demo). Selamat, karyamu sangat baik!',
          };
        }
        return item;
      });

      // Update modules of this jilid that are 'Selesai' to 'Dikuasai'
      const updatedModuleStatus = { ...prev.moduleStatus };
      if (jilid) {
        jilid.moduleIds.forEach(mId => {
          if (updatedModuleStatus[mId] === 'Selesai') {
            updatedModuleStatus[mId] = 'Dikuasai';
          }
        });
      }

      setCelebration({
        title: 'Karya Divalidasi & Lencana Diraih! 🏆',
        message: `Guru/Tutor telah memvalidasi tantanganmu! Badge "${jilid?.badgeName}" resmi kamu peroleh!`,
        badge: jilid?.badgeIcon,
        type: 'badge',
      });

      return {
        ...prev,
        earnedBadges: newBadges,
        challengeSubmissions: updatedSubmissions,
        portfolios: updatedPortfolios,
        moduleStatus: updatedModuleStatus,
        profile: {
          ...prev.profile,
          level: Math.max(prev.profile.level, newBadges.length + 1),
        },
      };
    });
  };

  const addPortfolioItem = (item: {
    title: string;
    jilidId: JilidId;
    moduleId: number;
    moduleTitle: string;
    workType: string;
    description: string;
  }) => {
    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: item.title,
      jilidId: item.jilidId,
      moduleId: item.moduleId,
      moduleTitle: item.moduleTitle,
      date: new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }),
      workType: item.workType,
      description: item.description,
      status: 'Menunggu Validasi', // Always starts with Menunggu Validasi!
      thumbnailEmoji: '📁',
    };

    setProgress(prev => ({
      ...prev,
      portfolios: [newItem, ...prev.portfolios],
    }));

    setCelebration({
      title: 'Karya Berhasil Disimpan! 📁',
      message: `Karyamu "${item.title}" tersimpan dengan status: Menunggu Validasi.`,
      type: 'activity',
    });
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProgress(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updated,
      },
    }));
  };

  // FULL RESET: cleans activities, modules, quiz, challenge, badges, portfolios, and resets profile
  const resetProgress = () => {
    const cleanProgress: UserProgress = {
      completedActivityIds: [],
      moduleStatus: {
        1: 'Belum Mulai',
        2: 'Belum Mulai',
        3: 'Belum Mulai',
        4: 'Belum Mulai',
        5: 'Belum Mulai',
        6: 'Belum Mulai',
        7: 'Belum Mulai',
        8: 'Belum Mulai',
        9: 'Belum Mulai',
        10: 'Belum Mulai',
        11: 'Belum Mulai',
        12: 'Belum Mulai',
        13: 'Belum Mulai',
        14: 'Belum Mulai',
        15: 'Belum Mulai',
        16: 'Belum Mulai',
        17: 'Belum Mulai',
        18: 'Belum Mulai',
        19: 'Belum Mulai',
        20: 'Belum Mulai',
        21: 'Belum Mulai',
        22: 'Belum Mulai',
        23: 'Belum Mulai',
        24: 'Belum Mulai',
        25: 'Belum Mulai',
        26: 'Belum Mulai',
        27: 'Belum Mulai',
        28: 'Belum Mulai',
        29: 'Belum Mulai',
        30: 'Belum Mulai',
        31: 'Belum Mulai',
        32: 'Belum Mulai',
        33: 'Belum Mulai',
        34: 'Belum Mulai',
        35: 'Belum Mulai',
        36: 'Belum Mulai',
        37: 'Belum Mulai',
        38: 'Belum Mulai',
        39: 'Belum Mulai',
        40: 'Belum Mulai',
      },
      quizResults: {},
      challengeSubmissions: {},
      earnedBadges: [],
      portfolios: INITIAL_PORTFOLIO_ITEMS,
      profile: defaultProfile,
    };

    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanProgress));
    } catch {
      // ignore storage error
    }

    setProgress(cleanProgress);
  };

  const closeCelebration = () => setCelebration(null);
  const triggerCelebration = (payload: CelebrationPayload) => setCelebration(payload);

  // Statistics Calculation (Precise for Jilid 1: 5 active modules * 3 items = 15 items)
  let jilid1CompletedItemsCount = 0;
  for (let m = 1; m <= 5; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid1CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid1CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid1CompletedItemsCount++;
      }
    }
  }
  // 0/15 = 0%, 15/15 = 100%
  const jilid1ProgressPercent = Math.min(100, Math.round((jilid1CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 2: 5 active modules * 3 items = 15 items (Modules 6 to 10)
  let jilid2CompletedItemsCount = 0;
  for (let m = 6; m <= 10; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid2CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid2CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid2CompletedItemsCount++;
      }
    }
  }
  const jilid2ProgressPercent = Math.min(100, Math.round((jilid2CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 3: 5 active modules * 3 items = 15 items (Modules 11 to 15)
  let jilid3CompletedItemsCount = 0;
  for (let m = 11; m <= 15; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid3CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid3CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid3CompletedItemsCount++;
      }
    }
  }
  const jilid3ProgressPercent = Math.min(100, Math.round((jilid3CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 4: 5 active modules * 3 items = 15 items (Modules 16 to 20)
  let jilid4CompletedItemsCount = 0;
  for (let m = 16; m <= 20; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid4CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid4CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid4CompletedItemsCount++;
      }
    }
  }
  const jilid4ProgressPercent = Math.min(100, Math.round((jilid4CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 5: 5 active modules * 3 items = 15 items (Modules 21 to 25)
  let jilid5CompletedItemsCount = 0;
  for (let m = 21; m <= 25; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid5CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid5CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid5CompletedItemsCount++;
      }
    }
  }
  const jilid5ProgressPercent = Math.min(100, Math.round((jilid5CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 6: 5 active modules * 3 items = 15 items (Modules 26 to 30)
  let jilid6CompletedItemsCount = 0;
  for (let m = 26; m <= 30; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid6CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid6CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid6CompletedItemsCount++;
      }
    }
  }
  const jilid6ProgressPercent = Math.min(100, Math.round((jilid6CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 7: 5 active modules * 3 items = 15 items (Modules 31 to 35)
  let jilid7CompletedItemsCount = 0;
  for (let m = 31; m <= 35; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid7CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid7CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid7CompletedItemsCount++;
      }
    }
  }
  const jilid7ProgressPercent = Math.min(100, Math.round((jilid7CompletedItemsCount / 15) * 100));

  // Statistics Calculation for Jilid 8: 5 active modules * 3 items = 15 items (Modules 36 to 40)
  let jilid8CompletedItemsCount = 0;
  for (let m = 36; m <= 40; m++) {
    const mod = MODULES_DATA[m];
    if (mod) {
      if (progress.completedActivityIds.includes(mod.activity1.id)) {
        jilid8CompletedItemsCount++;
      }
      if (progress.completedActivityIds.includes(mod.activity2.id)) {
        jilid8CompletedItemsCount++;
      }
      if ((progress.quizResults[m]?.score ?? 0) >= 70) {
        jilid8CompletedItemsCount++;
      }
    }
  }
  const jilid8ProgressPercent = Math.min(100, Math.round((jilid8CompletedItemsCount / 15) * 100));

  // Unlock check for Jilid 2:
  // Jilid 2 is UNLOCKED if Jilid 1 satisfies completion requirements
  const isJilid2Unlocked =
    isPremium || (!isDemoMode && (jilid1CompletedItemsCount >= 15 ||
    jilid1ProgressPercent >= 70 ||
    !!progress.challengeSubmissions[1]?.completed ||
    progress.earnedBadges.includes(1) ||
    [1, 2, 3, 4, 5].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')));

  // Unlock check for Jilid 3:
  // Jilid 3 is UNLOCKED if Jilid 2 satisfies completion requirements
  const isJilid3Unlocked =
    isPremium || (!isDemoMode && (
      jilid2CompletedItemsCount >= 15 ||
      jilid2ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[2]?.completed ||
      progress.earnedBadges.includes(2) ||
      [6, 7, 8, 9, 10].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  // Unlock check for Jilid 4:
  // Jilid 4 is UNLOCKED if Jilid 3 satisfies completion requirements
  const isJilid4Unlocked =
    isPremium || (!isDemoMode && (
      jilid3CompletedItemsCount >= 15 ||
      jilid3ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[3]?.completed ||
      progress.earnedBadges.includes(3) ||
      [11, 12, 13, 14, 15].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  // Unlock check for Jilid 5:
  // Jilid 5 is UNLOCKED if Jilid 4 satisfies completion requirements
  const isJilid5Unlocked =
    isPremium || (!isDemoMode && (
      jilid4CompletedItemsCount >= 15 ||
      jilid4ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[4]?.completed ||
      progress.earnedBadges.includes(4) ||
      [16, 17, 18, 19, 20].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  // Unlock check for Jilid 6:
  // Jilid 6 is UNLOCKED if Jilid 5 satisfies completion requirements
  const isJilid6Unlocked =
    isPremium || (!isDemoMode && (
      jilid5CompletedItemsCount >= 15 ||
      jilid5ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[5]?.completed ||
      progress.earnedBadges.includes(5) ||
      [21, 22, 23, 24, 25].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  // Unlock check for Jilid 7:
  // Jilid 7 is UNLOCKED if Jilid 6 satisfies completion requirements
  const isJilid7Unlocked =
    isPremium || (!isDemoMode && (
      jilid6CompletedItemsCount >= 15 ||
      jilid6ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[6]?.completed ||
      progress.earnedBadges.includes(6) ||
      [26, 27, 28, 29, 30].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  // Unlock check for Jilid 8:
  // Jilid 8 is UNLOCKED if Jilid 7 satisfies completion requirements
  const isJilid8Unlocked =
    isPremium || (!isDemoMode && (
      jilid7CompletedItemsCount >= 15 ||
      jilid7ProgressPercent >= 70 ||
      !!progress.challengeSubmissions[7]?.completed ||
      progress.earnedBadges.includes(7) ||
      [31, 32, 33, 34, 35].every(id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai')
    ));

  const isJilidUnlocked = (jilidId: JilidId): boolean => {
    if (isDemoMode && !isPremium) return jilidId === 1;
    if (jilidId === 1) return true;
    if (jilidId === 2) return isJilid2Unlocked;
    if (jilidId === 3) return isJilid3Unlocked;
    if (jilidId === 4) return isJilid4Unlocked;
    if (jilidId === 5) return isJilid5Unlocked;
    if (jilidId === 6) return isJilid6Unlocked;
    if (jilidId === 7) return isJilid7Unlocked;
    if (jilidId === 8) return isJilid8Unlocked;
    return false;
  };

  const isModuleAccessible = (moduleId: number): boolean => {
    if (isDemoMode && !isPremium) return moduleId === 1;
    const mod = MODULES_DATA[moduleId];
    return !!mod && isJilidUnlocked(mod.jilidId);
  };

  const completedModulesCount = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
  ].filter(
    id => progress.moduleStatus[id] === 'Selesai' || progress.moduleStatus[id] === 'Dikuasai'
  ).length;

  const earnedBadgesCount = progress.earnedBadges.length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab: navigateTab,
        selectedJilidId,
        setSelectedJilidId,
        selectedModuleId,
        setSelectedModuleId,
        openModule,
        openJilid,
        showAllJilids,
        progress,
        toggleActivity,
        saveQuizScore,
        submitJilidChallenge,
        simulateTeacherValidation,
        addPortfolioItem,
        updateProfile,
        resetProgress,
        jilid1ProgressPercent,
        jilid1CompletedItemsCount,
        jilid2ProgressPercent,
        jilid2CompletedItemsCount,
        jilid3ProgressPercent,
        jilid3CompletedItemsCount,
        jilid4ProgressPercent,
        jilid4CompletedItemsCount,
        jilid5ProgressPercent,
        jilid5CompletedItemsCount,
        jilid6ProgressPercent,
        jilid6CompletedItemsCount,
        jilid7ProgressPercent,
        jilid7CompletedItemsCount,
        jilid8ProgressPercent,
        jilid8CompletedItemsCount,
        isJilid2Unlocked,
        isJilid3Unlocked,
        isJilid4Unlocked,
        isJilid5Unlocked,
        isJilid6Unlocked,
        isJilid7Unlocked,
        isJilid8Unlocked,
        isJilidUnlocked,
        isModuleAccessible,
        isDemoMode,
        isPremium,
        completedModulesCount,
        earnedBadgesCount,
        requestPremium,
        closePremiumNotice,
        premiumNotice,
        celebration,
        closeCelebration,
        triggerCelebration,
        authUser,
        authLoading,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
