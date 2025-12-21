import { normalizeSortOptions } from "../src/core/normalizeOptions.js";
import { bubbleSort } from "../src/algorithms/bubbleSort.js";
import { insertionSort } from "../src/algorithms/insertionSort.js";
import { mergeSort } from "../src/algorithms/mergeSort.js";

function mergeSort2(array, options = {}) {
    const opt = normalizeSortOptions(array, options);
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort2(left, opt);
    const sortedRight = mergeSort2(right, opt);

    function merge(left, right) {
        const out = [];
        let i = 0,
            j = 0;

        while (i < left.length && j < right.length) {
            const shouldSwap = opt.ascending ? opt.compare(left[i], right[j]) > 0 : opt.compare(left[i], right[j]) < 0;
            if (shouldSwap) {
                out.push(right[j++]);
            } else {
                out.push(left[i++]);
            }
        }
        return out.concat(left.slice(i), right.slice(j));
    }

    function returns() {
        const merged = merge(sortedLeft, sortedRight);

        if (array.length === merged.length) {
            for (let i = 0; i < array.length; i++) {
                array[i] = merged[i];
            }
            return array;
        }
        return merged;
    }

    return returns();
}

function makeBig(n) {
    const out = [];
    for (let i = 0; i < n; i++) out.push(Math.floor(Math.random() * n));
    return out;
}

function benchBig(name, fn, n = 5000, rounds = 50) {
    for (let i = 0; i < 10; i++) {
        const a = makeBig(n);
        fn(a, { ascending: true });
    }

    console.time(`${name} n=${n}`);
    for (let i = 0; i < rounds; i++) {
        const a = makeBig(n);
        fn(a, { ascending: true });
    }
    console.timeEnd(`${name} n=${n}`);
}

benchBig("merge", mergeSort);
benchBig("old merge", mergeSort2);
benchBig("insertion", insertionSort);
benchBig("bubble", bubbleSort);
