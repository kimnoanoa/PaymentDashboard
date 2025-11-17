export interface DashboardSummary {
  successCount: number;
  failCount: number;
  canceledCount: number;

  totalSuccessCount: number;
  totalFailCount: number;
  totalCanceledCount: number;

  successRate: number;

  totalAmount: number;
  merchantCount: number;
}

export interface DailyStat {
  date: string;
  amount: number;
}
