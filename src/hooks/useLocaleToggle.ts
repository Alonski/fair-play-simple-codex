import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/stores/settingsStore';

export function useLocaleToggle() {
  const { i18n } = useTranslation();
  const locale = useSettingsStore((state) => state.locale);
  const setLocale = useSettingsStore((state) => state.setLocale);
  const toggleLocale = useSettingsStore((state) => state.toggleLocale);

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  const handleToggle = useCallback(() => {
    toggleLocale();
  }, [toggleLocale]);

  return {
    locale,
    setLocale,
    toggleLocale: handleToggle,
  } as const;
}
