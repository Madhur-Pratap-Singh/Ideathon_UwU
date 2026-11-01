import {
  Task,
  UserProgress,
  FocusSessionRecord,
  CompanionConfig,
  LearnResource,
  ResourceType,
  Expense,
  ExpenseCategory,
  TimetableEntry,
  DayOfWeek,
  LeaderboardEntry,
} from '../types';

const STORAGE_KEYS = {
  TASKS: 'uplevel_phase2_tasks',
  PROGRESS: 'uplevel_phase2_progress',
  SESSIONS: 'uplevel_phase2_sessions',
  COMPLETED_RESOURCES: 'uplevel_phase2_completed_resources',
  USER_TOPICS: 'uplevel_phase2_topics',
  EXPENSES: 'uplevel_phase2_expenses',
  MONTHLY_BUDGET: 'uplevel_phase2_monthly_budget',
  TIMETABLE: 'uplevel_phase2_timetable',
};

export const COMPANION_PRESETS: CompanionConfig[] = [
  {
    id: 'aiko',
    name: 'Aiko',
    archetype: 'Focus Mentor',
    glowColor: '#8B4513',
    personality: 'hype',
    voiceLine: 'Let’s lock in and conquer your study goals right now!',
    autoSpeak: true,
  },
  {
    id: 'sylphie',
    name: 'Sylphie',
    archetype: 'Mindful Sage',
    glowColor: '#C2B280',
    personality: 'calm',
    voiceLine: 'Take a deep breath. Gentle, steady rhythm builds true mastery.',
    autoSpeak: true,
  },
  {
    id: 'kaelen',
    name: 'Kaelen',
    archetype: 'Academic Strategist',
    glowColor: '#8B4513',
    personality: 'strict',
    voiceLine: 'Eliminate every distraction. Turn your syllabus into conquered ground.',
    autoSpeak: true,
  },
  {
    id: 'ignis',
    name: 'Ignis',
    archetype: 'Drive & Energy Catalyst',
    glowColor: '#8B4513',
    personality: 'hype',
    voiceLine: 'Fuel your focus fire! Every minute today counts toward your future!',
    autoSpeak: true,
  },
  {
    id: 'nova',
    name: 'Nova',
    archetype: 'Radiant Scholar Guide',
    glowColor: '#C2B280',
    personality: 'calm',
    voiceLine: 'Shine through your studies! Every minute here turns into mastery.',
    autoSpeak: true,
  },
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  level: 3,
  currentXp: 45,
  streak: 5,
  coins: 150,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  hapticsEnabled: true,
  companion: COMPANION_PRESETS[0], // Aiko
};

export const DEMO_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Solve 4 Page Replacement Algorithm problems (LRU & FIFO)',
    subject: 'Operating Systems',
    difficulty: 'medium',
    xpReward: 50,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Review Deadlock Prevention & Banker’s Algorithm proofs',
    subject: 'Operating Systems',
    difficulty: 'hard',
    xpReward: 100,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Revise B-Tree vs B+ Tree Indexing notes and diagrams',
    subject: 'DBMS',
    difficulty: 'easy',
    xpReward: 20,
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Write SQL queries for 3-way JOIN & Aggregate Group By',
    subject: 'DBMS',
    difficulty: 'medium',
    xpReward: 50,
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_TOPICS: string[] = [
  'Operating Systems',
  'DBMS',
  'Data Structures & Algorithms',
  'Computer Networks',
];

// ---- Budget Data ----
export const DEFAULT_MONTHLY_BUDGET = 6000;

export const DEMO_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    amount: 140,
    category: 'Food/Canteen',
    note: 'Canteen meal & iced chai',
    time: '12:45',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'exp-2',
    amount: 50,
    category: 'Travel',
    note: 'Metro smartcard recharge',
    time: '09:10',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'exp-3',
    amount: 320,
    category: 'Tech/Books',
    note: 'DSA Problem Solving Handbook',
    time: '16:30',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
  },
  {
    id: 'exp-4',
    amount: 190,
    category: 'Impulse/Fun',
    note: 'Late night study snack',
    time: '21:15',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
  },
];

// ---- Timetable Data ----
export const DAYS_OF_WEEK: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getTodayDayOfWeek(): DayOfWeek {
  const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const map: Record<number, DayOfWeek> = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };
  return map[dayIndex] || 'Mon';
}

