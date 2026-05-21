/* ==========================================================================
   01_COERCION_EQUALITY.JS
   Covers Type Coercion, Equality Comparisons, Truthy/Falsy, and Conversion Tricks.
   ========================================================================== */

// -----------------------------------------
// 1. TYPE COERCION & EQUALITY
// -----------------------------------------

// Q1: [] == false => true
// Explain: Abstract Equality Comparison. [] is coerced to a primitive. 
// [].toString() yields "", and "" == false compares numbers: 0 == 0, which is true.
console.log("Q1", [] == false); 

// Q2: [] === false => false
// Explain: Strict Equality Comparison. The types are different (object vs boolean), so no coercion occurs.
console.log("Q2", [] === false); 

// Q3: null == undefined => true
// Explain: JavaScript spec defines that null is loosely equal only to undefined (and itself).
console.log("Q3", null == undefined); 

// Q4: null === undefined => false
// Explain: Types differ (null is of type Null/Object, undefined is Undefined).
console.log("Q4", null === undefined); 

// Q5: NaN == NaN => false
// Q6: NaN === NaN => false
// Explain: By definition, NaN is never equal to anything, including itself.
console.log("Q5", NaN == NaN); 
console.log("Q6", NaN === NaN); 

// Q7: typeof null => "object"
// Explain: A legacy bug in JavaScript's original implementation where objects had a type tag of 0, and null was represented as a null pointer (0).
console.log("Q7", typeof null); 

// Q8: typeof NaN => "number"
// Explain: NaN stands for "Not-a-Number", but its data type is officially numeric.
console.log("Q8", typeof NaN); 

// Q9: [] == ![] => true
// Explain: The right side `![]` evaluates to `false` because an empty array is truthy.
// Then the expression becomes `[] == false`, which evaluates to `true` (see Q1).
console.log("Q9", [] == ![]); 

// Q10: +"" => 0
// Q11: +true => 1
// Q12: +false => 0
// Explain: The unary plus (+) operator attempts to convert its operand to a number.
console.log("Q10", +""); 
console.log("Q11", +true); 
console.log("Q12", +false); 


// -----------------------------------------
// 2. ARRAY + OBJECT QUESTIONS
// -----------------------------------------

// Q13: [] + [] => ""
// Explain: Binary "+" on objects calls ToPrimitive. For arrays, this calls toString(), yielding "". "" + "" is "".
console.log("Q13", [] + []); 

// Q14: [] + {} => "[object Object]"
// Explain: [] becomes "", {} becomes "[object Object]". Combining them yields "[object Object]".
console.log("Q14", [] + {}); 

// Q15: {} + [] => 0 (in browser console when {} is treated as a block)
// Note: In Node.js or when evaluated as an expression, it outputs "[object Object]".
// If evaluated as a block followed by unary plus: {} is ignored, and +[] evaluates to +"" which is 0.
console.log("Q15", {} + []); 

// Q16: {} + {} => "[object Object][object Object]" (or NaN in some browser consoles)
// Explain: As an expression, both coerce to "[object Object]" and concatenate.
console.log("Q16", {} + {}); 

// Q17: [1, 2] + [3, 4] => "1,23,4"
// Explain: Coerces both arrays to strings first: "1,2" and "3,4", then concatenates them.
console.log("Q17", [1, 2] + [3, 4]); 

// Q18: [].toString() => ""
// Explain: Array's toString joins elements with commas. An empty array yields "".
console.log("Q18", [].toString()); 

// Q19: {}.toString() => "[object Object]"
// Explain: Default Object prototype toString representation.
console.log("Q19", {}.toString()); 


// -----------------------------------------
// 3. TRUTHY & FALSY
// -----------------------------------------

// Q20: Boolean([]) => true
// Q21: Boolean({}) => true
// Explain: All objects (including arrays and empty objects) are truthy in JavaScript.
console.log("Q20", Boolean([])); 
console.log("Q21", Boolean({})); 

