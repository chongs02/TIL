1. useTitle

**useTitle.js**

```javascript
const useTitle = initialTitle => {
  // 변수로 initial title을 받는다
  const [title, setTitle] = useState(initialTitle); // 변수를 state로 선언

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title"); //dom에서 <title> 태그를 찾아서
    htmlTitle.innerText = title; //그안의 text를 현재 state인 title로 바꾼다
  };

  useEffect(updateTitle, [title]); //title state가 변경될때마다 updateTitle이 실행된다
  return setTitle;
};

export default useTitle;
```

**App.js**

```javascript
const App = () => {
  const titleUpdater = useTitle("Loading...");    // initial Title 변수를 "Loading..."로 선정
  setTimeout(() => titleUpdater("Home"), 5000);   // Loading 후 5초 후 "Home"으로 바꾸어준다

  ...
};
```

2. useClick

**useRef**

- `reference`는 기본적으로 우리의 `component`의 어떤 부분을 선택 할 수 있는 방법
- 예를들어 `document.getElementById()` 등등...

**예시**

```javascript
const App = () => {
  const ref = useRef();
  setTimeout(() => ref.current.focus(), 5000); //5초후 fucus

  ...

  return(
    <div>
       <input ref={ref} placeholder="la" />
    </div>
  )
};


//  >> 5초후 Input에 포커스 발생
```

**useClick.js**

```javascript
const useClick = onClick => {
  if (typeof onClick !== "function") {
    return;
  }

  const element = useRef(); // element를 ref로 지정

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick); // ref가 존재하면 해달 ref에 이벤트리스너를 추가한다 (onclick)
    }
    return () => {
      // componentWillUnmount
      if (element.current) {
        element.current.removeEventListener("click", onClick); // 이벤트리스너를 제거한다.
      }
    };
  }, []);

  return element;
};
```

- `removeEventListener()` : EventTarget 에 등록했던 이벤트 리스너를 제거

**App.js**

```javascript
const App = () => {
  //------------------useClick----------------

  const onClick = () => console.log("onClicked");  // function 지정

  const title = useClick(onClick);

    ...

 return (
    <div>
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

//  >> Hi를 클릭할때마나 console에 onClicked 가 프린트됨
```

3. useConfirm

**useConfirm.js**

```javascript
const useConfirm = (message = "", callback, rejection) => {
  // parameter로 문자열과 함수 2개를 받는다
  if (!callback || typeof callback !== "function") {
    return;
  }
  if (!rejection || typeof rejection !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      // confirm창에 message를 띄우면서
      callback();
    } else {
      rejection();
    }
  };
  return confirmAction;
};

export default useConfirm;
```

**App.js**

```javascript
const App = () => {
  const abort = () => console.log("Aborted");
  const deleteWorld = () => console.log("Deleting the world");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);

  return (
    <div>
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};
```

4. usePreventLeave

**usePreventLeave.js**

```javascript
const usePreventLeave = onLeaving => {
  //
  const listener = event => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const diablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, diablePrevent };
};
```

**App.js**

```javascript
const App =() =>{
  const { enablePrevent, diablePrevent } = usePreventLeave();
  ...
  return(
    <div>
      <button onClick={enablePrevent}>protect</button>

      <button onClick={diablePrevent}>unprotect</button>
    </div>
  )
}
```

5. useBeforeLeave

**useBeforeLeave.js**

```javascript
const useBeforeLeave = onBefore => {
  // 함수를 이벤트로 받아 실행한다
  // if (typeof onBefore !== "function") {   // 니꼴라스 코드의 실수 : hooks는 조건문나 함께 쓰면 좋지 않다.
  //   return;
  // }
  const handle = event => {
    const { clientY } = event; //event를 log해보면 clientY라는 정보가 들어있다. 이는 브라우저상의 사용자 마우스의 Y좌표
    if (clientY <= 0) {
      // Y좌표가 0보다 작아지면 받게된 함수 실행
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};
```

**App.js**

```javascript
const App = () => {
  const backForLife = () => console.log("plz dont leave");
  useBeforeLeave(backForLife);
  ...
  return(
    ...
  )
}
```

6. useFadeIn

**useFadeIn.js**

