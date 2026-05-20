// Single and Double Click Handlers Implementation
// Handle both single and double clicks on the same element

class ClickHandler {
  constructor(element, options = {}) {
    this.element = element;
    this.singleClickCallback = options.onSingleClick;
    this.doubleClickCallback = options.onDoubleClick;
    this.delay = options.delay || 300;
    this.timeoutId = null;
    this.clickCount = 0;
    this.lastClickTime = 0;
    
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }
  
  handleClick(event) {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;
    
    this.clickCount++;
    this.lastClickTime = currentTime;
    
    if (this.clickCount === 1) {
      // First click - wait to see if it's a double click
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          // Single click
          this.singleClickCallback?.(event);
        }
        this.reset();
      }, this.delay);
    } else if (this.clickCount === 2) {
      // Double click detected
      clearTimeout(this.timeoutId);
      this.doubleClickCallback?.(event);
      this.reset();
    }
  }
  
  reset() {
    this.clickCount = 0;
    this.timeoutId = null;
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    clearTimeout(this.timeoutId);
  }
}

// Advanced click handler with triple click support
class AdvancedClickHandler {
  constructor(element, options = {}) {
    this.element = element;
    this.callbacks = {
      single: options.onSingleClick,
      double: options.onDoubleClick,
      triple: options.onTripleClick
    };
    this.delays = {
      double: options.doubleDelay || 300,
      triple: options.tripleDelay || 500
    };
    this.clickCount = 0;
    this.lastClickTime = 0;
    this.timeoutId = null;
    
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }
  
  handleClick(event) {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;
    
    this.clickCount++;
    this.lastClickTime = currentTime;
    
    clearTimeout(this.timeoutId);
    
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.callbacks.single?.(event);
        }
        this.reset();
      }, this.delays.double);
    } else if (this.clickCount === 2) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 2) {
          this.callbacks.double?.(event);
        }
        this.reset();
      }, this.delays.triple);
    } else if (this.clickCount === 3) {
      this.callbacks.triple?.(event);
      this.reset();
    }
  }
  
  reset() {
    this.clickCount = 0;
    this.timeoutId = null;
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    clearTimeout(this.timeoutId);
  }
}

// Click handler with gesture detection
class GestureClickHandler {
  constructor(element, options = {}) {
    this.element = element;
    this.callbacks = {
      single: options.onSingleClick,
      double: options.onDoubleClick,
      longPress: options.onLongPress
    };
    this.delays = {
      double: options.doubleDelay || 300,
      longPress: options.longPressDelay || 500
    };
    this.clickCount = 0;
    this.lastClickTime = 0;
    this.longPressTimeoutId = null;
    this.doubleClickTimeoutId = null;
    this.isLongPress = false;
    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
    this.element.addEventListener('mousedown', this.handleMouseDown);
    this.element.addEventListener('mouseup', this.handleMouseUp);
    this.element.addEventListener('click', this.handleClick);
  }
  
  handleMouseDown(event) {
    this.isLongPress = false;
    
    this.longPressTimeoutId = setTimeout(() => {
      this.isLongPress = true;
      this.callbacks.longPress?.(event);
    }, this.delays.longPress);
  }
  
  handleMouseUp(event) {
    clearTimeout(this.longPressTimeoutId);
  }
  
  handleClick(event) {
    if (this.isLongPress) return;
    
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;
    
    this.clickCount++;
    this.lastClickTime = currentTime;
    
    clearTimeout(this.doubleClickTimeoutId);
    
    if (this.clickCount === 1) {
      this.doubleClickTimeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.callbacks.single?.(event);
        }
        this.reset();
      }, this.delays.double);
    } else if (this.clickCount === 2) {
      this.callbacks.double?.(event);
      this.reset();
    }
  }
  
  reset() {
    this.clickCount = 0;
    this.doubleClickTimeoutId = null;
    this.isLongPress = false;
  }
  
  destroy() {
    this.element.removeEventListener('mousedown', this.handleMouseDown);
    this.element.removeEventListener('mouseup', this.handleMouseUp);
    this.element.removeEventListener('click', this.handleClick);
    clearTimeout(this.longPressTimeoutId);
    clearTimeout(this.doubleClickTimeoutId);
  }
}

// Utility function for simple usage
function setupClickHandlers(element, options) {
  return new ClickHandler(element, options);
}

// Example usage (requires DOM environment)
function demonstrateClickHandlers() {
  // Create a demo button
  const button = document.createElement('button');
  button.textContent = 'Click me!';
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.margin = '10px';
  
  document.body.appendChild(button);
  
  // Basic click handler
  const basicHandler = new ClickHandler(button, {
    onSingleClick: (event) => {
      console.log('Single click detected!');
      button.style.backgroundColor = 'lightblue';
      setTimeout(() => button.style.backgroundColor = '', 200);
    },
    onDoubleClick: (event) => {
      console.log('Double click detected!');
      button.style.backgroundColor = 'lightgreen';
      setTimeout(() => button.style.backgroundColor = '', 200);
    }
  });
  
  // Advanced handler with triple click
  const advancedButton = document.createElement('button');
  advancedButton.textContent = 'Advanced Click Handler';
  advancedButton.style.padding = '10px 20px';
  advancedButton.style.fontSize = '16px';
  advancedButton.style.margin = '10px';
  
  document.body.appendChild(advancedButton);
  
  const advancedHandler = new AdvancedClickHandler(advancedButton, {
    onSingleClick: (event) => console.log('Single click!'),
    onDoubleClick: (event) => console.log('Double click!'),
    onTripleClick: (event) => console.log('Triple click!')
  });
  
  // Gesture handler with long press
  const gestureButton = document.createElement('button');
  gestureButton.textContent = 'Gesture Handler (Try Long Press)';
  gestureButton.style.padding = '10px 20px';
  gestureButton.style.fontSize = '16px';
  gestureButton.style.margin = '10px';
  
  document.body.appendChild(gestureButton);
  
  const gestureHandler = new GestureClickHandler(gestureButton, {
    onSingleClick: (event) => console.log('Single click!'),
    onDoubleClick: (event) => console.log('Double click!'),
    onLongPress: (event) => console.log('Long press detected!')
  });
  
  // Info text
  const info = document.createElement('div');
  info.innerHTML = `
    <p>Try different click patterns:</p>
    <ul>
      <li>Single click - triggers single click handler</li>
      <li>Double click - triggers double click handler</li>
      <li>Triple click (advanced button) - triggers triple click handler</li>
      <li>Long press (gesture button) - triggers long press handler</li>
    </ul>
  `;
  document.body.appendChild(info);
  
  return { basicHandler, advancedHandler, gestureHandler };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ClickHandler,
    AdvancedClickHandler,
    GestureClickHandler,
    setupClickHandlers,
    demonstrateClickHandlers
  };
}

// Example usage without DOM
console.log('Click Handler implementations loaded');
console.log('Available classes: ClickHandler, AdvancedClickHandler, GestureClickHandler');

// Test logic demonstration
function testClickHandlerLogic() {
  const mockElement = {
    addEventListener: (event, handler) => console.log(`Added ${event} listener`),
    removeEventListener: (event, handler) => console.log(`Removed ${event} listener`)
  };
  
  const handler = new ClickHandler(mockElement, {
    onSingleClick: () => console.log('Single click!'),
    onDoubleClick: () => console.log('Double click!')
  });
  
  console.log('Click handler created successfully');
  handler.destroy();
}

// Uncomment to test
// testClickHandlerLogic();
