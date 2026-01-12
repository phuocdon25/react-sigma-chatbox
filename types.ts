export enum MessageType {
  TEXT = 'text',
  PRODUCT_LIST = 'product_list',
  LOADING = 'loading'
}

export enum SenderType {
  USER = 'user',
  AI = 'ai'
}

export type Language = 'en' | 'vi' | 'ja';

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

/**
 * Hỗ trợ giá trị đơn hoặc đối tượng đa ngôn ngữ
 */
export type Translatable<T> = T | Partial<Record<Language, T>>;

export interface ChatboxConfig {
  primaryColor: string;
  botName: string;
  welcomeMessage: Translatable<string>;
  placeholder: Translatable<string>;
  avatarUrl: string;
  quickReplies: Translatable<string[]>;
  /**
   * Nếu true, tin nhắn từ AI sẽ được render hỗ trợ định dạng Markdown cơ bản.
   * Mặc định là false (văn bản thuần túy).
   */
  renderMarkdown?: boolean;
}

/**
 * Flexible handler for AI responses.
 * Receives threadId and selected language.
 */
export type AiResponseHandler = (
  userInput: string, 
  threadId: string,
  language: Language
) => Promise<string | { text: string; products?: Product[] }> | AsyncGenerator<string>;