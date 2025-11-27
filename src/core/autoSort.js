import bubbleSort from "../algorithms/bubbleSort.js";
import autoCompare from "./autoCompare.js";

export default function autoSort(array, ascending = true, func = null){
    const compare = func || autoCompare;
    return bubbleSort(array, ascending , compare);
}
