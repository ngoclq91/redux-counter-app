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

- Install & doc [redux devtools](https://github.com/MarshallOfSound/electron-devtools-installer)

### 6. Storeをアプリに接続する
- Bước này chúng ta cần làm là gói tất cả các component lại với component `Provider`.
- Component `Provider` được cung cấp bởi `react-redux`
- Nó giúp chúng ta có thể truy cập store cũng như tất cả những func của nó ở tất cả các component con.
- Điều duy nhất chúng ta phải làm là cài đặt store và gói tất cả các component con vào component `Provider`.
- Sau đó store sẽ được truyền vào `Provider` như là 1 property.
- Lúc này, file `src/index.js` sẽ viết như sau:
```javascript
    ...
    import {createStore} from 'redux';
    import allReducer from './reducers';
    import {Provider} from 'react-redux';
    
    /**
     * store作成
     *
     * @type {any}
     */
    const store = createStore(
        allReducer, // preloadedState
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    // redux開発ツール
    );
    
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
    serviceWorker.unregister();
```
- Như vậy, chúng ta đã giúp cho tất cả các component con truy xuát được Redux store.

### 7. Get value state from Redux
- Ở phần này ta sẽ tìm hiểu các việc sau:
    - Get giá trị state của Redux : sử dụng `useSelector`
    - Tạo giao diện
    - Tạo action cho 2 button increment và decrement
    - Kết nối action: sử dụng `useDispatch`
    - Thêm tính năng chỉ định cộng or trừ bao nhiêu bằng cách truyền tham số.

1. Tạo action:
    - Tại file `Actions/index.js`:
    ```javascript
       /**
        * Action Increment
        *
        * @param step : cộng bao nhiêu đơn vị
        * @returns {{payload: number, type: string}}
        */
       export const increment = (step = 1) => {
           return {
               type: 'INCREMENT',
               payload: step
           };
       };
       
       /**
        * Action Decrement
        *
        * @param step trừ bao nhiêu đơn vị
        * @returns {{payload: *, type: string}}
        */
       export const decrement = (step) => {
           return {
               type : 'DECREMENT',
               payload: step
           };
       };
    ```

2. Update reducer counter để nhận giá trị step:
- Tại file `reducers/counter.js`:
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
                return state + action.payload;
            case "DECREMENT" :
                return state - action.payload;
            default:
                return state;
        }
    };
    
    export default counterReducer;
```

3. Get state value của Redux, tạo giao diện, kết nối action:
    - `useSelector`の`react-redux`を使用して、State値のReduxを取得できる。
    - File `src/App.js`に以下のように書いてcounter値を取得できるようにする
    ```javascript
       import React from 'react';
       import { useSelector, useDispatch } from 'react-redux';
       import {increment, decrement} from './actions';
       
       function App() {
       
           /** カウンター値 */
           const counter = useSelector( state => state.counter );
       
           /** ログしたかどうか */
           const isLogged = useSelector( state => state.isLogged);
       
           /** khai báo sử dụng dispatch để gọi action */
           const dispatch = useDispatch();
       
           return (
               <div className="App">
                   <h1>Counter {counter}</h1>
                   <button onClick={ () => dispatch(increment(5))}>+</button>
                   <button onClick={ () => dispatch(decrement(5))}>-</button>
                   { isLogged ? <h3>Valuable Information I shouldn't see</h3> : ''}
               </div>
         );
       }
       
       export default App;
    ```
