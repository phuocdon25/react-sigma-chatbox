import React, { useState } from 'react';

interface ChatInputProps {
  placeholder: string;
  onSendMessage: (text: string) => void;
  primaryColor: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ placeholder, onSendMessage, primaryColor }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-2">
      <div className="relative flex items-center bg-white border-none focus-within:ring-0 px-1 py-0.5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-transparent border-none focus:ring-0 text-[13.5px] text-gray-700 py-2.5 px-1.5 resize-none chat-scrollbar min-h-[40px] max-h-[100px]"
        />
        <button 
          onClick={handleSend}
          disabled={!text.trim()}
          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            text.trim() ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-300'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
        </button>
      </div>
    </div>
  );
};
