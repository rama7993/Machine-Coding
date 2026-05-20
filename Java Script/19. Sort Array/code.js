// Sort Array Implementation
// Various sorting algorithms

// Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Bubble Sort
function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}

// Selection Sort
function selectionSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}

// Insertion Sort
function insertionSort(arr) {
  const result = [...arr];
  
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;
    
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }
    
    result[j + 1] = key;
  }
  
  return result;
}

// Custom comparator sort
function customSort(arr, compareFn) {
  return [...arr].sort(compareFn);
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];

console.log('Original:', numbers);
console.log('Quick Sort:', quickSort(numbers));
console.log('Merge Sort:', mergeSort(numbers));
console.log('Bubble Sort:', bubbleSort(numbers));
console.log('Selection Sort:', selectionSort(numbers));
console.log('Insertion Sort:', insertionSort(numbers));

// Sort objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

const sortedByName = customSort(users, (a, b) => a.name.localeCompare(b.name));
const sortedByAge = customSort(users, (a, b) => a.age - b.age);

console.log('Sorted by name:', sortedByName);
console.log('Sorted by age:', sortedByAge);
