import { getPayments } from "./payments";
import { getMerchants } from "./merchants";

/** TOP 5 가맹점 */
// TOP 5 가맹점
export const getTopMerchants = async () => {
  const payments = await getPayments();
  const merchants = await getMerchants();

  const map: Record<string, number> = {};

  payments.forEach((p) => {
    const m = merchants.find((m) => m.mchtCode === p.mchtCode);
    if (!m) return;

    if (!map[m.mchtName]) map[m.mchtName] = 0;
    map[m.mchtName] += Number(p.amount);
  });

  return Object.entries(map)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
};


/** 결제수단 비율 */

export const getPayMethodStats = async () => {
  const payments = await getPayments();

  const map: Record<string, number> = {};

  payments.forEach((p) => {
    if (!map[p.payType]) map[p.payType] = 0;
    map[p.payType] += 1;
  });

  // Recharts 형식에 맞게 변환 (name + value)
  return Object.entries(map).map(([method, count]) => ({
    name: method,
    value: count,
  }));
};


/** 실패 사유 */
export const getFailReasonStats = async () => {
  const payments = await getPayments();

  const map: Record<string, number> = {};

  payments.forEach((p) => {
    if (p.status === "FAILED") {
      const reason = p.failReason || "기타";

      if (!map[reason]) map[reason] = 0;
      map[reason] += 1;
    }
  });

  return Object.entries(map).map(([reason, count]) => ({
    reason,
    count,
  }));
};

/** 최근 결제 10건 */
export const getRecentPayments = async () => {
  const payments = await getPayments();
  const merchants = await getMerchants();

  return payments
    .map((p) => ({
      paymentCode: p.paymentCode,
      amount: Number(p.amount),
      status: p.status,
      paymentAt: p.paymentAt,
      mchtName:
        merchants.find((m) => m.mchtCode === p.mchtCode)?.mchtName || "-",
    }))
    .sort((a, b) => b.paymentAt.localeCompare(a.paymentAt))
    .slice(0, 10);
};


/** 요일별 통계 */
export const getWeeklyStats = async () => {
  const payments = await getPayments();

  const weekMap: Record<number, number> = {
    0: 0, // 일
    1: 0, // 월
    2: 0, // 화
    3: 0, // 수
    4: 0, // 목
    5: 0, // 금
    6: 0, // 토
  };

  payments.forEach((p) => {
    const dateStr = p.paymentAt.slice(0, 10);
    const dayIndex = new Date(dateStr).getDay();
    weekMap[dayIndex] += Number(p.amount);
  });

  return Object.entries(weekMap).map(([idx, amount]) => ({
    day: ["일", "월", "화", "수", "목", "금", "토"][Number(idx)],
    amount,
  }));
};
