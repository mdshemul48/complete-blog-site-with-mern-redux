import { createStore, applyMiddleware, combineReducers } from "redux";

import thunkMiddleware from "redux-thunk";

import AuthReducer from "./reducers/AuthReducer";

const rootReducer = combineReducers({
    AuthReducer
})

const middlewares = [thunkMiddleware]

const Store = createStore(rootReducer, applyMiddleware(...middlewares))

export default Store