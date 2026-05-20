// Promise.race Implementation
// Custom implementation of Promise.race

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // Handle empty array
    if (promises.length === 0) {
      return; // Promise will never resolve or reject
    }
    
    // Handle non-iterable input
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('Argument is not iterable'));
    }
    
    for (const promise of promises) {
      // Convert non-promise values to promises
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject);
    }
  });
}

// Enhanced version with timeout support
function promiseRaceWithTimeout(promises, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Race timed out after ${timeout}ms`)), timeout);
  });
  
  return promiseRace([...promises, timeoutPromise]);
}

// Race with callback support
function promiseRaceWithCallback(promises, onProgress) {
  let settledCount = 0;
  const total = promises.length;
  
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          settledCount++;
          if (onProgress && settledCount < total) {
            onProgress(settledCount, total);
          }
        });
    });
  });
}

// Race with cancellation
function createCancellableRace(promises) {
  let isCancelled = false;
  const controllers = [];
  
  const racePromise = new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      // Wrap each promise to handle cancellation
      const wrappedPromise = new Promise((res, rej) => {
        Promise.resolve(promise)
          .then(value => {
            if (!isCancelled) res(value);
          })
          .catch(error => {
            if (!isCancelled) rej(error);
          });
      });
      
      wrappedPromise
        .then(resolve)
        .catch(reject);
    });
  });
  
  const cancel = () => {
    isCancelled = true;
    controllers.forEach(controller => controller.abort());
  };
  
  return {
    promise: racePromise,
    cancel
  };
}

// Example usage
const promise1 = new Promise(resolve => 
  setTimeout(() => resolve('Promise 1'), 1000)
);

const promise2 = new Promise(resolve => 
  setTimeout(() => resolve('Promise 2'), 500)
);

const promise3 = new Promise((_, reject) => 
  setTimeout(() => reject('Promise 3 failed'), 300)
);

// Basic race
promiseRace([promise1, promise2, promise3])
  .then(result => console.log('Race winner:', result))
  .catch(error => console.log('Race error:', error));

// Race with timeout
promiseRaceWithTimeout([promise1, promise2], 800)
  .then(result => console.log('Race with timeout winner:', result))
  .catch(error => console.log('Race with timeout error:', error));

// Race with progress
promiseRaceWithCallback(
  [promise1, promise2, promise3],
  (settled, total) => console.log(`Progress: ${settled}/${total}`)
)
  .then(result => console.log('Race with callback winner:', result))
  .catch(error => console.log('Race with callback error:', error));

// Cancellable race
const cancellableRace = createCancellableRace([promise1, promise2]);
cancellableRace.promise
  .then(result => console.log('Cancellable race winner:', result))
  .catch(error => console.log('Cancellable race error:', error));

// Cancel after 400ms (before promise2 resolves)
setTimeout(() => {
  console.log('Cancelling race...');
  cancellableRace.cancel();
}, 400);
