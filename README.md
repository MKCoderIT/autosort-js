# 🚀 autosort-js

A modern, modular JavaScript sorting library with classic algorithms and a default `autoSort` strategy.  
Built to be educational, readable, and usable in real projects.

---

## Links

- **GitHub:** https://github.com/MKCoderIT/autosort-js  
- **npm:** https://www.npmjs.com/package/autosort-js  

---

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
import { autoSort, bubbleSort, insertionSort } from "autosort-js";

const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
console.log("autoSort:", autoSort([...mixed])); // autoSort mutates the input array

const nums = [5, 2, 9, 1];
console.log("bubbleSort:", bubbleSort([...nums]));
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
console.log(nums.bubbleSort());
console.log(nums.insertionSort());

// optional cleanup
arrayPrototype.uninstallArrayPrototype();
```

### What gets added?

- `autoSort`
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

```text
autosort-js/
  examples/                           # usage examples (optional)

  src/
    algorithms/
      bubbleSort.js                   # bubble sort implementation
      insertionSort.js                # insertion sort implementation

    core/
      autoCompare.js                  # type-aware comparator (mixed-type ordering)
      autoSort.js                     # default sorter (uses library strategy)
      normalizeOptions.js             # merges options + normalizes config
      strategy.js                     # strategy selection / routing logic (future-proof)
      validators.js                   # shared validations (array/ascending/compare)

    errors/
      AscendingError.js               # invalid ascending type error
      AutoSortError.js                # base/custom error class
      ComparatorError.js              # comparator-related errors
      NotArrayError.js                # non-array input error
      PrototypeError.js               # prototype integration errors
      PrototypeMethodExistsError.js   # method exists error (strict mode)
      index.js                        # errors barrel exports

    prototype/
      index.js                        # prototype module exports
      installArrayPrototype.js        # install Array.prototype methods (opt-in)
      isArrayPrototypeInstalled.js    # detect if installed
      uninstallArrayPrototype.js      # uninstall prototype methods

    index.js                          # public exports (package entry point)

  tests/
    adapters/
      arrayPrototype.behavior.test.js     # behavior tests for prototype methods
      arrayPrototype.install.test.js      # install tests
      arrayPrototype.isInstalled.test.js  # isInstalled tests
      arrayPrototype.uninstall.test.js    # uninstall tests

    algorithms/
      bubbleSort.test.js              # bubble sort tests
      insertionSort.test.js           # insertion sort tests

    autoSort.test.js                  # autoSort tests

  .gitignore
  CONTRIBUTING.md
  LICENSE
  package.json
  package-lock.json
  README.md
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
- [ ] **Merge Sort**:
Not implemented yet.
- [ ] **Quick Sort**:
Not implemented yet.
- [ ] **Heap Sort**:
Not implemented yet.
- [ ] **Benchmarks**:
No performance benchmarking suite/scripts yet.
- [ ] **More test coverage**:
More tests are still needed for edge cases and broader input scenarios.


---

## 📄 License

MIT