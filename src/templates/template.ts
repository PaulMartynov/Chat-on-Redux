export function template(tpl: string, data: any): string {
  let newTpl;
  newTpl = tpl.replace(
    /{{for (\w+)}}([\s\S]+?){{endfor}}/g,
    (fullMatch: string, listName: string, temp: string) => {
      const result = data[listName].map((item: string) => {
        return template(temp, item);
      });
      return result.join("");
    }
  );
  newTpl = newTpl.replace(
    /{{for (\w+) as (\w+)}}([\s\S]+?){{endfor}}/g,
    (fullMatch: string, listName: string, iterator: string, option: string) => {
      const result = data[listName].map((item: string) => {
        const temp = {} as Record<string, unknown>;
        temp[iterator] = item;
        return template(option, temp);
      });
      return result.join("");
    }
  );
  newTpl = newTpl.replace(/{{(\w*)}}/g, (fullMatch, key) => {
    return data[key] ? data[key] : "";
  });

  return newTpl;
}
