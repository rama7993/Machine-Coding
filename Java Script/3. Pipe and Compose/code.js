// Pipe and Compose Implementation
// Functional composition utilities

// Pipe: Left to right composition
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

// Compose: Right to left composition
function compose(...fns) {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
}

// Example functions
const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;
const subtract10 = (x) => x - 10;

// Example usage
const pipedResult = pipe(add5, multiplyBy2, subtract10)(10);
console.log('Pipe result:', pipedResult); // (10 + 5) * 2 - 10 = 20

const composedResult = compose(subtract10, multiplyBy2, add5)(10);
console.log('Compose result:', composedResult); // ((10 - 10) * 2) + 5 = 5
