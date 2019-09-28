**재귀함수**

```javascript
function recurcive(num) {
  console.log(num);
  if (num < 5) {
    recurcive(num + 1);
  }
}

recursive(1);

//>>
// 1
// 2
// 3
// 4
// 5
```

- 함수가 자기 자신을 다시 부른다
