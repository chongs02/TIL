## RenderProps 예제

1. 기본 Component 생성 : Counter.js

```javascript
import React, { Component } from "react";
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  incrementCount = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 };
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        // children으로 넘기는 방법과 render로 넘기는 방법이 있는데 택 1하여
        선택한다.
        <div>{this.props.children(this.state.count, this.incrementCount)}</div>
        <div>{this.props.render(this.state.count, this.incrementCount)}</div>
      </div>
    );
  }
}
export default Counter;
```

2. ClickCounter.js , HoverCounter.js

```javascript
import React, { Component } from "react";
class ClickCounterTwo extends Component {
  render() {
    const { count, incrementCount } = this.props;
    return <button onClick={incrementCount}>Clicked {count} times</button>;
  }
}
export default ClickCounterTwo;

import React, { Component } from "react";
class HoverCounterTwo extends Component {
  render() {
    const { count, incrementCount } = this.props;
    return <h2 onMouseOver={incrementCount}>Hovered {count} times</h2>;
  }
}
export default HoverCounterTwo;
```

3. App.js

```javascript
function App() {
  return (
    <div className="App">
      // children으로 넘기는 방법
      <Counter>
        {(count, incrementCount) => (
          <ClickCounterTwo count={count} incrementCount={incrementCount} />
        )}
      </Counter>
      // render로 넘기는 방법
      <Counter
        render={(count, incrementCount) => (
          <HoverCounterTwo count={count} incrementCount={incrementCount} />
        )}
      />
    </div>
  );
}
```
