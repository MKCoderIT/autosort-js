import { autoCompare } from "../core/autoCompare.js";
import { ErrorsCall } from "../core/analyzeArray.js";

export function insertionSort(array, ascending = true, func = null) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        const key = array[i + 1];
        let cart = i;

        while (cart >= 0 && array[cart] > key) {
            array[cart + 1] = array[cart];
            cart--;
        }
        array[cart + 1] = key;
    }
    return array;
}

const test = [4, 2 ,3, 1];
insertionSort(test);
console.log(test);
