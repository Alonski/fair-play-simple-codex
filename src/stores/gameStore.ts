import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface GameState {
  level: number;
  score: number;
  streak: number;
  incrementScore: (value?: number) => void;
  reset: () => void;
}

const initialState = {
  level: 1,
  score: 0,
  streak: 0,
};

type PersistedGameState = Pick<GameState, 'level' | 'score' | 'streak'>;

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => void 0,
  removeItem: () => void 0,
  clear: () => void 0,
  key: () => null,
  length: 0,
};

const storage = createJSONStorage<PersistedGameState>(() => {
  if (typeof window === 'undefined') {
    return memoryStorage;
  }

  return window.localStorage;
});

export const useGameStoreBase = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      incrementScore: (value = 1) =>
        set((state) => {
          const score = state.score + value;
          const level = Math.max(1, Math.floor(score / 100) + 1);
          const streak = state.streak + 1;
          return { ...state, score, level, streak };
        }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'fair-play/game-store',
      version: 1,
      storage,
      partialize: ({ level, score, streak }) => ({ level, score, streak }),
    },
  ),
);
