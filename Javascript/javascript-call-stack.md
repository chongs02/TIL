### 콜-스택(call stack)

```javascript
function d() {
  console.log("d");
}

function e() {
  console.log("e");
}

function a() {
  function b() {
    function c() {
      console.log("c");
    }
    c();
    console.log("b");
  }
  b();
  console.log("a");
}

d();
e();
a();

//>>output
// d;
// e;
// c;
// b;
// a;
```

**스택**

- 함수의 동작은 stack과 똑같다.
- LIFO (후입선출)

`a()`함수의 호출 스택

1. `a()`가 쌓임
2. `b()`가 쌓임
3. `c()`가 쌓임
4. `console.log('c')` 실행 : `c()` 종료
5. `console.log('b')` 실행 : `b()` 종료
6. `console.log('a')` 실행 : `a()` 종료

- 함수가 사라지면서 안에 있던 변수들도 모두 사라진다
