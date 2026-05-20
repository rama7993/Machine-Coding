// Extended Event Emitter Implementation
// Advanced event emitter with additional features

class ExtendedEventEmitter {
  constructor(options = {}) {
    this.events = new Map();
    this.maxListeners = options.maxListeners || 10;
    this.captureRejections = options.captureRejections || false;
    this.wildcardEvents = new Map();
  }
  
  // Add event listener with options
  on(event, listener, options = {}) {
    const { once = false, priority = 0, passive = false } = options;
    
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    
    const listeners = this.events.get(event);
    
    if (listeners.length >= this.maxListeners) {
      console.warn(`MaxListenersExceededWarning: ${event} has ${listeners.length} listeners`);
    }
    
    const listenerWrapper = {
      fn: listener,
      once,
      priority,
      passive,
      id: Symbol('listener')
    };
    
    listeners.push(listenerWrapper);
    
    // Sort by priority (higher priority first)
    listeners.sort((a, b) => b.priority - a.priority);
    
    return this; // Allow chaining
  }
  
  // Add one-time listener
  once(event, listener, options = {}) {
    return this.on(event, listener, { ...options, once: true });
  }
  
  // Add passive listener (errors are ignored)
  onPassive(event, listener, options = {}) {
    return this.on(event, listener, { ...options, passive: true });
  }
  
  // Add wildcard listener (matches events with pattern)
  onPattern(pattern, listener, options = {}) {
    if (!this.wildcardEvents.has(pattern)) {
      this.wildcardEvents.set(pattern, []);
    }
    
    this.wildcardEvents.get(pattern).push({
      fn: listener,
      once: options.once || false,
      priority: options.priority || 0,
      id: Symbol('wildcard-listener')
    });
    
    return this;
  }
  
  // Remove listener
  off(event, listener) {
    if (!this.events.has(event)) return this;
    
    const listeners = this.events.get(event);
    const index = listeners.findIndex(l => l.fn === listener);
    
    if (index !== -1) {
      listeners.splice(index, 1);
      
      if (listeners.length === 0) {
        this.events.delete(event);
      }
    }
    
    return this;
  }
  
  // Remove all listeners for event
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
      this.wildcardEvents.clear();
    }
    
    return this;
  }
  
  // Emit event with error handling
  async emit(event, ...args) {
    const results = [];
    
    // Regular listeners
    if (this.events.has(event)) {
      const listeners = [...this.events.get(event)];
      
      for (const listenerWrapper of listeners) {
        try {
          const result = await this.executeListener(listenerWrapper, args);
          results.push(result);
          
          if (listenerWrapper.once) {
            this.off(event, listenerWrapper.fn);
          }
        } catch (error) {
          if (!listenerWrapper.passive) {
            if (this.captureRejections) {
              this.emit('error', error);
            } else {
              throw error;
            }
          }
        }
      }
    }
    
    // Wildcard listeners
    for (const [pattern, patternListeners] of this.wildcardEvents) {
      if (this.matchesPattern(event, pattern)) {
        const listeners = [...patternListeners];
        
        for (const listenerWrapper of listeners) {
          try {
            const result = await this.executeListener(listenerWrapper, [event, ...args]);
            results.push(result);
            
            if (listenerWrapper.once) {
              patternListeners.splice(patternListeners.indexOf(listenerWrapper), 1);
            }
          } catch (error) {
            if (!listenerWrapper.passive) {
              if (this.captureRejections) {
                this.emit('error', error);
              } else {
                throw error;
              }
            }
          }
        }
      }
    }
    
    return results;
  }
  
  // Execute listener with timeout
  async executeListener(listenerWrapper, args) {
    const { fn, timeout } = listenerWrapper;
    
    if (timeout) {
      return Promise.race([
        fn(...args),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Listener timeout')), timeout)
        )
      ]);
    }
    
    return fn(...args);
  }
  
  // Check if event matches pattern
  matchesPattern(event, pattern) {
    if (pattern === '*') return true;
    
    if (pattern.includes('*')) {
      const regex = new RegExp(
        pattern.replace(/\*/g, '.*').replace(/\?/g, '.')
      );
      return regex.test(event);
    }
    
    return event === pattern;
  }
  
  // Get listener count
  listenerCount(event) {
    const count = this.events.has(event) ? this.events.get(event).length : 0;
    
    // Add wildcard listeners that match
    let wildcardCount = 0;
    for (const pattern of this.wildcardEvents.keys()) {
      if (this.matchesPattern(event, pattern)) {
        wildcardCount += this.wildcardEvents.get(pattern).length;
      }
    }
    
    return count + wildcardCount;
  }
  
  // Get all event names
  eventNames() {
    return [...this.events.keys()];
  }
  
  // Set max listeners
  setMaxListeners(n) {
    this.maxListeners = n;
  }
  
  // Get max listeners
  getMaxListeners() {
    return this.maxListeners;
  }
  
  // Create event namespace
  namespace(name) {
    return {
      on: (event, ...args) => this.on(`${name}:${event}`, ...args),
      once: (event, ...args) => this.once(`${name}:${event}`, ...args),
      emit: (event, ...args) => this.emit(`${name}:${event}`, ...args),
      off: (event, ...args) => this.off(`${name}:${event}`, ...args)
    };
  }
}

// Example usage
const emitter = new ExtendedEventEmitter({
  maxListeners: 5,
  captureRejections: true
});

// Basic usage
emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
emitter.on('greet', (name) => console.log(`Hi, ${name}!`), { priority: 10 });

// Priority example
emitter.on('priority-test', () => console.log('Low priority'), { priority: 1 });
emitter.on('priority-test', () => console.log('High priority'), { priority: 10 });

// Once listener
emitter.once('goodbye', () => console.log('Goodbye!'));

// Passive listener (errors ignored)
emitter.onPassive('risky', () => {
  throw new Error('This error will be ignored');
});

// Wildcard pattern
emitter.onPattern('user:*', (event, data) => {
  console.log(`User event: ${event}`, data);
});

// Namespace
const userEvents = emitter.namespace('user');
userEvents.on('login', (user) => console.log('User logged in:', user));

// Test events
emitter.emit('greet', 'John');
emitter.emit('priority-test');
emitter.emit('goodbye');
emitter.emit('risky');
emitter.emit('user:created', { id: 1, name: 'John' });
userEvents.emit('login', { id: 1, name: 'John' });

console.log('Greet listeners:', emitter.listenerCount('greet'));
console.log('All events:', emitter.eventNames());
