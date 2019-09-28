## 자바스크립트로 DOM에 접근하기

`document` : DOM에 접근할 수 있음
`document.body` : DOM의 body 태그에 접근
`document.createElement('<html tag>')` : `<html tag>` 생성
`{생성된 태그}.textCreate` : 태그에 text를 삽입
`document.body.append(<생성된 Tag>)` : DOM의 body에 Tag를 삽입

**예시**

- 구구단을 만들어보자

```javascript
var 숫자1 = Math.ceil(Math.random() * 9);
var 숫자2 = Math.ceil(Math.random() * 9);
var 결과 = 숫자1 * 숫자2;

var 바디 = document.body;
var 단어 = document.createElement("div");

단어.textContent = String(숫자1) + "곱하기" + String(숫자2) + "는?";
document.body.append(단어);

var 폼 = document.createElement("form");
document.body.append(폼);
var 입력창 = document.createElement("input");
입력창.type = "number";
폼.append(입력창);
var 버튼 = document.createElement("button");
폼.append(버튼);
버튼.textContent = "입력";

var 결과창 = document.createElement("div");
document.body.append(결과창);
```

input 버튼에 event를 추가

`addEventLisetener` : 이벤트를 받아 돌려준다
`event.preventDefault()` : tag가 가지고 있는 기본적인 작동을 막아줌
`{input place}.focus()` : 커서가 자동적으로 입력창으로 오게해줌
`{input place}.value` : 입력창의 value값을 지정할수 잇음

**Event 예시**

```javascript
폼.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(결과, 입력창.value);

  if (결과 === Number(입력창.value)) {
    결과창.textContent = "딩동댕";
    숫자1 = Math.ceil(Math.random() * 9);
    숫자2 = Math.ceil(Math.random() * 9);
    결과 = 숫자1 * 숫자2;
    입력창.value = "";
    입력창.focus();
  } else {
    결과창.textContent = "땡";
    입력창.value = "";
    입력창.focus();
  }
});
```
