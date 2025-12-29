
import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox.tsx';
import { ChatboxConfig } from './types.ts';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#ef4444',
    botName: 'Sigma Expert AI',
    welcomeMessage: 'Chào bạn! Tôi là trợ lý AI Sigma. Bạn cần tôi hỗ trợ gì hôm nay?',
    placeholder: 'Nhập tin nhắn để bắt đầu chat...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Giá iPhone 15', 'Khuyến mãi hot', 'Chính sách bảo hành'],
    renderMarkdown: true 
  };

  /**
   * handleAiResponse đơn giản: Trả về một chuỗi text mẫu sau 1 giây.
   */
  const handleAiResponse = async (userInput: string) => {
    await new Promise(r => setTimeout(r, 1000));
    return `Cảm ơn bạn đã quan tâm! Đây là câu trả lời mẫu cho nội dung: "**${userInput}**". Thư viện Sigma Chatbox hỗ trợ đầy đủ Markdown và Product Carousel.`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="max-w-3xl w-full text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Sigma <span className="text-red-500">Chatbox</span> UI
        </h1>
        <p className="text-slate-500 text-lg">
          Thư viện chatbox chuẩn React 19, tối ưu hiệu suất và thẩm mỹ.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full text-center">
        <p className="text-slate-600 mb-6 font-medium">Nhấn vào icon chat ở góc phải màn hình để bắt đầu trải nghiệm.</p>
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-bolt text-yellow-500"></i>
            Fast Performance
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-layer-group text-blue-500"></i>
            Customizable
          </div>
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
