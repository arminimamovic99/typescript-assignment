import { IMessage } from "../../shared/models/message";

export interface Plugin {
    name: string;
    initialize(): void;
    transformMessage(message: string): IMessage; 
  }