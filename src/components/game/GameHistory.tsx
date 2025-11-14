import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadRecentSessions, type SessionRecord } from '@/services/db';
import { formatDate, formatScore } from '@/utils/formatters';

export function GameHistory() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    let cancelled = false;

    loadRecentSessions(5).then((result) => {
      if (!cancelled) {
        setSessions(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (sessions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white/50 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
      <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">{t('game.historyTitle')}</h2>
      <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
        {sessions.map((session) => (
          <li key={session.id} className="flex items-center justify-between gap-4">
            <span>{formatDate(session.createdAt)}</span>
            <span className="font-medium text-primary-600 dark:text-primary-400">
              {t('game.historyScore', { score: formatScore(session.score), level: session.level })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
