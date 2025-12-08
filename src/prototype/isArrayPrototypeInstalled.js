import { autoSortPrototype } from "../core/autoSort.js";
import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { insertionSortPrototype } from "../algorithms/insertionSort.js";

const EXPECTED = {
    bubbleSort: bubbleSortPrototype,
    insertionSort: insertionSortPrototype,
    autoSort: autoSortPrototype
};

export function isArrayPrototypeInstalled(options = {}) {
    const { strict = false, matchImplementation = false } = options;

    for (const [name, expectedFn] of Object.entries(EXPECTED)) {
        const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
        if (!desc) return false;

        if (typeof desc.value !== "function") return false;
        if (desc.enumerable !== false) return false;

        if (strict) {
            if (desc.configurable !== true) return false;
            if (desc.writable !== true) return false;
        }

        if (matchImplementation) {
            if (desc.value !== expectedFn) return false;
        }
    }

    return true;
}
