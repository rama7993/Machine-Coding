# Calculator with Method Chaining

This is a simple calculator that supports method chaining in JavaScript.

## Features:
- `add(num)`: Adds a number to the current value.
- `subtract(num)`: Subtracts a number from the current value.
- `multiply(num)`: Multiplies the current value by a number.
- `divide(num)`: Divides the current value by a number (throws error if dividing by zero).
- `getValue()`: Returns the current value.

## Example Usage:

```js
const calc = new Calculator(0);
const result = calc.add(5).subtract(2).multiply(3).getValue();
console.log(result);  // Output: 9
