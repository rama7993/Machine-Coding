/* ==========================================================================
   03_SCOPE_HOISTING_CLOSURES.JS
   Covers Hoisting, Variable Scoping (var vs let vs const), and Closures.
   ========================================================================== */

// -----------------------------------------
// 6. HOISTING
// -----------------------------------------

// Q53: console.log("Q53", a) => undefined
// Explain: Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`.
// Thus, accessing `a` before its declaration does not throw an error, it returns `undefined`.
console.log("Q53", a); 
var a = 10;

// Note: If we do `console.log(b)` here, it throws a ReferenceError.
// Variables declared with `let` and `const` are hoisted but not initialized. 
// They reside in the "Temporal Dead Zone" (TDZ) from the start of the block until the declaration is evaluated.
// let b = 20;

function testHoisting() {
    // Q54: console.log("Q54", x) => undefined
    // Explain: Hoisting behaves similarly within functions. The local variable `x` is hoisted to the top of the function body.
    console.log("Q54", x); 
    var x = 100;
}
testHoisting();


// -----------------------------------------
// 7. CLOSURES
// -----------------------------------------

function outer() {
    let count = 0;

    // The inner function closes over the variable `count` declared in the parent lexical environment.
    return function () {
        count++;
        console.log("Q55", count);
    };
}

const counter = outer();

// Q55: counter() => 1, then counter() => 2
// Explain: A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).
// Even after outer() finishes executing, the inner function retains a reference to the active `count` variable.
counter(); // Logs: Q55 1
counter(); // Logs: Q55 2


// -----------------------------------------
// REAL INTERVIEW ADDITION: Infinite Currying with Closures
// -----------------------------------------

// Q56: Write a function sumCurry(a)(b)...(n)() that sums all passed arguments.
// Explain: The returned function checks if an argument was passed. 
// If yes, it returns itself recursively with the updated accumulator.
// If no (empty parens), it returns the final accumulated sum.
function sumCurry(a) {
    return function (b) {
        if (b !== undefined) {
            return sumCurry(a + b);
        }
        return a;
    };
}
console.log("Q56", sumCurry(1)(2)(3)(4)()); // 10
