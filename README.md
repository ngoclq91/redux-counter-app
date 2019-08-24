# Counter app using Redux

---

[TOC]

---

## 1. プロジェクト作成
```bash
   > $ npx create-react-app counter-app
   > $ npm install redux react-redux
```

## 2. 基本的なステップ (機能によるフォルダ分割せずにする場合)
- File `src/index.js`に下記のような4ステップを記入
```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    
    // 1. STORE : Globalized state
    // 2. ACTION: Increment (counter)
    // 3. REDUCER : tiếp nhận action và trả về state mới bởi action đó
    // 4. DISPATCH
    
    ReactDOM.render(<App />, document.getElementById('root'));
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
```

## 3. Tạo store & action & reducer & dispatch
- File `src/index.js`にstore, action, reducer, dispatchを定義して、storeのstateをconsoleに表示するようにする
```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import {createStore} from 'redux';  // create store用
    
    
    // 1. STORE : Globalized state
    
    
    // 2. ACTION: Increment (counter)
    /**
     * インクリメント
     * @returns {{type: string}}
     */
    const increment = () => {
        return {
            type: 'INCREMENT'
        }
    };
    
    /**
     * デクリメント
     * @returns {{type: string}}
     */
    const decrement = () => {
        return {
            type: 'DECREMENT'
        }
    };
    
    // 3. REDUCER : tiếp nhận action và trả về state mới bởi action đó
    /**
     * カウンターレデューサー
     * @param state
     * @param action
     * @returns {number}
     */
    const counter = (state = 0, action) => {
        switch(action.type) {
            case "INCREMENT":
                return state + 1;
            case "DECREMENT":
                return state - 1;
        }
    };
    
    let store = createStore(counter);
    
    store.subscribe( () => console.log(store.getState()));
    
    // 4. DISPATCH
    store.dispatch(decrement());
    store.dispatch(increment());
    
    ReactDOM.render(<App />, document.getElementById('root'));
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
```

## 3. フォルダ分離して、作業する
```bash
    ...
    src
        actions
            index.js
        reducers
            counter.js
            isLogged.js
            index.js
        index.js
        ...
    ...
```

### 4. Reducer作成
- 各レデューサーを作成する
    - File `src/reducers/counter.js`にカウント用の処理を記入
    ```javascript
      /**
       * カウンターレデューサー
       * @param state
       * @param action
       * @returns {number}
       */
      const counterReducer = (state = 0, action) => {
          switch (action.type) {
              case "INCREMENT" :
                  return state + 1;
              case "DECREMENT" :
                  return state - 1;
              default:
                  return state;
          }
      };
      
      export default counterReducer;
    ```
    
    - File `src/reducers/isLogged`にログイン状態を記入
    ```javascript
      /**
       * ログイン状態のレデューサー
       * @param state
       * @param action
       * @returns {boolean}
       */
      const loggedReducer = (state = false, action) => {
          switch (action.type) {
              case 'SIGN_IN' :
                  return !state;
              default:
                  return state;
          }
      };
      
      export default loggedReducer;
    ```

- File `src/reducers/index.js`に複数レデューサーを結合
```javascript
    import counterReducer from './counter';
    import loggedReducer from './isLogged';
    import {combineReducers} from 'redux';
    
    /**
     * 複数レデューサーを1つに結合する。
     * @type {Reducer<any>}
     */
    const allReducer = combineReducers({
        counter: counterReducer,
        isLogged: loggedReducer
    });
    
    export default allReducer;
```

### 5. Store作成
- File `src/index.js`にStoreを作成する
```javascript
    ...
    import {createStore} from 'redux';
    import allReducer from './reducers';
    
    /**
     * store作成
     *
     * @type {any}
     */
    const store = createStore(
        allReducer, // preloadedState
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    // redux開発ツール
    );
    
    store.subscribe( () => console.log(store.getState()));
    
    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker.unregister();
```