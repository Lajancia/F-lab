const { deepCopy_refact } = require('./deepCopy');

describe('기본형 깊은 복사 테스트', () => {
    // 기본형 : 숫자
    test('숫자 복사 테스트', () => {
        const num = 15;
        
        let numCopy = deepCopy_refact(num);
        numCopy = 10;

        expect(numCopy).not.toBe(num);
    });
    
    // 기본형 : 문자
    test('문자 복사 테스트', () => {
        const word = "Hello world!";
        
        let wordCopy = deepCopy_refact(word);
        wordCopy = "Hello 2024!";
        
        expect(wordCopy).not.toBe(word);
    });

    // 기본형 : undefined
    test('undefined 복사 테스트', () => {
        const value = undefined;

        let valueCopy = deepCopy_refact(value);
        valueCopy = 2;
        
        expect(valueCopy).not.toBe(value);
    });

    // 기본형 : null
    test('null 복사 테스트', () => {
        const value = null;
        
        let valueCopy = deepCopy_refact(value);
        valueCopy = 1;
        
        expect(valueCopy).not.toBe(value);
    });

    // 기본형 : Symbol
    test('Symbol 복사 테스트', () => {
        const value = Symbol('original');

        let copyValue = deepCopy_refact(value);
        copyValue = Symbol('copied');

        expect(copyValue).not.toBe(value);
    });
});

describe('참조형 데이터 깊은 복사 테스트', () => {
    // 참조형 : 객체
    test('객체 복사 테스트', () => {
        const obj = {
            prop : "hello",
            prop2: ["first", "second"],
        }
        const copyObj = deepCopy_refact(obj);

        obj.prop2[1] = "third";

        expect(obj.prop2).not.toStrictEqual(copyObj.prop2);
    });
    
    // 참조형 : Array
    test('Array 타입 프로퍼티 복사 테스트', () => {
        const arr = ["first", "second", "third"];
        const arrCopy = deepCopy_refact(arr);
        
        arrCopy[2] = "new data";
        expect(arr).not.toStrictEqual(arrCopy);
    });

    // 참조형 : Date
    test('Date 타입 프로퍼티 복사 테스트', () => {
        const date = new Date();

        let dateCopy = deepCopy_refact(date);
        dateCopy = "other data";

        expect(date).not.toStrictEqual(dateCopy);
    });

    // 참조형 : map
    test('map 타입 프로퍼티 복사 테스트', () => {
        const map = new Map();
        map.set('name', 'Soomin Hwang');
        map.set('age', 25);
        map.set('job', 'Frontend Developer');

        const mapCopy = deepCopy_refact(map);
        mapCopy.set('job', 'Backend Developer');

        expect(map.get('job')).not.toStrictEqual(mapCopy.get('job'));
    });

    // 참조형 : set
    test('map 타입 프로퍼티 복사 테스트', () => {
        const set = new Set();
        set.add('apple');
        set.add('banana');
        set.add('cherry');

        const setCopy = deepCopy_refact(set);
        setCopy.delete('cherry');

        expect(set).not.toStrictEqual(setCopy);
    });
    
    // 참조형 : WeakMap
    test('WeakMap 타입 프로퍼티 복사 테스트', () => {
        const weakMap = new WeakMap();

        const obj = { a: 1 };
        weakMap.set(obj, 'value');

        const weakMapCopy = deepCopy_refact(weakMap);
        expect(weakMapCopy).toBe('WeakMap cannot be decopied');
    });
    
    // 참조형 : WeakSet
    test('WeakSet 타입 프로퍼티 복사 테스트', () => {
        const obj1 = { name: "Object 1" };
        const obj2 = { name: "Object 2" };

        const weakSet = new WeakSet();
        weakSet.add(obj1);
        weakSet.add(obj2);

        const weakSetCopy = deepCopy_refact(weakSet);

        expect(weakSetCopy).toBe('WeakSet cannot be decopied');
    });
});

