# React Sigma Chatbox

A premium, UI-only React library for building professional AI chat interfaces. Decouple your frontend from your backend logic with a powerful callback-driven architecture.

---

## 📖 Detailed Integration Guide

The `onGetAiResponse` prop is the heart of this library. It gives you full control over how the bot responds.

### 1. Response Types

Your handler can return three types of data:

#### A. Simple Text (Promise)
Ideal for quick, one-off answers.
```tsx
const handler = async (userInput) => {
  return "This is a direct answer.";
};
```

#### B. Rich Data with Products (Object)
Use this to display the built-in product carousel.
```tsx
const handler = async (userInput) => {
  return {
    text: "Check out these deals:",
    products: [
      { id: '1', name: 'Product A', price: '100$', image: '...' }
    ]
  };
};
```

#### C. Streaming Text (Async Generator)
Simulate an "AI Typing" effect. Perfect for LLMs like GPT or Gemini.
```tsx
const handler = async function* (userInput) {
  const words = ["Hello", " world", " from", " Sigma!"];
  for (const word of words) {
    await delay(100);
    yield word; // Each yield updates the UI in real-time
  }
};
```

### 2. Using Conversation History
The second argument of the handler provides the full history of the current session.
```tsx
const handler = async (userInput, history) => {
  console.log(`User sent ${history.length} messages so far.`);
  return `You just said: ${userInput}`;
};
```

### 3. Real Backend Integration Example
```tsx
const handleWithBackend = async function* (text) {
  const response = await fetch('/api/chat', { 
    method: 'POST', 
    body: JSON.stringify({ prompt: text }) 
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value);
  }
};
```

---

## 🎨 Configuration Options

| Prop | Type | Description |
|------|------|-------------|
| `primaryColor` | `string` | Colors for buttons, user bubbles, and borders. |
| `botName` | `string` | Display name in the header. |
| `welcomeMessage` | `string` | The very first message shown to the user. |
| `avatarUrl` | `string` | Bot image in the header and bubbles. |
| `quickReplies` | `string[]` | Array of strings for suggestion chips. |

---

## 📦 Distribution
To build the library for production:
1. `npm run build`
2. The `dist/` folder will contain `index.mjs` and `style.css`.
3. In your main project: `import 'react-sigma-chatbox/dist/style.css'`.

## License
MIT