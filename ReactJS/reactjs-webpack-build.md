# React를 webpack으로 build하기

1. `npm init`

`cmd`에서 `npm init` 실행

지시에 따라 기입을 해주고 Yes를 입력

![npm init2](./img/reactjs-webpack-build/npm-init2.png)

**tree**

```

├── react-webpack-build
    ├── package.json                # NEW

```

`package.json` 파일이 생성되었다

2. react와 react-dom 설치

`react-webpack-build` 폴더에서 `npm i react react-dom`입력

- react와 react-dom 을 설치한다는 의미

**package.json**
![react react-dom](./img/reactjs-webpack-build/react-react-dom.png)

**tree**

```
├── react-webpack-build
    ├── node_modules                # NEW
    ├── package.json
    └── package-lock.json           # NEW
```

3. webpack과 webpack-cli 설치

`react-webpack-build` 폴더에서 `npm i -D webpack webpack-cli` 입력

- `-D` : development

**package.json**
![react react-dom](./img/reactjs-webpack-build/webpack-webpack-cli.png)

4. 필요한 바벨 모듈을 설치

```
"@babel/core"
"@babel/plugin-proposal-class-properties"
"@babel/preset-env"
"@babel/preset-react"
"babel-loader"
```

`npm i -D @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader`

**package.json**
![babel modules](./img/reactjs-webpack-build/bable-modules.png)

5. client.jsx, likebutton.jsx 생성

**client.jsx**

```javascript
import React from "react";
import ReactDom from "react-dom";

import LikeButton from "./likebutton";

ReactDom.render(<LikeButton />, document.querySelector("#root"));
```

**likebutton.jsx**

```javascript
import React from "react";

class LikeButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button>Webpack React</button>
      </React.Fragment>
    );
  }
}

export default LikeButton;
```

**tree**

```
├── react-webpack-build
    ├── node_modules
    ├── client.jsx                  # NEW
    ├── likebutton.jsx              # NEW
    ├── package.json
    └── package-lock.json
```

6. webpack.config.js 파일 생성 하기

**tree**

```
├── react-webpack-build
    ├── node_modules
    ├── client.jsx
    ├── likebutton.jsx
    ├── package.json
    ├── package-lock.json
    └── webpack.config.js           # NEW
```

`webpack.config.js` 파일 안에서 webpack 설정을 할 것이다.

[WebPack Document](https://webpack.js.org/concepts/).

- Document 참조


    1) `module.exports = {};`
        모든 설정을 이 객체 안에 할 것이다.

    2) 이름과 모드 기입
        ```javascript
        module.exports = {
        name: "webpack-build-setting",
        mode: "development", // 실서비스 ; production
        devtool: "eval"
        };
        ```

    3) resolve setting
       `resolve: {extensions: [".js", ".jsx"]}`
        js와 jsx 확장자를 가진 파일을 파일 명으로만 인식해준다

    4) entry setting ( input )
       `entry: {app: ["./client"] }`

    5) outputs setting ( output )
        ```javascript
        output: {
        path: path.join(__dirname, "dist"), //(현재폴더경로, target 폴더 경로)
        filename: "app.js",
        publicPath: "/dist/"}
        ```
        - `path: path.join(__dirname, "dist")`
            path.join 모델을 사용하기 위해 nodejs에서 path 라이브러리를 불러온다
        - `const path = require("path");`

    6) dist folder 생성

        **tree**
        ```
        ├── react-webpack-build
            ├── dist                    # NEW
            ├── node_modules
            ├── client.jsx
            ├── likebutton.jsx
            ├── package.json
            ├── package-lock.json
            └── webpack.config.js
        ```

    7) module 설정

        ```
        module: {
            rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                // plugin들의 모음이 preset
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "react-hot-loader/babel"
                ]
                }
            }
            ]
        },
        ```


    8) cmd 에서 npx webpack 실행
        `npx webpack`

    ![npx webpack](./img/reactjs-webpack-build/npx-webpack.png)


    9) index.html 생성

        ```html
        <html>

            <head>
                <meta charset="UTF-8" />
                <title>webpack build</title>
            </head>
            <body>
                <div id="root"></div>
                <script src="./dist/app.js"></script>
            </body>
        </html>
        ```

        **tree**
        ```
        ├── react-webpack-build
            ├── dist
            ├── node_modules
            ├── client.jsx
            ├── likebutton.jsx
            ├── index.html                 # NEW
            ├── package.json
            ├── package-lock.json
            └── webpack.config.js
        ```

### 결과 1

![webpack index](./img/reactjs-webpack-build/index-webpack.png)

7.  hot -loading 적용하기

    1.  react-hot-loader와 webpack-dev-server 설치

        `npm i -D react-hot-loader webpack-dev-server`

            **tree**
                ```
                ├── react-webpack-build
                    ├── dist
                    ├── node_modules
                    ├── client.jsx
                    ├── likebutton.jsx
                    ├── index.html
                    ├── package.json                # Modified
                    ├── package-lock.json
                    └── webpack.config.js
                ```

        ![devsever index](./img/reactjs-webpack-build/devsever.png)

    2.  package.json 수정

        `"scripts": {"dev": "webpack-dev-server --hot"}`

    3.  webpack.config.js 수정

        ```
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel"
          ]
        ```

    4.  `npx webpack`

    5.  `npm run dev`

    6.  `localhost:8080`

    - 이제 실시간으로 변화를 확인 할 수 있다.
