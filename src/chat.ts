import { ChatMessages } from "./components/Messages";
import { store } from "./redux/store";
import { InputForm } from "./components/InputForm";
import {
  getMessagesThunkAction,
  getMessageThunkAction,
} from "./actions/Actions";

export async function initChat(): Promise<void> {
  const chatMessages = document.querySelector<HTMLDivElement>("#chatMessages");
  const inputForm = document.querySelector("#input");

  if (chatMessages && inputForm) {
    const chat = new ChatMessages(chatMessages, store.getState());
    const input = new InputForm(inputForm, store.getState());

    store.subscribe(() => {
      chat.setState(store.getState());
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    store.subscribe(() => {
      input.setState(store.getState());
    });

    await store.dispatch(getMessagesThunkAction());
    store.dispatch(getMessageThunkAction());
  }
}
