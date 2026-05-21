# 🧠 JavaScript Practice: Core Concepts & Logic Explanations

This folder contains a collection of **106 JavaScript interview questions** split into 7 conceptual files. This document explains the underlying core mechanics, specifications, and logic behind every behavior tested in the code.

---

## 📂 File Directory & Question Coverage

All code snippets have been split into these files inside this folder:
1. **[01_coercion_equality.js](file:///d:/Machine%20Coding/Java%20Script/practise/01_coercion_equality.js)**: Covers Type Coercion, Equality, Truthy/Falsy, Casting tricks, and `Object.is()`. **(Q1–Q44)**
2. **[02_operators_control_flow.js](file:///d:/Machine%20Coding/Java%20Script/practise/02_operators_control_flow.js)**: Covers Short-circuiting (`||`, `&&`), Nullish Coalescing (`??`), and Optional Chaining (`?.`). **(Q45–Q52)**
3. **[03_scope_hoisting_closures.js](file:///d:/Machine%20Coding/Java%20Script/practise/03_scope_hoisting_closures.js)**: Covers Scope (var/let/const), Hoisting, TDZ, Closures, and Infinite Currying. **(Q53–Q56)**
4. **[04_functions_this_context.js](file:///d:/Machine%20Coding/Java%20Script/practise/04_functions_this_context.js)**: Covers dynamic vs lexical binding of `this` and explicitly setting context using Call, Apply, Bind, and double binding. **(Q57–Q63)**
5. **[05_asynchronous_js.js](file:///d:/Machine%20Coding/Java%20Script/practise/05_asynchronous_js.js)**: Covers the Event Loop, Micro vs Macro tasks, loop scopes in asynchronous timers, Promises, and async/await. **(Q64–Q80)**
6. **[06_arrays_algorithms.js](file:///d:/Machine%20Coding/Java%20Script/practise/06_arrays_algorithms.js)**: Covers array methods (map/filter/reduce), string manipulations, palindromes, character counts, flattening, sorting, and Math algorithms. **(Q81–Q91)**
7. **[07_objects_destructuring.js](file:///d:/Machine%20Coding/Java%20Script/practise/07_objects_destructuring.js)**: Covers destructuring, spread/rest patterns, shallow copying, object inspection methods, deletion, freezing, and native deep copying. **(Q92–Q106)**

---

## 💡 Concepts & Question Explanations

### 1. Type Coercion & Equality (Q1–Q44)

#### Q1: `[] == false` ➡️ `true`
When JavaScript compares an object to a primitive using loose equality (`==`), it attempts to convert the object to a primitive by calling its `[Symbol.toPrimitive]`, `valueOf()`, or `toString()` method.
1. `[].toString()` evaluates to an empty string `""`.
2. The comparison becomes `"" == false`.
3. If one operand is a boolean, it is converted to a number: `false` becomes `0`.
4. The comparison becomes `"" == 0`.
5. The string `""` is converted to a number: `+""` is `0`.
6. Thus, `0 == 0` evaluates to `true`.

#### Q2: `[] === false` ➡️ `false`
Strict equality (`===`) checks both the **type** and the **value**. Since the type of `[]` is `"object"` and the type of `false` is `"boolean"`, this evaluates to `false` immediately without coercion.

#### Q3: `null == undefined` ➡️ `true`
By JavaScript specification (ECMA-262), `null` and `undefined` are loosely equal to each other (and nothing else).

#### Q4: `null === undefined` ➡️ `false`
Their types differ: `typeof null` is `"object"` (internally of type Null), and `typeof undefined` is `"undefined"`.

#### Q5 & Q6: `NaN == NaN` / `NaN === NaN` ➡️ `false`
`NaN` (Not-a-Number) is the only value in JavaScript that is not equal to itself under either loose or strict equality. To check if a value is NaN, use `isNaN()` or `Number.isNaN()`.

#### Q7: `typeof null` ➡️ `"object"`
This is a historic bug in JavaScript since its first version. Values were represented as a type tag and a value. The object type tag was `000`, and `null` was represented as the null pointer (all zeroes), which led `typeof` to mistakenly identify it as an object.

#### Q8: `typeof NaN` ➡️ `"number"`
Even though it represents an invalid numeric state (Not-a-Number), it belongs to the IEEE 754 floating-point numeric type.

#### Q9: `[] == ![]` ➡️ `true`
1. The logical NOT operator (`!`) has higher precedence than `==`.
2. Any object (including `[]`) is truthy. Therefore, `![]` evaluates to `false`.
3. The comparison becomes `[] == false`.
4. As shown in **Q1**, this evaluates to `true`.

#### Q10–Q12: `+""` ➡️ `0`, `+true` ➡️ `1`, `+false` ➡️ `0`
The unary plus (`+`) operator coerces its operand to a number using internal numeric conversion rules.

#### Q13: `[] + []` ➡️ `""`
The addition operator (`+`) on objects triggers string concatenation. Both arrays are converted to primitive strings via `toString()`, resulting in `"" + ""` which is `""`.

#### Q14: `[] + {}` ➡️ `"[object Object]"`
`[]` is coerced to `""`, and `{}` is coerced to `"[object Object]"`. The result is `"" + "[object Object]"` which is `"[object Object]"`.

#### Q15: `{} + []` ➡️ `0` (or `"[object Object]"` in expressions)
- In a browser console, if evaluated as a top-level statement, the browser parses `{}` as an **empty code block** (which does nothing) and evaluates `+ []`. `+[]` coerces to `+""` which yields `0`.
- In Node.js or as a parenthesized expression `({} + [])`, it treats `{}` as an object literal, yielding `"[object Object]"`.

#### Q16: `{} + {}` ➡️ `"[object Object][object Object]"`
Evaluated as an expression, both objects coerce to `"[object Object]"` and concatenate.

#### Q17: `[1, 2] + [3, 4]` ➡️ `"1,23,4"`
Both arrays coerce to strings: `"1,2"` and `"3,4"`. Adding them yields `"1,23,4"`.

#### Q20–Q24: Truthy & Falsy Casts
In JavaScript, the only **falsy** values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. All other values, including empty arrays `[]` and empty objects `{}`, are **truthy**. Note that the string `"0"` is truthy because it is not an empty string.

#### Q27–Q33: String & Number Mathematics
- Binary `+` triggers string concatenation if either side is a string (e.g. `1 + "2"` yields `"12"`, `"5" + 1 + 2` yields `"512"`).
- Other mathematical operators (`-`, `*`, `/`) only operate on numbers, forcing string operands to be coerced to numbers (e.g. `"2" - 1` yields `1`, `"10" * 2` yields `20`). Non-numeric strings yield `NaN`.

#### Q34–Q36: `typeof` Results
- `typeof undefined` is `"undefined"`.
- `typeof function(){}` is `"function"`.
- `typeof []` is `"object"`.

#### Q37–Q38: Double Negation (`!!`)
Double negation is a shorthand way to cast a value to its boolean equivalent (`!!"hello"` is `true`, `!!0` is `false`).

#### Q39–Q40: `parseInt()` vs `Number()`
- `parseInt("10px")` parses up to the first non-numeric character (`10`).
- `Number("10px")` expects the whole string to be numeric, failing and returning `NaN`.

#### Q41–Q42: `isNaN()` vs `Number.isNaN()`
- `isNaN("hello")` coerces `"hello"` to a number first (`NaN`), then returns `true` (since it is NaN).
- `Number.isNaN("hello")` checks if the value is strictly of type `Number` and is `NaN`. Since it's a string, it returns `false` without coercion.

#### Q43 & Q44: `Object.is()` vs Strict Equality (`===`)
- `Object.is(NaN, NaN)` returns `true` (whereas `NaN === NaN` is `false`).
- `Object.is(-0, +0)` returns `false` (whereas `-0 === +0` is `true`).
`Object.is()` evaluates same-value equality without the special treatment applied by `===` for NaNs and signed zeroes.

---

### 2. Operators & Short-Circuiting (Q45–Q52)

#### Q45: `0 || "Hello"` ➡️ `"Hello"`
Logical OR (`||`) returns the first **truthy** operand. Since `0` is falsy, it evaluates and returns `"Hello"`.

#### Q46: `"Hi" && 5` ➡️ `5`
Logical AND (`&&`) returns the first **falsy** operand it encounters. If all are truthy, it returns the last evaluated operand. Since `"Hi"` is truthy, it returns `5`.

#### Q48–Q50: Nullish Coalescing (`??`)
Unlike `||` (which checks for any falsy value), `??` only falls back to the right-hand operand if the left-hand operand is **specifically `null` or `undefined`**.
- `0 ?? 100` returns `0` (because `0` is defined).
- `null ?? "default"` returns `"default"`.

#### Q51–Q52: Optional Chaining (`?.`)
The optional chaining operator provides a way to read nested properties without throwing an error if a parent property is `null` or `undefined`.
- `employee?.company?.name` evaluates to `undefined` because `employee.company` is undefined, safely short-circuiting.

---

### 3. Scope, Hoisting, & Closures (Q53–Q56)

#### Q53 & Q54: Hoisting with `var` vs `let`
- Declaring with `var` hoists the variable declaration to the top of the function/global scope and initializes it to `undefined`. Thus, accessing it before declaration returns `undefined`.
- Declaring with `let`/`const` hoists the variable declaration but **does not initialize it**. The variable is placed in a Temporal Dead Zone (TDZ). Attempting to access it before the initialization line throws a `ReferenceError`.

#### Q55: Closures
A **closure** occurs when a nested function retains access to the variables defined in its outer lexical scope even after the outer function has finished execution. Each call to `counter()` increments and logs the shared parent variable `count`.

#### Q56: Infinite Currying (`sumCurry(a)(b)...(n)()`)
This leverages closures to dynamically return a function that continues accumulating arguments. When invoked with empty parentheses `()`, the function returns the accumulated value.

---

### 4. Function Context (`this`) (Q57–Q63)

- **Standard Method Invocation (Q57)**: `this` is dynamically bound to the object calling the method (`obj1.getX()` binds `this` to `obj1`).
- **Arrow Functions (Q58)**: Arrow functions do not bind their own `this`. Instead, they inherit `this` **lexically** from their parent scope at the time of creation (`obj2.getX` inherits from the global/module context, yielding `undefined`).
- **Nested Standard Functions (Q59)**: Regular functions declared inside methods (like `inner()` in `obj3.getX`) lose the object context and default to the global scope or `undefined` in strict mode.
- **Nested Arrow Functions (Q60)**: An arrow function declared inside a method (like `inner` in `obj4.getX`) inherits `this` lexically from the method scope, which points to the calling object.
- **Double Context Binding (Q62)**: Calling `.bind()` on an already bound function does not override the initially bound context. The bound `this` value remains permanently tied to the first binding.
- **Arrow Function Binding (Q63)**: Arrow functions lack a dynamic `this` context. Attempting to call `.bind()`, `.call()`, or `.apply()` on them has no effect; they will always resolve `this` to their enclosing lexical scope.

---

### 5. Asynchronous JavaScript & Event Loop (Q64–Q80)

#### Q64–Q67: Event Loop execution order
1. **Synchronous code** executes immediately: `Start`, `End`.
2. **Micro-tasks** (Promise callbacks `.then()`, queueMicrotask) execute as soon as the synchronous execution stack becomes empty. Prints `Promise`.
3. **Macro-tasks** (timers like `setTimeout`, `setInterval`, network requests) are executed afterwards. Prints `setTimeout`.

#### Q68–Q69 & Q70: Loop with `setTimeout`
- **Using `var` (Q68)**: `var` is not block-scoped. The loop runs to completion and leaves `i = 3` before any timer callback fires. All timeouts print `3`.
- **Using `let` (Q69)**: `let` is block-scoped. Each loop iteration binds a new version of `j`. Each timer closure references its own unique value, printing `0`, `1`, `2`.
- **IIFE Closure Fix (Q70)**: Wrapping `setTimeout` in an Immediately Invoked Function Expression creates a new scope per iteration, mapping `k` to a local variable `x`, resolving the variable sharing issue of `var`.

#### Q73–Q80: Complex Promise + Async/Await + setTimeout Order
This tests the order of synchronous code vs microtasks vs macrotasks:
1. Synchronous execution runs first (including code inside Promise constructor and async functions up until the first `await`).
2. An `await` yield suspends execution, scheduling the remainder of the async function as a microtask.
3. Once the synchronous stack clears, the Event Loop processes the **microtask queue** (awaited execution resumes, then Promise `.then` callbacks).
4. After microtasks are exhausted, the Event Loop processes the **macrotask queue** (`setTimeout` timers).

---

### 6. Array & Object Manipulations (Q81–Q91)

- **Map, Filter, Reduce (Q81–Q83)**: Basic array functional programming.
- **Set Duplication Removal (Q84)**: Using `new Set()` to keep only unique values, and converting it back to an array via spread.
- **String Reversal & Palindromes (Q85–Q87)**: Manipulations with `.split("").reverse().join("")`.
- **Flattening (Q89)**: `.flat(depth)` flattens arrays recursively up to the specified depth.
- **Numeric Sorting (Q91)**: ASC numeric sort requires a comparator function `(a, b) => a - b`.

---

### 7. Objects & Deep Cloning (Q92–Q106)

- **Shallow Copy (Q98)**: Modifying a nested object property inside a shallow copy (`{...original}`) will mutate the original object because the nested object is copied by reference.
- **Object.freeze (Q103)**: Freezing an object prevents additions, deletions, or modification of properties. It is shallow (nested objects can still be changed).
- **Deep Cloning Limitations (Q104–Q106)**:
  - `JSON.parse(JSON.stringify(obj))` drops `undefined`, functions, and symbols, and turns `NaN`/`Infinity` into `null`, and serializes Dates into strings.
  - `structuredClone()` is a native browser/Node API that correctly clones Dates, Maps, Sets, RegExps, and NaNs, but throws an error if it encounters a function.
