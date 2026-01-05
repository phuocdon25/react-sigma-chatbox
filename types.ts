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
  /**
   * Nếu true, tin nhắn từ AI sẽ được render hỗ trợ định dạng Markdown cơ bản.
   * Mặc định là false (văn bản thuần túy).
   */
  renderMarkdown?: boolean;
}

/**
 * Flexible handler for AI responses.
 * Now receives threadId (random string) to manage conversation sessions.
 */
export type AiResponseHandler = (
  userInput: string, 
  threadId: string
) => Promise<string | { text: string; products?: Product[] }> | AsyncGenerator<string>;