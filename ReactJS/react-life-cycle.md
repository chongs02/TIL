## Mount 생명주기

1. `constructor()`
2. `static getDerivedStateFromProps(props, state)`
3. `render()`
4. `componentDidMount()`

### 예제 1

**LifecycleA.js**

```javascript
import React, { Component } from "react";
import LifecycleB from "./LifecycleB";

class LifecycleA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Chong"
    };
    console.log("LifecycleA constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("LifecycleA getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("LifecycleA componentDidMount");
  }

  render() {
    console.log("LifecycleA render");
    return (
      <div>
        <div>Lifecycle A</div>
        <LifecycleB></LifecycleB>
      </div>
    );
  }
}

export default LifecycleA;
```

**LifecycleB.js**

```javascript
import React, { Component } from "react";

class LifecycleB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "chong"
    };
    console.log("LifecycleB constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("LifecycleB getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("LifecycleB componentDidMount");
  }

  render() {
    console.log("LifecycleB render");
    return <div>Lifecycle B</div>;
  }
}

export default LifecycleB;
```

**결과**

```javascript
LifecycleA constructor
LifecycleA.js:16 LifecycleA getDerivedStateFromProps
LifecycleA.js:52 LifecycleA render
LifecycleB.js:10 LifecycleB constructor
LifecycleB.js:13 LifecycleB getDerivedStateFromProps
LifecycleB.js:36 LifecycleB render
LifecycleB.js:18 LifecycleB componentDidMount
LifecycleA.js:21 LifecycleA componentDidMount
```

- LifecycleA의 render가 끝난 후 (LifecycleB의 Activity가 모두 끝난후) LifecycleA의 `componentDidMount` 실행

## Update 생명주기

1. `static getDerivedStateFromProps(props, state)` : `state`를 갱신하기 위한 객체를 반환하거나 `null`을 반환
2. `shouldComponentUpdate(nextProps, nextState)` : `true` or `false` 를 `return`해야함
3. `render()`
4. `getSnapshotBeforeUpdate(prevProps, prevState)` : `null` or `상수` 를 `return`해야함
5. `componentDidUpdate(prevProps, prevState, snapshot)` : `snapshot` 변수는 4번의 `return` 값

**LifecycleA**

```javascript
import React, { Component } from "react";
import LifecycleB from "./LifecycleB";

class LifecycleA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "chong"
    };
    console.log("LifecycleA constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("LifecycleA getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("LifecycleA componentDidMount");
  }

  //new
  shouldComponentUpdate(nextProps, nextState) {
    console.log("LifecycleA shouldComponentUpdate");
    return true;
  }

  //new
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("LifecycleA getSnapshotBeforeUpdates");
    return null;
  }

  //new
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("LifecycleA componentDidUpdate");
  }

  changeState = () => {
    this.setState({
      name: "Codevolution"
    });
  };

  render() {
    console.log("LifecycleA render");
    return (
      <div>
        <div>Lifecycle A</div>
        <button onClick={this.changeState}>Change state</button> {/*  new  */}
        <LifecycleB></LifecycleB>
      </div>
    );
  }
}

export default LifecycleA;
```

**LifecycleB**

```javascript
import React, { Component } from "react";

class LifecycleB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Vishwas"
    };
    console.log("LifecycleB constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("LifecycleB getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("LifecycleB componentDidMount");
  }

  //new
  shouldComponentUpdate() {
    console.log("LifecycleB shouldComponentUpdate");
    return true;
  }

  //new
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("LifecycleB getSnapshotBeforeUpdates");
    return null;
  }

  //new
  componentDidUpdate() {
    console.log("LifecycleB componentDidUpdate");
  }

  render() {
    console.log("LifecycleB render");
    return <div>Lifecycle B</div>;
  }
}

export default LifecycleB;
```
