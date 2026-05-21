/* ==========================================================================
   05_ASYNCHRONOUS_JS.JS
   Covers the Event Loop, Var vs Let in asynchronous loops, closures as fixes, 
   Promises, and Async/Await behavior.
   ========================================================================== */

// -----------------------------------------
// 10. EVENT LOOP
// -----------------------------------------

console.log("Q64 Start");

// Enqueued in the Macro-task Queue (Callback Queue)
setTimeout(() => {
    console.log("Q65 setTimeout");
}, 0);

// Enqueued in the Micro-task Queue (Job Queue)
Promise.resolve().then(() => {
    console.log("Q66 Promise");
});

console.log("Q67 End");

// Explain: 
// 1. Synchronous tasks run first: "Q64 Start" then "Q67 End".
// 2. The call stack clears. 
// 3. The Event Loop prioritizes Micro-tasks (Promise callbacks) before Macro-tasks.
//    Thus, "Q66 Promise" prints next.
// 4. Finally, the Event Loop processes the Macro-task queue, printing "Q65 setTimeout".


// -----------------------------------------
// 11. VAR LET CONST IN LOOPS
// -----------------------------------------

// Scenario A: Loop with 'var'
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        // Q68: Logs "Q68 3", "Q68 3", "Q68 3"
        // Explain: `var` is function-scoped (or global in this case) and not block-scoped.
        // All iterations share the same binding of `i`. When the 100ms timeout triggers, 
        // the loop has already finished, and `i` has reached the value 3.
        console.log("Q68", i);
    }, 100);
}

// Scenario B: Loop with 'let'
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        // Q69: Logs "Q69 0", "Q69 1", "Q69 2"
        // Explain: `let` is block-scoped. Every iteration of the loop gets its own distinct binding of `j`.
        // The callback function forms a closure over that specific iteration's version of `j`.
        console.log("Q69", j);
    }, 100);
}


// -----------------------------------------
// 24. SET TIMEOUT INSIDE LOOP FIX (USING CLOSURE / IIFE)
// -----------------------------------------

for (var k = 0; k < 3; k++) {
    // We capture the current value of `k` by passing it into an IIFE (Immediately Invoked Function Expression).
    // The IIFE creates a new function scope for each iteration, binding `x` to the value of `k` at that instant.
    ((x) => {
        setTimeout(() => {
            // Q70: Logs "Q70 0", "Q70 1", "Q70 2"
            console.log("Q70", x);
        }, 100);
    })(k);
}


// -----------------------------------------
// 25. PROMISE BASIC
// -----------------------------------------

const promise = new Promise((resolve) => {
    // The executor function runs synchronously.
    resolve("Success");
});

promise.then((res) => {
    // Q71: Logs "Success" (Runs asynchronously in the micro-task queue)
    console.log("Q71", res);
});


// -----------------------------------------
// 26. ASYNC AWAIT
// -----------------------------------------

async function getData() {
    // An async function always returns a Promise. 
    // If the return value is not explicitly a Promise, it is automatically wrapped in a resolved Promise.
    return "Async Data";
}

getData().then((res) => {
    // Q72: Logs "Async Data"
    console.log("Q72", res);
});


// -----------------------------------------
// REAL INTERVIEW ADDITION: Complex Event Loop (Promise + Async/Await + setTimeout)
// -----------------------------------------

console.log("Q73 Start");

async function async1() {
    console.log("Q74 async1 start");
    await async2();
    // Everything below await is deferred as a microtask
    console.log("Q78 async1 end");
}

async function async2() {
    console.log("Q75 async2");
}

async1();

setTimeout(() => {
    console.log("Q80 setTimeout");
}, 0);

new Promise((resolve) => {
    // Promise executor function runs synchronously
    console.log("Q76 Promise constructor");
    resolve();
}).then(() => {
    console.log("Q79 Promise.then");
});

console.log("Q77 End");

// Step-by-Step execution flow:
// 1. Prints: "Q73 Start"
// 2. Calls async1(), prints: "Q74 async1 start"
// 3. Calls async2() inside async1, prints: "Q75 async2"
//    The execution of async1 yields at the `await`, and its remainder is enqueued in the microtask queue.
// 4. Enqueues "Q80 setTimeout" in the macrotask queue.
// 5. Instantiates the Promise, executor prints: "Q76 Promise constructor"
//    The resolve() calls and schedules the `.then()` handler in the microtask queue.
// 6. Prints: "Q77 End"
// 7. Main call stack is empty, checking the microtask queue:
//    - Prints "Q78 async1 end" (first scheduled microtask)
//    - Prints "Q79 Promise.then" (second scheduled microtask)
// 8. Microtasks are empty, checking the macrotask queue:
//    - Prints "Q80 setTimeout"
