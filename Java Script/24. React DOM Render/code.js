// React DOM Render Implementation
// Simplified React DOM rendering process

// Virtual Element class
class VirtualElement {
  constructor(type, props = {}, children = []) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

// createElement function (React.createElement equivalent)
function createElement(type, props = {}, ...children) {
  return new VirtualElement(type, props, children.flat());
}

// Simple DOM renderer
class SimpleRenderer {
  static render(virtualElement, container) {
    // Clear container
    container.innerHTML = '';
    
    // Render the virtual element
    const domElement = this.createDOMElement(virtualElement);
    container.appendChild(domElement);
  }
  
  static createDOMElement(virtualElement) {
    if (typeof virtualElement === 'string' || typeof virtualElement === 'number') {
      return document.createTextNode(virtualElement);
    }
    
    if (virtualElement.type === 'fragment') {
      const fragment = document.createDocumentFragment();
      virtualElement.children.forEach(child => {
        fragment.appendChild(this.createDOMElement(child));
      });
      return fragment;
    }
    
    const domElement = document.createElement(virtualElement.type);
    
    // Set attributes
    if (virtualElement.props) {
      Object.keys(virtualElement.props).forEach(key => {
        if (key === 'className') {
          domElement.className = virtualElement.props[key];
        } else if (key === 'style' && typeof virtualElement.props[key] === 'object') {
          Object.assign(domElement.style, virtualElement.props[key]);
        } else if (key.startsWith('on') && typeof virtualElement.props[key] === 'function') {
          const eventType = key.slice(2).toLowerCase();
          domElement.addEventListener(eventType, virtualElement.props[key]);
        } else {
          domElement.setAttribute(key, virtualElement.props[key]);
        }
      });
    }
    
    // Add children
    if (virtualElement.children) {
      virtualElement.children.forEach(child => {
        domElement.appendChild(this.createDOMElement(child));
      });
    }
    
    return domElement;
  }
}

// Component system
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (this._render) {
      this._render();
    }
  }
  
  render() {
    throw new Error('render method must be implemented');
  }
}

// Component renderer
function renderComponent(component, container) {
  component._render = () => {
    const virtualElement = component.render();
    SimpleRenderer.render(virtualElement, container);
  };
  
  component._render();
}

// Example components
class Welcome extends Component {
  render() {
    return createElement(
      'div',
      { className: 'welcome' },
      `Welcome, ${this.props.name}!`
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return createElement(
      'div',
      { className: 'counter' },
      createElement('h2', {}, 'Counter Component'),
      createElement('p', {}, `Count: ${this.state.count}`),
      createElement(
        'button',
        { onClick: this.increment },
        'Increment'
      )
    );
  }
}

// Example usage (requires DOM environment)
const app = createElement(
  'div',
  { className: 'app' },
  createElement('h1', {}, 'Simple React-like Renderer'),
  createElement(Welcome, { name: 'John' }),
  createElement(Counter)
);

// In a browser environment:
// const container = document.getElementById('root');
// SimpleRenderer.render(app, container);

// For component rendering:
// const counter = new Counter();
// renderComponent(counter, document.getElementById('counter-container'));

console.log('React DOM Render implementation loaded');
console.log('Virtual element created:', app);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createElement,
    SimpleRenderer,
    Component,
    renderComponent,
    Welcome,
    Counter
  };
}
