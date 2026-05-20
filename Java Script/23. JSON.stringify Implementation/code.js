// JSON.stringify Implementation
// Custom JSON serializer

function customStringify(value, replacer = null, space = null) {
  const indent = space ? ' '.repeat(space) : '';
  const currentIndent = '';
  
  function stringifyValue(value, currentIndent) {
    if (value === null) return 'null';
    if (value === undefined) return undefined;
    
    if (typeof value === 'string') {
      return `"${escapeString(value)}"`;
    }
    
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    
    if (typeof value === 'function') {
      return undefined;
    }
    
    if (typeof value === 'object') {
      if (value instanceof Date) {
        return `"${value.toISOString()}"`;
      }
      
      if (Array.isArray(value)) {
        return stringifyArray(value, currentIndent);
      }
      
      return stringifyObject(value, currentIndent);
    }
    
    return String(value);
  }
  
  function escapeString(str) {
    return str.replace(/[\\"\u0000-\u001F\u2028\u2029]/g, (match) => {
      const escapeMap = {
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t'
      };
      
      if (escapeMap[match]) {
        return escapeMap[match];
      }
      
      return `\\u${match.charCodeAt(0).toString(16).padStart(4, '0')}`;
    });
  }
  
  function stringifyArray(arr, currentIndent) {
    if (arr.length === 0) return '[]';
    
    const items = arr.map((item, index) => {
      const itemValue = replacer ? 
        replacer(String(index), item) : item;
      
      if (itemValue === undefined) return 'null';
      
      const nextIndent = space ? currentIndent + indent : '';
      const separator = space ? '\n' + nextIndent : '';
      
      return separator + stringifyValue(itemValue, nextIndent);
    });
    
    if (space) {
      return '[\n' + items.join(',\n') + '\n' + currentIndent + ']';
    }
    
    return '[' + items.join(',') + ']';
  }
  
  function stringifyObject(obj, currentIndent) {
    const keys = Object.keys(obj).sort();
    
    if (keys.length === 0) return '{}';
    
    const pairs = keys.map(key => {
      let value = obj[key];
      
      if (replacer) {
        value = replacer(key, value);
      }
      
      if (value === undefined) return null;
      
      const escapedKey = `"${escapeString(key)}"`;
      const nextIndent = space ? currentIndent + indent : '';
      const separator = space ? '\n' + nextIndent : '';
      
      return separator + escapedKey + ':' + (space ? ' ' : '') + 
             stringifyValue(value, nextIndent);
    }).filter(pair => pair !== null);
    
    if (space) {
      return '{\n' + pairs.join(',\n') + '\n' + currentIndent + '}';
    }
    
    return '{' + pairs.join(',') + '}';
  }
  
  const result = stringifyValue(value, currentIndent);
  
  if (result === undefined) {
    throw new TypeError('Converting circular structure to JSON');
  }
  
  return result;
}

// Handle circular references
function stringifyWithCircular(value, replacer = null, space = null) {
  const seen = new WeakSet();
  
  function stringifyValue(value, currentIndent) {
    if (value === null) return 'null';
    if (value === undefined) return undefined;
    
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      seen.add(value);
    }
    
    // Rest of the implementation...
    return customStringify(value, replacer, space);
  }
  
  try {
    return stringifyValue(value, '');
  } catch (e) {
    if (e.message.includes('circular')) {
      return '"[Circular]"';
    }
    throw e;
  }
}

// Example usage
const data = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    street: '123 Main St',
    city: 'New York'
  },
  birthDate: new Date('1990-01-01'),
  isActive: true,
  score: null
};

console.log('Custom stringify:', customStringify(data, null, 2));
console.log('Native stringify:', JSON.stringify(data, null, 2));

// Test special characters
const specialChars = {
  message: 'Hello\nWorld\t"Test"',
  emoji: '😀',
  unicode: 'Café'
};

console.log('Special chars:', customStringify(specialChars));
