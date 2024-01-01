function deepCopy(obj, keySet = new Set()) {
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
                set.set(deepCopy(value));
            }
            return map
        }

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 참조형 : 
                if (obj[key] instanceof WeakMap) {
                    let weakMapClone = new WeakMap();
                    
                    for (let weakKey of keySet) {
                        if (obj[key].has(weakKey)) {
                            weakMapClone.set(weakKey, deepCopy(obj[key].get(weakKey), keySet));
                        }
                    }
                    clone[key] = weakMapClone;
                } else {
                    clone[key] = deepCopy(obj[key], keySet);
                }
            }
        }
        return clone;
    }
}

module.exports = { deepCopy };