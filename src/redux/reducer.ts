import { AnyAction, Reducer } from "redux";
import {
  CHANGE_USERNAME,
  GET_MESSAGE,
  GET_ALL_MESSAGES,
} from "../actions/Actions";

const initialState: State = {
  username: "Неизвестный",
  messageList: [],
};

export const chatReducer: Reducer<State> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return {
        ...state,
        messageList: action.payload.messageList,
      };
    case GET_MESSAGE:
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};
