**e.currentTarget 과 e.tartget의 차이**

```javascript
tbody.addEventListener("contextmenu", function(e) {
  console.log(e.currentTarget);
  console.log(e.target);
});

>> output

 - e.currentTarget
 <tbody>​
    <tr>​…​</tr>​
    <tr>​…​</tr>
    ​<tr>​…​</tr>​
    <tr>​…​</tr>​
    <tr>​…​</tr>
    ​<tr>​…​</tr>​
    <tr>​…​</tr>
    ​<tr>​…​</tr>​
    <tr>​…​</tr>​
    <tr>​…​</tr>​
</tbody>​

 - e.target
<td>!</td>
```

- e.cuurentTarget은 eventListener가 장착된 태그
- e.target 은 eventListener가 발생하는 태그

**Node.innerHTML=""**

```javascript
tbody.innerHTML = "";

>> 하위 태그 초기화
```

**scope**

- 기본적인 개념은 python과 같다.
- Global - Local scope 개념

```javascript
var x = "global";

function ex() {
  var x = "local";
  x = "change";
}

ex(); // x를 바꿔본다

console.log(x); //여전히 "global"

>> "global"
```

- 차이점
  - 함수에서 내부 변수를 선언(`var`)하지 않으면 외부 변수를 수정하는게 가능해진다.

```javascript
var x = "global";

function ex() {
  x = "local";
  x = "change";
}

ex(); // x를 바꿔본다

console.log(x) >> "change"; // x가 바뀌었다.
```

**스코프체인**

1. 변수를 inner에서 찾기
2. 변수를 outer에서 찾기
3. 변수를 전체범위에서 찾기

```javascript
var name = "chong";

function outer() {
  console.log("외부", name);
  function inner() {
    var enemy = "enemy";
    console.log("내부", name);
  }
  inner();
}

outer();

>> 외부 chong
>> 내부 chong


console.log(enemy);

>> Uncaught ReferenceError: enemy is not defined
```

**렉시컬 스코프**

- 코드가 적힌 순간 스코프가 정해진다

1. case 1 : wrapper에서 변수 선언 x

```javascript
var name = "zero";
function log() {
  console.log(name);
}

log();

//>> zero;

function wrapper() {
  name = "nero";
  log();
}

wrapper();

//>> nero;
```

2. case 2 : wrapper에서 변수 선언 o

```javascript
var name = "zero";
function log() {
  console.log(name);
}

log();
// >> zero

function wrapper() {
  var name = "nero";
  log();
}

wrapper();
// >> zero
```

**클로저**

- 반복문과 비동기 함수가 만날 때 클로저 문제가 자주 등장

```javascript
for (var i = 0; i < 100; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
// 예상 : 0 ~ 100까지  0초부터 99초로 찍힘
// >> 100만 찍힘
```

- 클로저의 특성을 이용하여 문제를 해결 할 수 있음

```javascript
for (var i = 0; i < 100; i++) {
    function closure(j){
        setTimeout(function() {
            console.log(j));
        }, i * 1000);
    }
    closure(i)
}
```

- 해결
- 콜스택 개념을 생각하자!
