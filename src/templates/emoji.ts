type Emojis = {
  [key: string]: string;
};

const emojis: Emojis = {
  ":)": "&#128512;",
  ":-)": "&#128512;",
  "(:": "&#128512;",
  "(-:": "&#128512;",
  ":D": "&#128513;",
  ":-D": "&#128513;",
  ":(": "&#9785;",
  ":-(": "&#9785;",
  ":o": "&#128558;",
  ":-o": "&#128558;",
  "8O": "&#128562;",
  "8-O": "&#128562;",
  ":|": "&#128528;",
  ":-|": "&#128528;",
  "8)": "&#128526;",
  "8-)": "&#128526;",
  ":x": "&#128544;",
  ":-x": "&#128544;",
  ":P": "&#128539;",
  ":-P": "&#128539;",
  ";)": "&#128521;",
  ";-)": "&#128521;",
};

export function emojiTemplate(tpl: string, emoji = emojis): string {
  let newTpl = tpl;
  Object.keys(emoji).forEach((key) => {
    const reg = (key as string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    newTpl = newTpl.replace(new RegExp(reg, "g"), emoji[key]);
  });
  return newTpl;
}
