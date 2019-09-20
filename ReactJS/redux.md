## Redux-Example

1. `create-react-app <project-name>`

2. `npm install --save redux react-redux`

   - react-redux가 있으면 컴포넌트에서 redux로 쉽게 연결할 수 가 있음

3. `components` 폴더 생성 및 `App.js` 생성

4. `npm install --save prop-types`

   - prototypes가 react에서 떨어져나옴

5. `control.js`, `value.js`생성

**control.js**

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRandomizeColor: PropTypes.func
};

function createWarning(funcName) {
  return () => console.warn(funcName + " is not defined");
}

const defaultProps = {
  onPlus: createWarning("onPlus"),
  onSubtract: createWarning("onSubract"),
  onRandomizeColor: createWarning("onRandomizeColor")
};

class Control extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={this.props.onPlus}>+</button>
        <button onClick={this.props.onSubtract}>-</button>
        <button onClick={this.props.onRandomizeColor}>Randomize Color</button>
      </div>
    );
  }
}
export default Control;
```

**value.js**

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  number: PropTypes.number
};

const defaultProps = {
  number: -1
};

class Value extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>{this.props.number}</h1>
      </div>
    );
  }
}
export default Value;
```

**App.js**

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";
import Counter from "./counter";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Counter />
      </div>
    );
  }
}

export default App;
```

6. Action 구성

1)  값을 증가시키기 -> INCREMENT
2)  값을 감소시키기 -> DECREMENT
3)  새로운 색상 설정하기 -> SET_COLOR

- 이름은 대문자와 \_ 로

`actions/actionTypes.js`생성

```javascript
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
```

- action은 하나의 객체

```
{type:"INCREMENT"}
{type:"DECREMENT"}
{type:"SET_COLOR",
color:[200,200,200]}
```

이렇게 생성하면 귀찮으니 action 생성자 함수를 사용

`actions/index.js`

```javascript
// import { INCREMENT, DECREMENT, SET_COLOR } from "./actionTypes";
import * as types from "./actionTypes";

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function setColor(color) {
  return {
    type: types.SET_COLOR,
    color: color
  };
}
```

7. Reducer

- 변화를 일으키는 함수
- 비동기작업 X
- 인수변경 X
- 동일한 인수 = 동일한 결과
- `이전상태`와 `액션`을 받아서 `다음 상태`를 반환한다
- `(previousState, action) => newState`
- 기존 상태를 복사하고 변화를 준 후 반환

1. `counter.js`, `ui.js` 생성

**counter.js**

```javascript
import * as types from "../actions/actionTypes";

const initialState = {
  number: 0,
  // dummy: "dumbdumb",
  // dumbObject: {
  //   d: 0,
  //   u: 1,
  //   m: 2,
  //   b: 3
  }
};
```

- initial State 선언

```javascript
export default function counter(state = initialState, action) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        number: state.number + 1,
        dumbObject: { ...state.dumbObject, u: 0 }
      };

    case types.DECREMENT:
      return { ...state, number: state.number - 1 };

    default:
      return state;
  }
}
```

- `state = initialState` : 변수의 default 값 지정
- `switch` ~ `case`문 사용
- `spread`사용 하여 state를 복사후 갱신

**ui.js**

```javascript
import * as types from "../action/actionTypes";

const initialState = {
  color: [255, 255, 255]
};

export default function ui(state = initialState, action) {
  if (action.type === types.SET_COLOR) {
    return {
      color: action.color
    };
  } else {
    return state;
  }
}
```

2. reducer들을 `combine`시키기

`index.js`생성

**index.js**

```javascript
import { combineReducers } from "redux";
import counter from "./counter";
import ui from "./ui";

const reducers = combineReducers({
  counter,
  ui
});

export default reducers;
```

- `combineReducers`함수로 `reducer`들을 합쳐서 사용한다.

8. `createStore` 사용

`src/index.js`

```javascript
import { createStore } from "redux";
import reducers from "./reducers/index";

const store = createStore(reducers);
```

- `reducers` 를 store로 만들어줌

**store**가 하는일

1. `dispatch(action)`

- action을 reducer로 보냄
- 현재 자신의 상태와 방금 전달받은 action을 전달

2. `getState()`

- 현재 상태를 반환

3. `subscribe(listener)`

- 상태가 바뀔 때마다 실행할 함수를 등록

4. `replaceReducer(nextReducer)`

5. `react-redux` 사용

- 뷰 레이어 바인딩

1. `Provider` : 컴포넌트를 감싸주면 복잡한 작업을 대신해서 수행해줌

```javascript
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- Provider로 감싸서 App에다 store를 전달할 준비를 한다

2. `connect([...options])` : 컴포넌트를 REDUX에 연결하는 `함수`를 반환

ex) connect()(Counter)

- store에 연결 된 `새로운` 컴포넌트 클래스가 반환됨
- 옵션이 없으면 `this.props.store`로 접근 가능

- options

```javascript
connect(
  [mapStateToProps],
  [mapDispatchToProps],
  [mergeProps],
  [options] // [pure=true], [withRef=false]
);
```

3. state와 dispatch와 store를 연결해 준다

- `mapStateToProps` : props와 redux state 연결
- `mapDispatchToProps` : action에 따른 dispatch를 실행하는 함수 를 반환

```javascript
const mapStateToProps = state => {
  //redux의 state를 칭함
  return {
    number: state.counter.number,
    color: state.ui.color
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrement: () => {
      dispatch(actions.increment());
    },
    handleDecrement: () => {
      dispatch(actions.decrement());
    },
    handleSetColor: color => {
      dispatch(actions.setColor(color));
    }
  };

  // return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

4. redux로 전달되는 props 설정

**counter.js**

```javascript
<Value number={this.props.number} />
<Control
  onPlus={this.props.handleIncrement}
  onSubtract={this.props.handleDecrement}
  onRandomizeColor={this.setRandomColor}
/>
```

- 하위 컴포넌트에게 이렇게 프롭스를 줄 수 있음
