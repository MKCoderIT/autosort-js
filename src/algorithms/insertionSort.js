import { normalizeSortOptions } from "../core/normalizeOptions.js";

/**
 * Sorts an array in-place using insertion sort.
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
export function insertionSort(array, options = {}) {
    const { ascending, compare } = normalizeSortOptions(array, options);

    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        const key = array[i + 1];
        let cart = i;

        while (cart >= 0 && compare(array[cart], key) > 0){
            array[cart + 1] = array[cart];
            cart--;
        }
        array[cart + 1] = key;
    }
    return array;
}

/**
 * Sorts **this array** in-place using insertion sort (Array.prototype addon).
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
 * @throws {NotArrayError} If `this` is not an Array (rare, unless called with .call/.apply).
 * @throws {AscendingTypeError} If ascending is not boolean.
 * @throws {ComparatorTypeError|ComparatorError} If compare is invalid.
 */
export function insertionSortPrototype(options = {}) {
    return insertionSort(this, options);
}
