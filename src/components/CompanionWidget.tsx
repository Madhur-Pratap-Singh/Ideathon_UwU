import React, { useState } from 'react';
import { Bot, MessageSquare, ChevronUp, Sparkles, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanionAvatar } from './CompanionAvatar';

export const CompanionWidget: React.FC = () => {
  const { progress, openCompanionHub, isFocusChamberOpen } = useApp();
  const [bubbleOpen, setBubbleOpen] = useState(false);

  // Hide while in full-screen Zen mode
  if (isFocusChamberOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Quick Speech Bubble */}
      {bubbleOpen && (
        <div className="animate-slideUp max-w-[230px] p-3 rounded-2xl border border-edge2 bg-surface/95 backdrop-blur-md shadow-warm text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-saddle">
              {progress.companion.name}
            </span>
            <span className="text-[9px] font-bold text-coffee-muted uppercase px-1 rounded bg-sand/40">
              {progress.companion.personality}
            </span>
          </div>

          <p className="text-xs text-coffee leading-snug italic">
            "{progress.companion.voiceLine}"
          </p>

          <div className="mt-2.5 pt-2 border-t border-edge flex items-center justify-between">
            <button
              onClick={() => {
                setBubbleOpen(false);
                openCompanionHub();
              }}
              className="text-[11px] font-bold text-saddle hover:underline flex items-center gap-1"
            >
              Open AI Chat <Sparkles size={11} />
            </button>
            <button
              onClick={() => setBubbleOpen(false)}
              className="text-[10px] text-coffee-muted hover:text-coffee"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <button
        onClick={() => {
          if (bubbleOpen) {
            setBubbleOpen(false);
            openCompanionHub();
          } else {
            setBubbleOpen(true);
          }
        }}
        title={`Chat with ${progress.companion.name}`}
        className="relative rounded-full transition active:scale-95 group shadow-warm"
      >
        <span
          className="absolute inset-0 rounded-full animate-auraPulse"
          style={{
            boxShadow: `0 0 16px ${progress.companion.glowColor}aa`,
            background: `${progress.companion.glowColor}25`,
          }}
        />
        <CompanionAvatar
          id={progress.companion.id}
          glow={progress.companion.glowColor}
          size={56}
          floating={true}
        />
      </button>
    </div>
  );
};
