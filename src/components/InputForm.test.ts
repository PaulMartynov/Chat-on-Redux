import { InputForm } from "./InputForm";
import { Component } from "./Component";
import * as service from "../services/messagesApi";
import { store } from "../redux/store";

describe("testing InputForm", () => {
  let form: InputForm;
  let webEl: Element;
  beforeEach(() => {
    webEl = document.createElement("div");
    form = new InputForm(webEl, store.getState());
  });
  test("it is a function", () => {
    expect(InputForm).toBeInstanceOf(Function);
  });
  test("it is instance of Component", () => {
    expect(form).toBeInstanceOf(Component);
    expect(form).toBeInstanceOf(InputForm);
  });
  test("it is render is a function", () => {
    expect(InputForm.prototype.render).toBeInstanceOf(Function);
  });
  test("is rendering from with name & message inputs & submit button", () => {
    expect(webEl.querySelector("form")).not.toBe(null);
    expect(webEl.querySelector("#username")).not.toBe(null);
    expect(webEl.querySelector<HTMLInputElement>("#username")?.value).toBe(
      store.getState().username
    );
    expect(webEl.querySelector("#textMessage")).not.toBe(null);
    expect(
      webEl.querySelector<HTMLTextAreaElement>("#textMessage")?.value
    ).toBe("");
    expect(webEl.querySelector("#sendBtn")).not.toBe(null);
  });
});

describe("testing submit event", () => {
  let form: InputForm;
  let webEl: Element;
  let nameInput: HTMLInputElement | null;
  let messageInput: HTMLTextAreaElement | null;
  let formElement: Element | null;
  beforeEach(() => {
    webEl = document.createElement("div");
    form = new InputForm(webEl, store.getState());
    store.subscribe(() => {
      form.setState(store.getState());
    });
    jest.spyOn(service, "sendMessage").mockImplementation();
    nameInput = webEl.querySelector<HTMLInputElement>("#username");
    messageInput = webEl.querySelector<HTMLTextAreaElement>("#textMessage");
    formElement = webEl.querySelector("form");
  });
  test("it is a function", () => {
    expect(form.submit).toBeInstanceOf(Function);
  });
  test("it change name on submit & send message", async () => {
    expect(formElement).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(messageInput).not.toBe(null);
    const newName = `NewUserName_${Math.floor(Math.random() * 100) + 1}`;
    if (nameInput) {
      nameInput.value = newName;
    }
    if (messageInput) {
      messageInput.value = "test_message";
    }
    if (formElement) {
      formElement.addEventListener("submit", form.submit);
      formElement.dispatchEvent(new Event("submit"));
    }
    expect(store.getState().username).toBe(newName);
    expect(service.sendMessage).toBeCalled();
  });
  test("is not change name on submit", () => {
    expect(formElement).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(messageInput).not.toBe(null);
    const nameBefore = store.getState().username;
    if (nameInput) {
      nameInput.remove();
    }
    if (formElement) {
      formElement.addEventListener("submit", form.submit);
      formElement.dispatchEvent(new Event("submit"));
    }
    expect(store.getState().username).toBe(nameBefore);
  });
  test("is not send message on submit", () => {
    expect(formElement).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(messageInput).not.toBe(null);
    if (messageInput) {
      messageInput.remove();
    }
    if (formElement) {
      formElement.addEventListener("submit", form.submit);
      formElement.dispatchEvent(new Event("submit"));
    }
    expect(service.sendMessage).not.toBeCalled();
  });
  test("is not send message on submit if not form", () => {
    expect(formElement).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(messageInput).not.toBe(null);
    if (messageInput) {
      messageInput.remove();
    }
    if (formElement) {
      formElement.dispatchEvent(new Event("submit"));
    }
    expect(service.sendMessage).not.toBeCalled();
  });
});
