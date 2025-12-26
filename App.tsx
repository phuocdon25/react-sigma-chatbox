
import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox';
import { ChatboxConfig, Product } from './types';
import './style.css';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#6366f1',
    botName: 'Sigma Expert AI',
    welcomeMessage: 'Chào bạn! Thử gõ "iphone" để xem danh sách sản phẩm hoặc hỏi bất cứ điều gì khác.',
    placeholder: 'Nhập câu hỏi của bạn...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Tư vấn iPhone 15', 'Giảm giá hôm nay', 'Kể chuyện vui'],
    renderMarkdown: true // Bật tính năng render Markdown
  };

  /**
   * HÀM GIẢ LẬP (MOCK AI HANDLER)
   */
  const handleAiInteraction = async function* (userInput: string) {
    const query = userInput.toLowerCase();

    // 1. Giả lập trả về Sản phẩm
    if (query.includes('iphone')) {
      const mockProducts: Product[] = [
        {
          id: 'ip15',
          name: 'iPhone 15 Pro Max 256GB',
          price: '29.490.000₫',
          discount: '-15%',
          image: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/13/638302096701832135_iphone-15-pro-max-gold-1.jpg',
          description: 'Khung viền Titan siêu bền.'
        }
      ];
      
      return {
        text: "Dạ, đây là các dòng **iPhone** đang có giá tốt nhất ạ:",
        products: mockProducts
      };
    }

    // 2. Giả lập hiệu ứng gõ chữ (Streaming) với Markdown
    const chunks = [
      "Chào bạn, tôi là **Sigma AI**. ",
      "\n\nTôi có thể giúp bạn:",
      "\n* Tìm kiếm sản phẩm công nghệ.",
      "\n* Tư vấn cấu hình máy tính.",
      "\n* Cung cấp mã giảm giá mới nhất.",
      "\n\nBạn cần hỗ trợ gì thêm không ạ?"
    ];

    for (const text of chunks) {
      await new Promise(r => setTimeout(r, 300));
      yield text;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
          React Sigma <span className="text-indigo-600">Chatbox</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Demo thư viện UI Chatbox hỗ trợ **Markdown** và **Streaming**.
        </p>
      </div>

      <Chatbox 
        config={config} 
        onGetAiResponse={handleAiInteraction as any} 
      />
    </div>
  );
};

export default App;
