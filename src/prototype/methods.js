import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { insertionSortPrototype } from "../algorithms/insertionSort.js";
import { mergeSortPrototype } from "../algorithms/mergeSort.js";
import { autoSortPrototype } from "../core/autoSort.js";

export const ARRAY_PROTOTYPE_METHODS = Object.freeze({
    bubbleSort: bubbleSortPrototype,
    insertionSort: insertionSortPrototype,
    autoSort: autoSortPrototype,
    mergeSort: mergeSortPrototype
});

export const ARRAY_PROTOTYPE_METHOD_KEYS = Object.freeze(Object.keys(ARRAY_PROTOTYPE_METHODS));
