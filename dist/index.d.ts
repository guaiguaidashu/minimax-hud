import { fetchTokenPlan } from './api.js';
import { getCachedData, setCachedData } from './cache.js';
import { loadConfig } from './config.js';
export type MainDeps = {
    fetchTokenPlan: typeof fetchTokenPlan;
    getCachedData: typeof getCachedData;
    setCachedData: typeof setCachedData;
    loadConfig: typeof loadConfig;
    getEnvVar: (name: string) => string | undefined;
    now: () => number;
    log: (...args: unknown[]) => void;
};
//# sourceMappingURL=index.d.ts.map