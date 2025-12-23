
import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox';
import { ChatboxConfig, Message, Product, MessageType } from './types';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#ef4444',
    botName: 'Sigma Expert',
    welcomeMessage: 'Chào bạn! Tôi là trợ lý Sigma. Thử nhập "điện thoại" để xem sản phẩm hoặc "kể chuyện" để xem streaming nhé!',
    placeholder: 'Nhập nội dung cần hỗ trợ...',
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    quickReplies: ['Điện thoại iPhone', 'Chính sách bảo hành', 'Kể một câu chuyện']
  };

  /**
   * CHI TIẾT CÁCH XỬ LÝ PHẢN HỒI (onGetAiResponse)
   * Bạn có thể trả về:
   * 1. Một chuỗi (String) - Phản hồi ngay lập tức
   * 2. Một Object { text, products } - Phản hồi kèm sản phẩm
   * 3. Một Async Generator (yield) - Phản hồi dạng streaming chữ chạy
   */
  const handleAiLogic = async function* (userInput: string, history: Message[]) {
    const query = userInput.toLowerCase();

    // TRƯỜNG HỢP 1: Trả về Sản phẩm (Rich Object)
    if (query.includes('điện thoại') || query.includes('iphone')) {
      // Giả lập gọi API mất 1s
      await new Promise(r => setTimeout(r, 1000));
      
      const products: Product[] = [
        { 
          id: 'p1', 
          name: 'iPhone 15 Pro Max 256GB', 
          price: '29.990.000đ', 
          oldPrice: '34.990.000đ',
          discount: '-14%',
          image: 'https://picsum.photos/seed/p1/200/200', 
          description: 'Siêu phẩm Titan' 
        },
        { 
          id: 'p2', 
          name: 'Samsung Galaxy S24 Ultra', 
          price: '26.500.000đ', 
          image: 'https://picsum.photos/seed/p2/200/200', 
          description: 'Quyền năng AI' 
        }
      ];

      return {
        text: "Dưới đây là các mẫu điện thoại hot nhất tuần này:",
        products: products
      };
    }

    // TRƯỜNG HỢP 2: Trả về Streaming (Async Generator)
    if (query.includes('kể chuyện') || query.includes('story')) {
      const story = [
        "Ngày xửa ngày xưa, ",
        "có một thư viện React tên là Sigma Chatbox... ",
        "\n\nNó giúp các lập trình viên ",
        "xây dựng giao diện chat cực nhanh ",
        "chỉ với vài dòng code. ",
        "\n\nCâu chuyện kết thúc ở đây, chúc bạn code vui vẻ!"
      ];

      for (const chunk of story) {
        await new Promise(r => setTimeout(r, 150)); // Giả lập độ trễ streaming
        yield chunk;
      }
      return;
    }

    // TRƯỜNG HỢP 3: Trả về String đơn giản (Dựa trên lịch sử chat)
    if (query.includes('tên gì')) {
      return `Tên tôi là ${config.botName}, tôi đã thấy bạn nhắn ${history.length} tin nhắn trước đó.`;
    }

    // MẶC ĐỊNH: Gọi backend thật của bạn hoặc trả về mặc định
    await new Promise(r => setTimeout(r, 500));
    return "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có muốn xem 'điện thoại' hay nghe 'kể chuyện' không?";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
          Sigma <span className="text-red-500">Integration</span>
        </h1>
        <p className="text-slate-500 leading-relaxed mb-8">
          Đây là ví dụ chi tiết về cách kết nối thư viện với Logic của riêng bạn. 
          Thư viện này giờ đây đóng vai trò là một <strong>UI-Only Engine</strong>, 
          mọi thông tin trả về đều do dự án mẹ quyết định thông qua <code>onGetAiResponse</code>.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h3 className="font-bold text-blue-800">Tips:</h3>
            <ul className="text-sm text-blue-700 list-disc ml-5 mt-1">
              <li>Nhập <b>"điện thoại"</b> để test Carousel sản phẩm.</li>
              <li>Nhập <b>"kể chuyện"</b> để test Streaming AI.</li>
              <li>Sử dụng <code>history</code> để tạo context cho Bot.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tích hợp Chatbox */}
      <Chatbox 
        config={config} 
        onGetAiResponse={handleAiLogic as any} 
      />
    </div>
  );
};

export default App;
