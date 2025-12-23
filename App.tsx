import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox';
import { ChatboxConfig, Message } from './types';
import './style.css'; // File CSS gốc cho môi trường dev

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#6366f1',
    botName: 'Sigma Tailwind AI',
    welcomeMessage: 'Chào bạn! Tôi là trợ lý Sigma. Bạn có thể hỏi tôi về các sản phẩm công nghệ hoặc yêu cầu kể chuyện.',
    placeholder: 'Nhập câu hỏi...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Điện thoại iPhone', 'Laptop mới', 'Kể chuyện AI']
  };

  const handleAiResponse = async function* (userInput: string) {
    const query = userInput.toLowerCase();
    if (query.includes('điện thoại')) {
      return {
        text: "Gợi ý cho bạn:",
        products: [{ id: '1', name: 'iPhone 15', price: '24tr', image: 'https://picsum.photos/200/200', description: 'Mới nhất' }]
      };
    }
    yield "Tôi đang xử lý câu hỏi của bạn...";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-[40px] p-12 shadow-2xl border border-white/50">
        <h1 className="text-6xl font-black mb-6 tracking-tight">
          Sigma <span className="text-indigo-600">UI Kit</span>
        </h1>
        <p className="text-lg text-slate-500 mb-10">
          Môi trường kiểm thử thư viện Chatbox.
        </p>
      </div>

      <Chatbox 
        config={config} 
        onGetAiResponse={handleAiResponse as any} 
      />
    </div>
  );
};

export default App;