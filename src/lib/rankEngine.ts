import { RankTier, TaskDifficulty } from '../types';

export const DIFFICULTY_XP: Record<TaskDifficulty, number> = {
  easy: 20,
  medium: 50,
  hard: 100,
};

/** Formula: 5 XP per 5 completed minutes (e.g. 25 min = 25 XP, 50 min = 50 XP) */
export function calculateSessionXp(completedMinutes: number): number {
  return Math.floor(completedMinutes / 5) * 5;
}

/** Returns XP needed to advance from current level to level + 1 */
export function getXpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.22, level - 1));
}

export interface RankDetails {
  tier: RankTier;
  color: string;
  badgeBg: string;
  glow: string;
}

export function getRankDetails(level: number): RankDetails {
  if (level >= 30) {
    return {
      tier: 'Grandmaster',
      color: '#8B4513',
      badgeBg: 'bg-saddle/15 text-saddle border-saddle/40',
      glow: 'shadow-[0_0_15px_rgba(139,69,19,0.4)]',
    };
  }
  if (level >= 20) {
    return {
      tier: 'Diamond',
      color: '#A39360',
      badgeBg: 'bg-olive/20 text-coffee border-olive',
      glow: 'shadow-[0_0_15px_rgba(194,178,128,0.4)]',
    };
  }
  if (level >= 14) {
    return {
      tier: 'Platinum',
      color: '#8B4513',
      badgeBg: 'bg-saddle/15 text-saddle border-saddle/40',
      glow: 'shadow-[0_0_15px_rgba(139,69,19,0.3)]',
    };
  }
  if (level >= 8) {
    return {
      tier: 'Gold',
      color: '#C2B280',
      badgeBg: 'bg-sand/40 text-coffee border-edge2',
      glow: 'shadow-[0_0_15px_rgba(224,205,169,0.4)]',
    };
  }
  if (level >= 4) {
    return {
      tier: 'Silver',
      color: '#A39360',
      badgeBg: 'bg-sand/30 text-coffee border-edge',
      glow: 'shadow-[0_0_15px_rgba(194,178,128,0.3)]',
    };
  }
  return {
    tier: 'Bronze',
    color: '#8B4513',
    badgeBg: 'bg-saddle/10 text-saddle border-saddle/30',
    glow: 'shadow-[0_0_15px_rgba(139,69,19,0.2)]',
  };
}
