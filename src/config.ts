export interface HudConfig {
  showFiveHour: boolean;
  showWeekly: boolean;
  showBar: boolean;
  barWidth: number;
}

export const DEFAULT_CONFIG: HudConfig = {
  showFiveHour: true,
  showWeekly: true,
  showBar: true,
  barWidth: 8,
};

export function loadConfig(): HudConfig {
  // For now, use default config
  // Could be extended to read from config file
  return { ...DEFAULT_CONFIG };
}
