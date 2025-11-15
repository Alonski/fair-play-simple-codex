import { useStore } from 'zustand';
import type { CardStoreState } from '@/stores/cardStore';
import { useCardStoreBase } from '@/stores/cardStore';

const identitySelector = (state: CardStoreState) => state;

export function useCardStore(): CardStoreState;
export function useCardStore<T>(selector: (state: CardStoreState) => T): T;
export function useCardStore<T>(selector?: (state: CardStoreState) => T) {
  const stableSelector = (selector ?? identitySelector) as (state: CardStoreState) => T;
  return useStore(useCardStoreBase, stableSelector);
}
