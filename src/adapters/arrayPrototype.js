import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { autoSortPrototype } from "../core/autoSort.js";

export function arrayPrototype() {
    Array.prototype.bubbleSort = bubbleSortPrototype;
    Array.prototype.autoSort = autoSortPrototype;
}
