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
