import {counterReducer} from './counter';
import {loggedReducer} from './isLogged';
import {combineReducers} from 'redux';

/**
 * 複数レデューサーを1つに結合する。
 * @type {Reducer<any>}
 */
const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
});

export default allReducers;