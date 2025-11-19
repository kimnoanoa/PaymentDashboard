export async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 5,
  delay: number = 500
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) {
      throw err;
    }

    // 잠깐 대기
    await new Promise((resolve) => setTimeout(resolve, delay));

    return retryRequest(fn, retries - 1, delay);
  }
}
