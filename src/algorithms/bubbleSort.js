import { autoCompare } from "../core/autoCompare.js";
import { ErrorsCall } from "../core/analyzeArray.js";

export function bubbleSort(array, ascending = true, func = null) {
    const compare = func || autoCompare;
    if (ErrorsCall.arrayType(array)) {
        if (ErrorsCall.confirmCompare(array, compare)) {
            const n = array.length;
            for (let i = 0; i < n - 1; i++) {
                let swapped = false;

                for (let j = 0; j < n - 1 - i; j++) {
                    const result = ascending
                        ? compare(array[j], array[j + 1]) > 0
                        : compare(array[j], array[j + 1]) < 0;
                    if (result) {
                        const temp = array[j + 1];
                        array[j + 1] = array[j];
                        array[j] = temp;

                        swapped = true;
                    }
                }
                if (!swapped) break;
            }
            return array;
        }
    }
    return ErrorsCall.autoSort("bubbleSort: It did not run due to a problem.");
}

export function bubbleSortPrototype(ascending = true, func = null) {
    return bubbleSort(this, ascending, func);
}
