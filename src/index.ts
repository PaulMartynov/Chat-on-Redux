import { ChatMessages } from "./components/Messages";
import { UserName } from "./components/User";
import { InputForm } from "./components/InputForm";

// eslint-disable-next-line func-names
(async function () {
  const chatMessages = document.querySelector("#chatMessages");
  const username = document.querySelector("#username");
  const inputForm = document.querySelector("#inputForm");

  if (chatMessages && username && inputForm) {
    const state: State = {
      username: "Неизвестный",
      messageList: [],
      text: "",
    };
    new ChatMessages(chatMessages, state);
    new UserName(username, state);
    new InputForm(inputForm, state);
  }
})();
