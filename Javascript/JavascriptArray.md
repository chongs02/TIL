### 자바스크립트 Array관련 함수

`Array.splice(자리수, 갯수)`

- 예를들어 (3,1) => 3번째 index부터 1개를 뽑겠다 (기존 array의 숫자는 사라짐)
- 배열로 뽑힘

**예시**

```javascript
var a = [1, 2, 3, 4, 5];
// -> (5) [1, 2, 3, 4, 5]
a.splice(0, 3);
// -> (3) [1, 2, 3]

// a: [4,5]
```

`Array.pop()` : 뒤에서부터 자료가 뽑힘 (맨 뒤의 자료는 삭제됨)

**예시**

```javascript
var a = [1, 2, 3, 4, 5];
// -> (5) [1, 2, 3, 4, 5]

a.pop();
// 5

// a : [1, 2, 3, 4]
```

`Array.shift()` : 앞에서 부터 자료가 뽑힘 (앞의 자료는 삭제됨)

**예시**

```javascript
var a = [1, 2, 3, 4, 5];
// -> (5) [1, 2, 3, 4, 5]

a.shift();
// 1

// a : [2, 3, 4, 5]
```

`Array.push()` : 뒤로 차례대로 넣기

**예시**

```javascript
var a = [1, 2, 3];
// -> [1,2,3]

a.push(1);
// 1

// a : [1, 2, 3, 1]
```

`Array.unshift()` : 앞에서 부터 넣기
**예시**

```javascript
var a = [1, 2, 3];
// -> [1,2,3]
a.unshift(1);
// 1

// a : [1, 1, 2, 3]
```

`Array.indexOf()` : 배열안의 요소의 index 번호를 알려줌

**예시**

```javascript
var a = [1, 2, 3];
// -> [1,2,3]
a.indexOf(2);
// 1
```

`Array.join("")` : 배열안의 요소를 합쳐준다

**예시**

```javascript
var a = [1, 2, 3];
// -> [1,2,3]
a.join("");
// "123"
```

`String.split("")` : 문자를 배열로 바꾸어준다

**예시**

```javascript
var a = [1, 2, 3];
// -> [1,2,3]
a.split("");
// (3) ["1", "2", "3"]
```

`Array(number)` : `number`크기의 빈 Array를 생성

`Array(number).fill(value)` : Array를 value로 채워준다. \*공백: undefined

**예시**

```javascript
Array(4).fill();

// -> (4) [undefined, undefined, undefined, undefined]
```

`Array.slice(시작, 끝)` : 시작~끝 index의 값을 가져와 복사한다

**예시**

```javascript
var a = [1, 2, 3, 4, 5];
// -> (5) [1, 2, 3, 4, 5]
a.splice(0, 3);
// -> (3) [1, 2, 3]

// a:[1,2,3,4,5]
```

`Array.sort(function(p,c) {return p -c})` : 크기 순으로 솔트해줌 `p` : 이전숫자, `c`: 다음숫자 --> 뺀결과가 0보다 크면 순서를 바꾼다.

```javascript
var b = [123, 36, 12, 123, 323];
// ->(5) [12, 36, 123, 123, 323]
b.sort(function(p, c) {
  return p - c;
});
// ->(5) [12, 36, 123, 123, 323]
```

`Array.forEach()` : 주어진 함수를 배열 요소 각각에 실행

**예시**

```javascript
var a = ["a", "b", "c", "d", "e"];
undefined;
a.forEach(function(element) {
  console.log(element);
});
// a
// b
// c
// d
// e
```
