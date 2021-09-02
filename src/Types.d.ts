declare type Action = {
  type: string;
  [key: string]: any;
};

declare type Message = {
  name: string;
  message: string;
  date: Date;
};

declare type State = {
  username: string;
  messageList: Array<Message>;
};
