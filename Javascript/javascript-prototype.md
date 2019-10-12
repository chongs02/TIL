**팩토리패턴**

```javascript
function cardFactory(name, att, hp) {
  return {
    name: name,
    att: att,
    hp: hp,
    type: "카드",
    attack: function() {},
    defend: function() {}
  };
}

var card = cardFactory("Me", 10, 10);
```

**프로토타입**

```javascript
var prototype = {
  type: "카드",
  attack: function() {},
  defend: function() {}
};

var card = {
  name: "hey",
  att: 10,
  hp: 10
};

card.__proto__ = prototype;
// {type: "카드", attack: ƒ, defend: ƒ}
card;
// {name: "hey", att: 10, hp: 10}
// att: 10
// hp: 10
// name: "hey"
// __proto__:
// attack: ƒ ()
// defend: ƒ ()
// type: "카드"
// __proto__: Object

card.__proto__.type;
// "카드"
card.type;
// "카드"   --> __proto__는 생략이 가능하다
```

- `__proto__`에 `prototype`이 숨어있다
- javascript가 객체의 속성을 찾을 때 없으면 `__proto__`를 찾음 : 그래서 생략가능

**팩토리 + 프로토타입**

```javascript
var prototype = {
  type: "카드",
  attack: function() {},
  defend: function() {}
};

function cardFactory(name, att, hp) {
  var card = {
    name: name,
    att: att,
    hp: hp
  };
  card.__proto__ = prototype;
  return card;
}
```

**`Object.create()`**

```javascript
var prototype = {
  type: "카드",
  attack: function() {},
  defend: function() {}
};
Object.create(prototype);
// {}__proto__: attack: ƒ ()defend: ƒ ()type: "카드"__proto__: Object
```

- 프로토타입을 생성해줌

**실제로 프로토타입 적용하는 방법**

```javascript
var prototype = {
  type: "카드",
  attack: function() {},
  defend: function() {}
};

function cardFactory(name, att, hp) {
  Object.create(prototype);
  card.name = name;
  card.att = att;
  card.hp = hp;
  return card;
}
```

- `__proto__`는 쓰지 않는게 좋다
