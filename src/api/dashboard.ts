import { getPayments } from "../api/payments";
import { getMerchants } from "../api/merchants";

export const getDashboardSummary = async () => {
  const payments = await getPayments();
  const merchants = await getMerchants();

  const today = new Date().toISOString().slice(0, 10);

  const todayPayments = payments.filter(p =>
    p.paymentAt.slice(0, 10) === today
  );

  return {
    successCount: todayPayments.filter(p => p.status === "SUCCESS").length,
    failCount: todayPayments.filter(p => p.status === "FAILED").length,
    totalAmount: payments.reduce((sum, p) => sum + Number(p.amount), 0),
    merchantCount: merchants.length
  };
};
