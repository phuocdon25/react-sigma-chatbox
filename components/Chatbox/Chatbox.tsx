import React, { useState, useEffect, useRef } from 'react';
import { ChatboxConfig, Message, MessageType, SenderType, AiResponseHandler, Product } from '../../types.ts';
import { ChatHeader } from './ChatHeader.tsx';
import { ChatMessages } from './ChatMessages.tsx';
import { ChatInput } from './ChatInput.tsx';
import { FloatingButton } from './FloatingButton.tsx';

interface ChatboxProps {
  config: ChatboxConfig;
  onGetAiResponse: AiResponseHandler; // Bắt buộc để library hoạt động
}

export const Chatbox: React.FC<ChatboxProps> = ({ config, onGetAiResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: MessageType.TEXT,
      sender: SenderType.AI,
      content: config.welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: MessageType.TEXT,
      sender: SenderType.USER,
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const aiMsgId = `ai-${Date.now()}`;
    const initialAiMsg: Message = {
      id: aiMsgId,
      type: MessageType.TEXT,
      sender: SenderType.AI,
      content: '',
      timestamp: new Date()
    };

    try {
      const responseResult = onGetAiResponse(text, messages);
      
      // Xử lý Streaming (Async Generator)
      if (responseResult && typeof responseResult === 'object' && Symbol.asyncIterator in responseResult) {
        let fullContent = '';
        let hasStarted = false;

        for await (const chunk of (responseResult as AsyncGenerator<string>)) {
          if (!hasStarted) {
            setMessages(prev => [...prev, initialAiMsg]);
            setIsLoading(false);
            hasStarted = true;
          }
          fullContent += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, content: fullContent } : msg
          ));
        }
      } 
      // Xử lý Promise (Static Response)
      else {
        // Fix: Explicitly narrow the response type after await to resolve TS property access errors
        const response = await responseResult;
        setIsLoading(false);
        
        const finalData = typeof response === 'string' 
          ? { text: response, products: undefined } 
          : (response as { text: string; products?: Product[] });
          
        const finalAiMsg: Message = {
          ...initialAiMsg,
          content: finalData.text,
          products: finalData.products,
          type: finalData.products ? MessageType.PRODUCT_LIST : MessageType.TEXT
        };
        setMessages(prev => [...prev, finalAiMsg]);
      }
    } catch (err) {
      console.error("Chatbox Logic Error:", err);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        type: MessageType.TEXT,
        sender: SenderType.AI,
        content: "Hệ thống đang bận, vui lòng thử lại sau giây lát.",
        timestamp: new Date()
      }]);
    }
  };

  const handleQuickReply = (reply: string) => handleSendMessage(reply);

  const chatClasses = `
    fixed z-[99] overflow-hidden flex flex-col transition-all duration-300 ease-in-out border border-white/40 shadow-2xl bg-white animate-chat-pop
    ${isExpanded 
      ? 'bottom-0 right-0 w-full h-full md:bottom-6 md:right-28 md:w-[850px] md:h-[85vh] rounded-none md:rounded-[32px]' 
      : 'bottom-0 right-0 w-full h-[80vh] md:bottom-6 md:right-28 md:w-[380px] md:h-[580px] rounded-t-[28px] md:rounded-[28px]'
    }
  `;

  return (
    <>
      <FloatingButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
        primaryColor={config.primaryColor}
        className={isOpen ? 'hidden md:flex' : 'flex'}
      />

      {isOpen && (
        <div className={chatClasses}>
          <ChatHeader 
            title={config.botName} 
            primaryColor={config.primaryColor} 
            onClose={() => setIsOpen(false)}
            onReset={() => setMessages([{
              id: 'welcome',
              type: MessageType.TEXT,
              sender: SenderType.AI,
              content: config.welcomeMessage,
              timestamp: new Date()
            }])}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          />

          <div 
            className="flex-1 overflow-y-auto chat-scrollbar px-5 py-5 bg-slate-50/30" 
            ref={scrollRef}
          >
             <ChatMessages 
                messages={messages} 
                isLoading={isLoading} 
                quickReplies={config.quickReplies}
                onQuickReply={handleQuickReply}
                primaryColor={config.primaryColor}
                renderMarkdown={config.renderMarkdown}
              />
          </div>

          <div className="bg-white p-3 border-t border-slate-100">
            <ChatInput 
              placeholder={config.placeholder} 
              onSendMessage={handleSendMessage} 
              primaryColor={config.primaryColor}
            />
          </div>
        </div>
      )}
    </>
  );
};