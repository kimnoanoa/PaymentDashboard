// src/api/warmUpServer.ts
import { api } from "./client";
import { retryRequest } from "./retryRequest";

export async function warmUpServer(times: number = 5) {
  console.log(` 서버 웜업 시작: 총 ${times}회 호출`);

  for (let i = 0; i < times; i++) {
    try {
      // 🟢 실제 존재하는 API만 호출!
      await retryRequest(() => api.get("/payments/list"), 3, 300);

      console.log(` !!! 웜업 ${i + 1}회 성공`);
    } catch (err) {
      console.warn(`⚠️ 웜업 ${i + 1}회 실패`, err);
    }

    await new Promise((res) => setTimeout(res, 500));
  }

  console.log(" 서버 웜업 완료 !!! ");
}
