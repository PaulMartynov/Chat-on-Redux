import { AnyAction, Dispatch } from "redux";
import {
  getMessagesList,
  observeWithEventSource,
} from "../services/messagesApi";

const NUMBER_OF_LAST_MESSAGES = 50;
export const GET_ALL_MESSAGES = "GET_ALL_MESSAGES";
export const GET_MESSAGE = "GET_MESSAGE";
export const CHANGE_USERNAME = "CHANGE_USERNAME";

export function getMessagesAction(messages: Message[]): AnyAction {
  return {
    type: GET_ALL_MESSAGES,
    payload: { messageList: messages },
  };
}

export function getMessageAction(message: Message): AnyAction {
  return {
    type: GET_MESSAGE,
    payload: message,
  };
}

export function changeUsernameAction(username: string): AnyAction {
  return {
    type: CHANGE_USERNAME,
    payload: username,
  };
}

export const getMessagesThunkAction = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const messages = await getMessagesList();
      console.log(messages);
      dispatch(getMessagesAction(messages.slice(-NUMBER_OF_LAST_MESSAGES)));
    } catch (err) {
      console.log(err);
      alert("Sorry! Service is unavailable");
    }
  };
};

export const getMessageThunkAction = () => {
  return (dispatch: Dispatch): void => {
    observeWithEventSource((data: Message) => {
      if (!Object.keys(data).includes("message")) {
        return;
      }
      const message: Message = { ...data, date: new Date(data.date) };
      dispatch(getMessageAction(message));
    });
  };
};
