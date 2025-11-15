import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PartnerId = 'partnerA' | 'partnerB';
export type Category = 'daily-grind' | 'kids' | 'home' | 'magic' | 'wild' | 'custom';
export type CardStatus = 'unassigned' | 'held' | 'in-negotiation' | 'shared' | 'paused';
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'occasional';

export interface LocalizedText {
  en: string;
  he: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface CardHistoryEvent {
  id: string;
  timestamp: string;
  action: 'created' | 'assigned' | 'unassigned' | 'status-changed';
  from?: PartnerId | null;
  to?: PartnerId | null;
  status?: CardStatus;
  note?: string;
}

export interface CardMetadata {
  createdAt: string;
  modifiedAt: string;
  isCustom: boolean;
  isActive: boolean;
  tags: string[];
  difficulty: 1 | 2 | 3;
  frequency: Frequency;
  timeEstimate: number;
}

export interface Card {
  id: string;
  category: Category;
  title: LocalizedText;
  description: LocalizedText;
  details: LocalizedText;
  holder: PartnerId | null;
  status: CardStatus;
  customFields?: CustomField[];
  metadata: CardMetadata;
  history: CardHistoryEvent[];
}

export interface PartnerProfile {
  id: PartnerId;
  name: string;
  avatar: {
    emoji: string;
    description: string;
  };
  preferences: {
    favoriteCards: string[];
    avoidCards: string[];
    strongSuits: Category[];
    availability: string;
  };
  theme: {
    color: string;
    accent: string;
    gradient: string;
    pattern: string;
    icon: string;
  };
}

type CardDictionary = Record<string, Card>;

type CardStorePersistedState = {
  cards: CardDictionary;
  order: string[];
  partners: Record<PartnerId, PartnerProfile>;
};

export interface CardStoreState extends CardStorePersistedState {
  assignCard: (id: string, partner: PartnerId) => void;
  releaseCard: (id: string) => void;
  setCardStatus: (id: string, status: CardStatus) => void;
  shuffleDeck: () => void;
  dealEvenly: () => void;
}

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => void 0,
  removeItem: () => void 0,
  clear: () => void 0,
  key: () => null,
  length: 0,
};

const storage = createJSONStorage<CardStorePersistedState>(() => {
  if (typeof window === 'undefined') {
    return memoryStorage;
  }

  return window.localStorage;
});

const historyId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const now = () => new Date().toISOString();

const localized = (en: string, he: string): LocalizedText => ({ en, he });

