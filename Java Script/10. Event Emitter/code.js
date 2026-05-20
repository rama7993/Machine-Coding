// Event Emitter Implementation
// Simple event emitter pattern

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Add event listener
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this; // Allow chaining
  }

  // Add one-time event listener
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
    return this;
  }

  // Remove event listener
  off(event, listenerToRemove) {
    if (!this.events[event]) return this;
    
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
    
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
    
    return this;
  }

  // Emit event
  emit(event, ...args) {
    if (!this.events[event]) return false;
    
    this.events[event].forEach(listener => {
      listener(...args);
    });
    
    return true;
  }

  // Get listener count
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

// Example usage
const emitter = new EventEmitter();

emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
emitter.on('greet', (name) => console.log(`Hi there, ${name}!`));

emitter.once('goodbye', () => console.log('Goodbye!'));

emitter.emit('greet', 'John'); // Both listeners fire
emitter.emit('goodbye'); // Fires once
emitter.emit('goodbye'); // Won't fire again

console.log('Greet listeners:', emitter.listenerCount('greet'));
