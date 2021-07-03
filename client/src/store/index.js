import { createStore, applyMiddleware, combineReducers } from "redux";

import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import AuthReducer from "./reducers/AuthReducer";

const rootReducer = combineReducers({
    AuthReducer
})

const middlewares = [thunkMiddleware]

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export default Store