async function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  try {
    return await fetcher();
  } catch (err) {
    if (maximumRetryCount > 0) {
      console.log(`Retrying... ${maximumRetryCount} attempts left`);
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    } else {
      throw err;
    }
  }
}

async function fetchWithRetry(fetcher, retries = 3, delay = 1000) {
  try {
    return await fetcher();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(fetcher, retries - 1, delay);
    } else {
      throw error;
    }
  }
}

// Usage
const fetcher = () => {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.5; // 50% chance of failure
    console.log(shouldFail ? "Failed" : "Succeeded");
    if (shouldFail) {
      reject("Request failed");
    } else {
      resolve("Request succeeded");
    }
  });
};

async function testFetchWithAutoRetry() {
  const maximumRetryCount = 3;

  try {
    //const result = await fetchWithAutoRetry(fetcher, maximumRetryCount);
    const result = await fetchWithRetry(fetcher, maximumRetryCount);
    console.log(result);
  } catch (err) {
    console.log("Final error after retries: ", err);
  }
}

testFetchWithAutoRetry();
