# Counter app using Redux

---

[TOC]

---

## 1. プロジェクト作成
```bash
   > $ npx create-react-app counter-app
   > $ npm install redux react-redux
```

## 2. 基本的なステップ
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