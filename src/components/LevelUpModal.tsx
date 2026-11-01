import React from 'react';
import { Trophy, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getRankDetails } from '../lib/rankEngine';

export const LevelUpModal: React.FC = () => {
  const { levelUpData, closeLevelUp } = useApp();

  if (!levelUpData) return null;

  const rank = getRankDetails(levelUpData.newLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm p-6 rounded-3xl border-2 border-saddle bg-surface text-center shadow-warm animate-scaleUp">
        {/* Animated Trophy Icon */}
        <div className="relative mx-auto mb-3 h-16 w-16 rounded-2xl flex items-center justify-center bg-sand/40 border border-edge2 text-saddle shadow-sm">
          <Trophy size={34} className="text-saddle animate-bounce" />
          <div className="absolute -top-1 -right-1">
            <Sparkles size={18} className="text-saddle animate-spin" />
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase tracking-widest text-saddle">
          Level Ascended!
        </span>

        <h2 className="heading-xl text-3xl font-extrabold text-coffee mt-0.5">
          Level {levelUpData.newLevel}
        </h2>

        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border border-edge2 bg-sand/30 text-saddle text-xs font-extrabold mt-1.5">
          <Shield size={13} />
          {rank.tier} Tier Student
        </div>

        <p className="text-xs text-coffee-muted mt-3 leading-relaxed">
          Your focused study sessions and daily goals have upgraded your student rank. Continue your streak to reach higher mastery levels!
        </p>

        <div className="mt-5">
          <button
            onClick={closeLevelUp}
            className="btn-primary"
          >
            Claim & Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
