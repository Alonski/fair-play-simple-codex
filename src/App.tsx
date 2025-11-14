import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { AppShell } from './components/layout';
import { GameShell } from './components/game';
import { useLocaleToggle, usePrefersReducedMotion } from './hooks';

function App() {
  const { t, i18n } = useTranslation();
  const { locale, toggleLocale } = useLocaleToggle();
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedMotion = useReducedMotion() || prefersReducedMotion;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = i18n.dir(locale);
    }
  }, [i18n, locale]);

  const introVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AppShell onToggleLanguage={toggleLocale} activeLocale={locale}>
      <section className="flex flex-col gap-4">
        <motion.p
          className="max-w-3xl text-lg text-neutral-600 dark:text-neutral-300"
          variants={introVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
        >
          {t('app.subtitle')}
        </motion.p>
      </section>
      <Suspense fallback={<p className="text-sm text-neutral-500">{t('actions.start')}...</p>}>
        <GameShell />
      </Suspense>
    </AppShell>
  );
}

export default App;
