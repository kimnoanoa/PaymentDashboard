// src/types/dashboard.ts

export interface DashboardSummary {
  /** 오늘 결제 */
  successCount: number;
  failCount: number;
  canceledCount: number;

  /** 전체 결제 */
  totalSuccessCount: number;
  totalFailCount: number;
  totalCanceledCount: number;

  /** 비율 */
  successRate: number;

  /** 기타 */
  totalAmount: number;
  merchantCount: number;

  /** TOP5 */
  topMerchants: {
    mchtName: string;
    totalAmount: number;
  }[];

  /** 결제수단 비율 */
  payMethodStats: {
    method: string;
    count: number;
  }[];

  /** 실패 사유 */
  failReasonStats: {
    reason: string;
    count: number;
  }[];

  /** 최근 결제 10건 */
  recentPayments: {
    paymentCode: string;
    mchtName: string;
    amount: number;
    status: string;
    paymentAt: string;
  }[];
}

/** 일자별 금액 (LineChart 용) */
export interface DailyStat {
  date: string;
  amount: number;
}