export const DEMO_TIMETABLE: TimetableEntry[] = [
  {
    id: 'tt-1',
    title: 'Operating Systems Scheduling Lecture',
    subject: 'Operating Systems',
    day: 'Mon',
    time: '10:00',
    duration: 45,
    completed: true,
  },
  {
    id: 'tt-2',
    title: 'DSA Array & Pointer practice',
    subject: 'Data Structures & Algorithms',
    day: 'Mon',
    time: '17:00',
    duration: 60,
    completed: false,
  },
  {
    id: 'tt-3',
    title: 'DBMS Relational Algebra proofs',
    subject: 'DBMS',
    day: 'Tue',
    time: '11:00',
    duration: 45,
    completed: false,
  },
  {
    id: 'tt-4',
    title: 'Deadlock & Banker Algorithm proofs',
    subject: 'Operating Systems',
    day: 'Tue',
    time: '18:30',
    duration: 30,
    completed: false,
  },
  {
    id: 'tt-5',
    title: 'Routing & Subnetting practice',
    subject: 'Computer Networks',
    day: 'Wed',
    time: '14:00',
    duration: 45,
    completed: false,
  },
  {
    id: 'tt-6',
    title: 'SQL Normalization & Indexing revision',
    subject: 'DBMS',
    day: 'Thu',
    time: '10:30',
    duration: 45,
    completed: false,
  },
  {
    id: 'tt-7',
    title: 'Graph BFS/DFS Coding Sprint',
    subject: 'Data Structures & Algorithms',
    day: 'Fri',
    time: '16:00',
    duration: 60,
    completed: false,
  },
  {
    id: 'tt-8',
    title: 'Weekly Revision & Practice Quiz',
    subject: 'General Academics',
    day: 'Sat',
    time: '11:00',
    duration: 60,
    completed: false,
  },
  {
    id: 'tt-9',
    title: 'Sunday Weekly Review & Goal Setting',
    subject: 'General Academics',
    day: 'Sun',
    time: '16:00',
    duration: 30,
    completed: false,
  },
];

export function autoPlanWeeklySchedule(topics: string[]): TimetableEntry[] {
  const safeTopics = topics.length > 0 ? topics : DEFAULT_TOPICS;
  const timeSlots = ['09:30', '14:00', '17:30', '19:00'];
  const newEntries: TimetableEntry[] = [];

  DAYS_OF_WEEK.forEach((day, dayIdx) => {
    const topic = safeTopics[dayIdx % safeTopics.length];
    const time = timeSlots[dayIdx % timeSlots.length];
    newEntries.push({
      id: `autoplan-${day.toLowerCase()}-${Date.now() + dayIdx}`,
      title: `${topic} Core Revision & Practice`,
      subject: topic,
      day,
      time,
      duration: day === 'Sat' || day === 'Sun' ? 60 : 45,
      completed: false,
    });
  });

  return newEntries;
}

// ---- Peer Leaderboard Data ----
export const PEER_LEADERBOARD_BASE: Omit<LeaderboardEntry, 'rank'>[] = [
  { name: 'Aarav K.', level: 16, xp: 5210, tier: 'Diamond II', isUser: false, streak: 14 },
  { name: 'Meera S.', level: 15, xp: 4780, tier: 'Diamond IV', isUser: false, streak: 12 },
  { name: 'Rohan P.', level: 13, xp: 3120, tier: 'Platinum I', isUser: false, streak: 8 },
  { name: 'Ishita R.', level: 12, xp: 2890, tier: 'Platinum III', isUser: false, streak: 7 },
  { name: 'Kabir V.', level: 9, xp: 2150, tier: 'Gold II', isUser: false, streak: 4 },
];

