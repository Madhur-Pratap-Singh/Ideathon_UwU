import { AIPersonality } from '../types';

export interface VoiceSettings {
  rate: number;
  pitch: number;
}

export const PERSONALITY_VOICE_CONFIGS: Record<AIPersonality, VoiceSettings> = {
  hype: {
    rate: 1.15,
    pitch: 1.2,
  },
  strict: {
    rate: 1.0,
    pitch: 0.95,
  },
  calm: {
    rate: 0.88,
    pitch: 1.0,
  },
};

class CompanionSpeechService {
  private isSpeakingState: boolean = false;
  private onStateChangeCallback: ((speaking: boolean) => void) | null = null;

  public registerStateCallback(cb: (speaking: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeakingState = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public speak(
    text: string,
    personality: AIPersonality = 'hype',
    enabled: boolean = true
  ) {
    if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (!text || text.trim() === '') return;

    // Always cancel active speech first to prevent overlapping audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const config = PERSONALITY_VOICE_CONFIGS[personality] || PERSONALITY_VOICE_CONFIGS.hype;

    utterance.rate = config.rate;
    utterance.pitch = config.pitch;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    utterance.onerror = () => {
      this.isSpeakingState = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeakingState = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }
}

export const companionSpeech = new CompanionSpeechService();
