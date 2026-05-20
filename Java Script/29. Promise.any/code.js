// Promise.any Implementation
// Custom implementation of Promise.any

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // Handle empty array
    if (promises.length === 0) {
      return reject(new AggregateError('All promises were rejected'));
    }
    
    // Handle non-iterable input
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('Argument is not iterable'));
    }
    
    let rejectionCount = 0;
    const errors = [];
    
    for (const [index, promise] of promises.entries()) {
      Promise.resolve(promise)
        .then(resolve)
        .catch(error => {
          errors[index] = error;
          rejectionCount++;
          
          if (rejectionCount === promises.length) {
            const aggregateError = new AggregateError(
              'All promises were rejected',
              errors
            );
            reject(aggregateError);
          }
        });
    }
  });
}

// Enhanced version with timeout
function promiseAnyWithTimeout(promises, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Any timed out after ${timeout}ms`)), timeout);
  });
  
  return promiseAny([...promises, timeoutPromise]);
}

// Any with default value
function promiseAnyWithDefault(promises, defaultValue) {
  return promiseAny(promises)
    .catch(() => defaultValue);
}

// Any with minimum number of successes
function promiseAnyMin(promises, minSuccesses = 1) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(new AggregateError('No promises provided'));
    }
    
    let successCount = 0;
    let rejectionCount = 0;
    const results = [];
    const errors = [];
    
    for (const [index, promise] of promises.entries()) {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          successCount++;
          
          if (successCount >= minSuccesses) {
            resolve(results.filter(r => r !== undefined));
          }
        })
        .catch(error => {
          errors[index] = error;
          rejectionCount++;
          
          if (rejectionCount === promises.length && successCount < minSuccesses) {
            const aggregateError = new AggregateError(
              `Not enough promises resolved. Required: ${minSuccesses}, Got: ${successCount}`,
              errors
            );
            reject(aggregateError);
          }
        });
    }
  });
}

// Any with race condition (first N successes)
function promiseAnyRace(promises, count = 1) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(new AggregateError('No promises provided'));
    }
    
    let successCount = 0;
    let rejectionCount = 0;
    const results = [];
    const errors = [];
    
    for (const [index, promise] of promises.entries()) {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          successCount++;
          
          if (successCount >= count) {
            resolve(results.filter(r => r !== undefined));
          }
        })
        .catch(error => {
          errors[index] = error;
          rejectionCount++;
          
          if (rejectionCount === promises.length && successCount < count) {
            const aggregateError = new AggregateError(
              `Not enough promises resolved. Required: ${count}, Got: ${successCount}`,
              errors
            );
            reject(aggregateError);
          }
        });
    }
  });
}

// Example usage
const promise1 = new Promise((_, reject) => 
  setTimeout(() => reject('Promise 1 failed'), 1000)
);

const promise2 = new Promise(resolve => 
  setTimeout(() => resolve('Promise 2 succeeded'), 500)
);

const promise3 = new Promise((_, reject) => 
  setTimeout(() => reject('Promise 3 failed'), 300)
);

const promise4 = new Promise(resolve => 
  setTimeout(() => resolve('Promise 4 succeeded'), 800)
);

// Basic any
promiseAny([promise1, promise2, promise3])
  .then(result => console.log('Any result:', result))
  .catch(error => console.log('Any error:', error.errors));

// Any with timeout
promiseAnyWithTimeout([promise1, promise2], 300)
  .then(result => console.log('Any with timeout result:', result))
  .catch(error => console.log('Any with timeout error:', error.message));

// Any with default
promiseAnyWithDefault([promise1, promise3], 'Default value')
  .then(result => console.log('Any with default result:', result));

// Any with minimum successes
promiseAnyMin([promise1, promise2, promise4], 2)
  .then(result => console.log('Any min successes result:', result))
  .catch(error => console.log('Any min successes error:', error.errors));

// Any race (first 2 successes)
promiseAnyRace([promise1, promise2, promise4], 2)
  .then(result => console.log('Any race result:', result))
  .catch(error => console.log('Any race error:', error.errors));

// All promises fail
const failingPromises = [
  Promise.reject('Error 1'),
  Promise.reject('Error 2'),
  Promise.reject('Error 3')
];

promiseAny(failingPromises)
  .then(result => console.log('Should not reach'))
  .catch(error => {
    console.log('All failed - AggregateError:', error.errors);
  });
