import { autoCompare } from "./autoCompare.js";
import { Validators } from "./validators.js";

const DEFAULT_OPTIONS = { ascending: true, compare: null };

export function normalizeSortOptions(array, options = {}) {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    const ascending = mergedOptions.ascending;
    const baseCompare = mergedOptions.compare ?? autoCompare;

    Validators.assertArray(array);
    Validators.assertAscending(ascending);
    Validators.assertCompare(array, baseCompare);

    const compare = ascending ? baseCompare : (a, b) => -baseCompare(a, b);

    return { compare };
}
