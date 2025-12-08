import { bubbleSort } from "../algorithms/bubbleSort.js";

/**
 * Sorts an array in-place using autosort-js default strategy.
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
 */
export function autoSort(array, options = {}) {
    return bubbleSort(array, options);
}

/**
 * Sorts **this array** in-place using autosort-js default strategy.
 *
 * If `options.compare` is not provided, the built-in `autoCompare`
 * (mixed-type comparator) is used automatically.
 *
 * @template T
 * @this {T[]}
 * @param {Object} [options]
 * @param {boolean} [options.ascending=true]
 * @param {(a: T, b: T) => number | null} [options.compare=null]
 * @returns {T[]} The same array reference (`this`), sorted.
 */
export function autoSortPrototype(options = {}) {
    return autoSort(this, options);
}
