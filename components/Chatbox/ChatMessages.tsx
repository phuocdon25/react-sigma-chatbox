
import React from 'react';
import { Message, MessageType, SenderType } from '../../types';
import { ProductCard } from './ProductCard';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  quickReplies: string[];
  onQuickReply: (reply: string) => void;
  primaryColor: string;
  renderMarkdown?: boolean;
}

/**
 * Xử lý chuỗi văn bản để tìm và chuyển đổi các định dạng nội dòng (Bold, Links) 
 * thành mảng các React Nodes.
 */
const parseInlineMarkdown = (text: string): React.ReactNode[] => {
  // Regex cho Bold (**text**) và Links ([text](url))
  // Kết hợp để tìm theo thứ tự xuất hiện
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    // Xử lý Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <strong key={i} className="font-bold">{content}</strong>;
    }
    
    // Xử lý Link: [text](url)
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const [_, linkText, url] = linkMatch;
      return (
        <a 
          key={i} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline break-all font-medium"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
};

/**
 * Component render Markdown nâng cao hỗ trợ Headings, Lists, Links và Bold.
 */
const MarkdownLite: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="markdown-body">
      {lines.map((line, idx) => {
        const trimmedLine = line.trim();
        
        // 1. Xử lý Headings: #, ##, ###
        const headerMatch = trimmedLine.match(/^(#{1,4})\s+(.*)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const content = headerMatch[2];
          const className = level === 1 ? 'text-lg font-bold mb-2' : 
                            level === 2 ? 'text-md font-bold mb-1.5' : 
                            'text-[14px] font-bold mb-1 text-gray-900';
          return <div key={idx} className={className}>{parseInlineMarkdown(content)}</div>;
        }

        // 2. Xử lý Bullet points: * hoặc - ở đầu dòng
        const bulletMatch = trimmedLine.match(/^[*+-]\s+(.*)$/);
        if (bulletMatch) {
          const content = bulletMatch[1];
          return (
            <div key={idx} className="flex gap-2 pl-1 mb-1">
              <span className="text-gray-400 flex-shrink-0">•</span>
              <div className="flex-1">{parseInlineMarkdown(content)}</div>
            </div>
          );
        }

        // 3. Dòng trống (newline)
        if (trimmedLine === '') {
          return <div key={idx} className="h-2" />;
        }

        // 4. Văn bản bình thường có xử lý inline (Bold, Links)
        return (
          <div key={idx} className="mb-1 leading-relaxed">
            {parseInlineMarkdown(line)}
          </div>
        );
      })}
    </div>
  );
};

export const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isLoading, 
  quickReplies, 
  onQuickReply,
  primaryColor,
  renderMarkdown = false
}) => {
  const botAvatar = "https://fptshop.com.vn/img/bitu/bitu-avatar.png";
  const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

  return (
    <div className="flex flex-col gap-3 pb-2">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-6 text-center animate-msg">
        <div className="relative mb-4">
          <div className="w-24 h-24 flex items-center justify-center">
             <img 
               src={botAvatar} 
               onError={(e) => (e.currentTarget.src = fallbackAvatar)}
               className="w-full h-full object-contain" 
               alt="Sigma AI Hero"
             />
          </div>
        </div>
        <h2 className="text-lg font-bold text-[#1a2b56] flex items-center justify-center gap-1">
          Sigma <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded-md leading-none ml-1 uppercase font-bold tracking-tight">AI</span>
        </h2>
        <div className="text-[13px] text-gray-700 mt-2 leading-snug px-2">
          <p><span className="font-bold">Sigma Assistant</span> hỗ trợ bạn mọi lúc mọi nơi</p>
          <p>Tăng cường hiệu suất với AI thông minh</p>
        </div>
      </div>

      {messages.map((msg, index) => (
        <div 
          key={msg.id} 
          className={`flex flex-col animate-msg ${msg.sender === SenderType.USER ? 'items-end' : 'items-start'}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {msg.sender === SenderType.AI && (
            <div className="flex items-center gap-1 mb-1 ml-1">
               <img 
                src={botAvatar} 
                onError={(e) => (e.currentTarget.src = fallbackAvatar)}
                className="w-4 h-4 object-contain" 
                alt="AI"
               />
            </div>
          )}
          
          <div className={`flex flex-col ${msg.sender === SenderType.USER ? 'items-end' : 'items-start'} max-w-[94%]`}>
            <div 
              className={`px-3.5 py-2.5 rounded-[16px] text-[13.5px] shadow-sm ${
                msg.sender === SenderType.USER 
                  ? 'bg-indigo-600 text-white rounded-tr-none whitespace-pre-line' 
                  : 'bg-white text-gray-800 border-none rounded-tl-none'
              } ${!renderMarkdown || msg.sender === SenderType.USER ? 'whitespace-pre-line' : ''}`}
            >
              {renderMarkdown && msg.sender === SenderType.AI ? (
                <MarkdownLite text={msg.content} />
              ) : (
                msg.content
              )}
            </div>

            {msg.type === MessageType.PRODUCT_LIST && msg.products && (
              <div className="w-full mt-2 flex gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x">
                {msg.products.map(product => (
                  <div key={product.id} className="product-card-snap">
                    <ProductCard product={product} primaryColor={primaryColor} />
                  </div>
                ))}
              </div>
            )}

            {index === 0 && messages.length === 1 && msg.sender === SenderType.AI && (
              <div className="mt-3 flex flex-wrap gap-1.5 w-full">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => onQuickReply(reply)}
                    className="px-3 py-1.5 rounded-full text-[12.5px] font-medium border-none bg-white text-gray-600 hover:text-indigo-600 transition-all duration-200 shadow-sm active:scale-95"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex flex-col gap-1 items-start animate-msg">
          <img 
            src={botAvatar} 
            onError={(e) => (e.currentTarget.src = fallbackAvatar)}
            className="w-4 h-4 object-contain ml-1" 
            alt="AI Loading"
          />
          <div className="flex gap-1 bg-white px-3 py-2 rounded-[16px] rounded-tl-none border-none shadow-sm">
            <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-sigma-bounce"></span>
            <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-sigma-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-sigma-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      )}
    </div>
  );
};
