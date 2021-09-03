import { template } from "./template";

describe("template", () => {
  const data = {
    NAME: "Bob",
    AGE: "18",
    TEAM: "Core",
    items: [
      { A: 1, B: 2 },
      { A: 11, B: 22 },
      { A: 111, B: 222 },
    ],
  };

  describe("basic data placing", () => {
    test("puts data into placeholders", () => {
      expect(template("Hi, {{NAME}}", data)).toBe("Hi, Bob");
    });

    test("puts empty string into placeholders in no data provided", () => {
      expect(template("Hi, {{NAME}} {{SURNAME}}", data)).toBe("Hi, Bob ");
    });

    test("replaces all placeholders", () => {
      expect(template("Hi, {{NAME}}. My name is {{NAME}} too", data)).toBe(
        "Hi, Bob. My name is Bob too"
      );
    });
  });

  describe("loops", () => {
    test("puts values from list elements inside loop", () => {
      expect(
        template("{{NAME}}{{for items}}{{NAME}},{{endfor}}", {
          NAME: "0 ",
          items: [{ NAME: "1" }, { NAME: "2" }],
        })
      ).toBe("0 1,2,");
    });

    test("handles basic loops", () => {
      expect(template("{{for items}}{{A}},{{endfor}}", data)).toBe("1,11,111,");
    });
  });

  test("puts values from array elements inside loop", () => {
    expect(
      template("{{for items as item}}{{item}},{{endfor}}", {
        NAME: "0 ",
        items: [1, 2, 3],
      })
    ).toBe("1,2,3,");
  });
});
