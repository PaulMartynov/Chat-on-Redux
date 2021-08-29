import { Component } from "./Component";
import { template } from "../templates/template";

export class UserName extends Component<State> {
  render(): string {
    return template(
      `
          <label for="username">Ваше имя:</label>
          <input id="username" type="text" value="{{username}}">
        `,
      this.state
    );
  }
}
