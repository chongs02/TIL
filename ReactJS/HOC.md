## HOC 예제

- 2가지 클릭 동일한 `state`와 `function`을 쓰는 `component`가 있을 때 `HOC`를 사용하면 **중복**을 제거할 수있음

1. HOC 구조

```javascript
const HOCFunc = (pram1, param2) => {
  class wrapperClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          state = "state"
      }
    }

    duplicatedFunction = () =>{
        return null
    }

    render(){
        return <WrappedComponent var1={this.state.state}
          func1={this.duplicatedFunction}
          {...this.props} />
    }
  }
  return wrapperClass;
};
```

**예제**

2. withCounter.js

```javascript
import React from "react";

const withCounter = (WrappedComponent, incrementNumber) => {
  class WithCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    incrementCount = () => {
      this.setState(prevState => {
        return { count: prevState.count + incrementNumber };
      });
    };

    render() {
      console.log(this.props.name);
      return (
        <WrappedComponent
          count={this.state.count}
          incrementCount={this.incrementCount}
          {...this.props}
        />
      );
    }
  }
  return WithCounter;
};

export default withCounter;
```

3. ClickCounter.js

```javascript
import React, { Component } from "react";
import withCounter from "./withCounter";

class ClickCounter extends Component {
  render() {
    const { count, incrementCount } = this.props;
    return (
      <button onClick={incrementCount}>
        {this.props.name} Clicked {count} times
      </button>
    );
  }
}
export default withCounter(ClickCounter, 5);
```

4. HoverCounter.js

```javascript
import React, { Component } from "react";
import withCounter from "./withCounter";

class HoverCounter extends Component {
  render() {
    const { count, incrementCount } = this.props;
    return (
      <div>
        <h2 onMouseOver={incrementCount}>Hovered {count} times</h2>
      </div>
    );
  }
}
export default withCounter(HoverCounter, 10);
```
