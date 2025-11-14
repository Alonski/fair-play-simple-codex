import type { PropsWithChildren, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface ActionCardProps extends PropsWithChildren {
  title: ReactNode;
  action: ReactNode;
}

export function ActionCard({ title, action, children }: ActionCardProps) {
  return (
    <motion.section
      className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-sm shadow-neutral-900/5 transition dark:border-neutral-800 dark:bg-neutral-900/80"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
        <div>{action}</div>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300">{children}</div>
    </motion.section>
  );
}
