import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCardStore } from '@/hooks';
import { selectCardsByHolder, selectDeckStats } from '@/stores/cardStore';

const formatDuration = (minutes: number, t: (key: string, options?: Record<string, unknown>) => string) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  if (hours > 0) {
    return t('board.timeEstimateHours', { hours, minutes: restMinutes });
  }
  return t('board.timeEstimate', { minutes: restMinutes });
};

export function DealInterface() {
  const { t } = useTranslation();
  const shuffleDeck = useCardStore((state) => state.shuffleDeck);
  const dealEvenly = useCardStore((state) => state.dealEvenly);
  const deckStats = useCardStore(selectDeckStats);
  const unassignedCards = useCardStore(selectCardsByHolder(null));

  const unassignedMinutes = useMemo(
    () => unassignedCards.reduce((sum, card) => sum + card.metadata.timeEstimate, 0),
    [unassignedCards],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
        <span>{t('board.deckStatus', { total: deckStats.total })}</span>
        <span className="rounded-full bg-neutral-900 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.26em] text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900">
          {t('board.unassignedCount', { count: unassignedCards.length })}
        </span>
        <span className="rounded-full bg-neutral-200/80 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.26em] text-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-200">
          {formatDuration(unassignedMinutes, t)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <motion.button
          type="button"
          className="rounded-full border border-neutral-300 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:focus-visible:ring-offset-neutral-900"
          whileTap={{ scale: 0.95 }}
          onClick={shuffleDeck}
        >
          {t('board.shuffleDeck')}
        </motion.button>
        <motion.button
          type="button"
          className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-lg shadow-neutral-900/40 transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-neutral-900"
          whileTap={{ scale: 0.95 }}
          onClick={dealEvenly}
        >
          {t('board.dealEvenly')}
        </motion.button>
      </div>
    </div>
  );
}