// ---- Learn Resources Generator ----
export function generateResourcesForTopic(topic: string): LearnResource[] {
  const safeTopic = topic.trim();
  const slug = safeTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return [
    {
      id: `res-${slug}-yt-crash`,
      topic: safeTopic,
      title: `${safeTopic} Crash Course — Beginner to Pro`,
      type: 'video',
      source: 'YouTube',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(safeTopic + ' crash course tutorial')}`,
      time: '45 min',
      xpReward: 15,
    },
    {
      id: `res-${slug}-yt-vis`,
      topic: safeTopic,
      title: `${safeTopic} Animated Visual Guide & Concepts`,
      type: 'video',
      source: 'YouTube',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(safeTopic + ' animation visual concept')}`,
      time: '20 min',
      xpReward: 15,
    },
    {
      id: `res-${slug}-article-gfg`,
      topic: safeTopic,
      title: `${safeTopic} Complete Notes & Concept Guide`,
      type: 'article',
      source: 'GeeksforGeeks',
      url: `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(safeTopic)}`,
      time: '15 min',
      xpReward: 15,
    },
    {
      id: `res-${slug}-article-cheat`,
      topic: safeTopic,
      title: `The Ultimate ${safeTopic} Quick Revision Cheatsheet`,
      type: 'article',
      source: 'Dev.to',
      url: `https://dev.to/search?q=${encodeURIComponent(safeTopic)}`,
      time: '10 min',
      xpReward: 15,
    },
    {
      id: `res-${slug}-course-fcc`,
      topic: safeTopic,
      title: `${safeTopic} Full Curriculum & Practice`,
      type: 'course',
      source: 'freeCodeCamp',
      url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(safeTopic)}`,
      time: '4 hrs',
      xpReward: 15,
    },
    {
      id: `res-${slug}-exercise-code`,
      topic: safeTopic,
      title: `${safeTopic} Practice Problems & Challenges`,
      type: 'exercise',
      source: 'LeetCode',
      url: `https://leetcode.com/problemset/?search=${encodeURIComponent(safeTopic)}`,
      time: '30 min',
      xpReward: 15,
    },
  ];
}

export function generateAllResources(topics: string[]): LearnResource[] {
  const result: LearnResource[] = [];
  topics.forEach((t) => {
    result.push(...generateResourcesForTopic(t));
  });
  return result;
}

// ---- Storage Loaders & Savers ----

export function loadStoredTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    return raw ? JSON.parse(raw) : DEMO_TASKS;
  } catch {
    return DEMO_TASKS;
  }
}

export function saveStoredTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
}

export function loadStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      companion: {
        ...COMPANION_PRESETS[0],
        ...(parsed.companion || {}),
      },
    };
  } catch {
    return INITIAL_USER_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function loadStoredSessions(): FocusSessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredSessions(sessions: FocusSessionRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save sessions', e);
  }
}

export function loadStoredCompletedResources(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_RESOURCES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCompletedResources(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_RESOURCES, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save completed resources', e);
  }
}

export function loadStoredTopics(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_TOPICS);
    return raw ? JSON.parse(raw) : DEFAULT_TOPICS;
  } catch {
    return DEFAULT_TOPICS;
  }
}

export function saveStoredTopics(topics: string[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_TOPICS, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save topics', e);
  }
}

export function loadStoredExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return raw ? JSON.parse(raw) : DEMO_EXPENSES;
  } catch {
    return DEMO_EXPENSES;
  }
}

export function saveStoredExpenses(expenses: Expense[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (e) {
    console.error('Failed to save expenses', e);
  }
}

export function loadStoredBudget(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MONTHLY_BUDGET);
    return raw ? parseInt(raw, 10) : DEFAULT_MONTHLY_BUDGET;
  } catch {
    return DEFAULT_MONTHLY_BUDGET;
  }
}

export function saveStoredBudget(budget: number) {
  try {
    localStorage.setItem(STORAGE_KEYS.MONTHLY_BUDGET, budget.toString());
  } catch (e) {
    console.error('Failed to save budget', e);
  }
}

export function loadStoredTimetable(): TimetableEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
    return raw ? JSON.parse(raw) : DEMO_TIMETABLE;
  } catch {
    return DEMO_TIMETABLE;
  }
}

export function saveStoredTimetable(timetable: TimetableEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  } catch (e) {
    console.error('Failed to save timetable', e);
  }
}

export function resetToDemoData() {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEMO_TASKS));
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(INITIAL_USER_PROGRESS));
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.COMPLETED_RESOURCES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.USER_TOPICS, JSON.stringify(DEFAULT_TOPICS));
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(DEMO_EXPENSES));
  localStorage.setItem(STORAGE_KEYS.MONTHLY_BUDGET, DEFAULT_MONTHLY_BUDGET.toString());
  localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(DEMO_TIMETABLE));
}
