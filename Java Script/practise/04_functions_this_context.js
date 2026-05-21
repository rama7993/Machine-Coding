/* ==========================================================================
   04_FUNCTIONS_THIS_CONTEXT.JS
   Covers Context Binding ('this' keyword) and Call, Apply, Bind.
   ========================================================================== */

// -----------------------------------------
// 8. THIS KEYWORD
// -----------------------------------------

const obj1 = {
    x: 10,
    getX() {
        // Q57: obj1.getX() => 10
        // Explain: In standard methods, `this` is dynamically bound to the object that calls the method (obj1).
        console.log("Q57", this.x);
    },
};

obj1.getX(); 

const obj2 = {
    x: 20,
    getX: () => {
        // Q58: obj2.getX() => undefined
        // Explain: Arrow functions do not have their own `this`. They inherit `this` lexically from their enclosing parent scope.
        // Here, the parent scope is the global/module scope (not the object literal itself), where `this` is empty or undefined.
        console.log("Q58", this.x);
    },
};

obj2.getX(); 

const obj3 = {
    x: 30,
    getX() {
        function inner() {
            // Q59: inner() => undefined
            // Explain: Inside a regular function (even when nested within a method), `this` defaults to the global object 
            // (or `undefined` in strict mode) unless explicitly bound.
            console.log("Q59", this.x);
        }

        inner();
    },
};

obj3.getX(); 

const obj4 = {
    x: 40,
    getX() {
        const inner = () => {
            // Q60: inner() => 40
            // Explain: An arrow function inherits `this` lexically. Since the enclosing context is `getX` (which is a standard method 
            // called on obj4), `this` within `getX` refers to obj4. Thus, the arrow function `inner` inherits `this` pointing to obj4.
            console.log("Q60", this.x);
        };

        inner();
    },
};

obj4.getX(); 


// -----------------------------------------
// 9. CALL, APPLY, BIND
// -----------------------------------------

function greet(city) {
    console.log(`Q61 Hello ${this.name} from ${city}`);
}

const user = {
    name: "Rama",
};

// Q61 Output calls:
// greet.call(user, "Hyderabad") => Q61 Hello Rama from Hyderabad
// greet.apply(user, ["Bangalore"]) => Q61 Hello Rama from Bangalore
// bindFn() => Q61 Hello Rama from Chennai

// Explain:
// - `.call()`: Invokes the function immediately, explicitly setting `this` to the first parameter, followed by comma-separated arguments.
// - `.apply()`: Invokes the function immediately, setting `this` to the first parameter, but arguments are passed as an array.
// - `.bind()`: Does not invoke immediately. Instead, it returns a new copy of the function with `this` permanently bound to the provided object, and optional pre-configured arguments.
greet.call(user, "Hyderabad");
greet.apply(user, ["Bangalore"]);

const bindFn = greet.bind(user, "Chennai");
bindFn();


// -----------------------------------------
// REAL INTERVIEW ADDITION: Double Binding & Bind with Arrow Functions
// -----------------------------------------

// Q62: greet.bind({ name: "Alice" }).bind({ name: "Bob" })("London") => Q61 Hello Alice from London
// Explain: A bound function created by Function.prototype.bind() has a bound `this` value that is set permanently.
// Subsequent calls to `.bind()` can only bind arguments but cannot change the original bound `this` context.
const doubleBound = greet.bind({ name: "Alice" }).bind({ name: "Bob" });
doubleBound("London"); 

// Q63: binding an arrow function => ignores the bound context
// Explain: Arrow functions capture `this` lexically at creation. Using `.bind()`, `.call()`, or `.apply()` 
// will not change the `this` value (the target context argument is silently ignored).
const arrowGreet = (city) => {
    console.log(`Q63 Hello ${this?.name || "Lexical Context"} from ${city}`);
};
const boundArrow = arrowGreet.bind({ name: "Charlie" });
boundArrow("New York"); 
