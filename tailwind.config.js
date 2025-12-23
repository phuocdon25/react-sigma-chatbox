
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./index.tsx",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#ef4444',
        }
      },
      animation: {
        'chat-pop': 'chat-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'msg': 'msg-fade-in 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}
