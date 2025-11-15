export function logInfo(message: string, ...optionalParams: unknown[]) {
  console.info(`[fair-play] ${message}`, ...optionalParams);
}

export function logError(message: string, ...optionalParams: unknown[]) {
  console.error(`[fair-play] ${message}`, ...optionalParams);
}

export function logWarning(message: string, ...optionalParams: unknown[]) {
  console.warn(`[fair-play] ${message}`, ...optionalParams);
}
