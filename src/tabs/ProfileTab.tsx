import React from 'react';
import {
  Shield,
  Trophy,
  Flame,
  Coins,
  Volume2,
  VolumeX,
  Vibrate,
  RotateCcw,
  Bot,
  Users,
  Wallet,
  CalendarDays,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getRankDetails, getXpRequiredForLevel } from '../lib/rankEngine';
import { CompanionAvatar } from '../components/CompanionAvatar';
import { TabId } from '../components/BottomNav';

interface ProfileTabProps {
  onNavigateTab?: (tab: TabId) => void;
  onRetakeOnboarding?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onNavigateTab, onRetakeOnboarding }) => {
  const {
    progress,
    soundEnabled,
    hapticsEnabled,
    toggleSound,
    toggleHaptics,
    resetDemo,
    openCompanionHub,
  } = useApp();

  const rank = getRankDetails(progress.level);
  const xpNeeded = getXpRequiredForLevel(progress.level);
  const xpPct = Math.min(100, Math.round((progress.currentXp / xpNeeded) * 100));

  const rankLadder = [
    { tier: 'Grandmaster', minLvl: 30, color: '#8B4513' },
    { tier: 'Diamond', minLvl: 20, color: '#C2B280' },
    { tier: 'Platinum', minLvl: 14, color: '#8B4513' },
    { tier: 'Gold', minLvl: 8, color: '#C2B280' },
    { tier: 'Silver', minLvl: 4, color: '#A39360' },
    { tier: 'Bronze', minLvl: 1, color: '#8B4513' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn pb-6">
      {/* Student Profile Card */}
      <div className="p-4 rounded-2xl border border-edge bg-surface text-center flex flex-col items-center shadow-xs">
        <div className="relative mb-2">
          <CompanionAvatar
            id={progress.companion.id}
            glow={progress.companion.glowColor}
            size={76}
            floating={false}
          />
        </div>

        <h2 className="text-lg font-bold text-coffee">Scholar-Athlete</h2>
        <p className="text-xs text-coffee-muted capitalize">
          Companion: {progress.companion.name} ({progress.companion.personality})
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-edge2 bg-sand/30 text-saddle flex items-center gap-1">
            <Shield size={12} /> {rank.tier} Tier
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-edge bg-surface2 text-coffee">
            Level {progress.level}
          </span>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full mt-4 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-coffee">
            <span>XP Progress</span>
            <span className="tabular-nums">
              {progress.currentXp} / {xpNeeded} XP ({xpPct}%)
            </span>
          </div>
          <div className="h-2 w-full bg-sand/30 rounded-full overflow-hidden border border-edge">
            <div
              className="h-full bg-saddle rounded-full transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sand/30 text-saddle">
            <Flame size={20} />
          </div>
          <div>
            <p className="text-[10px] text-coffee-muted font-bold uppercase">Study Streak</p>
            <p className="text-base font-extrabold text-coffee">{progress.streak} Days</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sand/30 text-saddle">
            <Coins size={20} />
          </div>
          <div>
            <p className="text-[10px] text-coffee-muted font-bold uppercase">Total Coins</p>
            <p className="text-base font-extrabold text-coffee">{progress.coins}</p>
          </div>
        </div>
      </div>

      {/* Student Hub Navigation Shortcuts */}
      {onNavigateTab && (
        <div className="p-3.5 rounded-2xl border border-edge bg-surface shadow-xs space-y-1.5">
          <h3 className="text-xs font-bold text-coffee mb-2">Student Life Hub</h3>

          <button
            onClick={() => onNavigateTab('friends')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              <Users size={15} className="text-saddle" />
              Campus Leaderboard & Friends
            </span>
            <ChevronRight size={14} className="text-coffee-muted" />
          </button>

          <button
            onClick={() => onNavigateTab('timetable')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-saddle" />
              Weekly Study Schedule
            </span>
            <ChevronRight size={14} className="text-coffee-muted" />
          </button>

          <button
            onClick={() => onNavigateTab('budget')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              <Wallet size={15} className="text-saddle" />
              Student Pocket Budget
            </span>
            <ChevronRight size={14} className="text-coffee-muted" />
          </button>
        </div>
      )}

      {/* Preferences & Settings */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold text-coffee">Preferences</h3>

        <div className="space-y-1.5">
          <button
            onClick={toggleSound}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              {soundEnabled ? <Volume2 size={16} className="text-saddle" /> : <VolumeX size={16} className="text-red-500" />}
              Sound Effects
            </span>
            <span className="text-[11px] text-coffee-muted">{soundEnabled ? 'Enabled' : 'Muted'}</span>
          </button>

          <button
            onClick={toggleHaptics}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              <Vibrate size={16} className={hapticsEnabled ? 'text-saddle' : 'text-coffee-muted'} />
              Vibration Haptics
            </span>
            <span className="text-[11px] text-coffee-muted">{hapticsEnabled ? 'Enabled' : 'Disabled'}</span>
          </button>

          <button
            onClick={openCompanionHub}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-edge bg-surface2 hover:bg-sand/20 transition text-xs font-semibold text-coffee"
          >
            <span className="flex items-center gap-2">
              <Bot size={16} className="text-saddle" />
              AI Companion Chat & Mindset
            </span>
            <span className="text-[11px] font-bold text-saddle capitalize">
              {progress.companion.personality}
            </span>
          </button>
        </div>

        {onRetakeOnboarding && (
          <button
            onClick={onRetakeOnboarding}
            className="w-full mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-saddle/40 bg-sand/20 text-saddle hover:bg-sand/40 text-xs font-semibold transition"
          >
            <Sparkles size={14} className="text-saddle" />
            Retake Onboarding Quiz
          </button>
        )}

        <button
          onClick={resetDemo}
          className="w-full mt-1.5 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-edge2 text-coffee-muted hover:text-saddle hover:bg-sand/30 text-xs font-semibold transition"
        >
          <RotateCcw size={14} />
          Reset Demo Semester State
        </button>
      </div>

      {/* Rank Ladder Overview */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-2">
        <h3 className="text-xs font-bold text-coffee flex items-center gap-1.5">
          <Trophy size={16} className="text-saddle" />
          Rank Progression Ladder
        </h3>

        <div className="space-y-1.5">
          {rankLadder.map((r) => {
            const isCurrent = rank.tier === r.tier;
            return (
              <div
                key={r.tier}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold border transition ${
                  isCurrent
                    ? 'border-saddle bg-sand/30 text-saddle font-bold'
                    : 'border-edge bg-surface2 text-coffee-muted'
                }`}
              >
                <span>{r.tier}</span>
                <span>Lvl {r.minLvl}+</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
