import { autoCompare } from "../core/autoCompare.js";
import { ErrorsCall } from "../core/analyzeArray.js";

export function insertionSort(array, ascending = true, func = null) {
    const compare = func || autoCompare;
    if (ErrorsCall.arrayType(array)) {
        if (ErrorsCall.confirmCompare(array, compare)) {
            const n = array.length;

            for (let i = 0; i < n - 1; i++) {
                const key = array[i + 1];
                let cart = i;

                while (cart >= 0 && (ascending ? compare(array[cart], key) > 0 : compare(array[cart], key) < 0)) {
                    array[cart + 1] = array[cart];
                    cart--;
                }
                array[cart + 1] = key;
            }
            return array;
        }
    }
    return ErrorsCall.autoSort("InsertionSort: It did not run due to a problem.");
}

export function insertionSortPrototype(ascending = true, func = null) {
    return insertionSort(this, ascending, func);
}
