const { deepCopy } = require('./first');
describe('기본형 깊은 복사 테스트', () => {
    // 기본형 : 숫자
    test('숫자 복사 테스트', () => {
        let num = 15;
        let numCopy = deepCopy(num);
        
        num = 10;

        expect(num).not.toBe(numCopy);
    });
    
    // 기본형 : 문자
    test('문자 복사 테스트', () => {
        let word = "Hello world!";
        let wordCopy = deepCopy(word);
        
        word = "Hello 2024!";
        
        expect(word).not.toBe(wordCopy);
    });

    // 기본형 : null, undefined
    test('null, undefined 복사 테스트', () => {
        let value = null;
        let value2 = undefined;
        let valueCopy = deepCopy(value);
        let value2Copy = deepCopy(value2);
        
        value = 1;
        value2 = 2;
        
        expect(value).not.toBe(valueCopy);
        expect(value2).not.toBe(value2Copy);
    });

    // 기본형 : Symbol
    test('Symbol 복사 테스트', () => {
        let value = Symbol('original');
        let copyValue = deepCopy(value);

        copyValue = Symbol('copied');
        expect(value).not.toBe(copyValue);
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

        obj.prop = "hello word";
        obj.prop2[1] = "third";

        console.log(obj.prop);
        console.log(copyObj.prop);

        expect(obj.prop).not.toBe(copyObj.prop);
        expect(obj.prop2).not.toBe(copyObj.prop2);
    });
    
    // 참조형 : Array

    // 참조형 : Date, Time

    // 참조형 : map
    test('map 타입 프로퍼티 복사 테스트', () => {
        let map = new Map();
        map.set('name', 'Soomin Hwang');
        map.set('age', 25);
        map.set('job', 'Frontend Developer');

        let mapCopy = deepCopy(map);
        mapCopy.set('name', 'John');
        mapCopy.set('age', 28);
        mapCopy.set('job', 'Backend Developer');

        expect(map.get('name')).not.toBe(mapCopy.get('name'));
        expect(map.get('age')).not.toBe(mapCopy.get('age'));
        expect(map.get('job')).not.toBe(mapCopy.get('job'));
    });

    // 참조형 : set
    
    // 참조형 : weakmap
    
    // 참조형 : weakset
});

describe('다양한 객체 깊은 복사 테스트', () => {
    test('deepCopy weakmap 타입 프로퍼티 복사 테스트', () => {
        // 원본 WeakMap 생성
        let weakMap = new WeakMap();
        let obj = { a: 1 };
        weakMap.set(obj, 'value');

        let weakMap2 = new WeakMap();
        let obj2 = { b: 1 };
        weakMap2.set(obj2, 'value2');

        // 키-값 쌍을 저장할 Map 생성
        let map = new Map();
        map.set(obj, 'value');
        map.set(obj2, 'value2');

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
        expect(outerObj.innerObj.weakMap.get(obj)).toBe('value');
        expect(deepCopiedObj.innerObj.weakMap.get(obj)).toBe('value');

        // 프로퍼티 변경
        deepCopiedObj.innerObj.weakMap.set(obj, 'value changed')

        // 복사본 변경 결과 확인
        expect(outerObj.innerObj.weakMap.get(obj)).toBe('value');
        expect(deepCopiedObj.innerObj.weakMap.get(obj)).toBe('value changed');

    });
});
