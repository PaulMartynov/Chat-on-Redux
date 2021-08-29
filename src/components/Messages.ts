import { Component } from "./Component";
import { template } from "../templates/template";

export class ChatMessages extends Component<State> {
  render(): string {
    return template(
      `{{for messageList}}<div><span class="author">{{username}}</span>:<p>{{message}}</p></div>{{endfor}}`,
      this.state
    );
  }
}
