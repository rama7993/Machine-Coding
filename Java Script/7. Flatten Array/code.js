// Flatten Array Implementation
// Multiple implementations for flattening nested arrays

// Method 1: Recursive flatten with depth control
function flatten(arr, depth = Infinity) {
  const ans = [];
  arr.forEach((element) => {
    if (Array.isArray(element) && depth > 0) {
      // Recursively flatten the nested array, reducing the depth
      ans.push(...flatten(element, depth - 1));
    } else {
      ans.push(element);
    }
  });

  return ans;
}

// Method 2: Using reduce
function flattenArray(arr, depth = Infinity) {
  return arr.reduce((acc, curr) => {
    return Array.isArray(curr) && depth > 0
      ? acc.concat(flattenArray(curr, depth - 1))
      : acc.concat(curr);
  }, []);
}

// Method 3: Iterative approach
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr];
  
  while (stack.length > 0) {
    const item = stack.pop();
    
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }
  
  return result.reverse();
}

// Method 4: Using flat() method (ES2019+)
function flattenWithFlat(arr, depth = Infinity) {
  return arr.flat(depth);
}

// Method 5: Custom flatten with callback
function flattenWithCallback(arr, callback, depth = Infinity) {
  const result = [];
  
  function process(item, currentDepth) {
    if (Array.isArray(item) && currentDepth > 0) {
      item.forEach(subItem => process(subItem, currentDepth - 1));
    } else {
      const processed = callback ? callback(item) : item;
      result.push(processed);
    }
  }
  
  process(arr, depth);
  return result;
}

// Example arrays
const nestedArray = [
  [
    [
      [
        [1, 2, [4, 6], [7, [9]], [8]],
        [10, 11],
      ],
      [12],
    ],
    [15, 16],
  ],
];

const simpleArray = [1, [2, [3, 4], 5], 6, [7, [8, [9]]]];

// Test all methods
console.log('Original nested array:', JSON.stringify(nestedArray));
console.log('Original simple array:', JSON.stringify(simpleArray));

console.log('\n--- Method 1: Recursive with depth ---');
console.log('Depth 1:', JSON.stringify(flatten(nestedArray, 1)));
console.log('Depth 2:', JSON.stringify(flatten(nestedArray, 2)));
console.log('Depth 3:', JSON.stringify(flatten(nestedArray, 3)));
console.log('Depth Infinity:', JSON.stringify(flatten(nestedArray)));

console.log('\n--- Method 2: Reduce ---');
console.log('Reduce method:', JSON.stringify(flattenArray(nestedArray)));

console.log('\n--- Method 3: Iterative ---');
console.log('Iterative method:', JSON.stringify(flattenIterative(simpleArray)));

console.log('\n--- Method 4: Using flat() ---');
console.log('Flat method:', JSON.stringify(flattenWithFlat(simpleArray)));

console.log('\n--- Method 5: With callback ---');
const doubled = flattenWithCallback(simpleArray, x => typeof x === 'number' ? x * 2 : x);
console.log('With callback (doubled):', JSON.stringify(doubled));
