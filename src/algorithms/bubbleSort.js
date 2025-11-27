import autoCompare from "../core/autoCompare.js";

export default function bubbleSort(array, ascending = true, func = null) {

    const compare = func || autoCompare;

    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            const result = ascending ? compare(array[j], array[j + 1]) : compare(array[j + 1], array[j]);

            if (result > 0) {
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
