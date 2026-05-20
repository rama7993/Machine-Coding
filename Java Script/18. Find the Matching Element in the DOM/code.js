// Find the Matching Element in the DOM
// Advanced DOM element matching utilities

class DOMMatcher {
  constructor() {
    this.cache = new Map();
  }
  
  // Find element by multiple criteria
  findElement(criteria) {
    const { id, className, tagName, attributes, text } = criteria;
    
    let selector = '';
    
    if (id) selector += `#${id}`;
    if (className) selector += className ? `.${className.split(' ').join('.')}` : '';
    if (tagName) selector = selector ? `${tagName}${selector}` : tagName;
    
    let element = selector ? document.querySelector(selector) : null;
    
    // Additional filtering by attributes
    if (element && attributes) {
      for (const [attr, value] of Object.entries(attributes)) {
        if (element.getAttribute(attr) !== value) {
          element = null;
          break;
        }
      }
    }
    
    // Filter by text content
    if (element && text && !element.textContent.includes(text)) {
      element = null;
    }
    
    return element;
  }
  
  // Find all matching elements
  findAllElements(criteria) {
    const { className, tagName, attributes, text } = criteria;
    
    let selector = tagName || '*';
    if (className) selector += `.${className.split(' ').join('.')}`;
    
    const elements = Array.from(document.querySelectorAll(selector));
    
    return elements.filter(element => {
      if (attributes) {
        for (const [attr, value] of Object.entries(attributes)) {
          if (element.getAttribute(attr) !== value) {
            return false;
          }
        }
      }
      
      if (text && !element.textContent.includes(text)) {
        return false;
      }
      
      return true;
    });
  }
  
  // Find closest matching ancestor
  findClosest(element, criteria) {
    let current = element;
    
    while (current && current !== document.body) {
      if (this.matchesCriteria(current, criteria)) {
        return current;
      }
      current = current.parentElement;
    }
    
    return null;
  }
  
  // Check if element matches criteria
  matchesCriteria(element, criteria) {
    const { id, className, tagName, attributes, text } = criteria;
    
    if (id && element.id !== id) return false;
    if (className && !element.classList.contains(className)) return false;
    if (tagName && element.tagName.toLowerCase() !== tagName.toLowerCase()) return false;
    
    if (attributes) {
      for (const [attr, value] of Object.entries(attributes)) {
        if (element.getAttribute(attr) !== value) {
          return false;
        }
      }
    }
    
    if (text && !element.textContent.includes(text)) {
      return false;
    }
    
    return true;
  }
  
  // Find with caching
  findWithCache(criteria) {
    const key = JSON.stringify(criteria);
    
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const element = this.findElement(criteria);
    this.cache.set(key, element);
    
    return element;
  }
}

// Example usage (requires DOM environment)
const matcher = new DOMMatcher();

// Example criteria
const criteria = {
  tagName: 'button',
  className: 'btn-primary',
  attributes: {
    'data-action': 'submit',
    'type': 'button'
  },
  text: 'Submit'
};

// Find element
// const element = matcher.findElement(criteria);
// const allElements = matcher.findAllElements(criteria);

console.log('DOM Matcher utilities loaded');
