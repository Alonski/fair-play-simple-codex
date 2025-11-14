import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export interface LayoutHeaderProps {
  onToggleLanguage: () => void;
  activeLocale: string;
}

const localeLabels: Record<string, string> = {
  en: 'עברית',
  he: 'English',
};

export function LayoutHeader({ onToggleLanguage, activeLocale }: LayoutHeaderProps) {
  const { t } = useTranslation();
  const targetLocale = useMemo(() => (activeLocale === 'en' ? 'he' : 'en'), [activeLocale]);

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex flex-col gap-1">
          <motion.span
            className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t('app.tagline')}
          </motion.span>
          <motion.h1
            className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-3xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {t('app.title')}
          </motion.h1>
        </div>
        <motion.button
          type="button"
          onClick={onToggleLanguage}
          className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-300 dark:focus-visible:ring-offset-neutral-900"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {t('actions.toggleLang', { lang: localeLabels[targetLocale] ?? targetLocale })}
        </motion.button>
      </div>
    </header>
  );
}
