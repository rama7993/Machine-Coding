// Call, Apply, Bind Implementation
// Custom implementations of Function.prototype methods

// Custom call implementation
Function.prototype.customCall = function(context, ...args) {
  context = context || globalThis;
  const uniqueKey = Symbol('temp');
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};

// Custom apply implementation
Function.prototype.customApply = function(context, args) {
  context = context || globalThis;
  const uniqueKey = Symbol('temp');
  context[uniqueKey] = this;
  const result = context[uniqueKey](...(args || []));
  delete context[uniqueKey];
  return result;
};

// Custom bind implementation
Function.prototype.customBind = function(context, ...args) {
  const self = this;
  return function(...newArgs) {
    return self.apply(context, [...args, ...newArgs]);
  };
};

// Alternative bind implementation (from polyfills folder)
Function.prototype.myBind = function(context, ...args) {
  const obj = this;
  
  return function(...args2) {
    obj.apply(context, [...args, ...args2]);
  };
};

// Enhanced bind with constructor support
Function.prototype.enhancedBind = function(context, ...args) {
  const self = this;
  
  function BoundFunction(...newArgs) {
    // Check if called with new
    if (new.target) {
      return self.apply(this, [...args, ...newArgs]);
    }
    return self.apply(context, [...args, ...newArgs]);
  }
  
  // Set prototype for instanceof checks
  BoundFunction.prototype = Object.create(self.prototype);
  BoundFunction.prototype.constructor = BoundFunction;
  
  return BoundFunction;
};

// Example usage
const person = {
  name: 'John',
  age: 30
};

function greet(greeting) {
  return `${greeting}, I'm ${this.name} and I'm ${this.age} years old`;
}

function fullName(country, state) {
  console.log(`${this.firstName} ${this.lastName} from ${country}: ${state}`);
}

const nameObj = {
  firstName: "Rama",
  lastName: "Reddy",
};

// Test custom implementations
console.log('--- Custom Call ---');
console.log(greet.customCall(person, 'Hello'));

console.log('\n--- Custom Apply ---');
console.log(greet.customApply(person, ['Hi']));

console.log('\n--- Custom Bind ---');
const boundGreet = greet.customBind(person, 'Hey');
console.log(boundGreet());

console.log('\n--- My Bind (from polyfills) ---');
const printMyName = fullName.myBind(nameObj, "india");
printMyName("andhra pradesh");

console.log('\n--- Enhanced Bind ---');
const EnhancedPerson = function(name, age) {
  this.name = name;
  this.age = age;
};

const BoundPerson = EnhancedPerson.enhancedBind(null, 'Default');

// Test with new
const newPerson = new BoundPerson('Jane', 25);
console.log('With new:', newPerson);

// Test without new
const boundPerson = BoundPerson('Bob', 30);
console.log('Without new:', boundPerson);
