import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Check,
  Sparkles,
  Loader2,
  GraduationCap,
  Wallet,
  Target,
  Sprout,
  Shuffle,
  CalendarCheck,
  Shield,
  Gem,
  Users,
  Flame,
  Shirt,
  BookOpen,
  Laptop,
  Timer,
  Bot,
  Star,
  Swords,
  Feather,
  Sun,
  Crown,
  LucideIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMPANION_PRESETS } from '../lib/storage';

export interface OnboardingProps {
  onComplete: () => void;
}

type Phase = 'quiz' | 'loading' | 'preview' | 'paywall';

interface QuizOption {
  label: string;
  desc: string;
  icon: LucideIcon;
  companionId?: 'aiko' | 'sylphie' | 'kaelen' | 'nova';
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  category: string;
  options: QuizOption[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'goals',
    question: "What's your primary goal right now?",
    subtitle: 'Pick the main milestone you want to conquer.',
    category: 'Goals',
    options: [
      {
        label: 'Ace my academics',
        desc: 'Master coursework, pass exams with top ranks',
        icon: GraduationCap,
      },
      {
        label: 'Build solid consistency',
        desc: 'Crush procrastination & stick to a routine',
        icon: Target,
      },
      {
        label: 'Get financially fit',
        desc: 'Track UPI expenses, cut impulse spends & save',
        icon: Wallet,
      },
      {
        label: 'Total self-improvement',
        desc: 'Academics, daily fitness & mental clarity',
        icon: Sparkles,
      },
    ],
  },
  {
    id: 'habits',
    question: 'How consistent are your current habits?',
    subtitle: 'Be honest — your personalized plan adapts to where you are.',
    category: 'Habits',
    options: [
      {
        label: 'Just getting started',
        desc: 'Need a structured system and guidance',
        icon: Sprout,
      },
      {
        label: 'Inconsistent',
        desc: 'Some days very productive, many off-track',
        icon: Shuffle,
      },
      {
        label: 'Fairly consistent',
        desc: 'Maintain a decent study routine most days',
        icon: CalendarCheck,
      },
      {
        label: 'Highly disciplined',
        desc: 'Rarely miss a scheduled focus session',
        icon: Shield,
      },
    ],
  },
  {
    id: 'improve',
    question: 'Which area do you most want to improve?',
    subtitle: 'Your companion and daily quests will prioritize this first.',
    category: 'Improvement',
    options: [
      {
        label: 'Confidence & Mindset',
        desc: 'Overcome hesitation, beat exam anxiety & speak up',
        icon: Gem,
      },
      {
        label: 'Social Skills & Network',
        desc: 'Better communication, study circles & campus peers',
        icon: Users,
      },
      {
        label: 'Physical Fitness & Energy',
        desc: 'Daily endurance, workout consistency & posture',
        icon: Flame,
      },
      {
        label: 'Appearance & Grooming',
        desc: 'Daily aesthetic self-care, presentation & style',
        icon: Shirt,
      },
    ],
  },
  {
    id: 'usertype',
    question: 'Which best describes your current journey?',
    subtitle: "We'll tune study recommendations and tasks to your level.",
    category: 'Profile',
    options: [
      {
        label: 'College / University Student',
        desc: 'Undergrad/postgrad tackling semesters & placements',
        icon: GraduationCap,
      },
      {
        label: 'Competitive Exam Aspirant',
        desc: 'GATE, JEE, UPSC, CAT or GRE preparation',
        icon: Crown,
      },
      {
        label: 'High School Student',
        desc: 'Board exams, foundation topics & homework routines',
        icon: BookOpen,
      },
      {
        label: 'Independent Self-Learner',
        desc: 'Upskilling in tech, design or career crafts',
        icon: Laptop,
      },
    ],
  },
  {
    id: 'companion',
    question: 'Choose your AI Companion coaching style:',
    subtitle: 'You can always switch your companion anytime in your profile.',
    category: 'AI Coach',
    options: [
      {
        label: 'Aiko — Hype & Energetic',
        desc: 'High-energy hype, celebrates every win & keeps morale high',
        icon: Flame,
        companionId: 'aiko',
      },
      {
        label: 'Sylphie — Mindful & Calm',
        desc: 'Gentle, anti-anxiety pacing with mindful study reminders',
        icon: Feather,
        companionId: 'sylphie',
      },
      {
        label: 'Kaelen — Strict & Disciplined',
        desc: 'No-nonsense academic strategist who keeps you accountable',
        icon: Swords,
        companionId: 'kaelen',
      },
      {
        label: 'Nova — Radiant & Wise',
        desc: 'Balanced conceptual mentor guiding you to deep mastery',
        icon: Sun,
        companionId: 'nova',
      },
    ],
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { setCompanion } = useApp();

  const [phase, setPhase] = useState<Phase>('quiz');
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  // Loading animation state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // Paywall state
  const [pricingPlan, setPricingPlan] = useState<'annual' | 'monthly'>('annual');
  const [trialEnabled, setTrialEnabled] = useState(true);

  const q = QUIZ_QUESTIONS[step];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPct = ((step + (selected !== null ? 1 : 0)) / totalQuestions) * 100;

  // Next step in quiz
  const handleNext = () => {
    if (selected === null) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);

    // Apply companion if selected on the last question
    if (q.id === 'companion') {
      const opt = q.options[selected];
      if (opt.companionId) {
        const found = COMPANION_PRESETS.find((c) => c.id === opt.companionId);
        if (found) setCompanion(found);
      }
    }

    setSelected(null);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
    } else {
      // Transition to loading phase
      setPhase('loading');
    }
  };

  // Loading effect
  useEffect(() => {
    if (phase !== 'loading') return;

    const messages = [
      'Analyzing your study profile & habits...',
      'Mapping improvement goals to daily quests...',
      'Calibrating your AI companion voice...',
      'Generating your personalized roadmap...',
    ];

    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setPhase('preview'), 400);
          return 100;
        }
        return prev + 3;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % messages.length);
    }, 700);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [phase]);

  const handleFinish = () => {
    try {
      localStorage.setItem('uplevel_phase2_onboarding_complete', 'true');
    } catch {
      // ignore storage error
    }
    onComplete();
  };

  // --------------------------------------------------------------------------
  // Phase 1: Loading Screen
  // --------------------------------------------------------------------------
  if (phase === 'loading') {
    const loadingMessages = [
      'Analyzing your study profile & habits...',
      'Mapping improvement goals to daily quests...',
      'Calibrating your AI companion...',
      'Generating your personalized roadmap...',
    ];

    return (
      <div className="app-frame flex min-h-screen flex-col items-center justify-center px-8 text-center bg-beige">
        <div className="relative mb-6">
          <div className="absolute inset-0 -m-3 animate-auraPulse rounded-full border-2 border-saddle/30" />
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-saddle text-white shadow-warm">
            <Sparkles size={36} className="text-white" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-coffee mb-2">Building your personalized plan...</h1>
        <p className="text-xs text-coffee-muted max-w-[270px] mb-6 min-h-[32px] transition-all">
          {loadingMessages[loadingMsgIdx]}
        </p>

        {/* Animated Progress Bar */}
        <div className="h-2 w-60 overflow-hidden rounded-full bg-sand/40 border border-edge">
          <div
            className="h-full rounded-full bg-saddle transition-all duration-150 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-saddle">
          <Loader2 size={16} className="animate-spin text-saddle" />
          <span>{loadingProgress}% Complete</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Phase 2: Results & Preview Screen
  // --------------------------------------------------------------------------
  if (phase === 'preview') {
    const goalAnswer = QUIZ_QUESTIONS[0].options[answers[0] ?? 0]?.label ?? 'Academic Mastery';
    const habitAnswer = QUIZ_QUESTIONS[1].options[answers[1] ?? 0]?.label ?? 'Steady';
    const improveAnswer = QUIZ_QUESTIONS[2].options[answers[2] ?? 0]?.label ?? 'Confidence & Mindset';
    const userTypeAnswer = QUIZ_QUESTIONS[3].options[answers[3] ?? 0]?.label ?? 'College Student';
    const companionAnswer = QUIZ_QUESTIONS[4].options[answers[4] ?? 0]?.label ?? 'Aiko';

    return (
      <div className="app-frame flex min-h-screen flex-col px-5 pb-6 pt-6 bg-beige">
        {/* Top Header Badge */}
        <div className="flex flex-1 flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-saddle text-white shadow-warm">
            <Sparkles size={30} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-saddle px-2.5 py-0.5 rounded-full bg-sand/40 border border-edge2 mb-2">
            Plan Ready
          </span>

          <h1 className="text-2xl font-bold text-coffee mb-1">Your Personal Plan is Built</h1>
          <p className="text-xs text-coffee-muted max-w-[290px] mb-5">
            Crafted for a <span className="font-semibold text-coffee">{userTypeAnswer}</span> aiming for{' '}
            <span className="font-semibold text-coffee">{goalAnswer}</span>.
          </p>

          {/* Plan Highlights */}
          <div className="w-full space-y-2.5 text-left mb-6">
            <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/30 text-saddle">
                <Target size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-coffee">Core Focus Target</p>
                <p className="text-[11px] text-coffee-muted">{improveAnswer}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/30 text-saddle">
                <Bot size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-coffee">Personal AI Coach</p>
                <p className="text-[11px] text-coffee-muted">{companionAnswer}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/30 text-saddle">
                <Timer size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-coffee">Zen Mode Focus Chamber</p>
                <p className="text-[11px] text-coffee-muted">Distraction-free 25m Pomodoro with XP rewards</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl border border-edge bg-surface shadow-xs flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/30 text-saddle">
                <Wallet size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-coffee">Pocket UPI Budget & Timetable</p>
                <p className="text-[11px] text-coffee-muted">Auto-budgeting, expense logging & smart schedule</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setPhase('paywall')}
          className="w-full py-4 rounded-2xl bg-saddle hover:bg-saddle-hover text-white text-sm font-bold shadow-warm flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          View Full Plan & Unlock Pro <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Phase 3: Paywall Screen
  // --------------------------------------------------------------------------
  if (phase === 'paywall') {
    return (
      <div className="app-frame flex min-h-screen flex-col px-5 pb-6 pt-5 bg-beige overflow-y-auto">
        <div className="text-center mb-4">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-sand/40 border border-edge2 items-center justify-center text-saddle mb-2 shadow-xs">
            <Star size={24} />
          </div>
          <h1 className="text-xl font-bold text-coffee">Start Your 7-Day Free Trial</h1>
          <p className="text-xs text-coffee-muted mt-0.5">
            Unlock your full academic and self-improvement companion.
          </p>
        </div>

        {/* Benefits List */}
        <div className="p-3.5 rounded-2xl border border-edge bg-surface shadow-xs space-y-2.5 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-saddle px-1">
            Everything Included:
          </p>
          {[
            'Personalized Gemini AI Companion with unlimited mentoring',
            'Immersive Zen Mode Focus Chamber with ambient XP',
            'Targeted quest trees: Confidence, Social Skills & Fitness',
            'Smart weekly timetable auto-planning',
            'UPI Expense tracking & monthly budget forecast',
            'Campus study circle leaderboard & peer challenges',
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-coffee">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sand/40 text-saddle mt-0.5">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="leading-tight">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Free Trial Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl border border-edge bg-sand/20 mb-4 shadow-xs">
          <div>
            <p className="text-xs font-bold text-coffee">Enable 7-Day Free Trial</p>
            <p className="text-[10px] text-coffee-muted">₹0 charged today. Cancel anytime.</p>
          </div>
          <button
            onClick={() => setTrialEnabled(!trialEnabled)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
              trialEnabled ? 'bg-saddle' : 'bg-edge'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                trialEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Pricing Option Cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {/* Annual Plan */}
          <div
            onClick={() => setPricingPlan('annual')}
            className={`relative p-3 rounded-2xl border-2 transition-all cursor-pointer text-left select-none ${
              pricingPlan === 'annual'
                ? 'border-saddle bg-saddle/10 shadow-warm'
                : 'border-edge bg-surface hover:border-edge2'
            }`}
          >
            <span className="absolute -top-2 right-2 text-[8px] font-bold uppercase tracking-wider bg-saddle text-white px-2 py-0.5 rounded-full shadow-xs">
              Save 33%
            </span>
            <p className="text-[11px] font-bold text-coffee mb-0.5">Annual Plan</p>
            <p className="text-base font-extrabold text-saddle">
              ₹199<span className="text-[10px] font-normal text-coffee-muted">/mo</span>
            </p>
            <p className="text-[9px] text-coffee-muted mt-0.5">Billed ₹2,388/year after trial</p>
          </div>

          {/* Monthly Plan */}
          <div
            onClick={() => setPricingPlan('monthly')}
            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left select-none ${
              pricingPlan === 'monthly'
                ? 'border-saddle bg-saddle/10 shadow-warm'
                : 'border-edge bg-surface hover:border-edge2'
            }`}
          >
            <p className="text-[11px] font-bold text-coffee mb-0.5">Monthly Plan</p>
            <p className="text-base font-extrabold text-saddle">
              ₹299<span className="text-[10px] font-normal text-coffee-muted">/mo</span>
            </p>
            <p className="text-[9px] text-coffee-muted mt-0.5">Billed monthly, cancel anytime</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2 mt-auto pt-2">
          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-saddle hover:bg-saddle-hover text-white text-sm font-bold shadow-warm flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Sparkles size={16} />
            {trialEnabled ? 'Start 7-Day Free Trial' : 'Start UpLevel Pro'}
          </button>

          <button
            onClick={handleFinish}
            className="w-full py-2 text-center text-xs text-coffee-muted hover:text-coffee font-medium transition"
          >
            Maybe later — continue with free version
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Phase 0: Multi-Step Quiz (1 question per screen)
  // --------------------------------------------------------------------------
  return (
    <div className="app-frame flex min-h-screen flex-col px-5 pb-6 pt-5 bg-beige">
      {/* Thin Progress Bar at Top */}
      <div className="mb-5">
        <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-sand/30 border border-edge">
          <div
            className="h-full rounded-full bg-saddle transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-coffee-muted font-semibold">
          <span>Question {step + 1} of {totalQuestions}</span>
          <span className="text-saddle uppercase tracking-wider text-[10px]">{q.category}</span>
        </div>
      </div>

      {/* Question Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-coffee leading-snug">{q.question}</h1>
        <p className="text-xs text-coffee-muted mt-1">{q.subtitle}</p>
      </div>

      {/* Large Tappable Cards with Highlighted State */}
      <div className="flex-1 space-y-3">
        {q.options.map((opt, i) => {
          const Icon = opt.icon;
          const isSelected = selected === i;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
                isSelected
                  ? 'border-saddle bg-saddle/10 shadow-warm ring-1 ring-saddle'
                  : 'border-edge bg-surface hover:border-edge2 shadow-xs'
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                  isSelected ? 'bg-saddle text-white' : 'bg-sand/30 text-saddle'
                }`}
              >
                <Icon size={22} />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-bold text-coffee">{opt.label}</span>
                <span className="block text-xs text-coffee-muted mt-0.5">{opt.desc}</span>
              </span>

              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                  isSelected ? 'border-saddle bg-saddle text-white' : 'border-edge text-transparent'
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Large Continue Button at the Bottom */}
      <button
        onClick={handleNext}
        disabled={selected === null}
        className={`w-full py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 mt-4 ${
          selected === null
            ? 'bg-edge/80 text-coffee-muted cursor-not-allowed opacity-60'
            : 'bg-saddle hover:bg-saddle-hover text-white shadow-warm active:scale-[0.98]'
        }`}
      >
        Continue <ChevronRight size={18} />
      </button>
    </div>
  );
};
