
# React Sigma Chatbox

A high-performance, beautiful, and customizable React chatbox library. This library features a modern UI, product carousel rendering, quick reply support, and built-in Google Gemini AI integration.

---

## 🚀 For Developers (Chủ dự án)

Nếu bạn là người phát triển hoặc muốn chỉnh sửa thư viện này, hãy làm theo các bước sau:

### 1. Cài đặt môi trường
```bash
npm install
```

### 2. Chạy môi trường Sandbox (Kiểm thử giao diện)
Lệnh này sẽ chạy file `App.tsx` để bạn xem trước Chatbox hoạt động như thế nào:
```bash
npm run dev
```

### 3. Đóng gói thư viện (Build)
Trước khi chia sẻ hoặc sử dụng thư viện ở dự án khác, bạn phải build nó ra thư mục `dist`:
```bash
npm run build
```

---

## 📦 For Library Users (Người sử dụng thư viện)

### 1. Cài đặt qua NPM
```bash
npm install react-sigma-chatbox
```

### 2. 🔑 Setup API KEY (CỰC KỲ QUAN TRỌNG)
Vì thư viện chạy trên trình duyệt, bạn cần "tiêm" API Key vào thông qua cấu hình bundler của dự án bạn.

#### File `.env` của dự án mẹ:
```env
VITE_API_KEY=your_actual_gemini_api_key
```

#### Cấu hình `vite.config.ts` (Dự án dùng Vite):
```typescript
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  };
});
```

---

## Critical Styling Setup

Thêm đường dẫn này vào `tailwind.config.js` của dự án chính để nhận được style của chatbox:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-sigma-chatbox/dist/**/*.{js,mjs,ts,tsx}",
],
```

## License
MIT
