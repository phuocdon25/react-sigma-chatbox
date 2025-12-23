# React Sigma Chatbox ✨

Thư viện React Chatbox hiệu năng cao, giao diện hiện đại được lấy cảm hứng từ trợ lý AI Bitu của FPT Shop.

---

## 🛠️ Cách tự xây dựng AI Service (Ví dụ mẫu)

Nếu bạn dùng thư viện này ở một dự án khác, bạn nên tạo một file service riêng để xử lý logic AI. Dưới đây là code mẫu hoàn chỉnh bạn có thể copy:

### 1. File: `AIService.ts` (Ở dự án của bạn)

```typescript
import { GoogleGenAI } from "@google/genai";

export class AIService {
  private ai: any;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  // Hàm xử lý trả về text + sản phẩm hoặc chỉ text
  async handleRequest(input: string, history: any[]) {
    const query = input.toLowerCase();

    // GIẢ LẬP: Trả về danh sách sản phẩm nếu hỏi về iPhone
    if (query.includes("iphone")) {
      return {
        text: "Dạ, đây là các mẫu iPhone mới nhất tại cửa hàng em:",
        products: [
          {
            id: '1',
            name: 'iPhone 15 Pro Max 256GB',
            price: '29.490.000₫',
            image: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/13/638302096701832135_iphone-15-pro-max-gold-1.jpg',
            description: 'Chip A17 Pro mạnh mẽ'
          }
        ]
      };
    }

    // THỰC TẾ: Gọi Gemini để lấy phản hồi dạng Streaming (Gõ chữ)
    return this.generateStream(input, history);
  }

  private async *generateStream(input: string, history: any[]) {
    const response = await this.ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: input }] }]
    });

    for await (const chunk of response) {
      yield chunk.text || "";
    }
  }
}
```

### 2. Cách kết nối vào Component
bn7 
```tsx
import { Chatbox } from 'react-sigma-chatbox';
import 'react-sigma-chatbox/dist/style.css';
import { AIService } from './AIService';

const ai = new AIService("YOUR_API_KEY");

function App() {
  const handleAi = (input, history) => ai.handleRequest(input, history);

  return (
    <Chatbox 
      onGetAiResponse={handleAi}
      config={{
        botName: "Sigma AI",
        welcomeMessage: "Chào bạn, tôi có thể giúp gì?",
        // ...
      }}
    />
  );
}
```

---

## 📦 Các kiểu phản hồi (onGetAiResponse)

Hàm `onGetAiResponse` của bạn có thể trả về 3 định dạng:

1. **String**: Hiện tin nhắn văn bản ngay lập tức.
2. **Object**: `{ text: string, products: Product[] }` để hiện Carousel sản phẩm.
3. **Async Generator (yield)**: Để tạo hiệu ứng AI đang gõ chữ từng từ một.

---

## 📄 License
MIT