import React, { useState } from 'react';
import {
  Users,
  Trophy,
  Copy,
  Share2,
  Check,
  Flame,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getRankDetails } from '../lib/rankEngine';
import { PEER_LEADERBOARD_BASE } from '../lib/storage';
import { LeaderboardEntry } from '../types';

export const FriendsTab: React.FC = () => {
  const { progress, openFocusChamber } = useApp();
  const [copied, setCopied] = useState(false);
  const [challengedFriend, setChallengedFriend] = useState<string | null>(null);

  const inviteCode = 'UPLEVEL-LOCK-7X2B';

  const userRankDetails = getRankDetails(progress.level);

  // Dynamically assemble leaderboard with real user data
  const userEntry: Omit<LeaderboardEntry, 'rank'> = {
    name: 'You',
    level: progress.level,
    xp: progress.currentXp + progress.level * 250,
    tier: `${userRankDetails.tier} Tier`,
    isUser: true,
    streak: progress.streak,
  };

  const rawList = [...PEER_LEADERBOARD_BASE, userEntry].sort((a, b) => b.xp - a.xp);
  const leaderboard: LeaderboardEntry[] = rawList.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'UpLevel — Gamified Student Study App',
          text: `Join my study circle on UpLevel! Use my invite code: ${inviteCode}`,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleChallenge = (name: string) => {
    setChallengedFriend(name);
    setTimeout(() => setChallengedFriend(null), 3000);
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-coffee flex items-center gap-1.5">
          <Users className="text-saddle" size={18} />
          Campus Study Circle
        </h2>
        <p className="text-[11px] text-coffee-muted">
          Compete on the leaderboard and lock in study streaks with friends
        </p>
      </div>

      {/* Invite Code Card */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-coffee flex items-center gap-1.5">
            <Sparkles size={14} className="text-saddle" />
            Your Study Invite Code
          </h3>
          <span className="text-[10px] text-coffee-muted">Invite for +50 Coins</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border border-edge bg-surface2">
          <span className="font-mono text-xs font-bold tracking-wider text-coffee">
            {inviteCode}
          </span>
          {copied && (
            <span className="text-[10px] font-bold text-saddle flex items-center gap-1">
              <Check size={12} /> Copied!
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="py-2 px-3 rounded-xl border border-edge bg-surface hover:bg-sand/20 text-coffee text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Copy size={13} /> {copied ? 'Copied' : 'Copy Code'}
          </button>

          <button
            onClick={handleShare}
            className="py-2 px-3 rounded-xl bg-saddle hover:bg-saddle-hover text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Share2 size={13} /> Share Link
          </button>
        </div>
      </div>

      {/* Campus Leaderboard */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-coffee flex items-center gap-1.5">
            <Trophy size={14} className="text-saddle" />
            Semester XP Leaderboard
          </h3>
          <span className="text-[10px] text-coffee-muted">Top Scholars</span>
        </div>

        <div className="space-y-1.5">
          {leaderboard.map((item) => {
            const isTop3 = item.rank <= 3;

            return (
              <div
                key={item.rank}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                  item.isUser
                    ? 'border-saddle bg-sand/25 shadow-xs'
                    : 'border-edge bg-surface2 text-coffee'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      item.rank === 1
                        ? 'bg-saddle text-white shadow-xs'
                        : item.rank === 2
                        ? 'bg-olive text-coffee font-extrabold'
                        : item.rank === 3
                        ? 'bg-sand text-coffee font-bold'
                        : 'bg-surface text-coffee-muted border border-edge'
                    }`}
                  >
                    {item.rank}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-coffee truncate">
                      {item.name} {item.isUser && <span className="text-[10px] text-saddle">(You)</span>}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-coffee-muted">
                      <span>Lvl {item.level}</span>
                      <span>•</span>
                      <span>{item.tier}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-saddle font-semibold">
                        <Flame size={10} /> {item.streak}d
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <span className="text-xs font-bold text-coffee tabular-nums block">
                    {item.xp.toLocaleString()} XP
                  </span>
                  {!item.isUser && (
                    <button
                      onClick={() => handleChallenge(item.name)}
                      className="text-[10px] text-saddle hover:underline font-semibold"
                    >
                      {challengedFriend === item.name ? 'Challenged!' : 'Challenge'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenge Notification Toast Banner */}
      {challengedFriend && (
        <div className="p-3 rounded-xl border border-edge2 bg-sand/30 flex items-center justify-between text-xs animate-scaleUp">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-saddle" />
            <span className="font-semibold text-coffee">
              Challenge sent to {challengedFriend}! Starting a 25m focus sprint...
            </span>
          </div>
          <button
            onClick={() => openFocusChamber()}
            className="text-[11px] font-bold text-saddle underline"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};
