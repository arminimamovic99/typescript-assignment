export interface IMessage {
  text: string;
  status: string;
}

// export enum IMessageStatus {

// }
export class Message {
  text;
  status: string;
  constructor(message: string, status: string) {
    this.text = message;
    this.status = status;
  }

  empty() {
    return this.text === '';
  }
}
