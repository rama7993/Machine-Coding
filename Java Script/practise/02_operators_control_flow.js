/* ==========================================================================
   02_OPERATORS_CONTROL_FLOW.JS
   Covers Logical Operators (||, &&, ??) and Optional Chaining (?.).
   ========================================================================== */

// -----------------------------------------
// 4. LOGICAL OPERATORS (||, &&, ??)
// -----------------------------------------

// Q45: 0 || "Hello" => "Hello"
// Explain: Logical OR (||) returns the first truthy value. Since 0 is falsy, it evaluates and returns "Hello".
console.log("Q45", 0 || "Hello"); 

// Q46: "Hi" && 5 => 5
// Explain: Logical AND (&&) returns the first falsy value, or the last value if all are truthy. 
// "Hi" is truthy, so it evaluates and returns 5.
console.log("Q46", "Hi" && 5); 

// Q47: null || undefined || "JS" => "JS"
// Explain: Evaluates left-to-right. null and undefined are falsy, so it returns the first truthy value: "JS".
console.log("Q47", null || undefined || "JS"); 

// Q48: 0 ?? 100 => 0
// Explain: Nullish Coalescing (??) returns its right-hand side operand when its left-hand side operand is null or undefined.
// Since 0 is neither null nor undefined, it returns 0.
console.log("Q48", 0 ?? 100); 

// Q49: null ?? "default" => "default"
// Q50: undefined ?? "fallback" => "fallback"
// Explain: Since the left side is null/undefined, the fallback string is returned.
console.log("Q49", null ?? "default"); 
console.log("Q50", undefined ?? "fallback"); 


// -----------------------------------------
// 17. OPTIONAL CHAINING (?.)
// -----------------------------------------

const employee = {
    name: "Rama",
    address: {
        city: "Hyderabad",
    },
};

// Q51: employee?.address?.city => "Hyderabad"
// Explain: Accesses nested properties safely. Since `address` exists, it evaluates `city` to "Hyderabad".
console.log("Q51", employee?.address?.city); 

// Q52: employee?.company?.name => undefined
// Explain: Optional chaining (?.) short-circuits and returns undefined if the reference is nullish (null or undefined) 
// without throwing a TypeError. Since `company` is undefined, accessing `.name` returns undefined.
console.log("Q52", employee?.company?.name); 
