import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useGameStore } from '@/hooks/useGameStore';
import { logSession } from '@/services/db';
import { logError } from '@/utils/logger';

export function GameControls() {
  const { t } = useTranslation();
  const { incrementScore, reset, score, level } = useGameStore((state) => ({
    incrementScore: state.incrementScore,
    reset: state.reset,
    score: state.score,
    level: state.level,
  }));

  const handleStart = useCallback(() => {
    incrementScore(10);
  }, [incrementScore]);

  const handleReset = useCallback(async () => {
    if (score > 0) {
      try {
        await logSession({ score, level });
      } catch (error) {
        logError('Failed to persist session', error);
      }
    }

    reset();
  }, [level, reset, score]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        className="rounded-full bg-primary-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
      >
        {t('actions.start')}
      </motion.button>
      <motion.button
        type="button"
        className="rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100 dark:focus-visible:ring-offset-neutral-900"
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
      >
        {t('actions.reset')}
      </motion.button>
    </div>
  );
}
