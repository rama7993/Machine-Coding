// Array Dispatch Event on Push
// Custom array that dispatches events when modified

class EventArray extends Array {
  constructor(...items) {
    super(...items);
    this.eventTarget = new EventTarget();
  }
  
  // Override push method
  push(...items) {
    const result = super.push(...items);
    
    // Dispatch custom event
    const event = new CustomEvent('arrayPush', {
      detail: {
        items: items,
        newLength: this.length,
        timestamp: Date.now()
      }
    });
    
    this.eventTarget.dispatchEvent(event);
    return result;
  }
  
  // Override pop method
  pop() {
    const item = super.pop();
    
    const event = new CustomEvent('arrayPop', {
      detail: {
        item: item,
        newLength: this.length,
        timestamp: Date.now()
      }
    });
    
    this.eventTarget.dispatchEvent(event);
    return item;
  }
  
  // Override splice method
  splice(start, deleteCount, ...items) {
    const removedItems = super.splice(start, deleteCount, ...items);
    
    const event = new CustomEvent('arraySplice', {
      detail: {
        start: start,
        deleteCount: deleteCount,
        items: items,
        removedItems: removedItems,
        newLength: this.length,
        timestamp: Date.now()
      }
    });
    
    this.eventTarget.dispatchEvent(event);
    return removedItems;
  }
  
  // Add event listener
  addEventListener(type, listener, options) {
    this.eventTarget.addEventListener(type, listener, options);
  }
  
  // Remove event listener
  removeEventListener(type, listener, options) {
    this.eventTarget.removeEventListener(type, listener, options);
  }
}

// Alternative implementation using Proxy
function createEventfulArray(initialArray = []) {
  const array = [...initialArray];
  const eventTarget = new EventTarget();
  
  return new Proxy(array, {
    get(target, prop) {
      if (prop === 'addEventListener' || prop === 'removeEventListener') {
        return eventTarget[prop].bind(eventTarget);
      }
      
      const value = target[prop];
      
      if (typeof value === 'function' && ['push', 'pop', 'splice', 'shift', 'unshift'].includes(prop)) {
        return function(...args) {
          const result = target[prop].apply(target, args);
          
          const event = new CustomEvent(`array${prop.charAt(0).toUpperCase() + prop.slice(1)}`, {
            detail: {
              args: args,
              result: result,
              newLength: target.length,
              timestamp: Date.now()
            }
          });
          
          eventTarget.dispatchEvent(event);
          return result;
        };
      }
      
      return value;
    }
  });
}

// Example usage
const eventArray = new EventArray();

eventArray.addEventListener('arrayPush', (event) => {
  console.log('Array push event:', event.detail);
});

eventArray.addEventListener('arrayPop', (event) => {
  console.log('Array pop event:', event.detail);
});

eventArray.push(1, 2, 3); // Triggers event
eventArray.pop(); // Triggers event

// Proxy version
const proxyArray = createEventfulArray();

proxyArray.addEventListener('arrayPush', (event) => {
  console.log('Proxy array push:', event.detail);
});

proxyArray.push(4, 5, 6); // Triggers event
