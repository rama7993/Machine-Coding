// Currying Implementation
// Transform function to accept arguments one at a time

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Alternative implementation with placeholder support
function curryWithPlaceholder(fn, placeholder = '_') {
  return function curried(...args) {
    const hasPlaceholder = args.includes(placeholder);
    
    if (args.length >= fn.length && !hasPlaceholder) {
      return fn.apply(this, args);
    }
    
    return function(...nextArgs) {
      const newArgs = [...args];
      let nextIndex = 0;
      
      for (let i = 0; i < newArgs.length; i++) {
        if (newArgs[i] === placeholder) {
          newArgs[i] = nextArgs[nextIndex++];
        }
      }
      
      return curried(...newArgs.concat(nextArgs.slice(nextIndex)));
    };
  };
}

// Example functions
function add(a, b, c) {
  return a + b + c;
}

function multiply(a, b, c, d) {
  return a * b * c * d;
}

// Curried versions
const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);

// Example usage
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

console.log(curriedMultiply(1)(2)(3)(4)); // 24
console.log(curriedMultiply(1, 2, 3, 4)); // 24

// With placeholder
const curriedWithPlaceholder = curryWithPlaceholder(multiply, '_');
console.log(curriedWithPlaceholder('_', 2, '_', 4)(1)(3)); // 24
