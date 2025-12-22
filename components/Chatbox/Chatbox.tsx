
import React, { useState, useEffect, useRef } from 'react';
import { ChatboxConfig, Message, MessageType, SenderType } from '../../types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { FloatingButton } from './FloatingButton';
import { geminiService } from '../../services/geminiService';

interface ChatboxProps {
  config: ChatboxConfig;
}

export const Chatbox: React.FC<ChatboxProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: MessageType.TEXT,
      sender: SenderType.AI,
      content: 'Chào bạn, mình là trợ lý AI của FPTShop!\nBạn cần hỗ trợ gì hoặc có thể chọn một trong các chủ đề dưới đây nhé\nTrong quá trình tư vấn, nếu chưa hài lòng với câu trả lời của Bitu, bạn vui lòng chat "Tôi muốn gặp tư vấn viên" để được hỗ trợ.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống khi có tin nhắn mới hoặc nội dung tin nhắn đang stream thay đổi
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
      // Chỉ cuộn nếu người dùng đang ở gần đáy hoặc tin nhắn mới vừa được thêm
      const isNearBottom = scrollHeight - clientHeight - scrollTop < 150;
      if (isNearBottom || isLoading) {
        scrollRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'auto'
        });
      }
    }
  }, [messages, isOpen, isLoading, isExpanded]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: MessageType.TEXT,
      sender: SenderType.USER,
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    
    const aiMsgId = `ai-${Date.now()}`;
    const initialAiMsg: Message = {
      id: aiMsgId,
      type: MessageType.TEXT,
      sender: SenderType.AI,
      content: '',
      timestamp: new Date()
    };
    
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter(m => m.type === MessageType.TEXT)
        .map(m => ({
          role: m.sender === SenderType.USER ? 'user' : 'model',
          text: m.content
        }));

      const stream = geminiService.getChatResponseStream(text, chatHistory);
      
      let fullContent = '';
      let isFirstChunk = true;

      for await (const chunk of stream) {
        if (isFirstChunk) {
          setMessages(prev => [...prev, initialAiMsg]);
          setIsLoading(false);
          isFirstChunk = false;
        }

        fullContent += chunk;
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, content: fullContent } : msg
        ));
      }
    } catch (err) {
      console.error("Chat Stream Error:", err);
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Xác định các lớp CSS dựa trên trạng thái isOpen và isExpanded
  const chatContainerClasses = `
    fixed z-[99] overflow-hidden flex flex-col transition-all duration-300 ease-in-out border border-white/40 shadow-[0_15px_50px_rgba(0,0,0,0.12)] bg-[#fff1f2] animate-chat-pop
    ${isExpanded 
      ? 'bottom-4 right-4 md:right-4 w-[95vw] md:w-[850px] h-[92vh] md:h-[85vh] rounded-[32px]' 
      : 'bottom-6 right-4 md:right-[72px] w-[92vw] md:w-[360px] h-[75vh] md:h-[600px] rounded-[28px]'
    }
  `;

  return (
    <>
      <FloatingButton 
        isOpen={isOpen} 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setIsExpanded(false); // Thu nhỏ lại khi đóng
        }} 
        primaryColor={config.primaryColor} 
      />

      {isOpen && (
        <div className={chatContainerClasses}>
          <ChatHeader 
            title="Trợ lý AI - Bitu" 
            primaryColor={config.primaryColor} 
            onClose={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
            onReset={() => setMessages([{
              id: 'welcome',
              type: MessageType.TEXT,
              sender: SenderType.AI,
              content: 'Chào bạn, mình là trợ lý AI của FPTShop!\nBạn cần hỗ trợ gì hoặc có thể chọn một trong các chủ đề dưới đây nhé\nTrong quá trình tư vấn, nếu chưa hài lòng với câu trả lời của Bitu, bạn vui lòng chat "Tôi muốn gặp tư vấn viên" để được hỗ trợ.',
              timestamp: new Date()
            }])}
            onToggleExpand={toggleExpand}
            isExpanded={isExpanded}
          />

          <div 
            className="flex-1 overflow-y-auto chat-scrollbar px-3 pt-2" 
            ref={scrollRef}
          >
             <ChatMessages 
                messages={messages} 
                isLoading={isLoading} 
                quickReplies={config.quickReplies}
                onQuickReply={handleQuickReply}
                primaryColor={config.primaryColor}
              />
          </div>

          <div className="bg-white m-3 rounded-[22px] shadow-sm border border-red-50/30 overflow-hidden">
            <ChatInput 
              placeholder={config.placeholder} 
              onSendMessage={handleSendMessage} 
              primaryColor={config.primaryColor}
            />
            <div className="px-3 pb-2 text-[10px] text-gray-400 text-center tracking-tight leading-none">
               Thông tin được AI hỗ trợ chỉ mang tính chất tham khảo
            </div>
          </div>
        </div>
      )}
    </>
  );
};
