**일반적인 javascript 의 복사**

얕은복사 : 참조
깊은복사 : 복사

```javascript
var value = "hey";
var copy = value;
//>> (copy - "hey");

copy = "bye";
//>> (value - "hey");
```

`value`는 그대로 "hey"

- 변수를 대입을 해줘도 따로따로
- 그러나 객체(객체,배열,함수)일 때는 다르다

```javascript
var person = {
  name: "chong"
};
var copy = person;
copy.name = "noname";

person;
//>> {name: "noname"}
```

- 객체일 때는 복사된 값이 원본에 참조 관계가 형성된다.

**객체의 복사**

1. 원시값을 바꿔주기

```javascript
var obj = { a: 1, b: 2 };

var obj2 = {};
obj2.a = obj.a;
obj2.b = obj.b;
obj2.a = 2;

obj;
//{a: 1, b: 2}

obj2;
//{a: 2, b: 2}
```

```javascript
var obj = { a: 1, b: 2 };
var obj2 = {};
Object.keys(obj).forEach(function(key) {
  obj2[key] = obj[key];
});

obj2;
// {a: 1, b: 2}
obj;
// {a: 1, b: 2}

obj2.a = 4;

obj;
// {a: 1, b: 2}
obj2;
// {a: 4, b: 2}

var obj3 = obj;

obj === obj2;
// false
obj === obj3;
// true
```

- `forEach`함수 등으로 키값을 복사하여 원시값 복사가 가능
- `===`연산자로 참조관계가 있는지 확인가능

**`Object.assign()`**

```javascript
var obj = { a: 1, b: 2 };
var obj2 = {};
Object.assign(obj2, obj);
// {a: 1, b: 2}
```

- 이렇게 1단계복사 가능

```javascript
var obj = { a: 1, b: { c: 1 } };

Object.keys(obj).forEach(function(key) {
  obj2[key] = obj[key];
});

obj2.b.c = 8;

obj;
// {a: 1, b: {…}}a: 1b: {c: 8}__proto__: Object
```

- 그러나 내부에 객체가 있을 경우에는 참조관계가 형성된다.(1단계복사)

```javascript
var obj = { a: 1, b: { c: 1 } };

function copyObj(obj) {
  var copy = {};
  if (typeof obj === "object" && obj !== null) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = copyObj(obj[attr]);
      }
    }
  } else {
    copy = obj;
  }
  return copy;
}

var obj2 = copyObj(obj);

obj2.b.c = 8;

obj;
// {a: 1, b: {…}}a: 1b: c: 1__proto__: Object__proto__:
```

- 이렇게 커스텀 함수를 작성하여 해결하는 방법이 있으나 예외가 많아 어려움

**배열의 경우에는 `slice()` 활용가능**

```javascript
var arr = [1, 2, 3];
var arr2 = arr.slice();
arr2[0] = 10;

arr;
// (3) [1, 2, 3]
```

- 그러나 완전하지는 않다 1단계만 복사

**JSON.parse(JSON.stringify) 사용하기**

```javascript
obj = { a: 1, b: { c: 1 } };
obj2 = JSON.parse(JSON.stringify(obj));
obj2.b.c = 8;

obj.b.c;
// 1
```

- 2단계 이상의 복사는 JSON함수를 사용해야함
- 그러나 복사의 성능이 최악임
- 또한 완벽한 복사는 아님
