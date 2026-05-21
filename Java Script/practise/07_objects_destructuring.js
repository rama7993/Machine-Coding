/* ==========================================================================
   07_OBJECTS_DESTRUCTURING.JS
   Covers Object & Array Destructuring, Spread vs Rest, Shallow Copying and nested 
   mutations, Object inspection (keys/values/entries), Property Deletion, 
   and Object Freezing.
   ========================================================================== */

// -----------------------------------------
// 18. DESTRUCTURING
// -----------------------------------------

const person = {
    firstName: "Rama",
    age: 25,
};

// Q92-Q93: Object destructuring binds variables matching object keys.
const { firstName, age } = person;
console.log("Q92", firstName); // Logs: Q92 Rama
console.log("Q93", age);       // Logs: Q93 25

const colors = ["red", "blue"];

// Q94-Q95: Array destructuring binds variables based on array index order.
const [c1, c2] = colors;
console.log("Q94", c1); // Logs: Q94 red
console.log("Q95", c2); // Logs: Q95 blue


// -----------------------------------------
// 19. SPREAD & REST
// -----------------------------------------

const arr1 = [1, 2];
const arr2 = [3, 4];

// Q96: [...arr1, ...arr2] => [1, 2, 3, 4]
// Explain: Spread operator (...) unpacks array elements.
console.log("Q96", [...arr1, ...arr2]); 

// Q97: sum(1, 2, 3, 4) => 10
// Explain: In function parameters, the Rest operator (...) collects all remaining arguments into a real array.
function sum(...nums) {
    return nums.reduce((acc, curr) => acc + curr, 0);
}
console.log("Q97", sum(1, 2, 3, 4)); 


// -----------------------------------------
// 20. SHALLOW COPY
// -----------------------------------------

const original = {
    name: "Rama",
    address: {
        city: "Hyd",
    },
};

// Spread syntax creates a shallow copy of `original`.
const shallow = { ...original };

// Mutating a nested property on the copy affects the original object.
shallow.address.city = "Bangalore";

// Q98: original.address.city => "Bangalore"
// Explain: A shallow copy only copies top-level properties. Nested objects (like `address`) 
// are copied by reference. Hence, both `original.address` and `shallow.address` point to the same object on the heap.
console.log("Q98", original.address.city); 


// -----------------------------------------
// 21. OBJECT KEYS, VALUES, ENTRIES
// -----------------------------------------

const product = {
    id: 1,
    title: "Laptop",
};

// Q99: Object.keys(product) => ['id', 'title'] (Array of property names)
console.log("Q99", Object.keys(product)); 

// Q100: Object.values(product) => [1, 'Laptop'] (Array of property values)
console.log("Q100", Object.values(product)); 

// Q101: Object.entries(product) => [['id', 1], ['title', 'Laptop']] (Array of key-value pairs)
console.log("Q101", Object.entries(product)); 


// -----------------------------------------
// 22. DELETE PROPERTY
// -----------------------------------------

const temp = {
    a: 1,
    b: 2,
};

// delete removes a property from an object.
delete temp.a;

// Q102: temp => { b: 2 }
console.log("Q102", temp); 


// -----------------------------------------
// 23. FREEZE OBJECT
// -----------------------------------------

// Object.freeze() makes an object immutable: prevents adding, deleting, or changing properties.
const frozen = Object.freeze({
    name: "JS",
});

// This mutation fails silently in non-strict mode (or throws a TypeError in strict mode).
frozen.name = "React";

// Q103: frozen.name => "JS"
console.log("Q103", frozen.name); 


// -----------------------------------------
// REAL INTERVIEW ADDITION: Deep Cloning & JSON.stringify Limitations
// -----------------------------------------

const complexObj = {
    num: 1,
    date: new Date("2026-05-20T12:00:00Z"),
    undef: undefined,
    func: () => "hello",
    nan: NaN,
};

// Q104: JSON.parse(JSON.stringify(complexObj)) limitations
// Explain: JSON serialization has several key limitations:
// - Date objects are converted to ISO string representations.
// - `undefined` properties, Symbol properties, and functions are completely omitted/dropped.
// - `NaN` and `Infinity` are serialized as `null`.
const jsonClone = JSON.parse(JSON.stringify(complexObj));
console.log("Q104", jsonClone); 

// Q105: structuredClone() behavior - Date type
// Q106: structuredClone() behavior - NaN
// Explain: `structuredClone` is a modern, native HTML5 standard API for deep cloning objects.
// - It correctly preserves Dates, Maps, Sets, RegExps, NaNs, and cyclic references.
// - Crucially, it will throw a DOMException if the object contains a function/method (since closures cannot be cloned).
try {
    // Cloning a valid object without functions:
    const nativeClone = structuredClone({ num: 2, date: new Date(), nan: NaN });
    console.log("Q105 Date type is Date:", nativeClone.date instanceof Date); // true
    console.log("Q106 NaN remains NaN:", Number.isNaN(nativeClone.nan));    // true
} catch (e) {
    console.log("Q105/Q106 clone error:", e.message);
}
