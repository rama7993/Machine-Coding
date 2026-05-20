// Memoization Implementation
// Cache function results to improve performance

function memoize(fn, options = {}) {
  const cache = new Map();
  const { ttl, maxSize = Infinity, keyGenerator } = options;
  
  return function(...args) {
    // Generate cache key
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    // Check cache
    if (cache.has(key)) {
      const cached = cache.get(key);
      
      // Check TTL
      if (ttl && Date.now() - cached.timestamp > ttl) {
        cache.delete(key);
      } else {
        return cached.value;
      }
    }
    
    // Execute function
    const result = fn.apply(this, args);
    
    // Check cache size limit
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    // Store in cache
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });
    
    return result;
  };
}

// LRU Cache memoization
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value.value;
    }
    
    // If cache is full, remove least recently used
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value, timestamp: Date.now() });
    
    return result;
  };
}

// Memoize async functions
function memoizeAsync(fn, options = {}) {
  const cache = new Map();
  const pending = new Map();
  const { ttl, maxSize = Infinity } = options;
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    // Check cache
    if (cache.has(key)) {
      const cached = cache.get(key);
      
      if (ttl && Date.now() - cached.timestamp > ttl) {
        cache.delete(key);
      } else {
        return cached.value;
      }
    }
    
    // Check if already pending
    if (pending.has(key)) {
      return pending.get(key);
    }
    
    // Create promise
    const promise = fn.apply(this, args);
    pending.set(key, promise);
    
    try {
      const result = await promise;
      
      // Check cache size
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      cache.set(key, {
        value: result,
        timestamp: Date.now()
      });
      
      return result;
    } finally {
      pending.delete(key);
    }
  };
}

// Memoize with weak references (for objects)
function memoizeWeak(fn) {
  const cache = new WeakMap();
  
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    
    const result = fn.call(this, arg);
    cache.set(arg, result);
    return result;
  };
}

// Memoize class methods
function memoizeMethod(target, propertyName, descriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = memoize(originalMethod);
  return descriptor;
}

// Example usage

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(fibonacci);

console.time('Without memoization');
console.log('Fibonacci(35):', fibonacci(35));
console.timeEnd('Without memoization');

console.time('With memoization');
console.log('Memoized Fibonacci(35):', memoizedFibonacci(35));
console.timeEnd('With memoization');

// Async function example
async function fetchUserData(userId) {
  console.log(`Fetching data for user ${userId}...`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: userId, name: `User ${userId}` };
}

const memoizedFetch = memoizeAsync(fetchUserData, { ttl: 5000 });

// Test async memoization
(async () => {
  console.time('First fetch');
  const user1 = await memoizedFetch(1);
  console.timeEnd('First fetch');
  
  console.time('Second fetch (cached)');
  const user2 = await memoizedFetch(1);
  console.timeEnd('Second fetch (cached)');
  
  console.log('Users are equal:', JSON.stringify(user1) === JSON.stringify(user2));
})();

// LRU cache example
const lruMemoized = memoizeLRU((x) => x * x, 3);

lruMemoized(1); // Cache: [1]
lruMemoized(2); // Cache: [1, 2]
lruMemoized(3); // Cache: [1, 2, 3]
lruMemoized(1); // Cache: [2, 3, 1] (1 moved to end)
lruMemoized(4); // Cache: [3, 1, 4] (2 evicted)

// Object memoization example
const processObject = memoizeWeak((obj) => {
  console.log('Processing object...');
  return { ...obj, processed: true };
});

const obj1 = { id: 1 };
const obj2 = { id: 1 }; // Different object reference

console.log(processObject(obj1)); // Processes
console.log(processObject(obj1)); // Cached
console.log(processObject(obj2)); // Processes again (different reference)