```javascript
const useFadeIn = (duration = 1, delay = 0) => {
  //initialvalue로 duration(fadein)과 delay를 준다)
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`; // reference에 animation 효과를 줌 opacity와 delay적용 후 opacity가 0 -> 1로 변함
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};
```

**App.js**

```javascript
const App = () => {
  const fadeInH1 = useFadeIn(1, 2); // h1은 2초 딜레이 후 1초간 변화
  const fadeInP = useFadeIn(5, 10); // p는 10초 딜레이후 5초간 변화

  return (
    <div>
      <h1 {...fadeInH1}>FADEINH1</h1>
      <p {...fadeInP}>FADEINP</p>
    </div>
  );
};
```

7. useNetwork

**useNetwork.js**

```javascript
const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};
```

**App.js**

```javascript
const App = () => {
  const handleNetworkChange = online => {
    console.log(online ? "we just went online" : "we are offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div>
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};
```

8. useScroll

**useScroll.js**

```javascript
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  }); // x, y좌표를 state지정
  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  }; // scroll 할때마다 state를 변경
  useEffect(() => {
    window.addEventListener("scroll", onScroll); //callback 함수를 통해 이벤트 적용
    return () => window.removeEventListener("scroll", onScroll);
  });
  return state;
};
```

**App.js**

```javascript
const App = () => {
  const { y } = useScroll();
  return (
    <div style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        useScroll
      </h1>
    </div>
  );
};

// >> scroll을 올리고 내릴때 컬러가 변하는 효과를 볼 수 있다.
```

9. useFullScreen

**useFUllScreen.js**

```javascript
const useFullScreen = callback => {
  const element = useRef(); // reference 선언
  const runCallback = isFull => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };

  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        //chrome
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullScreen) {
        //firefox
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullscreen) {
        //opera
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        //microsoft
        element.current.msRequestFullscreen();
      }
      runCallback(true);
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    runCallback(false);
  };
  return { element, triggerFull, exitFull };
};
```

**App.js**

```javascript
const App = () => {
  const onFullScreen = isFull => {
    console.log(isFull ? "we are full" : "we are small");
  };
  const { element, triggerFull, exitFull } = useFullScreen(onFullScreen);

  return (
    <div>
      <div ref={element}>
        <img src="image url" />
        <button onClick={exitFull}>Exit Fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>
    </div>
  );
};
```

10. useNotification

**useNotification.js**

```javascript
const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const fireNotification = () => {
    if (Notification.permission != "granted") {
      Notification.requestPermission().then(permission => {
        // window에서 permission을 우선 물어보자
        if (permission === "granted") {
          // 퍼미션을 얻으면 title과 option으로 notification 생성
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotification;
};
```

**App.js**

```javascript
const App = () => {
  const triggerNotif = useNotification("자바스크립트 지렸다리...", {
    body: "안그러냐?"
  });

  return (
    <div>
      <button onClick={triggerNotif}>Notification</button>
    </div>
  );
};
```

11. useAxios

**useAxios.js**

```javascript
//yarn add axios 설치가 필수
import { useState, useEffect } from "react";
import defaultAxios from "axios";

const useAxios = (options, axiosInstance = defaultAxios) => {
  //라이브러리의 defaultAxios를 인스턴스로 쓴다
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });

  //   if (!options.url) {
  //     return;
  //   }

  const [trigger, setTrigger] = useState(0); //refetch를 위한 스테이트 선언

  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now()); // 버튼을 누를때마다 현재 시각을 state에 업데이트 해줌 (시간은 크게 의미없으나 unique해서 사용하는것)
  }; // trigger state가 변함으로서 결국 아래의 useEffect가 실행되게된다.

  useEffect(() => {
    axiosInstance(options)
      .then(data => {
        // options(url)을 fetch하고 data를 state로 변경
        setState({
          ...state,
          loading: false,
          data
        });
      })
      .catch(error => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]); // triger값이 변할때마다 useEffect 훅 실행 즉 refetch가됨
  return { ...state, refetch }; //state와 refetch 반환
};

export default useAxios;
```

**App.js**

```javascript
const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "fetch할 url"
  });
  console.log(`loading : ${loading}, data : ${data}, error : ${error}`);

  return (
    <div>
      <h1>{data && data.status}</h1> // 데이터 상태를 표시 : ex) 200, 404
      이런식으로...
      <h2>{loading ? "Loading" : null}</h2>
      <button onClick={refetch}>Refetch</button> // refetch 버튼
    </div>
  );
};
```
