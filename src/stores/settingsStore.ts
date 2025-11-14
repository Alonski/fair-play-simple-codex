import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SupportedLocale = 'en' | 'he';

export interface SettingsState {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  toggleLocale: () => void;
}

type PersistedSettingsState = Pick<SettingsState, 'locale'>;

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => void 0,
  removeItem: () => void 0,
  clear: () => void 0,
  key: () => null,
  length: 0,
};

const storage = createJSONStorage<PersistedSettingsState>(() => {
  if (typeof window === 'undefined') {
    return memoryStorage;
  }

  return window.localStorage;
});

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === 'en' ? 'he' : 'en' }),
    }),
    {
      name: 'fair-play/settings',
      version: 1,
      storage,
      partialize: ({ locale }) => ({ locale }),
    },
  ),
);
