import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { insertionSortPrototype } from "../algorithms/insertionSort.js";
import { autoSortPrototype } from "../core/autoSort.js";

export function arrayPrototype() {
    Array.prototype.bubbleSort = bubbleSortPrototype;
    Array.prototype.autoSort = autoSortPrototype;
    Array.prototype.insertionSort = insertionSortPrototype;
}
