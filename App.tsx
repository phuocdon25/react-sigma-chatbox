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
    quickReplies: ['Tư vấn iPhone 15', 'Giảm giá hôm nay', 'Kể chuyện vui']
  };

  /**
   * HÀM GIẢ LẬP (MOCK AI HANDLER)
   * Bạn có thể copy logic này sang dự án khác và thay thế bằng gọi API thật.
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
        },
        {
          id: 'ip15plus',
          name: 'iPhone 15 Plus 128GB',
          price: '22.990.000₫',
          image: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/13/638302143093902342_iphone-15-plus-pink-1.jpg',
          description: 'Pin bền bỉ nhất dòng iPhone.'
        }
      ];
      
      // Để hiện sản phẩm, ta return về một Object thay vì dùng yield
      return {
        text: "Dạ, đây là các dòng iPhone đang có giá tốt nhất ạ:",
        products: mockProducts
      };
    }

    // 2. Giả lập hiệu ứng gõ chữ (Streaming)
    const sentences = [
      "Chào bạn, ",
      "tôi là hệ thống AI giả lập. ",
      "Hàm này đang dùng 'AsyncGenerator' để tạo hiệu ứng gõ chữ từng chữ một. ",
      "Bạn có thể kết nối Gemini API thật vào đây cực kỳ dễ dàng!"
    ];

    for (const text of sentences) {
      await new Promise(r => setTimeout(r, 400)); // Chờ 400ms giả vờ đang suy nghĩ
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
          Demo thư viện UI Chatbox. Hãy xem <strong>README.md</strong> để biết cách viết AI Service cho dự án của bạn.
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