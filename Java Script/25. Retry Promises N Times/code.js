// Retry Promises N Times
// Retry a promise function multiple times on failure

async function retry(fn, maxAttempts = 3, delay = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts. Last error: ${error.message}`);
      }
      
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Retry with exponential backoff
async function retryWithBackoff(fn, maxAttempts = 3, baseDelay = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts. Last error: ${error.message}`);
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Retry with custom delay function
async function retryWithCustomDelay(fn, maxAttempts, delayFn) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts. Last error: ${error.message}`);
      }
      
      const delay = delayFn(attempt, error);
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Retry with condition
async function retryIf(fn, shouldRetry, maxAttempts = 3, delay = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      lastError = error;
      
      if (!shouldRetry(error) || attempt === maxAttempts) {
        throw error;
      }
      
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Retry with jitter (random delay variation)
async function retryWithJitter(fn, maxAttempts = 3, baseDelay = 1000, jitterFactor = 0.1) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts. Last error: ${error.message}`);
      }
      
      const jitter = baseDelay * jitterFactor * Math.random();
      const delay = baseDelay + jitter;
      console.log(`Attempt ${attempt} failed. Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// From Retry with Delay folder - Auto retry without delay
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

// From Retry with Delay folder - Retry with fixed delay
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

// Example usage
const unreliableFunction = async (shouldFail = true) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (shouldFail && Math.random() > 0.7) {
    throw new Error('Random failure occurred');
  }
  
  return 'Success!';
};

// From Retry with Delay folder - Fetcher example
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

// Test different retry strategies
async function testRetries() {
  console.log('--- Testing basic retry ---');
  try {
    const result1 = await retry(() => unreliableFunction(), 5, 1000);
    console.log('Basic retry result:', result1);
  } catch (error) {
    console.log('Basic retry failed:', error.message);
  }
  
  console.log('\n--- Testing exponential backoff ---');
  try {
    const result2 = await retryWithBackoff(() => unreliableFunction(), 4, 500);
    console.log('Exponential backoff result:', result2);
  } catch (error) {
    console.log('Exponential backoff failed:', error.message);
  }
  
  console.log('\n--- Testing conditional retry ---');
  try {
    const result3 = await retryIf(
      () => unreliableFunction(),
      (error) => error.message.includes('Random'),
      3,
      800
    );
    console.log('Conditional retry result:', result3);
  } catch (error) {
    console.log('Conditional retry failed:', error.message);
  }
  
  console.log('\n--- Testing from Retry with Delay folder ---');
  try {
    const result4 = await fetchWithRetry(fetcher, 3);
    console.log('Fetch with retry result:', result4);
  } catch (error) {
    console.log('Fetch with retry failed:', error);
  }
}

// Uncomment to test
// testRetries();
