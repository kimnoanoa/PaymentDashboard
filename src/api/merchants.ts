import { api } from "./client";
import type { Merchant, MerchantDetail } from "../types/merchant";

//  목록 조회
export const getMerchants = async (): Promise<Merchant[]> => {
  const res = await api.get("/merchants/list");
  return res.data.data;
};

//  상세 조회
export const getMerchantDetail = async (mchtCode: string): Promise<MerchantDetail> => {
  const res = await api.get(`/merchants/detail/${mchtCode}`);
  return res.data.data;
};
