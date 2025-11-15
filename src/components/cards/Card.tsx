import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Card } from '@/stores/cardStore';
import styles from './CardAnimations.module.css';

export interface FairPlayCardProps extends PropsWithChildren {
  card: Card;
  accent?: string;
  pattern?: string;
  layoutId?: string;
  context?: ReactNode;
  interactive?: boolean;
  onClick?: () => void;
}

type CardStyle = CSSProperties & {
  '--card-pattern'?: string;
};

const patternStyle = (pattern?: string): CardStyle => ({
  '--card-pattern': pattern,
});

export function FairPlayCard({
  card,
  accent,
  pattern,
  layoutId,
  context,
  interactive = false,
  onClick,
  children,
}: FairPlayCardProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('he') ? 'he' : 'en';
  const title = card.title[locale] ?? card.title.en;
  const description = card.description[locale] ?? card.description.en;

  const categoryLabel = t(`board.categories.${card.category}`);
  const frequencyLabel = t(`board.frequency.${card.metadata.frequency}`);
  const difficultyLabel = t(`board.difficulty.${card.metadata.difficulty}`);

  const statusLabel = useMemo(() => {
    if (card.status === 'paused') {
      return t('board.status.paused');
    }
    if (card.status === 'in-negotiation') {
      return t('board.status.negotiation');
    }
    if (card.status === 'shared') {
      return t('board.status.shared');
    }
    return null;
  }, [card.status, t]);

  const timeEstimateLabel = useMemo(() => {
    const hours = Math.floor(card.metadata.timeEstimate / 60);
    const minutes = card.metadata.timeEstimate % 60;
    if (hours > 0) {
      return t('board.timeEstimateHours', { hours, minutes });
    }
    return t('board.timeEstimate', { minutes });
  }, [card.metadata.timeEstimate, t]);

  return (
    <motion.article
      className={styles.card}
      layout
      layoutId={layoutId ?? card.id}
      whileHover={{ translateY: -6, rotate: -0.6 }}
      whileTap={{ scale: 0.98 }}
      style={{
        ...patternStyle(pattern),
        outline: accent ? `1.5px solid ${accent}` : undefined,
        outlineOffset: '-6px',
      }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
    >
      <div className={styles.cardContent}>
        <header className={styles.cardHeader}>
          <div className={styles.metaRow}>
            <span className={`${styles.badge} ${styles.badgeStrong}`}>{categoryLabel}</span>
            <span className={`${styles.badge} ${styles.badgeCool}`}>{frequencyLabel}</span>
            <span className={styles.badge}>{difficultyLabel}</span>
            {statusLabel ? <span className={`${styles.badge} ${styles.badgeStrong}`}>{statusLabel}</span> : null}
          </div>
          <h3 className={styles.cardHeadline}>{title}</h3>
        </header>
        <p className={styles.cardDescription}>{description}</p>
        {card.metadata.tags.length > 0 ? (
          <div className={styles.metaRow}>
            {card.metadata.tags.map((tag) => (
              <span key={tag} className={styles.badge}>
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        {context ? <div>{context}</div> : null}
        <footer className={styles.footer}>
          <span>
            {t('board.timeLabel')}
            <strong> {timeEstimateLabel}</strong>
          </span>
          <span>{t('board.difficultyLabel', { level: card.metadata.difficulty })}</span>
        </footer>
        {children ? <div className={styles.actionRow}>{children}</div> : null}
      </div>
    </motion.article>
  );
}
