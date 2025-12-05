# 🚀 autosort-js

A modern, modular, intelligent JavaScript sorting library that implements multiple classic algorithms (Bubble, Insertion, Selection, Merge, Quick, Heap) and provides a powerful `autoSort` engine capable of analyzing input data and selecting the most optimal algorithm automatically.

Designed as both an educational project and a production-ready utility, **autosort-js** helps developers understand sorting deeply while offering a robust API for real-world use.

---

# 📚 Table of Contents

- [✨ Motivation](#-motivation)
- [🔥 Features](#-features)
- [📦 Project Status](#-project-status)
- [⚙️ Installation](#️-installation)
- [🚀 Quick Start](#-quick-start)
- [📘 API Reference](#-api-reference)
  - [autoSort](#autosort)
  - [Algorithms](#algorithms)
  - [Custom Compare](#custom-compare)
- [🧠 Type Handling](#-type-handling)
- [🧬 Algorithm Selection Strategy](#-algorithm-selection-strategy)
- [📊 Algorithms & Complexity](#-algorithms--complexity)
- [📁 Folder Structure](#-folder-structure)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## Links

- **GitHub:** https://github.com/MKCoderIT/autosort-js
- **npm:** https://www.npmjs.com/package/autosort-js

---


# ✨ Motivation

JavaScript's built-in `Array.prototype.sort` is powerful but:

- Behaves unexpectedly with mixed types
- Hides the underlying algorithm
- Is not designed for algorithm learning
- Does not allow full, predictable, type-safe comparisons

**autosort-js** aims to solve these problems by providing:

- Clear, readable implementations of classic algorithms
- Intelligent algorithm auto-selection
- A powerful mixed-type comparator
- Clean architecture ideal for both learning and production

---

# 🔥 Features

- **Multiple Algorithms Implemented (or planned):**
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
  - (Planned) TimSort / IntroSort
- **autoSort Engine:**
  - Analyzes array size and structure
  - Chooses the most appropriate algorithm automatically
- **Mixed-Type Sorting Support** (via centralized comparator)
- **Modular Architecture** (each algorithm in its own file)
- **Zero Dependencies**
- **Future-ready for npm publishing**
- **Educational + professional-grade design**

---

<!-- # 📦 Project Status

Active development.
Semantic versioning, starting at `0.0.0`.

--- -->

- Lightweight (no dependencies)

---

## ⚙️ Installation

### npm (Recommended)

```bash
npm i autosort-js
```

Use in ES Modules:

```js
import { autoSort } from "autosort-js";
```

---

### GitHub (Development)

```bash
git clone https://github.com/MKCoderIT/autosort-js.git
cd autosort-js
npm install
npm test
```

Use locally:

```js
import { autoSort } from "./src/index.js";
```

---

## Importing the library (function usage)

This is the **recommended** way to use the library in applications and examples.

```js
// basic.js
import { autoSort, quickSort } from "./src/index.js";

const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
console.log("autoSort:", autoSort(mixed));

const nums = [5, 2, 9, 1];
console.log("quickSort:", quickSort(nums));
```

Run with Node (using ES modules) or any bundler that supports ES module imports.

## Optional Array.prototype integration

For educational/demo purposes, you can optionally extend `Array.prototype`
to call sorting algorithms directly on arrays:

```js
// prototype-demo.js
import "./src/prototype-addon.js";

const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
console.log(mixed.autoSort());

const nums = [5, 2, 9, 1];
console.log(nums.quickSort());
```

The `src/prototype-addon.js` file:

- Adds methods like `autoSort`, `quickSort`, `bubbleSort`, ... to `Array.prototype`
- Uses `Object.defineProperty` so the methods are non-enumerable (do not appear in `for...in` loops)
- Is entirely optional – if you do not import it, the global `Array.prototype` is untouched

---

# 📘 API Reference

## autoSort

```ts
autoSort(
  array: any[],
  options?: {
    ascending?: boolean;
    compare?: (a: any, b: any) => number;
  }
): any[]
```

- `ascending`
  - `true` (default): ascending order
  - `false`: descending order
- `compare`
  - Optional custom compare function, similar to `Array.prototype.sort`

---

## Algorithms

Each algorithm exposes the same basic signature:

```ts
bubbleSort(array: any[], compare?: (a: any, b: any) => number): any[]
insertionSort(array: any[], compare?: (a: any, b: any) => number): any[]
selectionSort(array: any[], compare?: (a: any, b: any) => number): any[]
mergeSort(array: any[], compare?: (a: any, b: any) => number): any[]
quickSort(array: any[], compare?: (a: any, b: any) => number): any[]
heapSort(array: any[], compare?: (a: any, b: any) => number): any[]
```

## Custom Compare

```js
autoSort(arr, {
  compare: (a, b) => a.length - b.length
});
```

---

## 🧠 Type Handling

To support **mixed-type sorting**, `autoCompare` assigns each value a **type rank**.
When two values have different ranks, the rank decides the order.
When they have the same rank, a type-specific comparison is used.

> Ascending order uses the ranking below.  
> Descending order simply reverses the final result.

### A) Primitive Types
1  → number *(except NaN)*  
2  → bigint  
3  → string  
4  → boolean  
5  → symbol  

### B) Structural Types
6  → array  
7  → date  
8  → regexp  
9  → map  
10 → set  
11 → typedArray *(Uint8Array, Float32Array, …)*

### C) Executable Types
12 → function  

### D) Object Types
13 → object *(plain objects, class instances, custom objects)*

### E) Unknown / Special Cases
14 → unknown / fallback *(unsupported / uncommon types)*  
15 → NaN *(treated separately even though `typeof NaN === "number"`)*  
16 → null  
17 → undefined  

### Same-type comparison rules (summary)
- **number / bigint:** numeric comparison  
- **string:** `localeCompare`  
- **boolean:** `false < true`  
- **date:** compare by timestamp (`valueOf()` / `getTime()`)  
- **regexp:** compare by string form (`String(value)`)  
- **array / typedArray:** compare by length, then item-by-item (if enabled)  
- **map / set:** compare by size, then values (if enabled)  
- **object:** fallback comparison (usually stringified / stable fallback)  

> Note: Complex structures (objects/arrays/maps/sets) may require a custom comparator
> for fully deterministic results depending on your use case.


Future versions can include more advanced detection (entropy, presorted runs, hybrid strategies).

---

# 📊 Algorithms & Complexity

| Algorithm      | Best       | Average      | Worst        | Space   | Stable |
|----------------|-----------:|-------------:|-------------:|--------:|:------:|
| Bubble Sort    |  O(n)      |   O(n²)      |   O(n²)      |  O(1)   |  Yes   |
| Insertion Sort |  O(n)      |   O(n²)      |   O(n²)      |  O(1)   |  Yes   |
| Selection Sort | O(n²)      |   O(n²)      |   O(n²)      |  O(1)   |   No   |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n)   |  O(n)   |  Yes   |
| Quick Sort     | O(n log n) | O(n log n)   |   O(n²)      | O(log n)|   No   |
| Heap Sort      | O(n log n) | O(n log n)   | O(n log n)   |  O(1)   |   No   |

---

## 📁 Folder Structure

```text
autosort-js/
  examples/                 # usage examples (optional)

  src/
    adapters/
      arrayPrototype.js     # OPTIONAL: adds methods to Array.prototype (opt-in)

    algorithms/
      bubbleSort.js         # bubble sort implementation
      insertionSort.js      # insertion sort implementation
      ...                   # other algorithms (selection/merge/quick/heap, etc.)

    core/
      errors/
        AutoSortError.js        # base/custom errors for the library
        ComparatorError.js      # comparator-related errors
        NotArrayError.js        # non-array input error
        errors.js               # error exports/helpers

      analyzeArray.js        # validates/analyzes array + comparator usage
      autoCompare.js         # type-aware comparator (mixed-type ordering)
      autoSort.js            # smart sorter engine (chooses strategy/algorithm)
      strategy.js            # strategy selection / routing logic

    index.js                 # public exports (package entry point)

  tests/
    test.js                  # test runner / test cases

  .gitignore
  LICENSE
  package.json
  package-lock.json
  README.md
```

---


# 🛣 Roadmap

- [X] Implement Bubble Sort
- [X] Implement mixed-type comparator
- [X] Implement Insertion Sort
- [ ] Implement Selection Sort
- [ ] Implement Merge Sort
- [ ] Implement Quick Sort
- [ ] Implement Heap Sort
- [X] Implement intelligent `autoSort` engine
- [ ] Add benchmarks
- [ ] Add automated tests
- [X] Publish to npm

---

# 🤝 Contributing

Use feature branches such as:

- `feature/bubble-sort`
- `feature/merge-sort`
- `feature/quick-sort`
- `feature/auto-sort`
- `feature/...`

Pull requests and suggestions are welcome.

---

# 📄 License

MIT License.
