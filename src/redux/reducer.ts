import { Reducer } from "redux";

const initialState: State = {
  username: "Неизвестный",
  messageList: [],
  text: "",
};

export const chatReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
