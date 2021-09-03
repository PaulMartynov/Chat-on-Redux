import {
  getMessagesList,
  observeWithEventSource,
  sendMessage,
} from "./messagesApi";

describe("testing getMessagesList", () => {
  test("it is a function", () => {
    expect(getMessagesList).toBeInstanceOf(Function);
  });
});

describe("testing sendMessage", () => {
  test("it is a function", () => {
    expect(sendMessage).toBeInstanceOf(Function);
  });
});

describe("testing observeWithEventSource", () => {
  test("it is a function", () => {
    expect(observeWithEventSource).toBeInstanceOf(Function);
  });
});
