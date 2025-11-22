export interface TopMerchant {
  mchtName: string;
  totalAmount: number;
}

export interface PayMethodStat {
  method: string;
  count: number;
}

export interface FailReasonStat {
  reason: string;
  count: number;
}

export interface RecentPayment {
  paymentCode: string;
  mchtName: string;
  amount: number;
  status: string;
  paymentAt: string;
}
