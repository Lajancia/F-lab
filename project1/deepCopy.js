const typeHandlers = {
    '[object Number]': (obj) => {return obj},
    '[object String]': (obj) => {return obj},
    '[object Null]': (obj) => {return obj},
    '[object Undefined]': (obj) => {return obj},
    '[object Symbol]': (obj) => {return obj},
    '[object Date]': (obj) => {return obj},
    '[object Object]': (obj) => {
        const clone = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            clone[key] = deepCopy(obj[key]); // 일반 객체
        }
        return clone;
    },
    '[object Array]': (obj) => {
        const clone = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            clone[key] = deepCopy(obj[key]); // 일반 객체
        }
        return clone;
    },
    '[object Map]': (obj) => {
        const map = new Map();
        for (const [key, value] of obj) {
            map.set(deepCopy(key), deepCopy(value));
        }
        return map
    },
    '[object Set]': (obj) => {
        const set = new Set();
        for (const value of obj) {
            set.add(deepCopy(value));
        }
        return set
    },
    '[object WeakMap]': () => {
        throw new Error("WeakMap cannot be decopied");
    },
    '[object WeakSet]': (oj) => {
        throw new Error("WeakSet cannot be decopied");
    }
};

const deepCopy = (obj) => {
    const type = Object.prototype.toString.call(obj);

    if (typeHandlers.hasOwnProperty(type)) {
        const copy = typeHandlers[type];
        return copy(obj);
    } else {
        throw new Error("This type doesn't support");
    }
}

// try, catch 유틸화
const handleError = (func) => {
    return function (...arg) {
        try {
            return func(...arg);
        } catch (e) {
            return e.message
        }
    };
}

// try, catch + deepCopy
const deepCopy_refact = handleError(deepCopy);

module.exports = { deepCopy_refact};