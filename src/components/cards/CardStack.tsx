import type { CSSProperties, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FairPlayCard } from './Card';
import type { Card } from '@/stores/cardStore';
import styles from './CardAnimations.module.css';

interface CardStackProps {
  title: ReactNode;
  subtitle?: ReactNode;
  cards: Card[];
  accent?: string;
  pattern?: string;
  emptyMessage: ReactNode;
  renderContext?: (card: Card) => ReactNode;
  renderActions?: (card: Card) => ReactNode;
}

type StackItemStyle = CSSProperties & {
  '--stack-index'?: number;
};

export function CardStack({
  title,
  subtitle,
  cards,
  accent,
  pattern,
  emptyMessage,
  renderContext,
  renderActions,
}: CardStackProps) {
  return (
    <div className={styles.stack}>
      <header className="flex items-baseline justify-between gap-3">
        <div className="flex flex-col">
          <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-50">{title}</h3>
          {subtitle ? (
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{subtitle}</span>
          ) : null}
        </div>
        <span
          className="rounded-full border border-neutral-300 bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-600 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200"
          style={{ borderColor: accent ?? undefined }}
        >
          {cards.length}
        </span>
      </header>
      {cards.length === 0 ? (
        <div className={styles.emptyState}>{emptyMessage}</div>
      ) : (
        <ul className={styles.stackList}>
          <AnimatePresence initial={false}>
            {cards.map((card, index) => (
              <motion.li
                key={card.id}
                layout
                layoutId={`stack-item-${card.id}`}
                className={styles.stackItem}
                style={{ '--stack-index': cards.length - index - 1 } as StackItemStyle}
              >
                <FairPlayCard
                  card={card}
                  accent={accent}
                  pattern={pattern}
                  layoutId={`card-${card.id}`}
                  context={renderContext ? renderContext(card) : undefined}
                >
                  {renderActions ? renderActions(card) : null}
                </FairPlayCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
