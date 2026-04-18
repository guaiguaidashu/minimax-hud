export const DEFAULT_CONFIG = {
    showFiveHour: true,
    showWeekly: true,
    showBar: true,
    barWidth: 8,
};
export function loadConfig() {
    // For now, use default config
    // Could be extended to read from config file
    return { ...DEFAULT_CONFIG };
}
//# sourceMappingURL=config.js.map