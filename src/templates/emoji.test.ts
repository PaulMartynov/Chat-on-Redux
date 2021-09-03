import { emojiTemplate, emojis } from "./emoji";

describe("testing emojiTemplate", () => {
  Object.keys(emojis).forEach((emoji) => {
    test(`for '${emoji}' conde must be: '${emojis[emoji]}':`, () => {
      expect(emojiTemplate(`<p>${emoji}</p>`)).toBe(`<p>${emojis[emoji]}</p>`);
    });
  });
  test("random template", () => {
    const value = String(Math.floor(Math.random() * 100) + 1);
    expect(emojiTemplate(`:-)`, { ":-)": value })).toBe(`${value}`);
  });
});
