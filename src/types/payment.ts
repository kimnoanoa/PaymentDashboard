export interface Payment {
  paymentCode: string;   // 결제코드
  mchtCode: string;      // 가맹점코드
  amount: number;        // 결제 금액
  currency: string;      // 통화
  payType: string;       // 결제 유형
  status: string;        // 결제 상태 ("SUCCESS", "FAILED" 등)
  paymentAt: string;     // 결제 시간 (YYYY-MM-DDTHH:mm:ss)
  failReason?: string;
}
