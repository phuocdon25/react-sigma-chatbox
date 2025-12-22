# React Sigma Chatbox

A high-performance, beautiful, and customizable React chatbox library. This library features a modern UI, product carousel rendering, quick reply support, and built-in Google Gemini AI integration.

[![npm version](https://img.shields.io/npm/v/react-sigma-chatbox.svg)](https://www.npmjs.com/package/react-sigma-chatbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- ✨ **Modern UI/UX**: Clean design with smooth animations.
- 🔍 **Zoom/Expand Mode**: Supports full-screen expansion for better readability.
- 🤖 **AI Powered**: Seamless integration with Google Gemini API for real-time streaming responses.
- 📦 **Product Carousel**: Built-in support for displaying product lists with action buttons.
- ⚡ **Quick Replies**: Configurable suggestion chips for faster user interaction.
- 📱 **Fully Responsive**: Optimized for both mobile and desktop screens.
- 🎨 **Tailwind CSS Powered**: Easy to theme and customize.

---

## Installation

Install the package via npm:

```bash
npm install react-sigma-chatbox @google/genai
```

---

## Critical Styling Setup

Since this library uses **Tailwind CSS**, you must add the library's components to your `tailwind.config.js` to ensure the styles are generated in your main project:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-sigma-chatbox/**/*.{js,ts,jsx,tsx}", // <--- CRITICAL: Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Quick Start

1. Set up your **Google Gemini API Key** in your environment variables:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```

2. Use the component in your App:

```tsx
import { Chatbox, ChatboxConfig } from 'react-sigma-chatbox';

const config: ChatboxConfig = {
  primaryColor: '#6366f1',
  botName: 'Sigma AI',
  welcomeMessage: 'Hi! I am Sigma. How can I assist you today?',
  placeholder: 'Ask me anything...',
  avatarUrl: 'https://picsum.photos/seed/sigma/100/100',
  quickReplies: ['Features', 'Pricing', 'Integration']
};

function App() {
  return <Chatbox config={config} />;
}
```

---

## Local Development & Testing

If you want to test this library locally in another React project before publishing to npm:

### 1. In the Library Folder (`react-sigma-chatbox`)
First, build the project to generate the production files:
```bash
npm install
npm run build
npm link
```

### 2. In your Consumer Project (The App you want to embed in)
Link the library to your local project:
```bash
npm link react-sigma-chatbox
```

*Note: After linking, remember to update your `tailwind.config.js` as mentioned in the [Styling Setup](#critical-styling-setup) section.*

### 3. To Unlink
When you are done testing:
- In consumer project: `npm unlink react-sigma-chatbox`
- In library folder: `npm unlink`

---

## Configuration Options (`ChatboxConfig`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `primaryColor` | `string` | Brand color used for icons, buttons, and user bubbles. |
| `botName` | `string` | Name of the AI assistant. |
| `welcomeMessage` | `string` | Initial greeting message. |
| `placeholder` | `string` | Text in the input field. |
| `avatarUrl` | `string` | Bot profile picture URL. |
| `quickReplies` | `string[]` | List of suggestions to show on start. |

---

## License

MIT © [Your Name]
