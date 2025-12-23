
import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox'; // Sử dụng đường dẫn tương đối
import { ChatboxConfig, Message, Product } from './types';
import './style.css'; // Import file CSS cục bộ trong dự án dev

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#6366f1',
    botName: 'Sigma Tailwind AI',
    welcomeMessage: 'Chào bạn! Tôi là trợ lý Sigma. Bạn có thể hỏi tôi về các sản phẩm công nghệ hoặc yêu cầu kể chuyện.',
    placeholder: 'Nhập câu hỏi...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Điện thoại iPhone', 'Laptop mới', 'Kể chuyện AI']
  };

  const handleAiResponse = async function* (userInput: string, history: Message[]) {
    const query = userInput.toLowerCase();

    if (query.includes('điện thoại') || query.includes('iphone')) {
      await new Promise(r => setTimeout(r, 800));
      return {
        text: "Gợi ý các mẫu iPhone đang bán chạy:",
        products: [
          { 
            id: '1', name: 'iPhone 15 Pro', price: '24.990.000₫', 
            image: 'https://picsum.photos/seed/ip15/200/200', description: 'Chip A17 Pro' 
          },
          { 
            id: '2', name: 'iPhone 14', price: '16.500.000₫', 
            image: 'https://picsum.photos/seed/ip14/200/200', description: 'Giá hời' 
          }
        ]
      };
    }

    if (query.includes('chuyện')) {
      const chunks = ["Xưa ", "có ", "một ", "con ", "robot ", "biết ", "chat..."];
      for (const chunk of chunks) {
        await new Promise(r => setTimeout(r, 100));
        yield chunk;
      }
      return;
    }

    return `Bạn vừa nói: "${userInput}". Tôi là AI được tối ưu bởi Tailwind CSS!`;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="max-w-3xl w-full bg-white rounded-[40px] p-12 shadow-2xl border border-white/50">
        <div className="mb-8 inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest">
          Tailwind Optimized
        </div>
        <h1 className="text-6xl font-black mb-6 tracking-tight">
          Sigma <span className="text-indigo-600">UI Kit</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-10">
          Đây là môi trường thử nghiệm. Toàn bộ CSS của Chatbox được quản lý bởi 
          <code className="bg-slate-100 px-2 py-1 rounded mx-1 text-indigo-500 font-mono">tailwind.config.js</code>.
        </p>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-slate-600 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all">
            Documentation
          </button>
        </div>
      </div>

      <Chatbox 
        config={config} 
        onGetAiResponse={handleAiResponse as any} 
      />
    </div>
  );
};

export default App;
