import { Action, applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { chatReducer } from "./reducer";

export const store = createStore(
  chatReducer,
  applyMiddleware(thunk as ThunkMiddleware<State, Action>)
);
