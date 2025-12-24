# React Sigma Chatbox ✨

A high-performance, modern React Chatbox UI library inspired by the Bitu AI assistant (FPT Shop). It features a sleek design, support for product carousels, quick replies, and built-in compatibility with the Gemini AI streaming API.

---

## 🚀 Development Setup

If you have cloned this repository and want to run the demo or continue development:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The demo application will be available at `http://localhost:5173`.

3.  **Build the library:**
    ```bash
    npm run build
    ```
    This generates the `dist` folder containing the compiled library (`index.mjs`, `index.js`) and the bundled CSS (`style.css`).

---

## 📦 Integrating into Another Local Project

### 1. Link or Copy the Library
You can use the library in your other local projects before it's published to NPM:

**Option A: NPM Link**
1. In the `react-sigma-chatbox` directory: `npm link`
2. In your target project directory: `npm link react-sigma-chatbox`

**Option B: Manual Copy**
Copy the `dist` folder directly into your project and import from it.

### 2. Tailwind CSS Configuration
To ensure the chatbox styles are correctly applied in your target project, update your `tailwind.config.js`. Use the following configuration which is verified to work:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Import Styles
Import the library's stylesheet in your entry file (e.g., `main.tsx` or `App.tsx`):
```typescript
import 'react-sigma-chatbox/dist/style.css';
```

---

## 🛠 Basic & Streaming Usage

The `Chatbox` component is highly flexible and can handle both standard Promises and Async Generators (for streaming).

### Standard Text Response (Promise)
Ideal for simple logic or traditional API calls.
```tsx
const handleSimpleAi = async (userInput: string) => {
  return "Hello! I am your AI assistant. How can I help you today?";
};

<Chatbox onGetAiResponse={handleSimpleAi} config={config} />
```

### Streaming Response (Async Generator)
Use this for real-time "typing" effects, similar to ChatGPT or Gemini.
```tsx
async function* handleStreamingAi(userInput: string) {
  const chunks = ["Hello there! ", "I am ", "Sigma AI. ", "I can ", "help you ", "find products."];
  for (const chunk of chunks) {
    await new Promise(r => setTimeout(r, 150)); // Simulating network delay
    yield chunk;
  }
}

<Chatbox onGetAiResponse={handleStreamingAi} config={config} />
```

### Product Carousel Response
You can return an object containing both text and an array of products.
```tsx
const handleProductSearch = async (userInput: string) => {
  if (userInput.toLowerCase().includes("iphone")) {
    return {
      text: "Check out our latest iPhone models:",
      products: [
        {
          id: 'ip15',
          name: 'iPhone 15 Pro Max',
          price: '29.990.000₫',
          image: 'https://example.com/iphone15.jpg',
          description: 'The ultimate iPhone.'
        }
      ]
    };
  }
  return "Sorry, I couldn't find that product.";
};
```

---

## ⚙️ Component Configuration

### Chatbox Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `config` | `ChatboxConfig` | Object containing UI branding and initial messages. |
| `onGetAiResponse` | `Function` | (Optional) Logic handler. If omitted, it defaults to the built-in Gemini logic. |

### ChatboxConfig Fields
| Field | Type | Description |
| :--- | :--- | :--- |
| `primaryColor` | `string` | Hex color used for buttons, user bubbles, and accents. |
| `botName` | `string` | The display name shown in the chat header. |
| `welcomeMessage` | `string` | The initial message sent by the bot. |
| `placeholder` | `string` | Text displayed in the input field when empty. |
| `avatarUrl` | `string` | URL for the bot icon. |
| `quickReplies` | `string[]` | Buttons that appear below the welcome message for one-tap answers. |

---

## 📄 License
MIT