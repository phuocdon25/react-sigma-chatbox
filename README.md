# React Sigma Chatbox

A high-performance, aesthetically pleasing React chatbox library inspired by modern AI assistants (like Bitu). Built with **Tailwind CSS**, it supports rich content like product carousels and smooth AI streaming responses.

## ✨ Features

- 🚀 **AI Streaming**: Supports `AsyncGenerator` for real-time typing effects.
- 🛍️ **Product Carousel**: Built-in support for rich product cards and horizontal scrolling.
- 🎨 **Tailwind Optimized**: Lightweight and easy to theme via your existing Tailwind config.
- 📱 **Fully Responsive**: Adapts perfectly to mobile and desktop with an expandable view.
- 🛠️ **Customizable**: Control colors, avatars, initial messages, and quick replies.

---

## 📦 Installation & Setup

### 1. Integration from NPM
Install the package via npm or yarn:
```bash
npm install react-sigma-chatbox
```

### 2. Local Integration (Embedding without NPM)
If you want to use this source code in another local project without publishing:

**Option A: Using `npm link`**
1. In the library folder: `npm run build` then `npm link`
2. In your target project: `npm link react-sigma-chatbox`

**Option B: Direct Path Install**
1. In your target project: `npm install ../path-to/react-sigma-chatbox`

---

## 🎨 Tailwind CSS Configuration (Required)
Since this library uses Tailwind utility classes, you must add the library's path to your **target project's** `tailwind.config.js` so it can scan the classes:

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", // Important!
  ],
  theme: {
    extend: {
      keyframes: {
        'chat-pop': {
          '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'msg-fade-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'chat-pop': 'chat-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'msg': 'msg-fade-in 0.3s ease-out forwards',
      }
    },
  },
}
```

---

## 🚀 Basic Usage

```tsx
import { Chatbox } from 'react-sigma-chatbox';

const App = () => {
  const config = {
    primaryColor: '#2563eb',
    botName: 'Sigma Assistant',
    welcomeMessage: 'Hello! How can I help you today?',
    avatarUrl: 'https://path-to-avatar.png',
    quickReplies: ['Check Prices', 'Contact Support']
  };

  const handleAi = async (input) => {
    return "This is a simple response.";
  };

  return <Chatbox config={config} onGetAiResponse={handleAi} />;
};
```

---

## 🛠️ Advanced: AI Response Handling

The `onGetAiResponse` prop is highly flexible. It supports two main patterns:

### Pattern A: Product Carousel (Promise)
Return an object containing `text` and a `products` array.

```tsx
const handleAi = async (input) => {
  return {
    text: "Check out our best sellers:",
    products: [
      { id: '1', name: 'Product A', price: '100$', image: '...', description: '...' }
    ]
  };
};
```

### Pattern B: AI Streaming (Async Generator)
Yield chunks of text to create a "live typing" effect.

```tsx
async function* handleAiStream(input) {
  const words = ["Thinking...", " Here", " is", " your", " answer."];
  for (const word of words) {
    await new Promise(r => setTimeout(r, 100));
    yield word;
  }
}
```

---

## 📖 API Reference

### Chatbox Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `config` | `ChatboxConfig` | Object defining the appearance and behavior. |
| `onGetAiResponse` | `AiResponseHandler` | Function to process messages. Bypasses internal Gemini if provided. |

### ChatboxConfig
| Property | Type | Default |
| :--- | :--- | :--- |
| `primaryColor` | `string` | `#ef4444` |
| `botName` | `string` | `Sigma AI` |
| `welcomeMessage`| `string` | Required |
| `placeholder` | `string` | `Ask me anything...` |
| `avatarUrl` | `string` | Optional |
| `quickReplies` | `string[]` | `[]` |

---

## 📄 License
MIT © [Your Name]
