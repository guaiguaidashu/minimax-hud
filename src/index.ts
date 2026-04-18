import { fetchTokenPlan } from './api.js';
import { getCachedData, setCachedData } from './cache.js';
import { loadConfig } from './config.js';
import { renderCompact } from './render.js';
import type { TokenPlanData } from './types.js';
import { realpathSync } from 'node:fs';

export type MainDeps = {
  fetchTokenPlan: typeof fetchTokenPlan;
  getCachedData: typeof getCachedData;
  setCachedData: typeof setCachedData;
  loadConfig: typeof loadConfig;
  getEnvVar: (name: string) => string | undefined;
  now: () => number;
  log: (...args: unknown[]) => void;
};

async function main(overrides: Partial<MainDeps> = {}): Promise<void> {
  const deps: MainDeps = {
    fetchTokenPlan,
    getCachedData,
    setCachedData,
    loadConfig,
    getEnvVar: (name: string) => process.env[name],
    now: () => Date.now(),
    log: console.log,
    ...overrides,
  };

  // Try to get API key from environment
  const apiKey = deps.getEnvVar('ANTHROPIC_AUTH_TOKEN');
  if (!apiKey) {
    deps.log('[minimax-token-hud] ANTHROPIC_AUTH_TOKEN not set, showing empty');
    deps.log('[minimax-token-hud] --');
    return;
  }

  // Try cache first
  let data: TokenPlanData | null = deps.getCachedData();

  if (!data) {
    // Fetch from API
    data = await deps.fetchTokenPlan(apiKey);

    if (data) {
      // Cache the result
      deps.setCachedData(data);
    }
  }

  // Load config
  const config = deps.loadConfig();

  // Render output
  const output = renderCompact(data, config.showBar);

  deps.log(output);
}

// Run if executed directly
const scriptPath = import.meta.url;
const argvPath = process.argv[1];

// Only run if called directly (not imported) - check if this file is the main module
if (argvPath && scriptPath.includes('minimax-token-hud')) {
  await main();
}
