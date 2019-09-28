# Hooks - useState 사용법

### useState 사용법

```javascript
const [value, setValue] = useState(value);
```

- state를 설정해 준다
- value : state의 이름
- setValue : state를 변경할 키워드

1. useInput

**useInput.js**

```javascript
import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue); // initialValue를 통해 변수를 state 초기값으로 선정
  const onChange = event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      // 만약 validator의 타입이 함수라면
      willUpdate = validator(value); //function(state=value) ===> willupdate
    }
    if (willUpdate) {
      setValue(value); // state를 업데이트
    }
  };
  return { value, onChange };
};

export default useInput;
```

**App.js**

```javascript
  //------------------useInput----------------
    // const maxLen = value => value.length <= 10; //10자이내만 입력가능
  const maxLen = value => !value.includes("@"); //@ 입력 불가

  // >> 이처럼 Input에 조건을 설정 할 수 있음

  const name = useInput("Mr.", maxLen);  // "Mr. "을 초기 값
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  ...

    return (
    <div className="App">
        {/* ---------useInput--------- */}
        <b>useInput</b>
        <h1>Hello {item}</h1>
        <input placeholder="Name" value={name.value} onChange={name.onChange} />
        {/* <input placeholder="Name" {...name} /> */}
        <button onClick={incrementItem}>Increment</button>
        <button onClick={decrementItem}>Decrement</button>
    </div>
    )
```

2. useTabs

**useTabs.js**

```javascript
import { useState } from "react";

const useTabs = (initialTab, allTabs) => {
  // initial Tab의 index와 Array를 받는다
  const [currentIndex, setCurrentIndex] = useState(initialTab); // initialTab의 index를 state에 넣는다

  if (!allTabs || !Array.isArray(allTabs)) {
    return; // 만약 Array를 입력하지 않거나 Array형태가 아니라면 아무것도 리턴하지 않는다
  }
  return {
    currentItem: allTabs[currentIndex], // Array가 들어오면 현재 Item은 현재 state에 들어있는 currentItem(Index) 이다
    changeItem: setCurrentIndex // 그리고 changeItem으로 현재의 Index를 컨트롤 한다
  };
};

export default useTabs;
```

**App.js**

```javascript
  //------------------useTabs----------------
  const content = [
  { tab: "Section 1", content: "I'm the content of the Section 1" },
  { tab: "Section 2", content: "I'm the content of the Section 2" },
  { tab: "Section 3", content: "I'm the content of the Section 3" }
];

  export function App() {
      ...
  const { currentItem, changeItem } = useTabs(0, content);  // initial index 값과 array를 던져준다

  return(

      <b>useTabs</b>

      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>     //map을 통해 자동적으로 index 0 ~ 2 까지 들어감
        ))}
        <div>{currentItem.content}</div>
      </div>
  )
  }
```
