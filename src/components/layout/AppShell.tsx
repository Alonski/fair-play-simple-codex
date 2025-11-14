import type { PropsWithChildren } from 'react';
import { LayoutHeader } from './Header';
import { LayoutFooter } from './Footer';

export type AppShellProps = PropsWithChildren<{
  onToggleLanguage: () => void;
  activeLocale: string;
}>;

export function AppShell({ children, onToggleLanguage, activeLocale }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <LayoutHeader onToggleLanguage={onToggleLanguage} activeLocale={activeLocale} />
      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10 lg:px-12">{children}</div>
      </main>
      <LayoutFooter />
    </div>
  );
}
