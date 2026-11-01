export type RankTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Grandmaster';

export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export type CompanionId = 'sylphie' | 'aiko' | 'kaelen' | 'ignis' | 'nova';

export type AIPersonality = 'hype' | 'strict' | 'calm';

export type AIEmotion = 'idle' | 'thinking' | 'speaking' | 'celebrating' | 'encouraging' | 'concerned';

export interface CompanionConfig {
  id: CompanionId;
  name: string;
  archetype: string;
  glowColor: string;
  personality: AIPersonality;
  voiceLine: string;
  autoSpeak: boolean;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  difficulty: TaskDifficulty;
  xpReward: number;
  completed: boolean;
  createdAt: string;
}

export interface FocusSessionRecord {
  id: string;
  targetMinutes: number;
  completedMinutes: number;
  mode: 'pomodoro' | 'custom';
  completedAt: string;
  xpAwarded: number;
}

export interface UserProgress {
  level: number;
  currentXp: number;
  streak: number;
  coins: number;
  lastActiveDate: string; // YYYY-MM-DD
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  companion: CompanionConfig;
}

export interface ToastMessage {
  id: string;
  type: 'xp' | 'level' | 'info';
  title: string;
  subtitle?: string;
  amount?: number;
}

export interface AICompanionResponse {
  message: string;
  emotion: AIEmotion;
  suggestedAction?: {
    label: string;
    type: string;
  };
  shouldSpeak: boolean;
  model: string;
  isFallback: boolean;
  errorNotice?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'companion';
  content: string;
  timestamp: string;
  emotion?: AIEmotion;
  suggestedAction?: {
    label: string;
    type: string;
  };
  isFallback?: boolean;
}

// ---- Learn Mode Resources ----
export type ResourceType = 'video' | 'article' | 'course' | 'exercise';

export interface LearnResource {
  id: string;
  topic: string;
  title: string;
  type: ResourceType;
  source: string;
  url: string;
  time: string;
  xpReward: number;
}

// ---- Budget Tracker ----
export type ExpenseCategory = 'Food/Canteen' | 'Travel' | 'Tech/Books' | 'Impulse/Fun';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note: string;
  time: string;
  date: string;
}

// ---- Timetable & Weekly Schedule ----
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface TimetableEntry {
  id: string;
  title: string;
  subject: string;
  day: DayOfWeek;
  time: string; // e.g. '10:00'
  duration: number; // e.g. 30, 45, 60 minutes
  completed: boolean;
}

// ---- Friends & Campus Leaderboard ----
export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  tier: string;
  isUser: boolean;
  streak: number;
}
