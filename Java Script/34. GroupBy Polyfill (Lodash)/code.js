// GroupBy Polyfill (Lodash-style)
// Group array elements by a specified criterion

// Basic groupBy implementation
function groupBy(collection, iteratee) {
  const result = {};
  
  if (typeof iteratee === 'string') {
    // Property accessor
    for (const item of collection) {
      const key = item[iteratee];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
  } else if (typeof iteratee === 'function') {
    // Function iteratee
    for (const item of collection) {
      const key = iteratee(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
  } else if (Array.isArray(iteratee)) {
    // Property path array
    for (const item of collection) {
      const key = getNestedProperty(item, iteratee);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
  }
  
  return result;
}

// Helper to get nested property
function getNestedProperty(obj, path) {
  let current = obj;
  for (const key of path) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}

// Enhanced groupBy with options
function groupByEnhanced(collection, iteratee, options = {}) {
  const { transform, includeUndefined = true, sortBy } = options;
  const result = {};
  
  for (const item of collection) {
    let key;
    
    if (typeof iteratee === 'string') {
      key = item[iteratee];
    } else if (typeof iteratee === 'function') {
      key = iteratee(item);
    } else if (Array.isArray(iteratee)) {
      key = getNestedProperty(item, iteratee);
    }
    
    // Handle undefined keys
    if (key === undefined && !includeUndefined) {
      continue;
    }
    
    // Transform key if needed
    if (transform) {
      key = transform(key);
    }
    
    if (!result[key]) {
      result[key] = [];
    }
    
    result[key].push(item);
  }
  
  // Sort groups if needed
  if (sortBy) {
    for (const key in result) {
      result[key].sort(sortBy);
    }
  }
  
  return result;
}

// Group by multiple criteria
function groupByMultiple(collection, ...iteratees) {
  let result = collection;
  
  for (const iteratee of iteratees) {
    result = Object.entries(groupBy(result, iteratee))
      .reduce((acc, [key, items]) => {
        acc[key] = items;
        return acc;
      }, {});
  }
  
  return result;
}

// Group by with counting
function groupByCount(collection, iteratee) {
  const groups = groupBy(collection, iteratee);
  const result = {};
  
  for (const key in groups) {
    result[key] = groups[key].length;
  }
  
  return result;
}

// Group by with aggregation
function groupByAggregate(collection, iteratee, aggregator) {
  const groups = groupBy(collection, iteratee);
  const result = {};
  
  for (const key in groups) {
    result[key] = aggregator(groups[key]);
  }
  
  return result;
}

// Group by with custom accumulator
function groupByReduce(collection, iteratee, accumulator, initialValue) {
  const groups = groupBy(collection, iteratee);
  const result = {};
  
  for (const key in groups) {
    result[key] = groups[key].reduce(accumulator, initialValue);
  }
  
  return result;
}

// Example usage

const people = [
  { name: 'John', age: 30, department: 'Engineering', salary: 80000 },
  { name: 'Alice', age: 25, department: 'Marketing', salary: 60000 },
  { name: 'Bob', age: 35, department: 'Engineering', salary: 90000 },
  { name: 'Carol', age: 28, department: 'Engineering', salary: 75000 },
  { name: 'David', age: 32, department: 'Marketing', salary: 65000 },
  { name: 'Eve', age: 29, department: 'HR', salary: 55000 }
];

// Basic groupBy
console.log('Grouped by department:', groupBy(people, 'department'));

// Group by age range
console.log('Grouped by age range:', groupBy(people, (person) => {
  if (person.age < 30) return 'Young';
  if (person.age < 35) return 'Mid';
  return 'Senior';
}));

// Group by with transformation
console.log('Grouped by department (lowercase):', 
  groupByEnhanced(people, 'department', { transform: key => key?.toLowerCase() })
);

// Group by with sorting
console.log('Grouped by department (sorted by salary):',
  groupByEnhanced(people, 'department', { sortBy: (a, b) => a.salary - b.salary })
);

// Group by with counting
console.log('Count by department:', groupByCount(people, 'department'));

// Group by with aggregation
console.log('Average salary by department:', 
  groupByAggregate(people, 'department', (group) => {
    const totalSalary = group.reduce((sum, person) => sum + person.salary, 0);
    return Math.round(totalSalary / group.length);
  })
);

// Group by with custom reduce
console.log('Salary statistics by department:',
  groupByReduce(people, 'department', (acc, person) => {
    acc.count++;
    acc.totalSalary += person.salary;
    acc.minSalary = Math.min(acc.minSalary, person.salary);
    acc.maxSalary = Math.max(acc.maxSalary, person.salary);
    return acc;
  }, { count: 0, totalSalary: 0, minSalary: Infinity, maxSalary: 0 })
);

// Complex nested property grouping
const nestedData = [
  { user: { profile: { department: 'Engineering' } }, score: 85 },
  { user: { profile: { department: 'Marketing' } }, score: 90 },
  { user: { profile: { department: 'Engineering' } }, score: 78 }
];

console.log('Grouped by nested property:', 
  groupBy(nestedData, ['user', 'profile', 'department'])
);

// Multiple criteria grouping
console.log('Grouped by department then age range:',
  groupByMultiple(people, 'department', (person) => {
    if (person.age < 30) return 'Young';
    return 'Mid';
  })
);

// Add to Array prototype (polyfill style)
if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function(iteratee, options) {
    return groupByEnhanced(this, iteratee, options);
  };
}

// Using the polyfill
console.log('Using polyfill:', people.groupBy('department'));
