import { quotaBar, dim, RESET } from './colors.js';
function formatResetTime(resetAt) {
    if (!resetAt)
        return '';
    const now = new Date();
    const diffMs = resetAt.getTime() - now.getTime();
    if (diffMs <= 0)
        return '';
    const diffMins = Math.ceil(diffMs / 60000);
    if (diffMins < 60)
        return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remHours = hours % 24;
        if (remHours > 0)
            return `${days}d ${remHours}h`;
        return `${days}d`;
    }
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
function formatQuotaPart(label, total, used, percent, resetAt, showBar, barWidth) {
    const reset = formatResetTime(resetAt);
    const remains = total - used;
    const parts = [];
    // Label
    parts.push(dim(`${label}:`));
    // Bar
    if (showBar) {
        parts.push(quotaBar(percent, barWidth));
    }
    // Percentage
    parts.push(`${percent}%`);
    // Remaining count and reset time
    const remainingText = `${dim('(')}${remains}${dim('/${total}')}`;
    parts.push(dim(`(${remains}/${total})`));
    if (reset) {
        parts.push(dim(`(${reset})`));
    }
    return parts.join(' ');
}
export function renderTokenPlan(ctx) {
    const { tokenPlanData, showBar, showFiveHour, showWeekly } = ctx;
    if (!tokenPlanData) {
        return dim('[Token Plan: --]');
    }
    const parts = [];
    const barWidth = 8;
    if (showFiveHour && tokenPlanData.fiveHour) {
        const { total, used, percent, resetAt } = tokenPlanData.fiveHour;
        parts.push(formatQuotaPart('5h', total, used, percent, resetAt, showBar, barWidth));
    }
    if (showWeekly && tokenPlanData.weekly) {
        const { total, used, percent, resetAt } = tokenPlanData.weekly;
        parts.push(formatQuotaPart('周', total, used, percent, resetAt, showBar, barWidth));
    }
    if (parts.length === 0) {
        return dim('[Token Plan: --]');
    }
    return `${RESET}${dim('[')}Token Plan ${parts.join(' | ')}${dim(']')}${RESET}`;
}
export function renderCompact(data, showBar) {
    if (!data) {
        return dim('[Token Plan: --]');
    }
    const parts = [];
    if (data.fiveHour) {
        const { total, used, percent, resetAt } = data.fiveHour;
        const reset = formatResetTime(resetAt);
        if (showBar) {
            parts.push(`Usage ${quotaBar(percent, 10)} ${percent}% (${reset} / 5h)`);
        }
        else {
            parts.push(`Usage ${percent}% (${reset} / 5h)`);
        }
    }
    if (data.weekly) {
        const { total, used, percent, resetAt } = data.weekly;
        const reset = formatResetTime(resetAt);
        if (showBar) {
            parts.push(`${quotaBar(percent, 10)} ${percent}% (${reset} / 7d)`);
        }
        else {
            parts.push(`${percent}% (${reset} / 7d)`);
        }
    }
    if (parts.length === 0) {
        return dim('[Token Plan: --]');
    }
    return `${dim('[')}${parts.join(' | ')}${dim(']')}`;
}
//# sourceMappingURL=render.js.map