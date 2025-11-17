import { getPayments } from "./payments";
import { getMerchants } from "./merchants";

/** 📌 대시보드 요약 정보 */
export const getDashboardSummary = async () => {
  const payments = await getPayments();
  const merchants = await getMerchants();

  const today = new Date().toISOString().slice(0, 10);

  /** 오늘 기준 */
  const todayPayments = payments.filter(
    (p) => p.paymentAt.slice(0, 10) === today
  );

  const successCount = todayPayments.filter(
    (p) => p.status === "SUCCESS"
  ).length;

  const failCount = todayPayments.filter(
    (p) => p.status === "FAILED"
  ).length;

  const canceledCount = todayPayments.filter(
    (p) => p.status === "CANCELLED"
  ).length;

  /** 전체 기준 */
  const totalSuccessCount = payments.filter(
    (p) => p.status === "SUCCESS"
  ).length;

  const totalFailCount = payments.filter(
    (p) => p.status === "FAILED"
  ).length;

  const totalCanceledCount = payments.filter(
    (p) => p.status === "CANCELLED"
  ).length;

  /** 성공률 */
  const successRate =
    totalSuccessCount + totalFailCount > 0
      ? Math.round(
          (totalSuccessCount /
            (totalSuccessCount + totalFailCount)) *
            100
        )
      : 0;

  return {
    /** 오늘 기준 */
    successCount,
    failCount,
    canceledCount,

    /** 전체 기준 */
    totalSuccessCount,
    totalFailCount,
    totalCanceledCount,
    successRate,

    /** 기타 */
    totalAmount: payments.reduce((sum, p) => sum + Number(p.amount), 0),
    merchantCount: merchants.length,
  };
};



/** 일자별 매출(LineChart용) */
export const getDailyStats = async () => {
  const payments = await getPayments();

  const map: Record<string, number> = {};

  payments.forEach((p) => {
    const day = p.paymentAt.slice(0, 10);
    const amount = Number(p.amount);

    if (!map[day]) map[day] = 0;
    map[day] += amount;
  });

  return Object.entries(map).map(([date, amount]) => ({
    date,
    amount,
  }));
};
