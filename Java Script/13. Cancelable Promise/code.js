// Cancelable Promise Implementation
// Promise that can be cancelled

class CancelablePromise {
  constructor(executor) {
    this.isCancelled = false;
    this.cancelHandlers = [];
    
    const promise = new Promise((resolve, reject) => {
      const resolveWrapper = (value) => {
        if (this.isCancelled) return;
        resolve(value);
      };
      
      const rejectWrapper = (reason) => {
        if (this.isCancelled) return;
        reject(reason);
      };
      
      executor(resolveWrapper, rejectWrapper);
    });
    
    this.promise = promise;
  }
  
  then(onFulfilled, onRejected) {
    return this.promise.then(onFulfilled, onRejected);
  }
  
  catch(onRejected) {
    return this.promise.catch(onRejected);
  }
  
  finally(onFinally) {
    return this.promise.finally(onFinally);
  }
  
  cancel() {
    this.isCancelled = true;
    this.cancelHandlers.forEach(handler => handler());
    this.cancelHandlers = [];
  }
  
  onCancel(handler) {
    this.cancelHandlers.push(handler);
  }
  
  static from(promise) {
    const cancelable = new CancelablePromise((resolve, reject) => {
      promise.then(resolve).catch(reject);
    });
    return cancelable;
  }
}

// Alternative implementation with cancellation token
class CancellationToken {
  constructor() {
    this.isCancelled = false;
    this.onCancelCallbacks = [];
  }
  
  cancel() {
    this.isCancelled = true;
    this.onCancelCallbacks.forEach(callback => callback());
  }
  
  onCancel(callback) {
    this.onCancelCallbacks.push(callback);
  }
  
  throwIfCancelled() {
    if (this.isCancelled) {
      throw new Error('Operation was cancelled');
    }
  }
}

function createCancelableAsyncTask(token) {
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      token.throwIfCancelled();
    }, 100);
    
    setTimeout(() => {
      clearInterval(checkInterval);
      token.throwIfCancelled();
      resolve('Task completed');
    }, 2000);
  });
}

// Example usage
const task = new CancelablePromise((resolve) => {
  setTimeout(() => {
    console.log('Async operation completed');
    resolve('Success!');
  }, 2000);
});

task.then(result => console.log('Result:', result));

// Cancel after 1 second
setTimeout(() => {
  console.log('Cancelling...');
  task.cancel();
}, 1000);
