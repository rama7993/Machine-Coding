// Deep Clone Object Implementation
// Multiple methods for deep cloning objects

// Method 1: Basic recursive deep clone
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const res = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key]);
    }
  }

  return res;
}

// Method 2: Enhanced recursive with type checking
function deepCloneEnhanced(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepCloneEnhanced(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepCloneEnhanced(obj[key]);
      }
    }
    
    return cloned;
  }
  
  return obj;
}

// Method 3: Using JSON (limited)
function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Method 4: Handle circular references
function deepCloneWithCircular(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj;
  if (hash.has(obj)) return hash.get(obj);
  
  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCloneWithCircular(obj[key], hash);
    }
  }
  
  return result;
}

// Method 5: Comprehensive deep clone
function comprehensiveClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  
  // Handle built-in types
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Map) return new Map(value);
  if (value instanceof Set) return new Set(value);
  if (value instanceof ArrayBuffer) return value.slice(0);
  if (value instanceof DataView) return new DataView(value.buffer.slice(0));
  
  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(item => comprehensiveClone(item));
  }
  
  // Handle plain objects
  if (Object.prototype.toString.call(value) === '[object Object]') {
    const cloned = {};
    
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        cloned[key] = comprehensiveClone(value[key]);
      }
    }
    
    return cloned;
  }
  
  // For other objects, try to copy constructor
  try {
    return new value.constructor(value);
  } catch (e) {
    return value;
  }
}

// Example usage
const original = {
  person: { name: "John", address: { city: "New York", zip: "10001" } },
  age: 30,
  hobbies: ['reading', 'coding'],
  birthDate: new Date('1990-01-01'),
  regex: /test/g
};

const complexExample = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    street: '123 Main St',
    city: 'New York'
  },
  birthDate: new Date('1990-01-01'),
  isActive: true,
  score: null
};

// Test all methods
console.log('Original object:', original);

console.log('\n--- Method 1: Basic recursive ---');
const cloned1 = deepClone(original);
console.log('Basic clone:', cloned1);

console.log('\n--- Method 2: Enhanced with types ---');
const cloned2 = deepCloneEnhanced(original);
console.log('Enhanced clone:', cloned2);

console.log('\n--- Method 3: JSON method ---');
const cloned3 = jsonClone(original);
console.log('JSON clone:', cloned3);

console.log('\n--- Method 4: Circular reference safe ---');
const circular = { name: 'test' };
circular.self = circular;
const clonedCircular = deepCloneWithCircular(circular);
console.log('Circular clone works:', clonedCircular.self === clonedCircular);

console.log('\n--- Method 5: Comprehensive ---');
const cloned5 = comprehensiveClone(complexExample);
console.log('Comprehensive clone:', cloned5);

// Test modifications
cloned1.person.name = 'Jane';
cloned1.hobbies.push('gaming');
cloned1.address.city = 'Boston';

console.log('\n--- Modifying clone ---');
console.log('Modified clone:', cloned1);
console.log('Original unchanged:', original);
console.log('Are they equal?', JSON.stringify(original) === JSON.stringify(cloned1));
