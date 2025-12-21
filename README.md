# 🚀 autosort-js

![npm](https://img.shields.io/npm/v/autosort-js) ![license](https://img.shields.io/npm/l/autosort-js)

A modern, modular JavaScript sorting library with classic algorithms and a default `autoSort` strategy.

---

## Links

- **GitHub:** https://github.com/MKCoderIT/autosort-js  
- **npm:** https://www.npmjs.com/package/autosort-js  

---




## 📑 Table of Contents

- ⚙️ [Installation](#️-installation)
- 🚀 [Quick Start (Function usage)](#-quick-start-function-usage)
- 🧩 [Optional Array.prototype integration (opt-in)](#-optional-arrayprototype-integration-opt-in)
- 📘 [API Reference](#-api-reference)
  - 🔁 [autoSort](#autosort)
  - 🧠 [arrayPrototype](#arrayprototype-namespace-export)
- 🧮 [Algorithms](#algorithms)
- 🛠️ [Custom Compare](#custom-compare)
- 📁 [Folder Structure](#-folder-structure)
- 🛣 [Roadmap](#-roadmap)
- 📄 [License](#-license)




## ⚙️ Installation

### npm (Recommended)

```bash
npm i autosort-js
```

ES Modules:

```js
import { autoSort } from "autosort-js";
```

### GitHub (Development)

```bash
git clone https://github.com/MKCoderIT/autosort-js.git
cd autosort-js
npm install
npm test
```

Local import:

```js
import { autoSort } from "./src/index.js";
```

---

## 🚀 Quick Start (Function usage)

This is the **recommended** way to use the library in applications and examples.

```js
// basic.js
import { autoSort, mergeSort, bubbleSort, insertionSort } from "autosort-js";

const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
console.log("autoSort:", autoSort([...mixed])); // autoSort mutates the input array

const nums = [5, 2, 9, 1];
console.log("mergeSort:", mergeSort([...nums]));
console.log("insertionSort:", insertionSort([...nums], { ascending: false }));
```

> Note: Sorting functions are **in-place** (they mutate the input array).  
> Use `[...arr]` if you want to keep the original array unchanged.

---

## 🧩 Optional Array.prototype integration (opt-in)

For educational/demo purposes, you can optionally extend `Array.prototype` to call sorting directly on arrays.

```js
// prototype-demo.js
import { arrayPrototype } from "autosort-js";

// install (opt-in)
arrayPrototype.installArrayPrototype();

const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
console.log(mixed.autoSort());

const nums = [5, 2, 9, 1];
console.log(nums.mergeSort());
console.log(nums.bubbleSort());
console.log(nums.insertionSort());

// optional cleanup
arrayPrototype.uninstallArrayPrototype();
```

### What gets added?

- `autoSort`
- `mergeSort`
- `bubbleSort`
- `insertionSort`

### Why it’s safe by default

- Uses `Object.defineProperty` → methods are **non-enumerable** (won’t show up in `for...in`)
- Fully **optional** → if you don’t call `installArrayPrototype()`, nothing is modified globally

---

# 📘 API Reference

## `autoSort`

```ts
autoSort<T>(
  array: T[],
  options?: {
    ascending?: boolean; // default: true
    compare?: ((a: T, b: T) => number) | null; // default: null
  }
): T[]
```

- `ascending`
  - `true` (default): ascending order
  - `false`: descending order
- `compare`
  - Optional custom compare function (similar to `Array.prototype.sort`)

### Example

```js
import { autoSort } from "autosort-js";

const nums = [3, 1, 2];
autoSort(nums, { ascending: false });
console.log(nums); // [3, 2, 1]
```

---

## `arrayPrototype` (namespace export)

The prototype features are exported as a namespace:

```js
import { arrayPrototype } from "autosort-js";
```

### `installArrayPrototype`

```ts
arrayPrototype.installArrayPrototype(options?: {
  strict?: boolean;    // default: false
  override?: boolean;  // default: false
}): void
```

- `strict: false` → skip if methods already exist
- `strict: true` → throw if a method already exists
- `override: true` → overwrite existing methods (if possible)

### `uninstallArrayPrototype`

```ts
arrayPrototype.uninstallArrayPrototype(options?: {
  strict?: boolean; // default: false
}): void
```

### `isArrayPrototypeInstalled`

```ts
arrayPrototype.isArrayPrototypeInstalled(options?: {
  strict?: boolean;              // default: false
  matchImplementation?: boolean; // default: false
}): boolean
```

---

## Algorithms

Each algorithm sorts **in-place** and returns the same array reference:

```ts
mergeSort<T>(array: T[], options?: { ascending?: boolean; compare?: ((a: T, b: T) => number) | null }): T[]
bubbleSort<T>(array: T[], options?: { ascending?: boolean; compare?: ((a: T, b: T) => number) | null }): T[]
insertionSort<T>(array: T[], options?: { ascending?: boolean; compare?: ((a: T, b: T) => number) | null }): T[]
```

---

## Custom Compare

```js
import { autoSort } from "autosort-js";

autoSort(["ccc", "a", "bb"], {
  compare: (a, b) => a.length - b.length,
});
```

---

## 📁 Folder Structure

```
autosort-js/
  examples/
    speedTest.js                      # (NEW) performance benchmark / speed test script
                                     # used to compare mergeSort vs bubbleSort vs insertionSort (manual run)

  src/
    algorithms/
      bubbleSort.js                   # bubble sort implementation (in-place)
      insertionSort.js                # insertion sort implementation (in-place)
      mergeSort.js                    # (NEW) merge sort implementation (optimized with auxiliary buffer)
                                     # in-place API + stable merge when equal (prefers left)

    core/
      autoCompare.js                  # type-aware comparator (supports mixed types ordering)
      autoSort.js                     # default sorter (uses strategy / routes to algorithms)
      normalizeOptions.js             # merges options + validates + produces final comparator (ascending/descending)
      strategy.js                     # strategy selection / routing logic
      validators.js                   # shared validations (array, ascending, comparator validity)

    errors/
      AscendingError.js               # invalid ascending option type
      AutoSortError.js                # base error class
      ComparatorError.js              # comparator-related errors
      NotArrayError.js                # input is not an array
      PrototypeError.js               # prototype integration errors
      PrototypeMethodExistsError.js   # prevents overwriting existing prototype methods
      index.js                        # errors barrel exports

    prototype/
      index.js                        # prototype barrel exports
      installArrayPrototype.js        # installs Array.prototype.autoSort (or similar)
      isArrayPrototypeInstalled.js    # checks if prototype method is installed
      uninstallArrayPrototype.js      # removes prototype method safely

    index.js                          # library entry point (exports algorithms/core/prototype)
                                     # (you should export mergeSort here too)

  tests/
    algorithms/
      bubbleSort.test.js              # unit tests for bubbleSort
      insertionSort.test.js           # unit tests for insertionSort
      mergeSort.test.js               # (NEW) unit tests for mergeSort (Vitest)
                                     # covers: ascending/descending, duplicates, negatives, empty/single,
                                     # custom comparator, validation/error cases, in-place reference

    prototype/
      arrayPrototype.behavior.test.js # prototype behavior tests
      arrayPrototype.install.test.js  # prototype install tests
      arrayPrototype.isInstalled.test.js # prototype isInstalled tests
      arrayPrototype.uninstall.test.js   # prototype uninstall tests

    autoSort.test.js                  # tests for autoSort integration/routing

  .gitignore                          # git ignore rules
  CONTRIBUTING.md                     # contributing guidelines
  package.json / vitest config etc.   # (implied) project config files
```

---

## 🛣 Roadmap

- [x] **Bubble Sort**:
A simple sorting algorithm is implemented and usable in the library.
- [x] **Insertion Sort**:
Another classic sorting algorithm is implemented and usable.
- [x] **Options API (ascending / compare)**:
Users can control ascending/descending order and provide a custom comparator.
- [x] **Errors refactor**:
The library has a consistent set of custom errors for invalid inputs and unsupported/illegal states.
- [x] **Prototype integration (opt-in)**:
An optional feature that adds sort methods to `Array.prototype` (e.g. `arr.autoSort()`), only when explicitly installed.
- [x] **Prototype test suite (install/uninstall/isInstalled/behavior)**:
Tests ensure prototype install/uninstall works correctly, methods stay non-enumerable, and behavior matches the main API.
- [x] **Publish to npm**: 
The package is published to npm and can be installed via `npm i autosort-js`.
- [ ] **Selection Sort**:
Not implemented yet.
- [X] **Merge Sort**:
Implemented with an optimized auxiliary-buffer approach.
- [ ] **Quick Sort**:
Not implemented yet.
- [ ] **Heap Sort**:
Not implemented yet.
- [X] **Benchmarks**:
Basic performance benchmarking via `examples/speedTest.js`.
- [ ] **More test coverage**:
More tests are still needed for edge cases and broader input scenarios.

---

## 📄 License

MIT