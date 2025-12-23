# React Sigma Chatbox ✨

Thư viện React Chatbox hiệu năng cao, giao diện hiện đại được lấy cảm hứng từ các trợ lý AI hàng đầu (như Bitu). Hỗ trợ hiển thị sản phẩm (Product Carousel), phản hồi thời gian thực (AI Streaming) và tùy biến hoàn toàn qua Tailwind CSS.

---

## ✨ Tính năng nổi bật

- 🚀 **AI Streaming**: Hỗ trợ `AsyncGenerator` tạo hiệu ứng gõ chữ thời gian thực.
- 🛍️ **Product Carousel**: Hiển thị danh sách sản phẩm đẹp mắt, hỗ trợ vuốt ngang.
- 🎨 **Tailwind Optimized**: Siêu nhẹ, dễ dàng thay đổi màu sắc chủ đạo qua cấu hình.
- 📦 **Self-contained**: Sử dụng **SVG nội bộ** và **CSS Keyframes** tích hợp sẵn.

---

## 📦 Hướng dẫn Cài đặt & Tích hợp

### 1. Cài đặt từ NPM
```bash
npm install react-sigma-chatbox
```

### 2. Sử dụng Local (npm link)
Nếu bạn đang dùng thư viện này cho một dự án khác ở máy cục bộ:

**Bước 1: Build thư viện**
```bash
npm run build
```

**Bước 2: Liên kết (Link)**
- Tại thư mục thư viện: `npm link`
- Tại thư mục dự án của bạn: `npm link react-sigma-chatbox`

---

## 🚀 Cách sử dụng cơ bản

Trong file `App.tsx` của bạn, hãy đảm bảo import đúng tên file CSS từ thư mục `dist`:

```tsx
import { Chatbox } from 'react-sigma-chatbox';
// LƯU Ý: Tên file CSS chính xác là react-sigma-chatbox.css
import 'react-sigma-chatbox/dist/react-sigma-chatbox.css'; 

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

## 🛠️ AI Response Patterns

### Pattern A: Product Carousel
```tsx
const handleAi = async (userInput) => {
  return {
    text: "Sản phẩm gợi ý:",
    products: [{ id: '1', name: 'iPhone 15', price: '20tr', image: '...', description: '...' }]
  };
};
```

### Pattern B: Streaming (Gõ chữ)
```tsx
async function* handleAiStream(userInput) {
  yield "Đang "; yield "trả "; yield "lời...";
}
```

---

## 🎨 Cấu hình Tailwind CSS
Thêm đường dẫn vào `tailwind.config.js` của dự án sử dụng:

```javascript
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", 
  ],
}
```

---

## ⚠️ Xử lý lỗi "Module not found"

Nếu bạn gặp lỗi không tìm thấy CSS, hãy kiểm tra thư mục `node_modules/react-sigma-chatbox/dist/`. Tên file CSS thường được Vite đặt theo tên project trong `package.json`. Nếu nó là `react-sigma-chatbox.css`, hãy import đúng tên đó.

---

## 📄 License
MIT © [Your Name]
