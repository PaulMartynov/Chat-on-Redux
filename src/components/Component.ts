export abstract class Component<State = Record<string, unknown>> {
  private el: Element;

  private isMounted = false;

  protected state: State = {} as State;

  protected events: Record<string, (ev: Event) => void> = {} as Record<
    string,
    () => void
  >;

  constructor(el: Element, initialState: Partial<State> = {}) {
    this.el = el;
    this.setState(initialState);
    setTimeout(() => {
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
    }, 0);
  }

  abstract render(): string;

  onMount(element: Element): void {
    if (this.isMounted) {
      return;
    }
    this.isMounted = true;
  }

  setState(patch: Partial<State>): void {
    this.state = { ...this.state, ...patch };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  subscribeToEvents(): void {
    if (!this.events) {
      return;
    }
    Object.keys(this.events).forEach((key) => {
      const [eventName, selector] = key.split("@");
      [...this.el.querySelectorAll(`${selector}`)].forEach((elem) => {
        elem.addEventListener(`${eventName}`, this.events[key]);
      });
    });
  }
}
