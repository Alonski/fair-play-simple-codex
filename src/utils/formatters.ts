export function formatScore(score: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(score);
}

export function formatDate(date: Date | string) {
  const normalizedDate = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(normalizedDate);
}
