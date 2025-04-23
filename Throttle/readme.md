### Throttle Function

**Question:**
Implement a `throttle` function that ensures a given function is only called at most once in a specified time period.

The **throttle** function ensures that a given function is only executed **at most once in a specified time period**, no matter how many times it is triggered during that period.

### ✅ Features:

- `throttle(fn, limit)`: Returns a throttled version of the provided function `fn` that executes at most once every `limit` milliseconds.
- Prevents performance issues during frequent event triggers like scrolling or resizing.

# Throttle vs Debounce

| **Feature**             | **Throttle**                           | **Debounce**                         |
| ----------------------- | -------------------------------------- | ------------------------------------ |
| **Execution Frequency** | At most once every `limit` ms          | Only after `delay` ms of inactivity  |
| **Best For**            | Scroll, resize, mousemove              | Typing, search fields, autosave      |
| **Trigger Style**       | Fires repeatedly at regular intervals  | Fires once after rapid events stop   |
| **Mechanism**           | Uses timestamp to track last execution | Uses `setTimeout` to delay execution |
