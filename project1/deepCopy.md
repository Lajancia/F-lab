# 모든 타입 DeepCopy 가능 함수 만들기

**2023-12-26**

## 깊은 복사

깊은 복사는 데이터를 복사할 경우 원본 혹은 사본의 변경이 서로 영향을 주지 않는 복사이다.

일반적으로 객체의 프로퍼티 데이터가 변경될 경우 깊은 복사로 복사되지 않으면 원본과 사본의 변경이 서로 영향을 미친다.

프로퍼티를 가지는 객체에 한해서 재귀를 통해 내부의 모든 데이터를 복사하여 깊은 복사를 수행할 수 있다.

## 타입 종류

1. 기본형

   - 문자
   - 숫자
   - undefined
   - null
   - Symbol

2. 참조형
   - 객체
   - Date
   - functoin
   - map, set
   - WeakMap, WeakSet

- 기본형은 모두 깊은 복사가 수행된다.
- WeakMap과 WeakSet은 이 자체로 내부의 key를 추출할 수 없다. 때문에 keySet에 WeakMap과 WeakSet을 생성할 때 사용한 키들을 모두 담아두고 매개변수로 넘겨야 한다.