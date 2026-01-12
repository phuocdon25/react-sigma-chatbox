import React from 'react';
import { Chatbox } from './components/Chatbox/Chatbox';
import { ChatboxConfig, Language } from './types';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#6366f1',
    botName: 'Sigma Assistant',
    // Cấu hình đa ngôn ngữ cho Welcome Message
    welcomeMessage: {
      vi: 'Chào bạn! Tôi là trợ lý AI Sigma. Bạn cần tôi hỗ trợ gì hôm nay?',
      en: 'Hello! I am Sigma AI Assistant. How can I help you today?',
      ja: 'こんにちは！シグマAIアシスタントです。今日はどのようなお手伝いができますか？'
    },
    // Cấu hình đa ngôn ngữ cho Placeholder
    placeholder: {
      vi: 'Nhập tin nhắn để bắt đầu chat...',
      en: 'Type a message to start chatting...',
      ja: 'メッセージを入力してください...'
    },
    avatarUrl: 'https://fptshop.com.vn/img/bitu/bitu-avatar.png',
    // Cấu hình đa ngôn ngữ cho Quick Replies
    quickReplies: {
      vi: ['Giá iPhone 15', 'Khuyến mãi hot', 'Chính sách bảo hành'],
      en: ['iPhone 15 Price', 'Hot deals', 'Warranty policy'],
      ja: ['iPhone 15の価格', 'お得な情報', '保証ポリシー']
    },
    renderMarkdown: true 
  };

  const handleAiResponse = async (userInput: string, threadId: string, language: Language) => {
    await new Promise(r => setTimeout(r, 1000));
    
    // Giả lập logic so sánh iPhone cho thấy Markdown Table hoạt động
    if (userInput.toLowerCase().includes('iphone')) {
        return `I'd be happy to compare the iPhone 11 Pro Max and the iPhone 12 Pro Max!

| Specification | iPhone 11 Pro Max | iPhone 12 Pro Max |
|---|---|---|
| **Price** | $250.00 | $352.00 |
| **RAM** | 4 GB | 6 GB |
| **Chip** | A13 Bionic | A14 Bionic |
| **Screen** | 6.5" OLED | 6.7" OLED |

Hope this helps!`;
    }

    const responses = {
      en: `Selected Language: **English**. You said: "${userInput}"`,
      vi: `Ngôn ngữ đang chọn: **Tiếng Việt**. Bạn vừa nói: "${userInput}"`,
      ja: `選択された言語: **日本語**。入力: "${userInput}"`
    };

    return responses[language] || responses.en;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="max-w-3xl w-full text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Sigma <span className="text-indigo-600">Chatbox</span> UI
        </h1>
        <p className="text-slate-500 text-lg">
          Hỗ trợ đa ngôn ngữ động cho Placeholder, Quick Replies & Welcome Message.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full text-center">
        <p className="text-slate-600 mb-6 font-medium font-sans">Thử chuyển đổi ngôn ngữ trong chatbox để thấy sự thay đổi của UI.</p>
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-language text-indigo-500"></i>
            Dynamic UI Translation
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <i className="fa-solid fa-table text-blue-500"></i>
            Robust Table Support
          </div>
        </div>
      </div>
      
      <Chatbox 
        config={config} 
        onGetAiResponse={handleAiResponse} 
      />
    </div>
  );
};

export default App;