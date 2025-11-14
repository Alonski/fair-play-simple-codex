import type { PropsWithChildren } from 'react';

export function CardGrid({ children }: PropsWithChildren) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}
