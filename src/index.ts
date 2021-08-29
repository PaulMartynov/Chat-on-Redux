import { ChatMessages } from "./components/Messages";
import { InputForm } from "./components/InputForm";
import { store } from "./redux/store";
import {
  getMessagesThunkAction,
  getMessageThunkAction,
} from "./actions/Actions";
import "./css/style.css";

// eslint-disable-next-line func-names
(async function () {
  const chatMessages = document.querySelector<HTMLDivElement>("#chatMessages");
  const inputForm = document.querySelector("#input");

  if (chatMessages && inputForm) {
    const chat = new ChatMessages(chatMessages, store.getState());
    store.subscribe(() => {
      chat.setState(store.getState());
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    store.subscribe(() => {
      new InputForm(inputForm, store.getState());
    });

    await store.dispatch(getMessagesThunkAction());
    // store.dispatch(getMessageThunkAction());
  }
})();
