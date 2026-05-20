// Promises in Sequence Implementation
// Execute promises in sequence

function executePromisesInSequence(promises) {
  return promises.reduce((acc, promise) => {
    return acc.then(() => promise());
  }, Promise.resolve());
}

// Alternative implementation using async/await
async function executePromisesSequentially(promises) {
  const results = [];
  
  for (const promiseFunction of promises) {
    const result = await promiseFunction();
    results.push(result);
  }
  
  return results;
}

// Execute promises in sequence with error handling
async function executeWithRetry(promises, maxRetries = 3) {
  const results = [];
  
  for (let i = 0; i < promises.length; i++) {
    let retries = 0;
    let success = false;
    let result;
    
    while (!success && retries < maxRetries) {
      try {
        result = await promises[i]();
        success = true;
        results.push(result);
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw new Error(`Promise ${i + 1} failed after ${maxRetries} retries: ${error.message}`);
        }
        console.log(`Promise ${i + 1} failed, retrying... (${retries}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  return results;
}

// From Promises folder - delay utility
const delay = (task, ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(task);
      resolve();
    }, ms),
  );

// Example usage functions
const promise1 = () => new Promise(resolve => setTimeout(() => {
  console.log('Promise 1 completed');
  resolve('Result 1');
}, 1000));

const promise2 = () => new Promise(resolve => setTimeout(() => {
  console.log('Promise 2 completed');
  resolve('Result 2');
}, 500));

const promise3 = () => new Promise(resolve => setTimeout(() => {
  console.log('Promise 3 completed');
  resolve('Result 3');
}, 200));

// From Promises folder - fetchData example
const fetchData = async () => {
  console.time("fetchData");
  await delay("Task 1", 1000);
  await delay("Task 2", 1000);
  console.timeEnd("fetchData");
  return { data: "Sample Data" };
};

// From Promises folder - handlePromises example
async function handlePromises() {
  console.time("handlePromises");
  await delay("Promise 1", 1000);
  await delay("Promise 2", 2000);
  console.timeEnd("handlePromises");
}

// Test all implementations
console.log('--- Method 1: Basic sequence execution ---');
executePromisesInSequence([promise1, promise2, promise3])
  .then(() => console.log('All promises completed in sequence'));

console.log('\n--- Method 2: Async/await sequential ---');
executePromisesSequentially([promise1, promise2, promise3])
  .then(results => console.log('Sequential results:', results));

console.log('\n--- Method 3: With retry ---');
const failingPromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      resolve('Success!');
    } else {
      reject(new Error('Random failure'));
    }
  }, 300);
});

executeWithRetry([failingPromise, promise2], 3)
  .then(results => console.log('Retry results:', results))
  .catch(error => console.log('Retry failed:', error.message));

console.log('\n--- From Promises folder examples ---');
fetchData().then((result) => console.log(result));
handlePromises().then(() => console.log("All promises handled."));
