class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    // Refresh key by re-inserting it at the end
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (value === null) {
      return; // Don't cache null results
    }

    if (this.cache.has(key)) {
      this.cache.delete(key); // remove old
    } else if (this.cache.size >= this.capacity) {
      // remove least recently used (first item)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // insert new
  }
}

const cache = new LRUCache(5); // limit to 5 items

// Normal Search
const inputNormal = document.getElementById("search-normal");
const resultsContainerNormal = document.getElementById("results-normal");

inputNormal.addEventListener("input", async () => {
  const query = inputNormal.value.trim();
  if (query.length === 0) {
    resultsContainerNormal.innerHTML = "";
    return;
  }

  let results = cache.get(query);
  if (!results) {
    results = await searchBackend(query);
    cache.put(query, results);
  }

  renderResults(results, resultsContainerNormal);
});

// Debounced Search
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const inputDebounced = document.getElementById("search-debounced");
const resultsContainerDebounced = document.getElementById("results-debounced");

const debouncedSearch = debounce(async () => {
  const query = inputDebounced.value.trim();
  if (query.length === 0) {
    resultsContainerDebounced.innerHTML = "";
    return;
  }

  let results = cache.get(query);
  if (!results) {
    results = await searchBackend(query);
    cache.put(query, results);
  }

  renderResults(results, resultsContainerDebounced);
}, 300);

inputDebounced.addEventListener("input", debouncedSearch);

function renderResults(items, container) {
  console.log(items);
  if (!Array.isArray(items)) {
    items = [];
  }

  if (items.length === 0) {
    container.innerHTML = "<li>No results found</li>";
  } else {
    container.innerHTML = items
      .map((item) => `<li>${item.title || item}</li>`)
      .join("");
  }
}

// Mock Data
const mockData = [
  "apple",
  "applet",
  "application",
  "banana",
  "band",
  "cat",
  "car",
  "cap",
  "cape",
  "cater",
];

function searchBackend(query) {
  // Use mock data for testing
  // return mockData.filter((item) => item.startsWith(query.toLowerCase()));

  // Real Data Fetch
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      return data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    })
    .catch((err) => {
      console.error("API error:", err);
      return [];
    });
}
