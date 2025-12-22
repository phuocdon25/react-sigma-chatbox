
# React Sigma Chatbox

A high-performance, beautiful, and customizable React chatbox library. This library features a modern UI, product carousel rendering, quick reply support, and built-in Google Gemini AI integration.

---

## 🔑 Setup API KEY (CỰC KỲ QUAN TRỌNG)

Vì thư viện chạy trên trình duyệt, bạn cần "tiêm" API Key vào thông qua cấu hình bundler của dự án bạn.

### 1. File `.env` của bạn
```env
VITE_API_KEY=your_actual_gemini_api_key
```

### 2. Cấu hình `vite.config.ts` (Dành cho dự án dùng Vite)
Mặc định Vite không nạp biến `.env` vào `process.env`. Bạn phải dùng `loadEnv` như sau:

```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Nạp biến môi trường dựa trên mode (development, production...)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Ánh xạ VITE_API_KEY từ .env vào process.env.API_KEY mà thư viện Sigma yêu cầu
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  };
});
```

---

## Critical Styling Setup

Thêm đường dẫn này vào `tailwind.config.js` của dự án chính:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-sigma-chatbox/dist/**/*.{js,mjs,ts,tsx}",
],
```

---

## Usage

```tsx
import { Chatbox } from 'react-sigma-chatbox';

function App() {
  return <Chatbox config={{...}} />;
}
```

## License
MIT
