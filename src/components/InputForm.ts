import { Component } from "./Component";
import { template } from "../templates/template";
import { sendMessageEvent } from "../actions/Actions";

export class InputForm extends Component<State> {
  private submit = async (ev: Event): Promise<void> => {
    ev.preventDefault();
    const message: Message = {
      name: this.state.username,
      message: (ev.target as Element).querySelector<HTMLTextAreaElement>(
        "#textMessage"
      )!.value,
      date: new Date(),
    };
    await sendMessageEvent(message);
  };

  events = {
    "submit@form": this.submit,
  };

  render(): string {
    return template(
      `
          <form>
            <div id="username">
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
