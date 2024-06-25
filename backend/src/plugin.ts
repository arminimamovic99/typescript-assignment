export interface Plugin {
    name: string;
    initialize(): void;
    transformMessage(message: string): string; 
  }