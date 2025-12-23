
import React, { useState, useEffect, useRef } from 'react';
import { ChatboxConfig, Message, MessageType, SenderType, AiResponseHandler } from '../../types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { FloatingButton } from './FloatingButton';
import { geminiService } from '../../services/geminiService';

interface ChatboxProps {
  config: ChatboxConfig;
  /**
   * Custom handler to process user messages.
   * If provided, the internal Gemini logic will be bypassed.
   */
  onGetAiResponse?: AiResponseHandler;
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
      const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
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

    // 1. Add User Message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: MessageType.TEXT,
      sender: SenderType.USER,
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    
    // 2. Prepare AI Placeholder
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
      // 3. Determine which handler to use
      if (onGetAiResponse) {
        const response = await onGetAiResponse(text, messages);
        
        // Handle Async Generator (Streaming)
        if (typeof response !== 'string' && Symbol.asyncIterator in (response as any)) {
          let fullContent = '';
          let isFirstChunk = true;

          for await (const chunk of (response as AsyncGenerator<string>)) {
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
        } 
        // Handle Simple Object or String (Direct Response)
        else {
          setIsLoading(false);
          const finalResult = typeof response === 'string' ? { text: response } : response;
          const finalAiMsg: Message = {
            ...initialAiMsg,
            content: (finalResult as any).text,
            products: (finalResult as any).products,
            type: (finalResult as any).products ? MessageType.PRODUCT_LIST : MessageType.TEXT
          };
          setMessages(prev => [...prev, finalAiMsg]);
        }
      } 
      else {
        // Fallback to internal Gemini Service
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
      }
    } catch (err) {
      console.error("Chat Processing Error:", err);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        type: MessageType.TEXT,
        sender: SenderType.AI,
        content: "Error processing message. Please try again.",
        timestamp: new Date()
      }]);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
          if (isOpen) setIsExpanded(false);
        }} 
        primaryColor={config.primaryColor} 
      />

      {isOpen && (
        <div className={chatContainerClasses}>
          <ChatHeader 
            title={config.botName} 
            primaryColor={config.primaryColor} 
            onClose={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
            onReset={() => setMessages([{
              id: 'welcome',
              type: MessageType.TEXT,
              sender: SenderType.AI,
              content: config.welcomeMessage,
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
               Powered by Sigma AI Core
            </div>
          </div>
        </div>
      )}
    </>
  );
};
