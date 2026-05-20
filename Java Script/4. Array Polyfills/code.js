// Array Polyfills Implementation
// Custom implementations of array methods

// Polyfill for Array.prototype.map
if (!Array.prototype.customMap) {
  Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}

// Polyfill for Array.prototype.filter
if (!Array.prototype.customFilter) {
  Array.prototype.customFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

// Polyfill for Array.prototype.reduce
if (!Array.prototype.customReduce) {
  Array.prototype.customReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    
    for (let i = startIndex; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
}

// Alternative reduce implementation (from Reduce folder)
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  let accumulator = initialValue;
  let startIndex = 0;

  // Handle case where initialValue is not provided
  if (accumulator === undefined) {
    if (array.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

// Polyfill for Array.prototype.forEach
if (!Array.prototype.customForEach) {
  Array.prototype.customForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };
}

// Polyfill for Array.prototype.find
if (!Array.prototype.customFind) {
  Array.prototype.customFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  };
}

// Polyfill for Array.prototype.some
if (!Array.prototype.customSome) {
  Array.prototype.customSome = function(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}

// Polyfill for Array.prototype.every
if (!Array.prototype.customEvery) {
  Array.prototype.customEvery = function(callback) {
    for (let i = 0; i < this.length; i++) {
      if (!callback(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}

// Example usage
const numbers = [1, 2, 3, 4, 5];

console.log('--- Custom Map ---');
console.log(numbers.customMap(x => x * 2));

console.log('\n--- Custom Filter ---');
console.log(numbers.customFilter(x => x > 3));

console.log('\n--- Custom Reduce ---');
console.log(numbers.customReduce((acc, x) => acc + x, 0));

console.log('\n--- My Reduce (from Reduce folder) ---');
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15

const product = numbers.myReduce((acc, curr) => acc * curr);
console.log(product); // Output: 120

console.log('\n--- Custom ForEach ---');
numbers.customForEach(x => console.log(x));

console.log('\n--- Custom Find ---');
console.log(numbers.customFind(x => x > 3));

console.log('\n--- Custom Some ---');
console.log(numbers.customSome(x => x > 3));

console.log('\n--- Custom Every ---');
console.log(numbers.customEvery(x => x > 0));
