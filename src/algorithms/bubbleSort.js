import { normalizeSortOptions } from "../core/normalizeOptions.js";

/**
 * Sorts an array in-place using Bubble Sort.
 *
 * If `options.compare` is not provided, the built-in `autoCompare`
 * (mixed-type comparator) is used.
 *
 * @template T
 * @param {T[]} array The array to sort (mutates the original array).
 * @param {Object} [options]
 * @param {boolean} [options.ascending=true] Sort ascending (default) or descending.
 * @param {(a: T, b: T) => number | null} [options.compare=null] Custom comparator.
 * @returns {T[]} The same array reference, sorted.
 * @throws {NotArrayError}
 * @throws {AscendingTypeError}
 * @throws {ComparatorTypeError|ComparatorError}
 */
export function bubbleSort(array, options = {}) {
    const { ascending, compare } = normalizeSortOptions(array, options);

    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (compare(array[j], array[j + 1]) > 0) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return array;
}

/**
 * Sorts **this array** in-place using Bubble Sort (Array.prototype addon).
 *
 * If `options.compare` is not provided, the built-in `autoCompare`
 * (mixed-type comparator) is used automatically.
 *
 * @template T
 * @this {T[]}
 * @param {Object} [options]
 * @param {boolean} [options.ascending=true] Sort ascending (default) or descending.
 * @param {(a: T, b: T) => number | null} [options.compare=null] Custom comparator.
 * @returns {T[]} The same array reference (`this`), sorted.
 */
export function bubbleSortPrototype(options = {}) {
    return bubbleSort(this, options);
}
