declare type Message = {
  username: string;
  message: string;
  date: Date;
};

declare type State = {
  username: string | undefined;
  messageList: Array<Message>;
  text: string | undefined;
};
