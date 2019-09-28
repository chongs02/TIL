# Hooks - useEffect 사용법

**useEffect**

- `useEffect`는 2가지 파라미터를 받는다
  - function
  - dependency

1. function은 dependency가 업데이트 될때마다 실행한다 : `componentDidUpdate`
2. dependency가 비어있으면 `componentDidmount`
3. `return` 뒤는 `componentWillUnmount`

```javascript
const App = () => {
  const sayHello = () => console.log("hello");

  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  useEffect(sayHello, [number]); //number가 변경될때만 sayHello를 실행한다.
  // => number가 변경될때만 실행, aNumber가 변결될때는 실행되지 않음

  return (
    <div className="App">
      <b>useEffect</b>
      <br />
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};
```
