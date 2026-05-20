# 🔍 TypeAhead Search Using LRU Cache

This project implements a **TypeAhead (autocomplete) search** functionality using an **LRU (Least Recently Used) Cache** to improve performance by caching recent search queries and their results.

## 📌 Features

- 🔎 Fast and responsive search suggestions as you type
- ⚡ Optimized using LRU caching to reduce redundant data fetching
- 🧠 Caches recent search terms and their corresponding results
- ⏱️ Automatically evicts least recently used items when the cache limit is exceeded

## 🛠️ Technologies Used

- JavaScript / TypeScript
- HTML / CSS (for UI)
- LRU Cache implementation (custom or library-based)

## 🧠 How It Works

1. As the user types, a keyup event triggers the search logic.
2. The input query is checked in the LRU cache.
   - If **found**, suggestions are se rved from the cache.
   - If **not found**, a simulated fetch or API call is made and results are cached.
3. The LRU cache ensures only the most recent N search terms are retained, evicting the least used ones.

## 🧪 Example

```js
const cache = new LRUCache(5); // max 5 items in cache
cache.put("apple", ["apple", "apple pie"]);
cache.get("apple"); // ["apple", "apple pie"]
```
