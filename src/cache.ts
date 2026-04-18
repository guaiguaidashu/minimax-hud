import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import type { CacheData, TokenPlanData } from './types.js';

const CACHE_DIR = '.claude/plugins/minimax-token-hud';
const CACHE_FILE = 'cache.json';
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function getCachePath(): string {
  return path.join(os.homedir(), CACHE_DIR, CACHE_FILE);
}

export function getCachedData(): TokenPlanData | null {
  try {
    const cachePath = getCachePath();
    if (!fs.existsSync(cachePath)) {
      return null;
    }

    const content = fs.readFileSync(cachePath, 'utf-8');
    const cached = JSON.parse(content) as CacheData;

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      return null;
    }

    // Deserialize Date strings back to Date objects
    if (cached.data.fiveHour?.resetAt) {
      cached.data.fiveHour.resetAt = new Date(cached.data.fiveHour.resetAt);
    }
    if (cached.data.weekly?.resetAt) {
      cached.data.weekly.resetAt = new Date(cached.data.weekly.resetAt);
    }

    return cached.data;
  } catch {
    return null;
  }
}

export function setCachedData(data: TokenPlanData): void {
  try {
    const cacheDir = path.join(os.homedir(), CACHE_DIR);
    fs.mkdirSync(cacheDir, { recursive: true });

    const cachePath = getCachePath();
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };

    fs.writeFileSync(cachePath, JSON.stringify(cacheData), 'utf-8');
  } catch (error) {
    console.error('[minimax-token-hud] Cache write error:', error instanceof Error ? error.message : error);
  }
}
