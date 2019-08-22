# Counter app using Redux
--

[TOC]

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