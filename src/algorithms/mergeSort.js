import { normalizeSortOptions } from "../core/normalizeOptions.js";

export function mergeSort(array, options = {}) {
    const opt = normalizeSortOptions(array, options);
    if (array.length <= 1) return array;

    const auxiliary = new Array(array.length);
    const min = 0;
    const max = array.length - 1;

    sortRange(array, auxiliary, opt.compare, min, max);

    return array;
}

function sortRange(array, auxiliary, compare, min, max) {
    if (min >= max) return;

    const mid = (min + max) >> 1; //Math.floor()

    sortRange(array, auxiliary, compare, min, mid);
    sortRange(array, auxiliary, compare, mid + 1, max);

    if (compare(array[mid], array[mid + 1]) <= 0) return;

    mergeRange(array, auxiliary, compare, min, mid, max);
}

function mergeRange(array, auxiliary, compare, min, mid, max) {
    for (let k = min; k <= max; k++) auxiliary[k] = array[k];

    let i = min,
        j = mid + 1;

    for (let k = min; k <= max; k++) {
        if (i > mid) array[k] = auxiliary[j++];
        else if (j > max) array[k] = auxiliary[i++];
        else if (compare(auxiliary[i], auxiliary[j]) > 0) array[k] = auxiliary[j++];
        else array[k] = auxiliary[i++];
    }
}

