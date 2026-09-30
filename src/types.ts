/**
 * Type definitions for AI FOR KIDS learning platform
 */

export type JilidId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type LearningStatus = 'Belum Mulai' | 'Sedang Belajar' | 'Selesai' | 'Dikuasai';

export type ActivityType = 'UNPLUGGED' | 'DIGITAL' | 'AI' | 'CREATIVE' | 'PROJECT' | 'SIMULATION';

export type ChallengeStatus = 'Belum Mulai' | 'Menunggu Validasi' | 'Divalidasi';

export interface Activity {
  id: string;
  title: string;
  goal: string;
  type: ActivityType;
  requiresParentGuidance?: boolean;
  instruction: string;
  steps: string[];
  output: string;
  reflection: string;
  placeholder?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'problem-solving';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  kidTip?: string;
}

export interface ModuleData {
  id: number; // 1 to 40
  jilidId: JilidId;
  title: string;
  description: string;
  learningGoal: string;
  activity1: Activity;
  activity2: Activity;
  quizQuestions: QuizQuestion[];
  challengeSummary: string;
  portfolioPrompt: string;
  isPhase1Ready?: boolean;
}

export interface JilidData {
  id: JilidId;
  title: string;
  theme: string;
  description: string;
  color: string;
  accentBg: string;
  borderAccent: string;
  iconName: string;
  challengeTitle: string;
  challengeDescription: string;
  badgeName: string;
  badgeIcon: string;
  badgeDescription: string;
  moduleIds: number[];
}

export interface StudentProfile {
  nickname: string;
  avatar: string;
  level: number;
}

export interface QuizResult {
  moduleId: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  jilidId: JilidId;
  moduleId: number;
  moduleTitle: string;
  date: string;
  workType: string;
  description: string;
  status: 'Menunggu Validasi' | 'Divalidasi';
  thumbnailEmoji?: string;
  notes?: string;
}

export interface ChallengeSubmission {
  jilidId: JilidId;
  completed: boolean;
  status: ChallengeStatus;
  completedAt?: string;
  steps?: string[];
  reflection?: string;
  feedback?: string;
}

export interface UserProgress {
  completedActivityIds: string[]; // e.g. ["m1-a1", "m1-a2"]
  moduleStatus: Record<number, LearningStatus>;
  quizResults: Record<number, QuizResult>;
  challengeSubmissions: Record<number, ChallengeSubmission>;
  earnedBadges: number[]; // JilidId array - awarded ONLY after tutor validation
  portfolios: PortfolioItem[];
  profile: StudentProfile;
}
