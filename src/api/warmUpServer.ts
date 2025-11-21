// src/api/warmUpServer.ts
import { api } from "./client";
import { retryRequest } from "./retryRequest";

export async function warmUpServer(times: number = 5) {
  console.log(` 서버 웜업 시작: 총 ${times}회 호출`);

  for (let i = 0; i < times; i++) {
    try {
      await retryRequest(() => api.get("/payments"), 3, 300);
      console.log(` 웜업 ${i + 1}회 성공`);
    } catch (err) {
      console.warn(` 웜업 ${i + 1}회 실패`);
    }

    // 호출 텀 (0.5초)
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(" 서버 웜업 완료");
}
