
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  /**
   * Phương thức streaming phản hồi từ Gemini
   */
  async *getChatResponseStream(userInput: string, history: { role: string, text: string }[]) {
    try {
      // Khởi tạo instance ngay tại đây để đảm bảo lấy được giá trị mới nhất của API_KEY
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        yield "Lỗi: Không tìm thấy API Key. Vui lòng cấu hình process.env.API_KEY trong dự án của bạn.";
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
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

      const responseStream = await ai.models.generateContent({
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

      yield responseStream.text || "";
      
    } catch (error) {
      console.error("Gemini Error:", error);
      yield "Xin lỗi, hiện tại mình đang gặp chút trục trặc khi kết nối với AI. Bạn vui lòng kiểm tra lại cấu hình API Key nhé!";
    }
  }
}

export const geminiService = new GeminiService();
