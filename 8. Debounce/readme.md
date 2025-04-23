# Debounce Function

This is a simple debounce function that delays the execution of a given function until after a specified wait time has elapsed since the last time it was invoked.

## Features:

- `debounce(fn, delay)`: Returns a debounced version of the provided function `fn` that delays its invocation until after the `delay` time has passed since the last call.
- `clearTimeout(timer)`: Clears any previously set timeout to ensure that the debounced function only gets invoked once after the specified delay.

## Example Usage:

const debouncedFunction = debounce((msg) => console.log(msg), 1000);
debouncedFunction("Hello World!"); // Executes after 1 second if no further calls are made within that time.
debouncedFunction("Another message!"); // Resets the timeout, so the previous message is not logged.

# Debounce vs Throttle 

| **Feature**             | **Throttle**                           | **Debounce**                         |
| ----------------------- | -------------------------------------- | ------------------------------------ |
| **Execution Frequency** | At most once every `limit` ms          | Only after `delay` ms of inactivity  |
| **Best For**            | Scroll, resize, mousemove              | Typing, search fields, autosave      |
| **Trigger Style**       | Fires repeatedly at regular intervals  | Fires once after rapid events stop   |
| **Mechanism**           | Uses timestamp to track last execution | Uses `setTimeout` to delay execution |
