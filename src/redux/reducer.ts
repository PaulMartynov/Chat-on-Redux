import { Reducer } from "redux";
import { GET_MESSAGE, GET_MESSAGES } from "../actions/Actions";

const initialState: State = {
  username: "Неизвестный",
  messageList: [],
};

export const chatReducer: Reducer<State> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messageList: action.payload.messageList,
      };
    case GET_MESSAGE:
      return {
        ...state,
        messageList: [...state.messageList, action.payload],
      };
    default:
      return state;
  }
};
