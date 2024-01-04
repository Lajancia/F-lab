const { deepCopy } = require('./first');

describe('기본형 깊은 복사 테스트', () => {
    // 기본형 : 숫자
    test('숫자 복사 테스트', () => {
        let num = 15;
        let numCopy = deepCopy(num);
        
        expect(num).toStrictEqual(numCopy);
        
        num = 10;

        expect(num).not.toBe(numCopy);
    });
    
    // 기본형 : 문자
    test('문자 복사 테스트', () => {
        let word = "Hello world!";
        let wordCopy = deepCopy(word);
        
        expect(word).toStrictEqual(wordCopy);

        word = "Hello 2024!";
        
        expect(word).not.toBe(wordCopy);
    });

    // 기본형 : null, undefined
    test('null, undefined 복사 테스트', () => {
        let value = null;
        let value2 = undefined;
        let valueCopy = deepCopy(value);
        let value2Copy = deepCopy(value2);
        
        expect(value).toStrictEqual(valueCopy);
        expect(value2).toStrictEqual(value2Copy);

        value = 1;
        value2 = 2;
        
        expect(value).not.toStrictEqual(valueCopy);
        expect(value2).not.toStrictEqual(value2Copy);
    });

    // 기본형 : Symbol
    test('Symbol 복사 테스트', () => {
        let value = Symbol('original');
        let copyValue = deepCopy(value);

        expect(value).toStrictEqual(copyValue);

        copyValue = Symbol('copied');
        expect(value).not.toStrictEqual(copyValue);
    });
});

describe('참조형 데이터 깊은 복사 테스트', () => {
    // 참조형 : 객체
    test('객체 복사 테스트', () => {
        let obj = {
            prop : "hello",
            prop2: ["first", "second"],
        }
        let copyObj = deepCopy(obj);

        expect(obj).toStrictEqual(copyObj);


        obj.prop = "hello word";
        obj.prop2[1] = "third";

        expect(obj.prop).not.toStrictEqual(copyObj.prop);
        expect(obj.prop2).not.toStrictEqual(copyObj.prop2);
    });
    
    // 참조형 : Array
    test('Array 타입 프로퍼티 복사 테스트', () => {
        let arr = ["first", "second", "third"];
        let arrCopy = deepCopy(arr);
        
        expect(arr).toStrictEqual(arrCopy);

        arrCopy[2] = "new data";

        expect(arr).not.toStrictEqual(arrCopy);
    });

    // 참조형 : Date
    test('Date 타입 프로퍼티 복사 테스트', () => {
        let date = new Date();
        let dateCopy = deepCopy(date);

        expect(date).toStrictEqual(dateCopy);

        dateCopy = "other data";

        expect(date).not.toStrictEqual(dateCopy);
    });

    // 참조형 : map
    test('map 타입 프로퍼티 복사 테스트', () => {
        let map = new Map();
        map.set('name', 'Soomin Hwang');
        map.set('age', 25);
        map.set('job', 'Frontend Developer');

        let mapCopy = deepCopy(map);

        expect(map.get('name')).toStrictEqual(mapCopy.get('name'));
        expect(map.get('age')).toStrictEqual(mapCopy.get('age'));
        expect(map.get('job')).toStrictEqual(mapCopy.get('job'));

        mapCopy.set('name', 'John');
        mapCopy.set('age', 28);
        mapCopy.set('job', 'Backend Developer');

        expect(map.get('name')).not.toStrictEqual(mapCopy.get('name'));
        expect(map.get('age')).not.toStrictEqual(mapCopy.get('age'));
        expect(map.get('job')).not.toStrictEqual(mapCopy.get('job'));
    });

    // 참조형 : set
    test('map 타입 프로퍼티 복사 테스트', () => {
        let set = new Set();
        set.add('apple');
        set.add('banana');
        set.add('cherry');

        let setCopy = deepCopy(set);
        expect(set).toStrictEqual(setCopy);

        setCopy.delete('cherry');
        expect(set).not.toStrictEqual(setCopy);
    });
    
    // 참조형 : WeakMap
    test('WeakMap 타입 프로퍼티 복사 테스트', () => {
        let weakMap = new WeakMap();
        let obj = { a: 1 };
        weakMap.set(obj, 'value');

        // 키 Set 생성
        let keySet = new Set();
        keySet.add(obj);

        let weakMapCopy = deepCopy(weakMap, keySet);
        expect(weakMap).toStrictEqual(weakMapCopy);

        weakMapCopy.set(obj, "new data");
        expect(weakMap.get(obj)).toBe('value');
        expect(weakMapCopy.get(obj)).toBe("new data");
    });
    
    // 참조형 : WeakSet
    test('WeakSet 타입 프로퍼티 복사 테스트', () => {
        let obj1 = { name: "Object 1" };
        let obj2 = { name: "Object 2" };

        let weakSet = new WeakSet();
        weakSet.add(obj1);
        weakSet.add(obj2);

        let keySet = new Set();
        keySet.add(obj1);
        keySet.add(obj2);

        let weakSetCopy = deepCopy(weakSet, keySet);
        expect(weakSet).toStrictEqual(weakSetCopy);

        weakSetCopy.delete(obj2);

        expect(weakSet.has(obj2)).toBe(true);
        expect(weakSetCopy.has(obj2)).toBe(false);
    });
});

describe('다양한 객체 깊은 복사 테스트', () => {
    test('깊이 2 WeakMap 데이터 타입 프로퍼티 복사 테스트', () => {
        let weakMap = new WeakMap();
        let obj = { a: 1 };
        weakMap.set(obj, 'value');

        let weakMap2 = new WeakMap();
        let obj2 = { b: 1 };
        weakMap2.set(obj2, 'value2');

        // outerObj 객체 생성
        let outerObj = {
            innerObj: { // weakMap 타입 프로퍼티를 가지는 innerObj 생성
                weakMap: weakMap, 
                weakMap2: weakMap2
            }
        };

        // 키 Set 생성
        let keySet = new Set();
        keySet.add(obj);
        keySet.add(obj2);

        let deepCopiedObj = deepCopy(outerObj, keySet);
        
        // 원본 결과
        expect(outerObj.innerObj.weakMap.get(obj)).toStrictEqual('value');
        expect(deepCopiedObj.innerObj.weakMap.get(obj)).toStrictEqual('value');

        // 프로퍼티 변경
        deepCopiedObj.innerObj.weakMap.set(obj, 'value changed')

        // 복사본 변경 결과 확인
        expect(outerObj.innerObj.weakMap.get(obj)).toBe('value');
        expect(deepCopiedObj.innerObj.weakMap.get(obj)).toBe('value changed');

    });

    test('keySet 없이 WeakSet을 복사하려 할 경우 에러 메세지 반환', () => {
        let obj1 = { name: "Object 1" };
        let obj2 = { name: "Object 2" };

        let weakSet = new WeakSet();
        weakSet.add(obj1);
        weakSet.add(obj2);

        let weakSetCopy = deepCopy(weakSet);
        expect(weakSetCopy).toBe("WeakSet keySet parameter is required"); 
    });
});
