# React Sigma Chatbox ✨

Thư viện React Chatbox hiệu năng cao, giao diện hiện đại được lấy cảm hứng từ các trợ lý AI hàng đầu (như Bitu). Hỗ trợ hiển thị sản phẩm (Product Carousel), phản hồi thời gian thực (AI Streaming) và tùy biến hoàn toàn qua Tailwind CSS.

---

## ✨ Tính năng nổi bật

- 🚀 **AI Streaming**: Hỗ trợ `AsyncGenerator` tạo hiệu ứng gõ chữ thời gian thực.
- 🛍️ **Product Carousel**: Hiển thị danh sách sản phẩm đẹp mắt, hỗ trợ vuốt ngang.
- 🎨 **Tailwind Optimized**: Siêu nhẹ, dễ dàng thay đổi màu sắc chủ đạo qua cấu hình.
- 📦 **Self-contained**: Sử dụng **SVG nội bộ** và **CSS Keyframes** tích hợp sẵn. Không cần cài thêm FontAwesome hay thư viện icon bên ngoài.

---

## 📦 Hướng dẫn Cài đặt & Tích hợp

### 1. Cài đặt từ NPM (Khi thư viện đã được publish)
```bash
npm install react-sigma-chatbox
```

### 2. Sử dụng Local (Khi bạn đang phát triển bộ Kit này)
Nếu bạn đang dùng thư viện này cho một dự án khác ở máy cục bộ (Local), hãy làm theo các bước sau để tránh lỗi "Module not found":

**Bước 1: Build thư viện**
Trong thư mục của `react-sigma-chatbox`, bạn PHẢI chạy lệnh build để tạo ra thư mục `dist`:
```bash
npm run build
```

**Bước 2: Liên kết (Link)**
- Tại thư mục thư viện: `npm link`
- Tại thư mục dự án của bạn: `npm link react-sigma-chatbox`

**Lưu ý quan trọng về CSS:**
Nếu bạn gặp lỗi `Failed to resolve import "react-sigma-chatbox/dist/style.css"`, đó là vì thư mục `dist` chưa có. Hãy chắc chắn đã chạy `npm run build`.

---

## 🚀 Cách sử dụng cơ bản

Trong file `App.tsx` của bạn:

```tsx
import { Chatbox } from 'react-sigma-chatbox';
import 'react-sigma-chatbox/dist/style.css'; // Bắt buộc phải có để hiển thị icon và animation

const App = () => {
  const config = {
    primaryColor: '#6366f1',
    botName: 'Sigma Assistant',
    welcomeMessage: 'Chào bạn! Tôi có thể giúp gì cho bạn?',
    quickReplies: ['Giá iPhone 15', 'Chính sách bảo hành']
  };

  const handleAiResponse = async (input) => {
    return "Đây là phản hồi từ AI của bạn.";
  };

  return <Chatbox config={config} onGetAiResponse={handleAiResponse} />;
};
```

---

## 🛠️ Hướng dẫn nâng cao: AI Response Patterns

Prop `onGetAiResponse` cho phép bạn tùy biến phản hồi cực kỳ linh hoạt:

### Pattern A: Hiển thị danh sách sản phẩm (Product Carousel)
Trả về một Object chứa `text` và mảng `products`.

```tsx
const handleAi = async (userInput) => {
  return {
    text: "Đây là các sản phẩm bạn quan tâm:",
    products: [
      { 
        id: '1', 
        name: 'iPhone 15 Pro', 
        price: '24.990.000₫', 
        image: 'https://link-anh.com/iphone.png', 
        description: 'Chip A17 Pro mạnh mẽ' 
      },
      // ... thêm sản phẩm khác
    ]
  };
};
```

### Pattern B: Phản hồi dạng gõ chữ (Streaming)
Sử dụng `async function*` để gửi từng từ (chunk) về giao diện.

```tsx
async function* handleAiStream(userInput) {
  const words = ["Đang", " suy", " nghĩ...", " Đây", " là", " câu", " trả", " lời."];
  for (const word of words) {
    await new Promise(r => setTimeout(r, 100)); // Giả lập độ trễ
    yield word;
  }
}
```

---

## 🎨 Cấu hình Tailwind CSS
Để các class của thư viện hoạt động trong dự án của bạn, hãy thêm đường dẫn vào `tailwind.config.js`:

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", 
  ],
  // ...
}
```

---

## 📖 API Reference

### Chatbox Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `config` | `ChatboxConfig` | Cấu hình giao diện và nội dung chào mừng. |
| `onGetAiResponse` | `AiResponseHandler` | Hàm xử lý tin nhắn. Nếu bỏ trống, thư viện sẽ dùng Gemini mặc định. |

### ChatboxConfig
| Thuộc tính | Kiểu dữ liệu | Mặc định |
| :--- | :--- | :--- |
| `primaryColor` | `string` | `#ef4444` |
| `botName` | `string` | `Sigma AI` |
| `welcomeMessage`| `string` | (Bắt buộc) Câu chào đầu tiên. |
| `placeholder` | `string` | `Nhập câu hỏi...` |
| `quickReplies` | `string[]` | `[]` |

---

## ⚠️ Xử lý lỗi thường gặp

1. **Lỗi "Module not found: dist/style.css"**: Bạn chưa chạy `npm run build` trong thư mục thư viện.
2. **Icon không hiển thị**: Đảm bảo đã import file CSS và cấu hình `content` trong `tailwind.config.js`.
3. **Lỗi "Invalid hook call"**: Thường do xung đột phiên bản React. Hãy chạy `npm link <đường-dẫn-tới-dự-án>/node_modules/react` trong thư mục thư viện để đồng bộ phiên bản.

---

## 📄 License
MIT © [Your Name]
