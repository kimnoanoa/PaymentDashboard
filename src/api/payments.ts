import { api } from "./client";
import type { Payment } from "../types/payment";

/** 결제 목록 조회 */
export const getPayments = async (): Promise<Payment[]> => {
  const res = await api.get("/payments/list");

  const list = res.data.data as Array<{
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: string;
    status: string;
    paymentAt: string;
  }>;

  return list.map((item) => ({
    paymentCode: item.paymentCode,
    mchtCode: item.mchtCode,
    amount: Number(item.amount), // string → number
    currency: item.currency,
    payType: item.payType,
    status: item.status,
    paymentAt: item.paymentAt,
  }));
};

/** 결제 상세 조회 */
export const getPaymentDetail = async (paymentCode: string): Promise<Payment> => {
  const res = await api.get(`/payments/detail/${paymentCode}`);

  const item = res.data.data as {
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: string;
    status: string;
    paymentAt: string;
  };

  return {
    paymentCode: item.paymentCode,
    mchtCode: item.mchtCode,
    amount: Number(item.amount),
    currency: item.currency,
    payType: item.payType,
    status: item.status,
    paymentAt: item.paymentAt,
  };
};
