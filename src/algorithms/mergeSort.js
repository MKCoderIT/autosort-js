import { normalizeSortOptions } from "../core/normalizeOptions.js";

export function mergeSort(array, options = {}) {
    //const { ascending, compare } = normalizeSortOptions(array, options);

    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    const merged = merge(sortedLeft, sortedRight);

    return merged;
}

function merge(left, right) {
    const out = [];
    let i = 0 , j = 0;

    while ((i < left.length, j < right.length)) {
        if (left[i] <= right[j]) {
            out.push(left[i++]);
        } else {
            out.push(right[j++]);
        }
    }
    return out.concat(left.slice(i), right.slice(j));
}

console.time('merge');

console.log("RESULT:", mergeSort([4, 1, 3, 9, 7]));

console.timeEnd('merge');
