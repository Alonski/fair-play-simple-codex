import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CardStack } from '../cards';
import { PartnerZone } from './PartnerZone';
import { useCardStore } from '@/hooks';
import { selectCardsByHolder } from '@/stores/cardStore';

const unassignedPattern =
  'radial-gradient(circle at 20% 20%, rgba(230,57,70,0.15), transparent 55%), radial-gradient(circle at 80% 0%, rgba(6,174,213,0.16), transparent 60%)';

export function GameBoard() {
  const { t } = useTranslation();
  const unassignedCards = useCardStore(selectCardsByHolder(null));
  const assignCard = useCardStore((state) => state.assignCard);
  const partners = useCardStore((state) => state.partners);

  const partnerEntries = useMemo(() => Object.values(partners), [partners]);

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-neutral-200/70 bg-[#fbf5f3]/70 p-6 shadow-[0_40px_120px_-80px_rgba(10,9,8,0.85)] backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-900/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(230,57,70,0.22),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(6,174,213,0.18),_transparent_60%)] opacity-80 mix-blend-multiply"></div>
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 rounded-[32px] border border-neutral-200/70 bg-white/65 p-5 shadow-sm shadow-neutral-900/5 dark:border-neutral-800/60 dark:bg-neutral-950/40">
          <header className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.38em] text-neutral-500 dark:text-neutral-400">
              {t('board.deck')}
            </span>
            <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {t('board.unassignedTitle')}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t('board.unassignedDescription')}</p>
          </header>
          <CardStack
            title={t('board.unassignedHeading')}
            subtitle={t('board.unassignedSubtitle', { count: unassignedCards.length })}
            cards={unassignedCards}
            accent="#F1C453"
            pattern={unassignedPattern}
            emptyMessage={t('board.emptyDeck')}
            renderActions={(card) => (
              <div className="flex flex-wrap gap-2">
                {partnerEntries.map((partner) => (
                  <motion.button
                    key={partner.id}
                    type="button"
                    className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-neutral-50 dark:focus-visible:ring-offset-neutral-900"
                    style={{
                      background: partner.theme.color,
                      color: '#fbf5f3',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => assignCard(card.id, partner.id)}
                  >
                    {t('board.assignTo', { name: partner.name })}
                  </motion.button>
                ))}
              </div>
            )}
          />
        </div>
        <PartnerZone partnerId="partnerA" />
        <PartnerZone partnerId="partnerB" />
      </div>
    </section>
  );
}
