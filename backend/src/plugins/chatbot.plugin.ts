import { IMessage } from '../../../shared/models/message';
import { Plugin } from '../plugin';

const chatbotPlugin: Plugin = {
  name: 'Chatbot Plugin',
  initialize() {
    console.log(`${this.name} initialized`);
  },
  transformMessage(message: string): IMessage {
    return {
      text: `Chatbot response to: ${message}`,
      createdBy: 'Chatbot',
      status: 'Delivered',
      createdOn: new Date().toISOString()
    }
  }
};

export default chatbotPlugin;