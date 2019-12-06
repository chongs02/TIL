## Forward Ref

- `Functional Component`로 `Ref`를 전달하는 예제

1.  FRParentInput.js

```javascript
import React, { Component } from "react";
import FRInput from "./FRInput_3";

class FRParentInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  clickHandler = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <FRInput ref={this.inputRef} />
        <button onClick={this.clickHandler}>Focus Input</button>
      </div>
    );
  }
}

export default FRParentInput;
```

2.  FRInput.js

```javascript
import React, { useEffect } from "react";

const FRInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
});

export default FRInput;
```

- `forwardRef` 매소드를 사용하면 `ref`를 보다 간결하게 이용 할 수 있음.
