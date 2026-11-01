import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  ArrowRight,
  Bot,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanionAvatar } from './CompanionAvatar';
import { calculateSessionXp } from '../lib/rankEngine';

export const FocusChamber: React.FC = () => {
  const {
    isFocusChamberOpen,
    closeFocusChamber,
    progress,
    soundEnabled,
    toggleSound,
    completeFocusSession,
  } = useApp();

  // Mode & Duration
  const [selectedDuration, setSelectedDuration] = useState<number>(25); // Minutes
  const [customInput, setCustomInput] = useState<string>('25');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Timer State
  const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [totalSeconds, setTotalSeconds] = useState<number>(25 * 60);

  // Completed Session Result
  const [completionResult, setCompletionResult] = useState<{
    xp: number;
    coins: number;
    aiMessage?: string;
  } | null>(null);

  const endTimeRef = useRef<number | null>(null);
  const hasCompletedRef = useRef<boolean>(false);

  const setDuration = (minutes: number) => {
    if (timerStatus !== 'idle') return;
    const clamped = Math.max(1, Math.min(180, minutes));
    setSelectedDuration(clamped);
    setSecondsRemaining(clamped * 60);
    setTotalSeconds(clamped * 60);
  };

  useEffect(() => {
    if (timerStatus !== 'running') return;

    const interval = setInterval(() => {
      if (!endTimeRef.current) return;

      const now = Date.now();
      const remainingMs = endTimeRef.current - now;
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

      setSecondsRemaining(remainingSecs);

      if (remainingSecs <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        clearInterval(interval);
        handleSessionFinish();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [timerStatus]);

  const handleStart = () => {
    const remaining = secondsRemaining > 0 ? secondsRemaining : selectedDuration * 60;
    endTimeRef.current = Date.now() + remaining * 1000;
    hasCompletedRef.current = false;
    setTimerStatus('running');
  };

  const handlePause = () => {
    if (timerStatus !== 'running') return;
    if (endTimeRef.current) {
      const remainingSecs = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setSecondsRemaining(remainingSecs);
    }
    endTimeRef.current = null;
    setTimerStatus('paused');
  };

  const handleResume = () => {
    if (timerStatus !== 'paused') return;
    endTimeRef.current = Date.now() + secondsRemaining * 1000;
    setTimerStatus('running');
  };

  const handleReset = () => {
    endTimeRef.current = null;
    hasCompletedRef.current = false;
    setTimerStatus('idle');
    setSecondsRemaining(selectedDuration * 60);
    setTotalSeconds(selectedDuration * 60);
    setCompletionResult(null);
  };

  const handleAbandon = () => {
    if (timerStatus === 'running' || timerStatus === 'paused') {
      const confirmAbandon = window.confirm(
        'Exit focus chamber? No XP will be awarded for unfinished sessions.'
      );
      if (!confirmAbandon) return;
    }
    handleReset();
    closeFocusChamber();
  };

  const handleSessionFinish = async () => {
    setTimerStatus('completed');

    const durationMinutes = Math.round(totalSeconds / 60);
    const summary = await completeFocusSession(durationMinutes);

    setCompletionResult({
      xp: summary.xpEarned,
      coins: summary.coinsEarned,
      aiMessage: summary.aiMessage,
    });
  };

  if (!isFocusChamberOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPct = totalSeconds > 0 ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 : 0;

  const circleRadius = 110;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1810]/95 backdrop-blur-md animate-fadeIn p-4 overflow-y-auto">
      {/* Background Zen Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full pointer-events-none opacity-20 blur-[100px]"
        style={{ background: '#C2B280' }}
      />

      <div className="relative w-full max-w-[430px] mx-auto flex flex-col items-center justify-between min-h-[85vh] py-6 px-4">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between text-xs text-[#E0CDA9]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#C2B280] animate-pulse" />
            <span className="font-semibold tracking-wider text-[#F5F5DC] text-[11px] uppercase">
              Zen Focus Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute' : 'Unmute'}
              className="p-1.5 rounded-lg border border-[#E0CDA9]/20 bg-[#3d2317]/60 text-[#E0CDA9] hover:text-white transition"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-red-300" />}
            </button>

            <button
              onClick={handleAbandon}
              title="Exit Zen Mode"
              className="p-1.5 rounded-lg border border-[#E0CDA9]/20 bg-[#3d2317]/60 text-[#E0CDA9] hover:text-white transition"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Center: Active Timer or Completion Summary */}
        {timerStatus === 'completed' && completionResult ? (
          /* COMPLETION REWARD SCREEN */
          <div className="w-full max-w-sm my-auto p-6 rounded-3xl border border-edge bg-surface text-center shadow-lg animate-scaleUp">
            <div className="mb-3 inline-flex p-3 rounded-2xl bg-sand/30 text-saddle border border-edge">
              <CheckCircle2 size={32} />
            </div>

            <h2 className="text-lg font-bold text-coffee">Session Completed</h2>
            <p className="text-xs text-coffee-muted mt-0.5">
              You completed <span className="font-semibold text-coffee">{selectedDuration} minutes</span> of focused study.
            </p>

            {/* AI Companion Reaction */}
            <div className="my-4 p-3 rounded-xl border border-edge bg-surface2 flex items-center gap-3 text-left">
              <CompanionAvatar id={progress.companion.id} glow={progress.companion.glowColor} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <Bot size={12} className="text-saddle" />
                  <p className="text-[11px] font-semibold text-saddle">
                    {progress.companion.name}
                  </p>
                </div>
                <p className="text-xs text-coffee italic mt-0.5 leading-snug">
                  "{completionResult.aiMessage || progress.companion.voiceLine}"
                </p>
              </div>
            </div>

            {/* Reward Card */}
            <div className="p-3.5 rounded-xl border border-edge bg-sand/20 mb-5">
              <span className="text-[10px] font-semibold text-coffee-muted block">Experience Gained</span>
              <span className="text-xl font-bold text-saddle flex items-center justify-center gap-1 mt-0.5">
                <Sparkles size={16} /> +{completionResult.xp} XP
              </span>
              <span className="text-[10px] text-coffee-muted mt-0.5 block">5 XP per 5 completed minutes</span>
            </div>

            <button
              onClick={() => {
                handleReset();
                closeFocusChamber();
              }}
              className="w-full py-2.5 rounded-xl bg-saddle hover:bg-saddle-hover text-white text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5"
            >
              Done <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          /* ACTIVE / IDLE TIMER INTERFACE */
          <div className="flex flex-col items-center my-auto w-full">
            {/* Mascot Presence */}
            <div className="relative mb-2 flex flex-col items-center animate-breathe">
              <CompanionAvatar
                id={progress.companion.id}
                glow={progress.companion.glowColor}
                size={96}
                floating={true}
              />
              <div className="mt-1 text-center">
                <span className="text-xs font-semibold text-[#F5F5DC]">
                  {progress.companion.name}
                </span>
                <p className="text-[10px] text-[#E0CDA9]/70 italic mt-0.5">
                  {timerStatus === 'running'
                    ? 'Guarding your focus.'
                    : progress.companion.archetype}
                </p>
              </div>
            </div>

            {/* Circular Timer Display */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-[250px] h-[250px] -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r={circleRadius}
                  stroke="#C2B280"
                  strokeOpacity="0.18"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r={circleRadius}
                  stroke="#E0CDA9"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-linear"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-bold text-5xl text-[#F5F5DC] tracking-tight tabular-nums">
                  {timeFormatted}
                </span>

                <div className="flex items-center gap-1 mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full border border-[#E0CDA9]/20 bg-[#3d2317]/50 text-[#E0CDA9]">
                  <Sparkles size={11} className="text-[#E0CDA9]" />
                  <span>+{calculateSessionXp(selectedDuration)} XP reward</span>
                </div>
              </div>
            </div>

            {/* Duration Selector Tabs */}
            {timerStatus === 'idle' && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                {[15, 25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setIsCustomMode(false);
                      setDuration(mins);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      selectedDuration === mins && !isCustomMode
                        ? 'bg-saddle text-white shadow-xs'
                        : 'border border-[#E0CDA9]/20 bg-[#3d2317]/40 text-[#E0CDA9] hover:text-white'
                    }`}
                  >
                    {mins === 25 ? '25m Pomodoro' : `${mins}m`}
                  </button>
                ))}

                <button
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                    isCustomMode
                      ? 'border-saddle bg-saddle/40 text-white'
                      : 'border-[#E0CDA9]/20 bg-[#3d2317]/40 text-[#E0CDA9] hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>
            )}

            {/* Custom Minutes Input */}
            {timerStatus === 'idle' && isCustomMode && (
              <div className="flex items-center gap-2 mb-5 animate-fadeIn">
                <input
                  type="number"
                  min="5"
                  max="180"
                  step="5"
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value);
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val > 0) {
                      setDuration(val);
                    }
                  }}
                  className="w-16 px-2.5 py-1 rounded-xl border border-[#E0CDA9]/30 bg-[#3d2317] text-center text-xs font-bold text-white focus:outline-none"
                />
                <span className="text-xs text-[#E0CDA9]">minutes</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              {timerStatus === 'idle' && (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-saddle hover:bg-saddle-hover text-white text-xs font-semibold shadow-sm transition active:scale-95"
                >
                  <Play size={15} fill="white" />
                  Begin Focus
                </button>
              )}

              {timerStatus === 'running' && (
                <>
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl border border-[#E0CDA9]/30 bg-[#3d2317] hover:bg-[#4d2d1e] text-xs font-medium text-white transition active:scale-95"
                  >
                    <Pause size={15} />
                    Pause
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#E0CDA9]/20 hover:border-red-400 bg-[#3d2317] text-xs font-medium text-[#E0CDA9] hover:text-red-400 transition"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </>
              )}

              {timerStatus === 'paused' && (
                <>
                  <button
                    onClick={handleResume}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-saddle hover:bg-saddle-hover text-xs font-semibold text-white shadow-sm transition active:scale-95"
                  >
                    <Play size={15} fill="white" />
                    Resume
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#E0CDA9]/20 bg-[#3d2317] text-xs font-medium text-[#E0CDA9] hover:text-white transition"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="text-center text-[10px] text-[#E0CDA9]/50">
          XP is awarded strictly upon timer completion.
        </div>
      </div>
    </div>
  );
};
