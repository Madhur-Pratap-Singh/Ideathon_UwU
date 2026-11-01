import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Send,
  Trash2,
  X,
  Zap,
  Bot,
  Shield,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanionAvatar } from './CompanionAvatar';
import { AIPersonality, AIEmotion, ChatMessage } from '../types';
import { companionSpeech } from '../lib/companionSpeech';
import {
  loadCompanionMemory,
  saveCompanionMemory,
  clearStoredMemory,
} from '../lib/companionMemory';
import {
  buildLiveStudentContext,
  fetchAICompanionResponse,
  checkGeminiStatus,
} from '../lib/aiCompanionService';
import { getRankDetails } from '../lib/rankEngine';

export const CompanionHub: React.FC = () => {
  const {
    progress,
    tasks,
    setCompanion,
    openFocusChamber,
    isCompanionHubOpen,
    closeCompanionHub,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(loadCompanionMemory);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeEmotion, setActiveEmotion] = useState<AIEmotion>('idle');
  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; model: string }>({
    configured: false,
    model: 'offline',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    companionSpeech.registerStateCallback((speaking) => {
      setIsSpeaking(speaking);
      if (speaking) {
        setActiveEmotion('speaking');
      } else {
        setActiveEmotion('idle');
      }
    });

    checkGeminiStatus().then(setGeminiStatus);
  }, []);

  useEffect(() => {
    saveCompanionMemory(messages);
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMsg: ChatMessage = {
        id: 'initial-welcome',
        role: 'companion',
        content: progress.companion.voiceLine,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: 'encouraging',
        suggestedAction: {
          label: 'Start 25m Focus Session',
          type: 'focus_session',
        },
      };
      setMessages([initialMsg]);
    }
  }, [progress.companion]);

  if (!isCompanionHubOpen) return null;

  const rank = getRankDetails(progress.level);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isThinking) return;

    setInputText('');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setActiveEmotion('thinking');

    const context = buildLiveStudentContext(
      progress,
      rank.tier,
      tasks.find((t) => !t.completed),
      25,
      undefined,
      'user_message',
      text,
      [...messages, userMsg]
    );

    const aiResponse = await fetchAICompanionResponse(context);

    setIsThinking(false);
    setActiveEmotion(aiResponse.emotion || 'encouraging');

    const companionMsg: ChatMessage = {
      id: `companion-${Date.now()}`,
      role: 'companion',
      content: aiResponse.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: aiResponse.emotion,
      suggestedAction: aiResponse.suggestedAction,
      isFallback: aiResponse.isFallback,
    };

    setMessages((prev) => [...prev, companionMsg]);

    if (progress.companion.autoSpeak && aiResponse.shouldSpeak) {
      companionSpeech.speak(aiResponse.message, progress.companion.personality, true);
    }
  };

  const handleSelectPersonality = (p: AIPersonality) => {
    const updated = {
      ...progress.companion,
      personality: p,
    };
    setCompanion(updated);

    const ackText =
      p === 'strict'
        ? 'Strict Mentor mode engaged. Execution over excuses. What are we studying next?'
        : p === 'calm'
        ? 'Calm Guide mode active. Take a steady breath. We will take this step by step.'
        : 'Hype mode unlocked! Great momentum ahead! Let’s crush our study goals!';

    const msg: ChatMessage = {
      id: `personality-switch-${Date.now()}`,
      role: 'companion',
      content: ackText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: 'encouraging',
    };
    setMessages((prev) => [...prev, msg]);

    if (progress.companion.autoSpeak) {
      companionSpeech.speak(ackText, p, true);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation memory with your companion?')) {
      clearStoredMemory();
      setMessages([]);
      companionSpeech.stop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-coffee/50 backdrop-blur-xs animate-fadeIn">
      {/* Drawer */}
      <div className="relative w-full max-w-[430px] h-full bg-beige border-l border-edge flex flex-col justify-between shadow-xl animate-slideInRight">
        {/* Top Header */}
        <div className="p-3.5 border-b border-edge flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <CompanionAvatar
                id={progress.companion.id}
                glow={progress.companion.glowColor}
                size={38}
                floating={false}
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${
                  isSpeaking
                    ? 'bg-saddle animate-ping'
                    : isThinking
                    ? 'bg-olive animate-pulse'
                    : 'bg-saddle'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-coffee">{progress.companion.name}</h3>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border ${
                    geminiStatus.configured
                      ? 'border-saddle/40 bg-saddle/10 text-saddle'
                      : 'border-olive/30 bg-sand/30 text-coffee'
                  }`}
                >
                  {geminiStatus.configured ? 'Gemini Flash' : 'Offline AI'}
                </span>
              </div>
              <p className="text-[10px] text-coffee-muted capitalize">
                {progress.companion.personality} • {progress.companion.archetype}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (isSpeaking) {
                  companionSpeech.stop();
                } else if (messages.length > 0) {
                  const lastCompanion = [...messages].reverse().find((m) => m.role === 'companion');
                  if (lastCompanion) {
                    companionSpeech.speak(lastCompanion.content, progress.companion.personality, true);
                  }
                }
              }}
              title={isSpeaking ? 'Stop speaking' : 'Speak latest message'}
              className="p-1.5 rounded-xl border border-edge bg-surface2 text-coffee hover:bg-sand/30 transition"
            >
              {isSpeaking ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} />}
            </button>

            <button
              onClick={handleClearChat}
              title="Clear memory"
              className="p-1.5 rounded-xl border border-edge bg-surface2 text-coffee-muted hover:text-red-500 transition"
            >
              <Trash2 size={14} />
            </button>

            <button
              onClick={closeCompanionHub}
              title="Close drawer"
              className="p-1.5 rounded-xl border border-edge bg-surface2 text-coffee hover:bg-sand/30 transition"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Personality Switcher Banner */}
        <div className="px-3.5 py-1.5 bg-sand/20 border-b border-edge flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-semibold text-coffee-muted uppercase">Mode:</span>
          <div className="flex gap-1">
            {(
              [
                { id: 'hype' as AIPersonality, label: 'Hype', icon: Zap },
                { id: 'strict' as AIPersonality, label: 'Strict', icon: Shield },
                { id: 'calm' as AIPersonality, label: 'Calm', icon: Heart },
              ] as const
            ).map((p) => {
              const active = progress.companion.personality === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPersonality(p.id)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition ${
                    active
                      ? 'bg-saddle text-white shadow-xs'
                      : 'text-coffee-muted hover:text-coffee bg-surface border border-edge'
                  }`}
                >
                  <Icon size={11} />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation Message Feed */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-saddle text-white rounded-br-none'
                    : 'bg-surface text-coffee border border-edge rounded-bl-none'
                }`}
              >
                {msg.content}

                {msg.suggestedAction && (
                  <button
                    onClick={() => {
                      closeCompanionHub();
                      openFocusChamber();
                    }}
                    className="mt-2 w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-sand/25 hover:bg-sand/40 text-[10px] font-semibold text-saddle border border-edge transition group"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition" />
                  </button>
                )}
              </div>

              <span className="text-[9px] text-coffee-muted mt-0.5 px-1">
                {msg.timestamp} {msg.isFallback && '• Local AI'}
              </span>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-surface border border-edge text-xs text-coffee-muted w-fit animate-pulse">
              <Bot size={13} className="text-saddle animate-spin" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts & Text Input */}
        <div className="p-3 border-t border-edge bg-surface space-y-2">
          <div className="flex gap-1 overflow-x-auto scrollbar-thin pb-0.5">
            {[
              'What should I study next?',
              'Help me stay focused today',
              'Give me a quick productivity tip',
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="shrink-0 px-2 py-0.5 rounded-lg bg-surface2 border border-edge text-[10px] font-medium text-coffee-muted hover:text-coffee transition whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="text"
              placeholder={`Ask ${progress.companion.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-edge bg-surface2 text-xs text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="p-2 rounded-xl bg-saddle hover:bg-saddle-hover disabled:opacity-40 text-white shadow-xs transition"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
