import * as Errors from "./errors/errors.js";

export class ErrorsCall {
    //General and unknown errors
    static autoSort(message = null){
        throw new Errors.AutoSortError(message);
    }

    static confirmCompare(array, func) {
        if (typeof func === "function") {
            const n = array.length;
            if (n !== 0 && n >= 2) {
                const funcResult = func(array[0], array[1]);
                if (typeof funcResult === "number" && !Number.isNaN(funcResult)) {
                    return true;
                } else {
                    throw new Errors.ComparatorError();
                }
            }
            return true;
        } else {
            throw new Errors.ComparatorTypeError();
        }
    }
    static arrayType(array) {
        const type = (typeof array);
        if (type === "object" && Array.isArray(array)) {
            return true;
        }
        throw new Errors.NotArrayError(type);
    }
}
