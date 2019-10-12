### 생성자와 new

```javascript
function Card(name, att, hp) {
  this.name = name;
  this.att = att;
  this.hp = hp;
}

var prototype = {
  type: "카드"
};

Card.prototype = prototype;
// {
//   type: "카드";
// }
new Card("Hello", 5, 10);

// Card {name: "Hello", att: 5, hp: 10}
// att: 5
// hp: 10
// name: "Hello"
// __proto__:
// type: "카드"
// __proto__: Object
```

- Card 생성자로 만들었다는게 명시됨 `Card`
- `__proto__`와 `prototype`을 헷깔리면 안됨

```javascript
function Card(name, att, hp) {
  this.name = name;
  this.att = att;
  this.hp = hp;
}

var prototype = {
  type: "카드"
};

Card.prototype = prototype;

var newCard = Card("withoutnew", 5, 10);

newCard;
// undefined

window.att;
// 5
window.hp;
// 10
```

- newCard생성시 `new`를 붙히지 않으면 함수형이 됨
- `return`이 없기 때문에 `undefined`가 생성
- `this` 는 window

**엄격모드**

```javascript
function Card(name, att, hp) {
  "use strict";
  this.name = name;
  this.att = att;
  this.hp = hp;
}

var prototype = {
  type: "카드"
};

Card.prototype = prototype;

var newCard = Card("withoutnew", 5, 10);
// VM12574:3 Uncaught TypeError: Cannot set property 'name' of undefined
//     at Card (<anonymous>:3:13)
//     at <anonymous>:2:15

var newCard = new Card("withNew", 5, 10);

newCard;
// Card {name: "withNew", att: 5, hp: 10}

window.name;
// "withoutnew"
newCard.name;
// "withNew"
```

- 엄격모드(`"use strict"`)에서 `this`사용시 생성자 함수에 `new`를 안붙히면 오류가 뜸
- `new`를 붙히면 `window`에서 `객체`로 바뀜
- 엄격모드는 해당 스코프 안에서만 적용이 된다
