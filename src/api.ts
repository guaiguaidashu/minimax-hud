import type { TokenPlanData, TokenPlanModel } from './types.js';

const API_URL = 'https://www.minimaxi.com/v1/token_plan/remains';

export async function fetchTokenPlan(apiKey: string): Promise<TokenPlanData | null> {
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`[minimax-token-hud] API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json() as { model_remains: TokenPlanModel[] };

    // Find MiniMax-M* model (text model)
    const textModel = json.model_remains.find(m =>
      m.model_name === 'MiniMax-M*' || m.model_name.startsWith('MiniMax-M')
    );

    if (!textModel) {
      console.error('[minimax-token-hud] MiniMax-M* model not found in response');
      return null;
    }

    // Parse 5-hour window
    const fiveHourTotal = textModel.current_interval_total_count;
    const fiveHourUsed = textModel.current_interval_usage_count;
    const fiveHourPercent = fiveHourTotal > 0
      ? Math.round((fiveHourUsed / fiveHourTotal) * 100)
      : 0;
    const fiveHourResetAt = textModel.end_time > 0
      ? new Date(textModel.end_time)
      : null;

    // Parse weekly window
    const weeklyTotal = textModel.current_weekly_total_count;
    const weeklyUsed = textModel.current_weekly_usage_count;
    const weeklyPercent = weeklyTotal > 0
      ? Math.round((weeklyUsed / weeklyTotal) * 100)
      : 0;
    const weeklyResetAt = textModel.weekly_end_time > 0
      ? new Date(textModel.weekly_end_time)
      : null;

    return {
      fiveHour: fiveHourTotal > 0 ? {
        total: fiveHourTotal,
        used: fiveHourUsed,
        percent: fiveHourPercent,
        resetAt: fiveHourResetAt,
      } : null,
      weekly: weeklyTotal > 0 ? {
        total: weeklyTotal,
        used: weeklyUsed,
        percent: weeklyPercent,
        resetAt: weeklyResetAt,
      } : null,
    };
  } catch (error) {
    console.error('[minimax-token-hud] Fetch error:', error instanceof Error ? error.message : error);
    return null;
  }
}
