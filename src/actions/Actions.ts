import { Dispatch } from "redux";
import {
  getMessagesList,
  observeWithEventSource,
  sendMessage,
} from "../services/messagesApi";
import { store } from "../redux/store";

export const GET_MESSAGES = "GET_MESSAGES";
export const GET_MESSAGE = "GET_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";

export function getMessagesAction(messages: Message[]): Action {
  return {
    type: GET_MESSAGES,
    payload: { messageList: messages },
  };
}

export function sendMessageAction(): Action {
  return {
    type: SEND_MESSAGE,
  };
}

export function getMessageAction(message: Message): Action {
  return {
    type: GET_MESSAGES,
    payload: message,
  };
}

export const getMessagesThunkAction = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const messages = await getMessagesList();
    dispatch(getMessagesAction(messages));
  };
};

export const sendMessageThunkAction = (message: Message) => {
  return async (dispatch: Dispatch): Promise<void> => {
    await sendMessage(message);
    dispatch(sendMessageAction());
  };
};

export const getMessageThunkAction = () => {
  return (dispatch: Dispatch): void => {
    observeWithEventSource(
      (data: { name: string; message: string; date: Date }) => {
        dispatch(
          getMessageAction({
            name: data.name,
            message: data.message,
            date: data.date,
          })
        );
      }
    );
  };
};

export async function sendMessageEvent(message: Message): Promise<void> {
  await store.dispatch(sendMessageThunkAction(message));
  await store.dispatch(getMessagesThunkAction());
}
