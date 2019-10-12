**`call by value`**

```javascript
function func(instance) {
  instance = 10;
  console.log(instance);
}
var variable = 5;

func(variable);
// 10
console.log(variable);
// 5
```

```javascript
function func(instance) {
  instance.a = 10;
  console.log(instance);
}

var variable = { a: 5 };

func(variable);
// VM10385:3 {a: 10}

console.log(variable);
// VM10572:1 {a: 10}
```

- 참조관계 때문에 `variable`도 바뀌게된다
- **`call by reference`는 자바스크립트에 존재하지 않는다**
- `C` 나 `C++` 같은 `pointer가` 있는 언어는 `call by reference` 가있음

_반례_

```javascript
function func(instance) {
  instance = 10;
  console.log(instance);
}

var variable = { a: 5 };

func(variable);
// VM10820:3 10

console.log(variable);
// VM11001:1 {a: 5}
```

- 객체 속성 수정 시에는 참조이지만 객체 자체를 수정할 시에는 관계가 깨짐
- `call by sharing`이라고 하지만 정식용어가 아님
