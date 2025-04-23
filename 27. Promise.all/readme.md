# Custom Promise.all

## Description

This is a custom implementation of the `Promise.all` method. It accepts an array of promises and returns a new promise that:

- Resolves when **all** promises resolve, with an array of results in the same order.
- Rejects **immediately** if **any** promise rejects.

## Usage

### JavaScript
```js
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]
