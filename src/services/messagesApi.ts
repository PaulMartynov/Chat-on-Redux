const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json",
};

// /**
//  * @return {Object[]} messagesList
//  */
export async function getMessagesList(): Promise<Message[]> {
  const response = await fetch(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return Object.values<Message>(data).map((el: Message) => ({
    ...el,
    date: new Date(el.date),
  }));
}

// /**
//  * @param {Object} data
//  * @param {string} data.nickname
//  * @param {string} data.message
//  * @returns {boolean}
//  */
export async function sendMessage(data: Message): Promise<void> {
  const response = await fetch(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
    {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date(),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const respData = await response.json();
  if (respData.error) {
    throw new Error(respData.error);
  }
}

export function observeWithEventSource(cb: any): void {
  // https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`
  );

  evtSource.addEventListener("put", (ev: any) => cb(JSON.parse(ev.data).data));
}
