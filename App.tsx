
import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox.tsx';
import { ChatboxConfig } from './types.ts';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#ef4444',
    botName: 'Sigma Expert AI',
    welcomeMessage: 'Chào bạn! Tôi là trợ lý AI Sigma. Thử gõ "iphone" để xem demo sản phẩm nhé!',
    placeholder: 'Nhập tin nhắn để bắt đầu chat...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Giá iPhone 15 Pro Max', 'Khuyến mãi tháng này', 'So sánh Laptop Gaming'],
    renderMarkdown: true 
  };

  const handleAiResponse = async function* (userInput: string) {
    const query = userInput.toLowerCase();

    if (query.includes('iphone') || query.includes('giá')) {
      return {
        text: "Dạ, Sigma AI xin gửi bạn bảng giá tham khảo các dòng **iPhone** mới nhất ạ:",
        products: [
          {
            id: 'ip15pm',
            name: 'iPhone 15 Pro Max 256GB Titanium',
            price: '29.990.000₫',
            oldPrice: '34.990.000₫',
            discount: '-14%',
            image: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/13/638302096701832135_iphone-15-pro-max-gold-1.jpg',
            description: 'Khung viền Titan siêu bền.'
          },
          {
            id: 'ip15p',
            name: 'iPhone 15 Pro 128GB',
            price: '24.590.000₫',
            oldPrice: '28.990.000₫',
            discount: '-15%',
            image: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/13/638302143431057476_iphone-15-pro-black-1.jpg',
            description: 'Chip A17 Pro mạnh mẽ.'
          }
        ]
      };
    }

    const responseText = "Cảm ơn bạn đã quan tâm. Sigma AI đang xử lý yêu cầu của bạn. Tôi có thể hỗ trợ bạn tìm sản phẩm hoặc tra cứu khuyến mãi nhanh chóng.";
    const words = responseText.split(' ');
    
    for (const word of words) {
      await new Promise(r => setTimeout(r, 60));
      yield word + ' ';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="max-w-3xl w-full text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Sigma <span className="text-red-500">Chatbox</span> UI
        </h1>
        <p className="text-slate-500 text-lg">
          Thư viện chatbox chuẩn React 19, hỗ trợ Markdown và Product Carousel.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full text-center">
        <p className="text-slate-600 mb-6 font-medium">Nhấn vào icon chat ở góc phải màn hình để bắt đầu.</p>
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-bolt text-yellow-500"></i>
            Fast Performance
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-layer-group text-blue-500"></i>
            Easy Integration
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
