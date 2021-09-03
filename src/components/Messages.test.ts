import { ChatMessages } from "./Messages";
import { store } from "../redux/store";
import { Component } from "./Component";
import { getMessageAction, getMessagesAction } from "../actions/Actions";

describe("testing ChatMessages class", () => {
  let messagesList: ChatMessages;
  let webEl: Element;
  beforeEach(() => {
    webEl = document.createElement("div");
    messagesList = new ChatMessages(webEl, store.getState());
  });
  test("it is a function", () => {
    expect(ChatMessages).toBeInstanceOf(Function);
    expect(messagesList).toBeInstanceOf(ChatMessages);
    expect(messagesList).toBeInstanceOf(Component);
  });
  test("render function", () => {
    expect(ChatMessages.prototype.render).toBeInstanceOf(Function);
  });
  test("it must render message list", () => {
    expect(webEl.querySelectorAll(".message")).toHaveLength(0);

    store.subscribe(() => {
      messagesList.setState(store.getState());
    });

    const currentDate = new Date();
    const messages = [
      {
        name: "testName",
        message: "testMessage",
        date: currentDate,
      },
    ];

    store.dispatch(getMessagesAction(messages));
    expect(store.getState().messageList).toStrictEqual(messages);

    expect(webEl.querySelectorAll(".message")).toHaveLength(1);
    expect(webEl.querySelector(".date")).not.toBe(null);
    expect(webEl.querySelector(".date")?.innerHTML).toBe(
      `<i>${currentDate.toString()}</i>`
    );
    expect(webEl.querySelector(".author")).not.toBe(null);
    expect(webEl.querySelector(".author")?.innerHTML).toBe("<b>testName</b>");
    expect(webEl.querySelector(".text")).not.toBe(null);
    expect(webEl.querySelector(".text")?.innerHTML).toBe("testMessage");

    const newDate = new Date();
    const newMessage = {
      name: "testName2",
      message: "testMessage2",
      date: newDate,
    };

    store.dispatch(getMessageAction(newMessage));

    expect(store.getState().messageList).toHaveLength(2);
    expect(store.getState().messageList[1]).toStrictEqual(newMessage);

    expect(webEl.querySelectorAll(".message")).toHaveLength(2);
    expect(webEl.querySelectorAll(".date")).toHaveLength(2);
    expect(webEl.querySelectorAll(".author")).toHaveLength(2);
    expect(webEl.querySelectorAll(".text")).toHaveLength(2);
    expect(webEl.querySelectorAll(".date")[1]?.innerHTML).toBe(
      `<i>${newDate.toString()}</i>`
    );
    expect(webEl.querySelectorAll(".author")[1]?.innerHTML).toBe(
      "<b>testName2</b>"
    );
    expect(webEl.querySelectorAll(".text")[1]?.innerHTML).toBe("testMessage2");
  });
});
