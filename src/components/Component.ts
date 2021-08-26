export abstract class Component<State = Record<string, unknown>> {
  private el: Element;

  protected state: State = {} as State;

  protected events: Record<string, (ev: Event) => void> = {} as Record<
    string,
    () => void
  >;

  constructor(el: Element) {
    this.el = el;
    setTimeout(() => {
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
    }, 0);
  }

  abstract render(): string;

  abstract onMount(element: Element): void;

  setState(patch: Partial<State>): void {
    this.state = { ...this.state, ...patch };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  subscribeToEvents(): void {
    Object.keys(this.events).forEach((key) => {
      const [eventName, selector] = key.split("@");
      [...this.el.querySelectorAll(`${selector}`)].forEach((elem) => {
        elem.addEventListener(`${eventName}`, this.events[key]);
      });
    });
  }
}
