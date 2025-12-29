
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true,
      include: ['components/**', 'services/**', 'types.ts', 'index.tsx']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.tsx'),
      name: 'ReactSigmaChatbox',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@google/genai'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@google/genai': 'GoogleGenAI'
        },
        // Đổi tên file CSS đầu ra thành react-sigma-chatbox.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'react-sigma-chatbox.css';
          return assetInfo.name || 'assets/[name]-[hash][extname]';
        }
      }
    },
    cssCodeSplit: false // Gộp toàn bộ CSS vào 1 file duy nhất
  }
});
