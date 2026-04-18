import { fetchTokenPlan } from './api.js';
import { getCachedData, setCachedData } from './cache.js';
import { loadConfig } from './config.js';
import { renderCompact } from './render.js';
async function main(overrides = {}) {
    const deps = {
        fetchTokenPlan,
        getCachedData,
        setCachedData,
        loadConfig,
        getEnvVar: (name) => process.env[name],
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
    let data = deps.getCachedData();
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
//# sourceMappingURL=index.js.map