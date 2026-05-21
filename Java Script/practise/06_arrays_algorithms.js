/* ==========================================================================
   06_ARRAYS_ALGORITHMS.JS
   Covers basic Array utilities (map, filter, reduce), Set usage, String 
   reversal, Palindrome checks, Character counts, Flattening, Sorting, and Math.max.
   ========================================================================== */

// -----------------------------------------
// 12. ARRAY METHODS
// -----------------------------------------

const nums = [1, 2, 3, 4];

// Q81: nums.map(...) => [2, 4, 6, 8]
// Explain: .map() creates a new array populated with the results of calling a provided function on every element.
const mapResult = nums.map((n) => n * 2);
console.log("Q81", mapResult); 

// Q82: nums.filter(...) => [2, 4]
// Explain: .filter() creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test.
const filterResult = nums.filter((n) => n % 2 === 0);
console.log("Q82", filterResult); 

// Q83: nums.reduce(...) => 10
// Explain: .reduce() executes a user-supplied reducer callback function on each element of the array, passing in the return value 
// from the calculation on the preceding element. The final result is a single value (sum of elements here).
const reduceResult = nums.reduce((acc, curr) => acc + curr, 0);
console.log("Q83", reduceResult); 


// -----------------------------------------
// 13. REMOVE DUPLICATES
// -----------------------------------------

const arr = [1, 2, 2, 3, 4, 4];

// Q84: [...new Set(arr)] => [1, 2, 3, 4]
// Explain: A `Set` is a collection of unique values. Creating a Set from `arr` removes duplicates.
// The spread operator `...` is then used to convert the Set back into an Array.
const unique = [...new Set(arr)];
console.log("Q84", unique); 


// -----------------------------------------
// 14. REVERSE STRING
// -----------------------------------------

const str = "javascript";

// Q85: str.split("").reverse().join("") => "tpircsavaj"
// Explain: 
// 1. `.split("")` splits the string into an array of characters.
// 2. `.reverse()` reverses the elements of the array in place.
// 3. `.join("")` joins the array elements back into a string.
const reversed = str.split("").reverse().join("");
console.log("Q85", reversed); 


// -----------------------------------------
// 15. PALINDROME
// -----------------------------------------

// Checks if the string reads the same backward as forward.
function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

// Q86: isPalindrome("madam") => true
// Q87: isPalindrome("hello") => false
console.log("Q86", isPalindrome("madam")); 
console.log("Q87", isPalindrome("hello")); 


// -----------------------------------------
// 16. CHARACTER COUNT
// -----------------------------------------

function charCount(str) {
    const map = {};

    for (let ch of str) {
        // Increment the count if it already exists, otherwise initialize it to 1.
        map[ch] = (map[ch] || 0) + 1;
    }

    return map;
}

// Q88: charCount("javascript") => { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 }
console.log("Q88", charCount("javascript")); 


// -----------------------------------------
// 27. FLATTEN ARRAY
// -----------------------------------------

const nested = [1, [2, [3, 4]]];

// Q89: nested.flat(2) => [1, 2, 3, 4]
// Explain: `.flat(depth)` creates a new array with all sub-array elements concatenated recursively up to the specified depth.
console.log("Q89", nested.flat(2)); 


// -----------------------------------------
// 28. FIND MAX
// -----------------------------------------

const numbers = [5, 2, 9, 1];

// Q90: Math.max(...numbers) => 9
// Explain: Math.max accepts comma-separated numbers as individual arguments. 
// The spread operator `...` unpacks the array elements so Math.max can consume them directly.
console.log("Q90", Math.max(...numbers)); 


// -----------------------------------------
// 29. SORT
// -----------------------------------------

const sortNums = [10, 2, 5];

// Q91: sortNums.sort((a, b) => a - b) => [2, 5, 10]
// Explain: Default `.sort()` without arguments coerces elements to strings and compares their UTF-16 code unit values 
// (which would sort [10, 2, 5] as [10, 2, 5] or [10, 5, 2] since '1' comes before '2').
// Providing a comparator `(a, b) => a - b` performs a correct ascending numeric sort.
sortNums.sort((a, b) => a - b);
console.log("Q91", sortNums); 
