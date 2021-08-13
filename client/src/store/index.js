import { createStore, applyMiddleware, combineReducers } from "redux";

import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import AuthReducer from "./reducers/AuthReducer";
import {
  PostReducer,
  FetchPosts,
  FetchPost,
  updatePost,
  updateImage,
} from "./reducers/PostReducer";
import { updateName } from "./reducers/ProfileReducer";

const rootReducer = combineReducers({
  AuthReducer,
  PostReducer,
  FetchPosts,
  FetchPost,
  updatePost,
  updateImage,
  updateName,
});

const middlewares = [thunkMiddleware];

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default Store;
