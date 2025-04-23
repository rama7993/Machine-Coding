const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchWithAutoRetry1(
  fetcher: () => Promise<any>,
  maximumRetryCount: number,
  retryDelay: number = 1000
): Promise<any> {
  for (let attempt = 0; attempt <= maximumRetryCount; attempt++) {
    try {
      return await fetcher();
    } catch (err) {
      if (attempt === maximumRetryCount) {
        throw err;
      }
      await delay(retryDelay);
    }
  }
}

async function fetchWithAutoRetry2(
  fetcher: () => Promise<any>,
  maximumRetryCount: number,
  retryDelay: number = 1000
): Promise<any> {
  let attempt = 0;

  while (attempt <= maximumRetryCount) {
    try {
      return await fetcher();
    } catch (err) {
      if (attempt === maximumRetryCount) {
        throw err;
      }
      await delay(retryDelay);
      attempt++;
    }
  }
}
