import { Component } from "./Component";
import { template } from "../templates/template";
import { emojiTemplate } from "../templates/emoji";

export class ChatMessages extends Component<State> {
  render(): string {
    return emojiTemplate(
      template(
        `{{for messageList}}
            <div class="message">
              <p class="date">{{date}}</p>
              <span class="author">{{name}}</span>:
                <p>{{message}}</p>
            </div>
            {{endfor}}`,
        this.state
      )
    );
  }
}
