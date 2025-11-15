import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  resetCardStore,
  selectCardsByHolder,
  selectDeckStats,
  selectPartnerProfile,
  useCardStoreBase,
} from './cardStore';

const getCard = (id: string) => useCardStoreBase.getState().cards[id]!;

describe('cardStore', () => {
  beforeEach(async () => {
    await resetCardStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with all cards unassigned', () => {
    const state = useCardStoreBase.getState();
    const unassigned = selectCardsByHolder(null)(state);

    expect(state.order).toHaveLength(unassigned.length);
    expect(unassigned.every((card) => card.holder === null)).toBe(true);
  });

  it('assigns and releases cards while recording history', () => {
    const { assignCard, releaseCard } = useCardStoreBase.getState();

    assignCard('card-morning-routine', 'partnerA');
    let card = getCard('card-morning-routine');

    expect(card.holder).toBe('partnerA');
    expect(card.status).toBe('held');
    expect(card.history.at(-1)?.action).toBe('assigned');

    releaseCard('card-morning-routine');
    card = getCard('card-morning-routine');

    expect(card.holder).toBeNull();
    expect(card.status).toBe('unassigned');
    expect(card.history.at(-1)?.action).toBe('unassigned');
  });

  it('updates card status and deck statistics', () => {
    const { assignCard, setCardStatus } = useCardStoreBase.getState();

    assignCard('card-weekly-meal-plan', 'partnerB');
    setCardStatus('card-weekly-meal-plan', 'paused');

    const card = getCard('card-weekly-meal-plan');
    const stats = selectDeckStats(useCardStoreBase.getState());

    expect(card.status).toBe('paused');
    expect(stats.paused).toBe(1);
    expect(stats.unassigned).toBe(stats.total - 1);
  });

  it('deals cards evenly across partners', () => {
    useCardStoreBase.getState().dealEvenly();

    const state = useCardStoreBase.getState();
    const partnerACards = selectCardsByHolder('partnerA')(state);
    const partnerBCards = selectCardsByHolder('partnerB')(state);

    expect(partnerACards.length + partnerBCards.length).toBe(state.order.length);
    expect(partnerACards.every((card) => card.status === 'held')).toBe(true);
    expect(partnerBCards.every((card) => card.status === 'held')).toBe(true);
  });

  it('shuffles the deck order while retaining all cards', () => {
    const store = useCardStoreBase.getState();
    const initialOrder = [...store.order];

    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.42);

    store.shuffleDeck();

    const shuffled = useCardStoreBase.getState().order;

    expect(shuffled).toHaveLength(initialOrder.length);
    expect(new Set(shuffled)).toEqual(new Set(initialOrder));
    expect(randomSpy).toHaveBeenCalled();
  });

  it('supports selecting partner profiles', () => {
    const profile = selectPartnerProfile('partnerA')(useCardStoreBase.getState());

    expect(profile).toMatchObject({
      id: 'partnerA',
      name: expect.any(String),
    });
  });

  it('resets store state without clearing persisted storage when requested', async () => {
    const clearSpy = vi.spyOn(useCardStoreBase.persist!, 'clearStorage');

    useCardStoreBase.getState().assignCard('card-morning-routine', 'partnerA');

    await resetCardStore({ clearStorage: false });

    expect(clearSpy).not.toHaveBeenCalled();
    expect(useCardStoreBase.getState().cards['card-morning-routine']?.holder).toBeNull();

    await resetCardStore();

    expect(clearSpy).toHaveBeenCalled();
  });
});
