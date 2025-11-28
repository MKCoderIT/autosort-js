import * as Errors from "./errors/errors.js";

export class ErrorsCall {
    static confirmCompare(array, func) {
        if (typeof func === "function") {
            const n = array.length;
            if (n !== 0 && n >= 2) {
                const funcResult = func(array[0], array[1]);
                if (typeof funcResult === "number" && !Number.isNaN(funcResult)) {
                    if (funcResult > 0 || funcResult === 0 || funcResult === -1) {
                    }
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
}
