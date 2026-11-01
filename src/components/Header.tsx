import React, { useState } from 'react';
import {
  Flame,
  Coins,
  Volume2,
  VolumeX,
  ChevronDown,
  Bot,
  Trophy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getXpRequiredForLevel, getRankDetails } from '../lib/rankEngine';
import { COMPANION_PRESETS } from '../lib/storage';
import { CompanionAvatar } from './CompanionAvatar';
import { TabId } from './BottomNav';

interface HeaderProps {
  onNavigateTab?: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateTab }) => {
  const {
    progress,
    soundEnabled,
    toggleSound,
    setCompanion,
    openCompanionHub,
  } = useApp();

  const [isCompanionPickerOpen, setIsCompanionPickerOpen] = useState(false);

  const xpNeeded = getXpRequiredForLevel(progress.level);
  const xpPct = Math.min(100, Math.round((progress.currentXp / xpNeeded) * 100));
  const rank = getRankDetails(progress.level);

  return (
    <header className="sticky top-0 z-20 border-b border-edge bg-surface/90 backdrop-blur-md px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Companion Mini Avatar with Click-to-Change */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              onClick={() => setIsCompanionPickerOpen(!isCompanionPickerOpen)}
              title="Switch companion"
              className="relative p-1 rounded-2xl border border-edge2 bg-sand-subtle hover:border-saddle transition group"
            >
              <CompanionAvatar
                id={progress.companion.id}
                glow={progress.companion.glowColor}
                size={38}
                floating={false}
              />
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-surface border border-edge text-coffee-muted group-hover:text-saddle">
                <ChevronDown size={9} />
              </span>
            </button>

            {/* Companion Dropdown Picker */}
            {isCompanionPickerOpen && (
              <div className="absolute top-12 left-0 z-50 w-60 p-2.5 rounded-2xl border border-edge2 bg-surface shadow-warm animate-scaleUp">
                <p className="text-[10px] font-bold text-coffee-muted uppercase tracking-wider mb-2">
                  Select Focus Companion
                </p>
                <div className="space-y-1">
                  {COMPANION_PRESETS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCompanion(c);
                        setIsCompanionPickerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 p-2 rounded-xl text-left transition ${
                        progress.companion.id === c.id
                          ? 'border border-saddle/40 bg-saddle/10 text-saddle'
                          : 'hover:bg-sand/30 text-coffee'
                      }`}
                    >
                      <CompanionAvatar id={c.id} glow={c.glowColor} size={26} floating={false} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate">{c.name}</p>
                        <p className="text-[10px] text-coffee-muted truncate capitalize">
                          {c.personality} • {c.archetype}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold tracking-tight text-coffee font-display">
                UpLevel
              </h1>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-saddle/30 bg-saddle/10 text-saddle uppercase">
                {progress.companion.personality}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-coffee-muted mt-0.5">
              <span className="font-extrabold text-coffee text-[11px]">Lvl {progress.level}</span>
              <span>•</span>
              <span className="font-bold text-[11px] text-saddle">
                {rank.tier}
              </span>
              <span>•</span>
              <span className="tabular-nums text-[10px] text-coffee-muted">
                {progress.currentXp}/{xpNeeded} XP
              </span>
            </div>
          </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="flex items-center gap-1.5">
          {/* Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-edge2 bg-sand/40 text-saddle text-xs font-extrabold">
            <Flame size={13} className="text-saddle animate-bounce" />
            <span>{progress.streak}d</span>
          </div>

          {/* Friends / Leaderboard Trigger */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('friends')}
            title="Campus Leaderboard & Friends"
            className="p-1.5 rounded-xl border border-edge bg-surface hover:bg-sand/30 text-saddle transition"
          >
            <Trophy size={14} />
          </button>

          {/* AI Companion Quick Trigger */}
          <button
            onClick={openCompanionHub}
            title="Open AI Companion"
            className="p-1.5 rounded-xl border border-edge bg-surface hover:bg-sand/30 text-saddle transition"
          >
            <Bot size={14} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            className="p-1.5 rounded-xl border border-edge bg-surface text-coffee-muted hover:text-coffee transition"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} className="text-red-500" />}
          </button>
        </div>
      </div>

      {/* Mini XP Bar directly under header */}
      <div className="mt-2.5 h-1.5 w-full bg-olive/20 rounded-full overflow-hidden border border-edge">
        <div
          className="h-full bg-saddle rounded-full transition-all duration-500 ease-out"
          style={{ width: `${xpPct}%` }}
        />
      </div>
    </header>
  );
};
