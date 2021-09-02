import { Component } from "./Component";
import { template } from "../templates/template";
import { sendMessage } from "../services/messagesApi";
import { changeUserName } from "../chat";

export class InputForm extends Component<State> {
  submit = async (ev: Event): Promise<void> => {
    ev.preventDefault();
    const targetEl = ev.target as Element;
    if (!targetEl) {
      return;
    }

    const messageInput =
      targetEl.querySelector<HTMLTextAreaElement>("#textMessage");
    const usernameInput =
      targetEl.querySelector<HTMLTextAreaElement>("#username");

    if (usernameInput) {
      changeUserName(usernameInput.value);
    }
    if (messageInput) {
      const message: Message = {
        name: this.state.username,
        message: messageInput.value,
        date: new Date(),
      };
      messageInput.value = "";
      try {
        await sendMessage(message);
      } catch (err) {
        console.log(err);
        alert("Sorry! Service is unavailable");
      }
    }
  };

  events = {
    "submit@form": this.submit,
  };

  render(): string {
    return template(
      `
          <form>
            <div id="user">
              <div id="label"><span>Ваше имя:</span></div>
              <input id="username" type="text" value="{{username}}" required>
            </div>
            <div id="inputForm">
              <textarea  id='textMessage'  autofocus  class="scroll" required>{{text}}</textarea>
              <input type="submit" id="sendBtn" value="Отправить">
            </div>
          </form>
        `,
      this.state
    );
  }
}
