import { Plugin } from '../plugin';

const chatbotPlugin: Plugin = {
  name: 'Chatbot Plugin',
  initialize() {
    console.log(`${this.name} initialized`);
  },
  transformMessage(message: string): string {
    // Simple echo chatbot for demonstration
    return `Chatbot response: ${message}`;
  }
};

export default chatbotPlugin;