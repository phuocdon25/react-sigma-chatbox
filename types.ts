
export enum MessageType {
  TEXT = 'text',
  PRODUCT_LIST = 'product_list',
  LOADING = 'loading'
}

export enum SenderType {
  USER = 'user',
  AI = 'ai'
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  description: string;
}

export interface Message {
  id: string;
  type: MessageType;
  sender: SenderType;
  content: string;
  products?: Product[];
  timestamp: Date;
}

export interface ChatboxConfig {
  primaryColor: string;
  botName: string;
  welcomeMessage: string;
  placeholder: string;
  avatarUrl: string;
  quickReplies: string[];
}

/**
 * Flexible handler for AI responses.
 * Can return a simple string (Promise) or an AsyncGenerator for streaming.
 */
export type AiResponseHandler = (
  userInput: string, 
  history: Message[]
) => Promise<string | { text: string; products?: Product[] }> | AsyncGenerator<string>;