const baseCards: Card[] = [
  {
    id: 'card-morning-routine',
    category: 'daily-grind',
    title: localized('Morning reset', 'התארגנות בוקר'),
    description: localized('Prepare kids and home for the day with calm structure.', 'ארגון הבוקר בבית ובילדים בשלווה.'),
    details: localized(
      'Includes wake-up calls, breakfast prep, bags, and quick tidy. Track energy to avoid burnout.',
      'כולל השכמה, הכנת ארוחות בוקר, תיקי בית ספר וסידור מהיר של הבית.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: false,
      isActive: true,
      tags: ['routine', 'morning'],
      difficulty: 2,
      frequency: 'daily',
      timeEstimate: 90,
    },
    history: [],
  },
  {
    id: 'card-weekly-meal-plan',
    category: 'home',
    title: localized('Weekly meal planning', 'תכנון ארוחות שבועי'),
    description: localized('Plan meals, order groceries, and prep the pantry.', 'תכנון ארוחות, הזמנות מצרכים וסידור המצרכים.'),
    details: localized(
      'Review schedules, coordinate preferences, and document recipes for quick hand-off.',
      'בדיקת לוחות זמנים, התאמת טעמים ורישום מתכונים להחלפה קלה.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: false,
      isActive: true,
      tags: ['planning', 'food'],
      difficulty: 3,
      frequency: 'weekly',
      timeEstimate: 120,
    },
    history: [],
  },
  {
    id: 'card-bedtime-ritual',
    category: 'kids',
    title: localized('Bedtime ritual', 'טקס שינה'),
    description: localized('Guide the evening slowdown and tuck-ins.', 'הובלת הירגעות הערב והשכבת הילדים.'),
    details: localized(
      'Bath, pajamas, story, and lights-out with connection moments captured in notes.',
      'אמבטיה, פיג׳מה, סיפור ולילה טוב עם רגעי חיבור שנרשמים.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: false,
      isActive: true,
      tags: ['kids', 'evening'],
      difficulty: 2,
      frequency: 'daily',
      timeEstimate: 60,
    },
    history: [],
  },
  {
    id: 'card-house-systems',
    category: 'magic',
    title: localized('House systems audit', 'בדיקת מערכות הבית'),
    description: localized('Review subscriptions, warranties, and maintenance cadence.', 'בדיקת מנויים, אחריות ולוח זמנים לתחזוקה.'),
    details: localized(
      'Track renewals, capture follow-ups, and document upcoming needs for a quarterly sync.',
      'מעקב אחרי חידושים, משימות מעקב ותיעוד צרכים עתידיים לפגישה רבעונית.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: false,
      isActive: true,
      tags: ['systems', 'finance'],
      difficulty: 3,
      frequency: 'monthly',
      timeEstimate: 150,
    },
    history: [],
  },
  {
    id: 'card-surprise-magic',
    category: 'wild',
    title: localized('Surprise magic moment', 'מחווה קסומה'),
    description: localized('Craft an unexpected delight for the household.', 'יצירת הפתעה משמחת לבית.'),
    details: localized(
      'Could be handwritten notes, playlist drops, or spontaneous picnic — document what resonated.',
      'יכול להיות פתק אישי, פלייליסט חדש או פיקניק ספונטני – תעדו מה עבד.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: false,
      isActive: true,
      tags: ['connection'],
      difficulty: 1,
      frequency: 'monthly',
      timeEstimate: 45,
    },
    history: [],
  },
  {
    id: 'card-community-care',
    category: 'custom',
    title: localized('Community care run', 'סיוע קהילתי'),
    description: localized('Coordinate support drop-offs for friends or family.', 'תיאום עזרה ומשלוחים לחברים או למשפחה.'),
    details: localized(
      'Check community boards, align calendars, and organise transport logistics.',
      'בדיקת קבוצות קהילה, התאמת לוחות זמנים וארגון לוגיסטיקה.',
    ),
    holder: null,
    status: 'unassigned',
    metadata: {
      createdAt: now(),
      modifiedAt: now(),
      isCustom: true,
      isActive: true,
      tags: ['community', 'care'],
      difficulty: 2,
      frequency: 'occasional',
      timeEstimate: 110,
    },
    history: [],
  },
];

const initialPartners: Record<PartnerId, PartnerProfile> = {
  partnerA: {
    id: 'partnerA',
    name: 'Noa',
    avatar: { emoji: '🌿', description: 'Noa smiling with a cup of tea' },
    preferences: {
      favoriteCards: ['card-surprise-magic', 'card-community-care'],
      avoidCards: ['card-house-systems'],
      strongSuits: ['magic', 'wild'],
      availability: 'Early mornings, late evenings',
    },
    theme: {
      color: '#E63946',
      accent: '#F1C453',
      gradient: 'linear-gradient(135deg, rgba(230,57,70,0.95), rgba(241,196,83,0.65))',
      pattern:
        'radial-gradient(circle at 20% 20%, rgba(251,245,243,0.9) 0, rgba(251,245,243,0.2) 45%, transparent 70%), radial-gradient(circle at 80% 0%, rgba(6,174,213,0.2), transparent 55%)',
      icon: '🛠️',
    },
  },
  partnerB: {
    id: 'partnerB',
    name: 'Adi',
    avatar: { emoji: '🪴', description: 'Adi watering plants' },
    preferences: {
      favoriteCards: ['card-house-systems', 'card-weekly-meal-plan'],
      avoidCards: ['card-surprise-magic'],
      strongSuits: ['daily-grind', 'home'],
      availability: 'Midday focus blocks, weekends',
    },
    theme: {
      color: '#06AED5',
      accent: '#0A0908',
      gradient: 'linear-gradient(160deg, rgba(6,174,213,0.95), rgba(10,9,8,0.75))',
      pattern:
        'radial-gradient(circle at 10% 90%, rgba(230,57,70,0.18), transparent 60%), radial-gradient(circle at 80% 40%, rgba(241,196,83,0.22), transparent 65%)',
      icon: '⚡',
    },
  },
};

const cardsToDictionary = (cards: Card[]) =>
  cards.reduce<CardDictionary>((acc, card) => {
    const createdAt = card.metadata.createdAt;
    const modifiedAt = card.metadata.modifiedAt;
    const baseHistory: CardHistoryEvent[] =
      card.history.length > 0
        ? card.history
        : [
            {
              id: historyId(),
              timestamp: createdAt,
              action: 'created',
            },
          ];

    acc[card.id] = {
      ...card,
      metadata: { ...card.metadata, createdAt, modifiedAt },
      history: baseHistory,
    };
    return acc;
  }, {});

