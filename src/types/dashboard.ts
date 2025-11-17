export interface DashboardSummary {
  /** 오늘 결제 */
  successCount: number;
  failCount: number;
  canceledCount: number; // 추가

  /** 전체 결제 */
  totalSuccessCount: number;
  totalFailCount: number;
  totalCanceledCount: number; // 추가

  /** 비율 */
  successRate: number;

  /** 기타 */
  totalAmount: number;
  merchantCount: number;
}

export interface DailyStat {
  date: string;     // "2025-11-01"
  amount: number;   // 하루 총 결제 금액
}