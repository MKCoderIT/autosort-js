import { bubbleSort } from "../algorithms/bubbleSort.js";
import { autoCompare } from "./autoCompare.js";

export function autoSort(array, ascending = true, func = null) {
    const compare = func || autoCompare;
    return bubbleSort(array, ascending, compare);
}

export function autoSortPrototype(ascending = true, func = null) {
    return autoSort(this, ascending, func);
}