// Q22: Boolean("") => false
// Q23: Boolean(0) => false
// Explain: Empty string and 0 are part of JS's 6 falsy values.
console.log("Q22", Boolean("")); 
console.log("Q23", Boolean(0)); 

// Q24: Boolean("0") => true
// Explain: Any non-empty string (even if it contains the character "0") is truthy.
console.log("Q24", Boolean("0")); 

if ([]) {
    console.log("Q25", "Empty array is truthy");
}

if ({}) {
    console.log("Q26", "Empty object is truthy");
}


// -----------------------------------------
// 5. STRING + NUMBER
// -----------------------------------------

// Q27: 1 + "2" => "12"
// Explain: Addition operator (+) triggers string concatenation if one operand is a string.
console.log("Q27", 1 + "2"); 

// Q28: "2" - 1 => 1
// Explain: The subtraction operator (-) only works on numbers, forcing "2" to be coerced to number 2.
console.log("Q28", "2" - 1); 

// Q29: "5" + 1 + 2 => "512"
// Explain: Evaluates left-to-right: "5" + 1 is "51", then "51" + 2 is "512".
console.log("Q29", "5" + 1 + 2); 

// Q30: 1 + 2 + "5" => "35"
// Explain: Evaluates left-to-right: 1 + 2 is 3 (number addition), then 3 + "5" is "35" (string concatenation).
console.log("Q30", 1 + 2 + "5"); 

// Q31: "10" * 2 => 20
// Q32: "10" / 2 => 5
// Explain: Multiplication (*) and division (/) coerce strings to numbers.
console.log("Q31", "10" * 2); 
console.log("Q32", "10" / 2); 

// Q33: "abc" * 2 => NaN
// Explain: "abc" cannot be parsed as a number, so it becomes NaN. Any math with NaN results in NaN.
console.log("Q33", "abc" * 2); 


// -----------------------------------------
// 30. FINAL TRICKY QUESTIONS (Part 1 - Types & Coercion)
// -----------------------------------------

// Q34: typeof undefined => "undefined"
console.log("Q34", typeof undefined); 

// Q35: typeof function () { } => "function"
console.log("Q35", typeof function () { }); 

// Q36: typeof [] => "object"
console.log("Q36", typeof []); 

// Q37: !!"hello" => true
// Q38: !!0 => false
// Explain: The double negation (!!) is a shorthand way to cast a value to its boolean equivalent.
console.log("Q37", !!"hello"); 
console.log("Q38", !!0); 

// Q39: parseInt("10px") => 10
// Explain: parseInt parses up to the first non-numeric character.
console.log("Q39", parseInt("10px")); 

// Q40: Number("10px") => NaN
// Explain: Number() constructor requires the entire string to be numeric, otherwise returns NaN.
console.log("Q40", Number("10px")); 

// Q41: isNaN("hello") => true
// Explain: Global isNaN coerces its argument to a number first. "hello" becomes NaN, which is NaN.
console.log("Q41", isNaN("hello")); 

// Q42: Number.isNaN("hello") => false
// Explain: Number.isNaN checks if the value is strictly NaN without performing type coercion. 
// Since "hello" is of type string, it returns false.
console.log("Q42", Number.isNaN("hello")); 


// -----------------------------------------
// REAL INTERVIEW ADDITION: Object.is vs Strict Equality (===)
// -----------------------------------------

// Q43: Object.is(NaN, NaN) => true, whereas NaN === NaN => false
// Explain: Object.is determines whether two values are the same value. 
// Unlike strict equality (===), Object.is treats NaN as equal to NaN.
console.log("Q43", Object.is(NaN, NaN));

// Q44: Object.is(-0, +0) => false, whereas -0 === +0 => true
// Explain: Object.is distinguishes signed zeroes, while === treats them as equal.
console.log("Q44", Object.is(-0, +0));
