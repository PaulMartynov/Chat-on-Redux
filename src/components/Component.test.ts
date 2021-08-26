// eslint-disable-next-line max-classes-per-file
import { Component } from "./Component";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("Component", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
    el = document.createElement("div");
  });

  test("is a class", () => {
    expect(Component).toBeInstanceOf(Function);
    const text = ``;
    class TestComponent extends Component {
      webEl: Element | undefined;

      state = {
        text,
      };

      render() {
        return `${this.state.text}`;
      }

      onMount(element: Element): void {
        this.webEl = element;
      }
    }
    expect(new TestComponent(el)).toBeInstanceOf(Component);
  });

  test("renders component instance to element", async () => {
    const text = `${Math.random()}`;
    class TestComponent extends Component {
      webEl: Element | undefined;

      state = {
        text,
      };

      render() {
        return `<h1>${this.state.text}</h1>`;
      }

      onMount(element: Element): void {
        this.webEl = element;
      }
    }
    // eslint-disable-next-line no-new
    new TestComponent(el);
    await sleep(10);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  test("can render props from state", async () => {
    const text = `${Math.random()}`;
    class TestComponent extends Component {
      webEl: Element | undefined;

      state = {
        text,
      };

      render() {
        return `<h1>${this.state.text}</h1>`;
      }

      onMount(element: Element): void {
        this.webEl = element;
      }
    }
    new TestComponent(el);
    await sleep(10);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  test("updates presentation on setState call", async () => {
    const text = `${Math.random()}`;
    const text2 = `${Math.random()}`;
    class TestComponent extends Component {
      webEl: Element | undefined;

      state = {
        text,
        count: 1,
      };

      render() {
        return `<h1>${this.state.text}|${this.state.count}</h1>`;
      }

      onMount(element: Element): void {
        this.webEl = element;
      }
    }
    const component = new TestComponent(el);
    await sleep(10);
    expect(component.setState).toBeInstanceOf(Function);
    component.setState({
      text: text2,
    });
    expect(el.innerHTML).toBe(`<h1>${text2}|1</h1>`);
  });

  test("calls events from `.events` declaration", async () => {
    const onH1Click = jest.fn();
    const onButtonClick = jest.fn();
    const onButtonXClick = jest.fn();

    class TestComponent extends Component {
      webEl: Element | undefined;

      state = {
        text: 0,
      };

      onH1Click = onH1Click;

      onButtonClick = onButtonClick;

      onButtonXClick = onButtonXClick;

      // @ts-ignore
      events = {
        "click@h1": this.onH1Click,
        "click@button": this.onButtonClick,
        "click@button.x": this.onButtonXClick,
      };

      render() {
        return `
          <h1>${this.state.text}</h1>
          <button>1</button>
          <button class="x">2</button>
        `;
      }

      onMount(element: Element): void {
        this.webEl = element;
      }
    }
    // eslint-disable-next-line no-new
    new TestComponent(el);
    await sleep(10);
    expect(onH1Click).not.toHaveBeenCalled();
    expect(onButtonClick).not.toHaveBeenCalled();
    expect(onButtonXClick).not.toHaveBeenCalled();

    // el.querySelector("h1")?.click();
    el.querySelector("h1")?.dispatchEvent(
      new window.Event("click", {
        bubbles: true,
      })
    );
    expect(onH1Click).toHaveBeenCalledTimes(1);

    el.querySelector("button")?.click();
    expect(onButtonClick).toHaveBeenCalledTimes(1);

    el.querySelector<HTMLButtonElement>("button.x")?.click();
    expect(onButtonClick).toHaveBeenCalledTimes(2);
    expect(onButtonXClick).toHaveBeenCalledTimes(1);
  });
});
