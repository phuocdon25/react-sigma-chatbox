
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Cast to string as we assume it's pre-configured and valid per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  /**
   * Phương thức streaming phản hồi từ Gemini
   * Trả về một AsyncGenerator để phía UI có thể nhận dữ liệu theo thời gian thực
   */
  async *getChatResponseStream(userInput: string, history: { role: string, text: string }[]) {
    try {
      const contents = [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [{ text: userInput }]
        }
      ];

      const responseStream = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: `Bạn là Sigma, một trợ lý AI thông minh và thân thiện. 
          Hãy trả lời người dùng một cách chuyên nghiệp nhưng gần gũi bằng tiếng Việt.
          Nếu người dùng hỏi về kỹ thuật, hãy giải thích rõ ràng.
          
          LƯU Ý: Hiện tại hãy chỉ trả về văn bản thuần túy (Plain text).`,
          temperature: 0.7,
        }
      });

      // Simple handling for generateContent text response (can be adapted back to stream if needed)
      // Since generateContent is used here for simplicity as per guidelines
      yield responseStream.text || "";
      
    } catch (error) {
      console.error("Gemini Error:", error);
      yield "Xin lỗi, hiện tại mình đang gặp chút trục trặc. Bạn vui lòng thử lại sau nhé!";
    }
  }
}

export const geminiService = new GeminiService();
