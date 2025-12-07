import { autoCompare } from "./autoCompare.js";
import { Validators } from "./validators.js";

const DEFAULT_OPTIONS = { ascending: true, compare: null };

/**
 * Merge options + validate + return normalized config.
 * @template T
 * @param {T[]} array
 * @param {{ ascending?: boolean, compare?: ((a:T,b:T)=>number) | null }} [options]
 * @returns {{ ascending: boolean, compare: (a:T,b:T)=>number }}
 */
export function normalizeSortOptions(array, options = {}) {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    const ascending = mergedOptions.ascending;
    const compare = mergedOptions.compare ?? autoCompare;

    Validators.assertArray(array);
    Validators.assertAscending(ascending);
    Validators.assertCompare(array, compare);

    return { ascending, compare };
}
