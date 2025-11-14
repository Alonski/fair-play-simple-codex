import { useStore } from 'zustand';
import type { GameState } from '@/stores/gameStore';
import { useGameStoreBase } from '@/stores/gameStore';

const identitySelector = (state: GameState) => state;

export function useGameStore(): GameState;
export function useGameStore<T>(selector: (state: GameState) => T): T;
export function useGameStore<T>(selector?: (state: GameState) => T) {
  const stableSelector = (selector ?? identitySelector) as (state: GameState) => T;
  return useStore(useGameStoreBase, stableSelector);
}
