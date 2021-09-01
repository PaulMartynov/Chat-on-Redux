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
  beforeEach(() => {
    webEl = document.createElement("div");
    form = new InputForm(webEl, store.getState());
    store.subscribe(() => {
      form.setState(store.getState());
    });
    jest.spyOn(service, "sendMessage").mockImplementation();
  });
  test("it is a function", () => {
    expect(form.submit).toBeInstanceOf(Function);
  });
  test("it change name on submit & send message", () => {
    const nameInput = webEl.querySelector<HTMLInputElement>("#username");
    const messageInput =
      webEl.querySelector<HTMLTextAreaElement>("#textMessage");
    const formElement = webEl.querySelector("form");
    expect(formElement).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(messageInput).not.toBe(null);
    if (nameInput) {
      nameInput.value = "NewUserName";
    }
    if (messageInput) {
      messageInput.value = "test_message";
    }
    setTimeout(() => {
      if (formElement) {
        dispatchEvent(new Event("submit"));
      }
      expect(store.getState().username).toBe("NewUserName");
      expect(service.sendMessage).toBeCalledWith({
        name: "NewUserName",
        message: "test_message",
        date: new Date(),
      });
    }, 100);
  });
});
