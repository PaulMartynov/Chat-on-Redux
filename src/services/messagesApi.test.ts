import {
  getMessagesList,
  observeWithEventSource,
  sendMessage,
} from "./messagesApi";

describe("testing getMessagesList", () => {
  test("it is a function", () => {
    expect(getMessagesList).toBeInstanceOf(Function);
  });
  test("is trowing Error", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() => {
      return {
        json() {
          return { error: "TestError" };
        },
      };
    });
    await expect(getMessagesList()).rejects.toMatchObject({
      message: "TestError",
    });
    expect(global.fetch).toBeCalled();
  });
  test("is returning messages", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() => {
      return {
        json() {
          return {
            msg: {
              name: "testName",
              message: "testMessage",
              date: "2021-09-01T10:20:30Z",
            },
          };
        },
      };
    });
    const messages = await getMessagesList();
    expect(global.fetch).toBeCalled();
    expect(messages[0].name).toBe("testName");
    expect(messages[0].message).toBe("testMessage");
  });
});

describe("testing sendMessage", () => {
  test("it is a function", () => {
    expect(sendMessage).toBeInstanceOf(Function);
  });
  test("is trowing Error", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() => {
      return {
        json() {
          return { error: "TestError" };
        },
      };
    });
    await expect(
      sendMessage({
        name: "testName",
        message: "testMessage",
        date: new Date(),
      })
    ).rejects.toMatchObject({
      message: "TestError",
    });
    expect(global.fetch).toBeCalled();
  });
});

describe("testing observeWithEventSource", () => {
  test("it is a function", () => {
    expect(observeWithEventSource).toBeInstanceOf(Function);
  });
});
