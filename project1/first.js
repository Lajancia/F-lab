const deepCopy = (obj, keySet) => {
    try {
        // 기본형 복사
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // 참조형 복사
        else {
            let clone = Array.isArray(obj) ? [] : {};

            if (obj instanceof Map) {
                // Map인 경우
                let map = new Map();
                for (let [key, value] of obj) {
                    map.set(deepCopy(key), deepCopy(value));
                }
                return map
            } else if (obj instanceof Set) {
                // Set인 경우
                let set = new Set();
                for (let value of obj) {
                    set.add(deepCopy(value));
                }
                return set
            } else if (obj instanceof WeakMap) {
                if (!keySet) {
                    throw new Error("WeakMap keySet parameter is required");
                }
                let weakMapClone = new WeakMap();
                for (let weakKey of keySet) {
                    if (obj.has(weakKey)) {
                        weakMapClone.set(weakKey, deepCopy(obj.get(weakKey), keySet));
                    }
                }
                clone = weakMapClone;
            } else if (obj instanceof WeakSet) {
                if (!keySet) {
                    throw new Error("WeakSet keySet parameter is required");
                }
                // 참조형 : WeakSet
                let weakSetClone = new WeakSet();
                
                for (let weakKey of keySet) {
                    if (obj.has(weakKey)) {
                        weakSetClone.add(deepCopy(weakKey, keySet));
                    }
                }
                clone = weakSetClone;
            } else {
                for (let key in obj) {
                    clone[key] = deepCopy(obj[key], keySet); // 일반 객체
                }
            }
            return clone;
        }
    } catch (e) {
        return e.message;
    }
}

module.exports = { deepCopy };