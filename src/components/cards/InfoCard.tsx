import type { PropsWithChildren } from 'react';

export interface InfoCardProps extends PropsWithChildren {
  headline: string;
}

export function InfoCard({ headline, children }: InfoCardProps) {
  return (
    <section className="flex flex-col gap-2 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-4 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300">
      <h3 className="font-display text-lg font-medium text-neutral-800 dark:text-neutral-100">{headline}</h3>
      <div>{children}</div>
    </section>
  );
}
