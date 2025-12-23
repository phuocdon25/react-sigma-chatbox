# React Sigma Chatbox ✨

A high-performance, aesthetically pleasing React chatbox library inspired by modern AI assistants (like Bitu). Built with **Tailwind CSS**, it supports rich content like product carousels and smooth AI streaming responses.

---

## ✨ Features

- 🚀 **AI Streaming**: Supports `AsyncGenerator` for real-time "typing" effects.
- 🛍️ **Product Carousel**: Built-in support for rich product cards with horizontal scrolling.
- 🎨 **Tailwind Optimized**: Ultra-lightweight, easy to theme via your existing Tailwind config.
- 📦 **Self-contained**: Uses **internal SVGs** for icons and **CSS keyframes** for animations. No external dependencies like FontAwesome required.

---

## 📦 Installation & Setup

### 1. Integration from NPM
```bash
npm install react-sigma-chatbox
```

### 2. Local Development (Embedding without NPM)
If you are developing locally and want to use this source in another project:

**Option A: Using `npm link` (Best for development)**
1. In this library folder: `npm run build` then `npm link`
2. In your target project: `npm link react-sigma-chatbox`

**Option B: Direct Path Install**
1. In your target project: `npm install ../path-to/react-sigma-chatbox`

### 3. Import CSS (Crucial)
You **must** import the CSS file in your main entry file (e.g., `App.tsx` or `main.tsx`) for animations and icons to work:

```tsx
import { Chatbox } from 'react-sigma-chatbox';
import 'react-sigma-chatbox/dist/style.css'; // Don't forget this!
```

---

## 🎨 Tailwind CSS Configuration
Since this library uses Tailwind utility classes, you must add the library's path to your **target project's** `tailwind.config.js`:

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", // For NPM
    // "../react-sigma-chatbox/components/**/*.{js,ts,jsx,tsx}", // For local link
  ],
  theme: {
    extend: {
      // Standard animations (chat-pop, msg-fade-in) are already in style.css
    }
  }
}
```

---

## 🚀 Basic Usage

```tsx
import { Chatbox } from 'react-sigma-chatbox';
import 'react-sigma-chatbox/dist/style.css';

const App = () => {
  const config = {
    primaryColor: '#6366f1',
    botName: 'Sigma Assistant',
    welcomeMessage: 'Hello! I am your AI assistant. How can I help you today?',
    quickReplies: ['Check Prices', 'Latest iPhone', 'Tell a story']
  };

  const handleAiResponse = async (input) => {
    return "This is a simple text response.";
  };

  return <Chatbox config={config} onGetAiResponse={handleAiResponse} />;
};
```

---

## 🛠️ Advanced: AI Response Patterns

The `onGetAiResponse` prop is highly flexible. You can implement two main patterns:

### Pattern A: Product Carousel (Promise)
Return an object containing `text` and a `products` array to show product cards.

```tsx
const handleAi = async (userInput) => {
  // Simulate API call
  return {
    text: "Here are some top-rated products for you:",
    products: [
      { 
        id: '1', 
        name: 'iPhone 15 Pro', 
        price: '24.990.000₫', 
        image: 'https://picsum.photos/200/200', 
        description: 'Titanium design' 
      },
      // ... more products
    ]
  };
};
```

### Pattern B: AI Streaming (Async Generator)
Use `async function*` to yield text chunks for a "live typing" experience.

```tsx
async function* handleAiStream(userInput) {
  const words = ["Thinking...", " Here", " is", " a", " live", " response", " for", " you."];
  for (const word of words) {
    await new Promise(r => setTimeout(r, 100)); // Simulate delay
    yield word;
  }
}
```

---

## 📖 API Reference

### Chatbox Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `config` | `ChatboxConfig` | Object defining visual behavior. |
| `onGetAiResponse` | `AiResponseHandler` | Function to process input. Bypasses internal Gemini if provided. |

### ChatboxConfig
| Property | Type | Default |
| :--- | :--- | :--- |
| `primaryColor` | `string` | `#ef4444` |
| `botName` | `string` | `Sigma AI` |
| `welcomeMessage`| `string` | (Required) Initial greeting. |
| `placeholder` | `string` | `Ask me anything...` |
| `quickReplies` | `string[]` | `[]` |

---

## ⚠️ Troubleshooting

- **Missing Icons/Animations**: Ensure you imported `dist/style.css` and added the library path to your `tailwind.config.js` `content` array.
- **Hook Errors**: If you get "Invalid hook call", it usually means you have duplicate React versions. Use `npm link ../your-project/node_modules/react` in the library folder to fix it.

---

## 📄 License
MIT © [Your Name]
