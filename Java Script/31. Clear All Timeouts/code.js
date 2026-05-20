// Clear All Timeouts Implementation
// Function to clear all active timeouts

class TimeoutManager {
  constructor() {
    this.timeouts = new Set();
    this.originalSetTimeout = window.setTimeout;
    this.originalClearTimeout = window.clearTimeout;
    this.setupInterceptors();
  }
  
  setupInterceptors() {
    window.setTimeout = (...args) => {
      const timeoutId = this.originalSetTimeout(...args);
      this.timeouts.add(timeoutId);
      return timeoutId;
    };
    
    window.clearTimeout = (timeoutId) => {
      this.timeouts.delete(timeoutId);
      return this.originalClearTimeout(timeoutId);
    };
  }
  
  clearAll() {
    for (const timeoutId of this.timeouts) {
      this.originalClearTimeout(timeoutId);
    }
    this.timeouts.clear();
  }
  
  getActiveCount() {
    return this.timeouts.size;
  }
  
  getActiveTimeouts() {
    return Array.from(this.timeouts);
  }
  
  restore() {
    window.setTimeout = this.originalSetTimeout;
    window.clearTimeout = this.originalClearTimeout;
  }
}

// Simple function to clear all timeouts
function clearAllTimeouts() {
  const highestTimeoutId = setTimeout(() => {
    // This will be the highest timeout ID
  }, 0);
  
  for (let i = 0; i <= highestTimeoutId; i++) {
    clearTimeout(i);
  }
}

// Enhanced version with tracking
function createTimeoutTracker() {
  const timeouts = new Set();
  const originalSetTimeout = setTimeout;
  const originalClearTimeout = clearTimeout;
  
  const trackedSetTimeout = (...args) => {
    const timeoutId = originalSetTimeout(...args);
    timeouts.add(timeoutId);
    return timeoutId;
  };
  
  const trackedClearTimeout = (timeoutId) => {
    timeouts.delete(timeoutId);
    return originalClearTimeout(timeoutId);
  };
  
  const clearAll = () => {
    for (const timeoutId of timeouts) {
      originalClearTimeout(timeoutId);
    }
    timeouts.clear();
  };
  
  const getActiveCount = () => timeouts.size;
  const getActiveTimeouts = () => Array.from(timeouts);
  
  return {
    setTimeout: trackedSetTimeout,
    clearTimeout: trackedClearTimeout,
    clearAll,
    getActiveCount,
    getActiveTimeouts
  };
}

// Timeout with automatic cleanup
class AutoTimeout {
  constructor(callback, delay, options = {}) {
    this.callback = callback;
    this.delay = delay;
    this.autoClear = options.autoClear || false;
    this.id = null;
    this.cleared = false;
    
    if (options.immediate) {
      this.start();
    }
  }
  
  start() {
    if (this.id) return this;
    
    this.id = setTimeout(() => {
      if (!this.cleared) {
        this.callback();
        if (this.autoClear) {
          this.clear();
        }
      }
    }, this.delay);
    
    return this;
  }
  
  clear() {
    if (this.id) {
      clearTimeout(this.id);
      this.id = null;
      this.cleared = true;
    }
    return this;
  }
  
  restart() {
    this.clear();
    return this.start();
  }
}

// Example usage
const manager = new TimeoutManager();

// Create some timeouts
const timeout1 = setTimeout(() => console.log('Timeout 1'), 1000);
const timeout2 = setTimeout(() => console.log('Timeout 2'), 2000);
const timeout3 = setTimeout(() => console.log('Timeout 3'), 3000);

console.log('Active timeouts:', manager.getActiveCount());

// Clear all after 1.5 seconds
setTimeout(() => {
  console.log('Clearing all timeouts...');
  manager.clearAll();
  console.log('Active timeouts after clear:', manager.getActiveCount());
}, 1500);

// Using the tracker
const tracker = createTimeoutTracker();
setTimeout = tracker.setTimeout;
clearTimeout = tracker.clearTimeout;

const t1 = setTimeout(() => console.log('Tracked timeout 1'), 1000);
const t2 = setTimeout(() => console.log('Tracked timeout 2'), 1500);

console.log('Tracker active count:', tracker.getActiveCount());

// Using AutoTimeout
const autoTimeout = new AutoTimeout(() => {
  console.log('Auto timeout executed');
}, 1000, { autoClear: true });

autoTimeout.start();
