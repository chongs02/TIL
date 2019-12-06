## Ref with Class

1. 일반적 Ref 사용법

```javascript
import React, { Component } from "react";

class RefsDemo extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.cbRef = null;
    this.setCbRef = element => {
      this.cbRef = element;
    };
  }

  componentDidMount() {
    if (this.cbRef) {
      this.cbRef.focus();
    }
  }

  clickHandler = () => {
    alert(this.inputRef.current.value);
    // ref.current.value로 input에 들어있는 value에 접근 가능함
  };

  render() {
    return (
      <div>
        <input type="text" ref={this.setCbRef} />
        <input type="text" ref={this.inputRef} />
        <button onClick={this.clickHandler}>Click</button>
      </div>
    );
  }
}

export default RefsDemo;
```

- 실행시 focus는 `cbRef`로 들어간다.
- button Click시 `inputRef`가 삽입되어있는 `input`의 값이 알람으로 출력된다.

2. Ref를 하위 컴포넌트로 넘기기

**FocusInput.js**

```javascript
import React, { Component } from "react";
import Input from "./Input_2";

class FocusInput extends Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  clickHandler = () => {
    this.componentRef.current.focusInput();
  };

  render() {
    return (
      <div>
        <Input ref={this.componentRef}></Input>
        <button onClick={this.clickHandler}>Focus Input</button>
      </div>
    );
  }
}

export default FocusInput;
```

- `ref`를 생성하여 `props`로 하위 컴포넌트로 넘긴다.
- `Input` component의 `focusInput()` 메소드를 사용

**Input.js**

```javascript
import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef}></input>
      </div>
    );
  }
}
export default Input;
```
