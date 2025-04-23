# Fetch With Retry Utility

This module provides utility functions to retry `fetch` requests either with or without a delay between attempts.

## Features

- 🔁 Retry a fetch call up to a defined number of times.
- ⏱️ Optionally wait between retries (`fetchWithRetry`).
- ⚡ Instantly retry without waiting (`fetchWithAutoRetry`).

---

## Usage

### Retry with Delay

fetchWithRetry('https://api.example.com/data', 3, 1000)
.then(data => console.log(data))
.catch(err => console.error('Failed after retries', err));
