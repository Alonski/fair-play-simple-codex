import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CardStack } from '../cards';
import { useCardStore } from '@/hooks';
import {
  selectCardsByHolder,
  selectPartnerProfile,
  type PartnerId,
  type Card,
} from '@/stores/cardStore';

interface PartnerZoneProps {
  partnerId: PartnerId;
}

const formatDuration = (minutes: number, t: (key: string, options?: Record<string, unknown>) => string) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  if (hours > 0) {
    return t('board.timeEstimateHours', { hours, minutes: restMinutes });
  }
  return t('board.timeEstimate', { minutes: restMinutes });
};

const overlaySvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="0.6"><path d="M0 20h120M0 60h120M0 100h120"/><path d="M20 0v120M60 0v120M100 0v120"/></g></svg>',
);

const gridOverlay = `url("data:image/svg+xml,${overlaySvg}")`;

export function PartnerZone({ partnerId }: PartnerZoneProps) {
  const { t } = useTranslation();
  const profile = useCardStore(selectPartnerProfile(partnerId));
  const cards = useCardStore(selectCardsByHolder(partnerId));
  const releaseCard = useCardStore((state) => state.releaseCard);
  const setCardStatus = useCardStore((state) => state.setCardStatus);

  const stats = useMemo(() => {
    const totalMinutes = cards.reduce((sum, card) => sum + card.metadata.timeEstimate, 0);
    const paused = cards.filter((card) => card.status === 'paused').length;
    return {
      totalMinutes,
      paused,
      active: cards.length - paused,
    };
  }, [cards]);

  const handlePauseToggle = (card: Card) => {
    const nextStatus = card.status === 'paused' ? 'held' : 'paused';
    setCardStatus(card.id, nextStatus);
  };

  return (
    <section
      className="relative flex flex-col gap-4 overflow-hidden rounded-[32px] border border-neutral-200/70 bg-white/70 p-5 text-neutral-900 shadow-sm shadow-neutral-900/10 transition dark:border-neutral-800/60 dark:bg-neutral-950/50 dark:text-neutral-50"
      style={{ backgroundImage: `${profile.theme.gradient}, ${profile.theme.pattern}` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{ backgroundImage: gridOverlay }}
      ></div>
      <div className="relative flex flex-col gap-4">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={profile.avatar.description}>
              {profile.avatar.emoji}
            </span>
            <div className="flex flex-col">
              <h3 className="font-display text-xl font-semibold tracking-tight">{profile.name}</h3>
              <span className="text-xs uppercase tracking-[0.32em] text-neutral-700/80 dark:text-neutral-200/80">
                {t('board.partnerIcon', { icon: profile.theme.icon })}
              </span>
            </div>
          </div>
          <div className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-600 shadow-sm backdrop-blur dark:border-neutral-700/50 dark:bg-neutral-900/70 dark:text-neutral-200">
            {t('board.cardsAssigned', { count: cards.length })}
          </div>
        </header>
        <dl className="grid grid-cols-2 gap-3 text-sm text-neutral-800/90 dark:text-neutral-200/90">
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-neutral-700/70 dark:text-neutral-300/70">
              {t('board.totalTime')}
            </dt>
            <dd className="font-display text-lg font-semibold">
              {formatDuration(stats.totalMinutes, t)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-neutral-700/70 dark:text-neutral-300/70">
              {t('board.pausedLabel')}
            </dt>
            <dd className="font-display text-lg font-semibold">{stats.paused}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700/75 dark:text-neutral-100/75">
          {profile.preferences.strongSuits.map((category) => (
            <span key={category} className="rounded-full bg-white/60 px-3 py-1 shadow-sm backdrop-blur dark:bg-neutral-900/60">
              {t(`board.categories.${category}`)}
            </span>
          ))}
        </div>
        <CardStack
          title={t('board.partnerStackTitle', { name: profile.name })}
          subtitle={t('board.partnerStackSubtitle', { active: stats.active, paused: stats.paused })}
          cards={cards}
          accent={profile.theme.accent}
          pattern={profile.theme.pattern}
          emptyMessage={t('board.emptyPartner', { name: profile.name })}
          renderActions={(card) => (
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:bg-neutral-900/70 dark:text-neutral-100 dark:hover:bg-neutral-900/80 dark:focus-visible:ring-offset-neutral-900"
                whileTap={{ scale: 0.95 }}
                onClick={() => releaseCard(card.id)}
              >
                {t('board.returnCard')}
              </motion.button>
              <motion.button
                type="button"
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
                style={{ background: profile.theme.color }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePauseToggle(card)}
              >
                {card.status === 'paused' ? t('board.resumeCard') : t('board.pauseCard')}
              </motion.button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
