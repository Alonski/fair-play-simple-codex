import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { CardGrid, ActionCard, InfoCard } from '../cards';
import { GameControls } from './GameControls';
import { GameHistory } from './GameHistory';
import { GameBoard } from './GameBoard';
import { DealInterface } from './DealInterface';
import { useGameStore } from '@/hooks/useGameStore';
import { useCardStore } from '@/hooks';
import { selectDeckStats, selectCardsByHolder } from '@/stores/cardStore';
import { formatScore } from '@/utils/formatters';

const formatDuration = (minutes: number, t: (key: string, options?: Record<string, unknown>) => string) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  if (hours > 0) {
    return t('board.timeEstimateHours', { hours, minutes: restMinutes });
  }
  return t('board.timeEstimate', { minutes: restMinutes });
};

export function GameShell() {
  const { t } = useTranslation();
  const level = useGameStore((state) => state.level);
  const score = useGameStore((state) => state.score);
  const streak = useGameStore((state) => state.streak);
  const deckStats = useCardStore(selectDeckStats);
  const partnerACards = useCardStore(selectCardsByHolder('partnerA'));
  const partnerBCards = useCardStore(selectCardsByHolder('partnerB'));
  const partners = useCardStore((state) => state.partners);

  const totalPartnerTime = useMemo(
    () => ({
      partnerA: partnerACards.reduce((sum, card) => sum + card.metadata.timeEstimate, 0),
      partnerB: partnerBCards.reduce((sum, card) => sum + card.metadata.timeEstimate, 0),
    }),
    [partnerACards, partnerBCards],
  );

  const partnerNames = useMemo(
    () => ({
      partnerA: partners.partnerA?.name ?? 'Partner A',
      partnerB: partners.partnerB?.name ?? 'Partner B',
    }),
    [partners.partnerA?.name, partners.partnerB?.name],
  );

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
        <ActionCard title={t('board.dealCardTitle')} action={<DealInterface />}>
          <p className="text-neutral-600 dark:text-neutral-300">
            {t('board.dealCardDescription')}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400">
            <div>
              <dt>{t('board.totalCards')}</dt>
              <dd className="font-display text-lg normal-case tracking-normal text-neutral-900 dark:text-neutral-100">
                {deckStats.total}
              </dd>
            </div>
            <div>
              <dt>{t('board.unassignedLabel')}</dt>
              <dd className="font-display text-lg normal-case tracking-normal text-neutral-900 dark:text-neutral-100">
                {deckStats.unassigned}
              </dd>
            </div>
            <div>
              <dt>{t('board.pausedLabel')}</dt>
              <dd className="font-display text-lg normal-case tracking-normal text-neutral-900 dark:text-neutral-100">
                {deckStats.paused}
              </dd>
            </div>
            <div>
              <dt>{t('board.totalTime')}</dt>
              <dd className="font-display text-lg normal-case tracking-normal text-neutral-900 dark:text-neutral-100">
                {formatDuration(deckStats.timeEstimate, t)}
              </dd>
            </div>
          </dl>
        </ActionCard>
        <InfoCard headline={t('game.streakTitle')}>
          <p className="text-neutral-600 dark:text-neutral-300">
            {t('game.streakDescription', {
              count: streak,
            })}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            <div>
              <dt className="text-xs uppercase tracking-[0.32em]">
                {t('board.partnerTime', { partner: partnerNames.partnerA })}
              </dt>
              <dd className="font-display text-lg text-neutral-900 dark:text-neutral-100">
                {formatDuration(totalPartnerTime.partnerA, t)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.32em]">
                {t('board.partnerTime', { partner: partnerNames.partnerB })}
              </dt>
              <dd className="font-display text-lg text-neutral-900 dark:text-neutral-100">
                {formatDuration(totalPartnerTime.partnerB, t)}
              </dd>
            </div>
          </dl>
        </InfoCard>
      </CardGrid>
      <GameBoard />
      <GameHistory />
    </section>
  );
}
