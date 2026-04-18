export interface TokenPlanModel {
    start_time: number;
    end_time: number;
    remains_time: number;
    current_interval_total_count: number;
    current_interval_usage_count: number;
    model_name: string;
    current_weekly_total_count: number;
    current_weekly_usage_count: number;
    weekly_start_time: number;
    weekly_end_time: number;
    weekly_remains_time: number;
}
export interface TokenPlanResponse {
    model_remains: TokenPlanModel[];
    base_resp: {
        status_code: number;
        status_msg: string;
    };
}
export interface FiveHourQuota {
    total: number;
    used: number;
    percent: number;
    resetAt: Date | null;
}
export interface WeeklyQuota {
    total: number;
    used: number;
    percent: number;
    resetAt: Date | null;
}
export interface TokenPlanData {
    fiveHour: FiveHourQuota | null;
    weekly: WeeklyQuota | null;
}
export interface CacheData {
    data: TokenPlanData;
    timestamp: number;
}
export interface RenderContext {
    tokenPlanData: TokenPlanData | null;
    showFiveHour: boolean;
    showWeekly: boolean;
    showBar: boolean;
}
//# sourceMappingURL=types.d.ts.map