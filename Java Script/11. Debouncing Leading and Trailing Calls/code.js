// Debouncing with Leading and Trailing Calls
// Advanced debounce implementation

function debounce(func, delay, options = {}) {
  const { leading = false, trailing = true, maxWait } = options;
  
  let timeoutId;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  let lastArgs;
  let lastThis;
  let result;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function shouldInvokeLeading(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    
    return (lastCallTime === 0 || timeSinceLastCall >= delay || 
            timeSinceLastCall < 0 || (maxWait && timeSinceLastInvoke >= maxWait));
  }

  function trailingEdge(time) {
    timeoutId = undefined;
    
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvokeLeading(time)) {
      return trailingEdge(time);
    }
    
    const remainingWait = delay - (time - lastCallTime);
    timeoutId = setTimeout(timerExpired, remainingWait);
  }

  function leadingEdge(time) {
    lastInvokeTime = time;
    timeoutId = setTimeout(timerExpired, delay);
    return leading ? invokeFunc(time) : result;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvokeLeading(time);
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    
    if (isInvoking) {
      if (timeoutId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxWait) {
        timeoutId = setTimeout(timerExpired, delay);
        return invokeFunc(lastCallTime);
      }
    }
    
    if (timeoutId === undefined) {
      timeoutId = setTimeout(timerExpired, delay);
    }
    
    return result;
  }

  debounced.cancel = function() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = lastCallTime = 0;
    lastArgs = lastThis = timeoutId = undefined;
  };

  debounced.flush = function() {
    return timeoutId === undefined ? result : trailingEdge(Date.now());
  };

  return debounced;
}

// Example usage
const expensiveOperation = debounce((value) => {
  console.log('Executing expensive operation with:', value);
}, 1000, { leading: true, trailing: true });

// Test rapid calls
expensiveOperation('call1');
expensiveOperation('call2');
expensiveOperation('call3');

setTimeout(() => expensiveOperation('call4'), 500);
setTimeout(() => expensiveOperation('call5'), 1500);
