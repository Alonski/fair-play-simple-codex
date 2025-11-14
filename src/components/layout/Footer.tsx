import { useTranslation } from 'react-i18next';

export function LayoutFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-neutral-200 bg-white/70 py-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="font-serif text-base text-neutral-700 dark:text-neutral-200">{t('app.subtitle')}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">{t('app.version')}</p>
      </div>
    </footer>
  );
}
