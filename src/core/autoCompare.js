function getArrayRank(value) {
    if (Number.isNaN(value)) return 97;
    if (value === null) return 98;
    if (value === undefined) return 99;

    const type = typeof value;

    switch (type) {
        case "number":
            return 0;
        case "bigint":
            return 1;
        case "string":
            return 2;
        case "boolean":
            return 3;
        case "symbol":
            return 4;
        case "function":
            return 11;
        case "object":
            if (Array.isArray(value)) return 5;
            if (value instanceof Date) return 6;
            if (value instanceof RegExp) return 7;
            if (value instanceof Map) return 8;
            if (value instanceof Set) return 9;
            if (ArrayBuffer.isView(value)) return 10;
            return 12;
        default:
            return 96;
    }
}

export function autoCompare(a, b) {
    const aRank = getArrayRank(a);
    const bRank = getArrayRank(b);

    if (aRank !== bRank) {
        const distance = aRank - bRank;
        return distance > 0 ? 1 : -1;
    }

    switch (aRank) {
        // number
        case 0: {
            const distance = a - b;
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // bigint
        case 1: {
            if (a === b) return 0;
            return a > b ? 1 : -1;
        }

        // string
        case 2: {
            const distance = a.localeCompare(b);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // boolean (false < true)
        case 3: {
            if (a === b) return 0;
            return a === false ? -1 : 1;
        }

        // symbol (description)
        case 4: {
            const sa = a.description ?? "";
            const sb = b.description ?? "";
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // Array
        case 5: {
            const lenDiff = a.length - b.length;
            if (lenDiff !== 0) return lenDiff > 0 ? 1 : -1;

            const min = Math.min(a.length, b.length);
            for (let i = 0; i < min; i++) {
                const c = autoCompare(a[i], b[i]);
                if (c !== 0) return c;
            }
            return 0;
        }

        // Date
        case 6: {
            const ta = a.getTime();
            const tb = b.getTime();
            if (ta > tb) return 1;
            if (ta < tb) return -1;
            return 0;
        }

        // RegExp
        case 7: {
            const sa = a.toString();
            const sb = b.toString();
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // Map
        case 8: {
            const sizeDiff = a.size - b.size;
            if (sizeDiff !== 0) return sizeDiff > 0 ? 1 : -1;

            const sa = JSON.stringify(Array.from(a.entries()));
            const sb = JSON.stringify(Array.from(b.entries()));
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // Set
        case 9: {
            const sizeDiff = a.size - b.size;
            if (sizeDiff !== 0) return sizeDiff > 0 ? 1 : -1;

            const sa = JSON.stringify(Array.from(a.values()).sort());
            const sb = JSON.stringify(Array.from(b.values()).sort());
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // TypedArray / ArrayBuffer view
        case 10: {
            const lenA = "length" in a ? a.length : a.byteLength;
            const lenB = "length" in b ? b.length : b.byteLength;
            const lenDiff = lenA - lenB;
            if (lenDiff !== 0) return lenDiff > 0 ? 1 : -1;

            const length = Math.min(lenA, lenB);
            for (let i = 0; i < length; i++) {
                const va = a[i];
                const vb = b[i];
                const c = autoCompare(va, vb);
                if (c !== 0) return c;
            }
            return 0;
        }

        // function (name + toString)
        case 11: {
            const sa = a.name + ":" + a.toString();
            const sb = b.name + ":" + b.toString();
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // plain object / other objects
        case 12: {
            const sa = JSON.stringify(a);
            const sb = JSON.stringify(b);
            const distance = sa.localeCompare(sb);
            if (distance > 0) return 1;
            if (distance < 0) return -1;
            return 0;
        }

        // NaN
        case 97:
            return 0;

        // null
        case 98:
            return 0;

        // undefined
        case 99:
            return 0;

        // unknown
        default:
            return 0;
    }
}


