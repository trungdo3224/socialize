import { combineReducers } from "redux";
import authReducer from "./reducers/auth.reducer";
import postReducer from "./reducers/post.reducer";

export const reducers = combineReducers({
  authReducer,
  postReducer,
//   chatReducer,
});