const initialCards = cardsToDictionary(baseCards);
const initialOrder = baseCards.map((card) => card.id);

const updateCard = (card: Card, updates: Partial<Card>) => {
  const modifiedAt = now();
  return {
    ...card,
    ...updates,
    metadata: {
      ...card.metadata,
      modifiedAt,
    },
  } satisfies Card;
};

const calculatePartnerLoad = (cards: CardDictionary, order: string[]) => {
  const load: Record<PartnerId, number> = { partnerA: 0, partnerB: 0 };
  for (const id of order) {
    const card = cards[id];
    if (card?.holder) {
      load[card.holder] += card.metadata.timeEstimate;
    }
  }
  return load;
};

const shuffleArray = <T,>(input: T[]): T[] => {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const useCardStoreBase = create<CardStoreState>()(
  persist(
    (set, _get) => ({
      cards: initialCards,
      order: initialOrder,
      partners: initialPartners,
      assignCard: (id, partner) =>
        set((state) => {
          const card = state.cards[id];
          if (!card) {
            return state;
          }

          const nextHistory: CardHistoryEvent = {
            id: historyId(),
            timestamp: now(),
            action: 'assigned',
            from: card.holder,
            to: partner,
          };

          return {
            ...state,
            cards: {
              ...state.cards,
              [id]: updateCard(card, {
                holder: partner,
                status: 'held',
                history: [...card.history, nextHistory],
              }),
            },
          };
        }),
      releaseCard: (id) =>
        set((state) => {
          const card = state.cards[id];
          if (!card) {
            return state;
          }

          const nextHistory: CardHistoryEvent = {
            id: historyId(),
            timestamp: now(),
            action: 'unassigned',
            from: card.holder,
            to: null,
          };

          return {
            ...state,
            cards: {
              ...state.cards,
              [id]: updateCard(card, {
                holder: null,
                status: 'unassigned',
                history: [...card.history, nextHistory],
              }),
            },
          };
        }),
      setCardStatus: (id, status) =>
        set((state) => {
          const card = state.cards[id];
          if (!card) {
            return state;
          }

          const nextHistory: CardHistoryEvent = {
            id: historyId(),
            timestamp: now(),
            action: 'status-changed',
            status,
          };

          return {
            ...state,
            cards: {
              ...state.cards,
              [id]: updateCard(card, {
                status,
                history: [...card.history, nextHistory],
              }),
            },
          };
        }),
      shuffleDeck: () =>
        set((state) => ({
          ...state,
          order: shuffleArray(state.order),
        })),
      dealEvenly: () =>
        set((state) => {
          const cards = { ...state.cards };
          const order = [...state.order];
          const load = calculatePartnerLoad(cards, order);

          for (const id of order) {
            const card = cards[id];
            if (!card || card.status !== 'unassigned' || !card.metadata.isActive) {
              continue;
            }

            const target = load.partnerA <= load.partnerB ? 'partnerA' : 'partnerB';
            load[target] += card.metadata.timeEstimate;
            const nextHistory: CardHistoryEvent = {
              id: historyId(),
              timestamp: now(),
              action: 'assigned',
              from: card.holder,
              to: target,
            };

            cards[id] = updateCard(card, {
              holder: target,
              status: 'held',
              history: [...card.history, nextHistory],
            });
          }

          return {
            ...state,
            cards,
          };
        }),
    }),
    {
      name: 'fair-play/card-store',
      version: 1,
      storage,
      partialize: ({ cards, order, partners }) => ({ cards, order, partners }),
    },
  ),
);

export const selectCardsByHolder = (holder: PartnerId | null) => (state: CardStoreState) =>
  state.order
    .map((id) => state.cards[id])
    .filter((card): card is Card => Boolean(card))
    .filter((card) => (holder === null ? card.holder === null : card.holder === holder));

export const selectDeckStats = (state: CardStoreState) => {
  const cards = state.order.map((id) => state.cards[id]).filter((card): card is Card => Boolean(card));
  const total = cards.length;
  const unassigned = cards.filter((card) => card.holder === null && card.status === 'unassigned').length;
  const paused = cards.filter((card) => card.status === 'paused').length;
  const assigned = cards.filter((card) => card.holder !== null && card.status === 'held').length;
  const timeEstimate = cards.reduce((sum, card) => sum + card.metadata.timeEstimate, 0);

  return {
    total,
    unassigned,
    paused,
    assigned,
    timeEstimate,
  };
};

export const selectPartnerProfile = (partnerId: PartnerId) => (state: CardStoreState) =>
  state.partners[partnerId];
