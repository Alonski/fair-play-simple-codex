import { useTranslation } from 'react-i18next';
import { CardGrid, ActionCard, InfoCard } from '../cards';
import { GameControls } from './GameControls';
import { GameHistory } from './GameHistory';
import { useGameStore } from '@/hooks/useGameStore';
import { formatScore } from '@/utils/formatters';

export function GameShell() {
  const { t } = useTranslation();
  const level = useGameStore((state) => state.level);
  const score = useGameStore((state) => state.score);
  const streak = useGameStore((state) => state.streak);

  return (
    <section className="flex flex-col gap-6">
      <CardGrid>
        <ActionCard title={t('game.progressTitle')} action={<GameControls />}>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{t('game.level')}</dt>
              <dd className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{level}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{t('game.score')}</dt>
              <dd className="font-display text-2xl font-semibold text-primary-600 dark:text-primary-400">{formatScore(score)}</dd>
            </div>
          </dl>
        </ActionCard>
        <InfoCard headline={t('game.streakTitle')}>
          <p>
            {t('game.streakDescription', {
              count: streak,
            })}
          </p>
        </InfoCard>
      </CardGrid>
      <GameHistory />
    </section>
  );
}
