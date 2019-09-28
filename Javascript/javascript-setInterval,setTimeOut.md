####

`setTimeout(function, time)`

- 시간 지연 함수 : 일정 시간 후 작업을 한번 실행시키기

**예시**

```javascript
setTimeout(function() {
  console.log("1초뒤");
}, 1000);

// 1초뒤
```

`setInterval(function, time)`

- 일정한 시간 간격으로 작업을 실행

**예시**

```javascript
setInterval(function() {
  console.log("1초마다 반복");
}, 1000);

// 1초마다 반복
// 1초마다 반복
// 1초마다 반복
// 1초마다 반복
// 1초마다 반복
//  ...
```

`clearInterval()`, `clearTimeout()`

- 지정된 작업이 실행되고 다음 작업 스케쥴은 중지
