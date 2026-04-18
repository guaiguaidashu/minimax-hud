export const RESET = '\x1b[0m';
export const DIM = '\x1b[2m';
export const RED = '\x1b[31m';
export const GREEN = '\x1b[32m';
export const YELLOW = '\x1b[33m';
export const BLUE = '\x1b[34m';
export const BRIGHT_BLUE = '\x1b[94m';
export const BRIGHT_MAGENTA = '\x1b[95m';

function colorize(text: string, color: string): string {
  return `${color}${text}${RESET}`;
}

export function dim(text: string): string {
  return colorize(text, DIM);
}

export function blue(text: string): string {
  return colorize(text, BRIGHT_BLUE);
}

export function magenta(text: string): string {
  return colorize(text, BRIGHT_MAGENTA);
}

export function getQuotaColor(percent: number): string {
  if (percent >= 90) return RED;
  if (percent >= 75) return YELLOW;
  return BRIGHT_BLUE;
}

export function quotaBar(percent: number, width: number = 8): string {
  const safeWidth = Number.isFinite(width) ? Math.max(0, Math.round(width)) : 0;
  const safePercent = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0;
  const filled = Math.round((safePercent / 100) * safeWidth);
  const empty = safeWidth - filled;
  const color = getQuotaColor(safePercent);
  return `${color}${'█'.repeat(filled)}${DIM}${'░'.repeat(empty)}${RESET}`;
}
