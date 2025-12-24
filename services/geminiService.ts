import { GoogleGenAI } from "@google/genai";

/**
 * Gemini Service cung cấp các phương thức kết nối với Google Gemini API.
 */
export const geminiService = {
  /**
   * Tạo luồng phản hồi (streaming) từ Gemini dựa trên tin nhắn người dùng và lịch sử.
   * @param userInput - Nội dung tin nhắn hiện tại của người dùng.
   * @param history - Lịch sử cuộc trò chuyện.
   * @returns AsyncGenerator trả về từng đoạn text.
   */
  getChatResponseStream: async function* (userInput: string, history: { role: string; text: string }[]) {
    // Luôn khởi tạo instance mới để đảm bảo lấy API Key từ môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 1. Lọc và chuẩn hóa lịch sử: 
    // Gemini API sẽ báo lỗi 400 nếu một Part trong Content không có dữ liệu (trống).
    // Chúng ta lọc bỏ những tin nhắn không có text hoặc text chỉ toàn khoảng trắng.
    const sanitizedHistory = history
      .filter(entry => entry.text && typeof entry.text === 'string' && entry.text.trim().length > 0)
      .map(entry => ({
        role: entry.role === 'user' ? 'user' : 'model',
        parts: [{ text: entry.text.trim() }]
      }));

    // 2. Xây dựng mảng nội dung gửi đi
    const contents = [...sanitizedHistory];

    // 3. Thêm tin nhắn hiện tại của người dùng
    if (userInput && typeof userInput === 'string' && userInput.trim().length > 0) {
      contents.push({
        role: 'user',
        parts: [{ text: userInput.trim() }]
      });
    }

    // Nếu không có nội dung nào hợp lệ để gửi, kết thúc sớm.
    if (contents.length === 0) return;

    // 4. Đảm bảo vai trò (roles) xen kẽ: user -> model -> user...
    // Gemini đôi khi báo lỗi nếu có 2 model messages hoặc 2 user messages liên tiếp.
    const finalContents = contents.reduce((acc, current) => {
      if (acc.length > 0 && acc[acc.length - 1].role === current.role) {
        // Nếu cùng vai trò, gộp text lại thay vì tạo block mới
        acc[acc.length - 1].parts[0].text += "\n" + current.parts[0].text;
        return acc;
      }
      acc.push(current);
      return acc;
    }, [] as any[]);

    try {
      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: finalContents,
        config: {
          systemInstruction: 'Bạn là Sigma Expert AI, trợ lý hỗ trợ khách hàng chuyên nghiệp của FPT Shop. Hãy tư vấn sản phẩm công nghệ một cách lịch sự, hữu ích bằng tiếng Việt.',
        },
      });

      // Lặp qua luồng dữ liệu trả về từ API
      for await (const chunk of response) {
        // Truy cập thuộc tính .text trực tiếp (không gọi như một hàm)
        const text = chunk.text;
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error("Gemini API stream error:", error);
      throw error;
    }
  }
};

/**
 * Function ví dụ askSigmaAI (dạng stream)
 */
export const askSigmaAI = async function* (message: string) {
  if (!message || message.trim().length === 0) return;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
      config: {
        systemInstruction: "Bạn là Sigma AI Advisor, một chuyên gia tư vấn chiến lược. Hãy trả lời bằng tiếng Việt chuyên nghiệp.",
      },
    });
    
    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "Dạ, hiện tại hệ thống AI đang bận một chút. Bạn vui lòng thử lại sau vài giây nhé!";
  }
};
