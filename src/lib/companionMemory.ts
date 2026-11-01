import { ChatMessage } from '../types';

const MEMORY_STORAGE_KEY = 'uplevel_companion_chat_memory';
const MAX_MEMORY_TURNS = 12;

export function loadCompanionMemory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCompanionMemory(messages: ChatMessage[]) {
  try {
    // Keep bounded history
    const bounded = messages.slice(-MAX_MEMORY_TURNS);
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(bounded));
  } catch (e) {
    console.error('Failed to save companion memory', e);
  }
}

export function clearStoredMemory() {
  try {
    localStorage.removeItem(MEMORY_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear companion memory', e);
  }
}
