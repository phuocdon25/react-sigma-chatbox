
import React from 'react';

interface ChatHeaderProps {
  title: string;
  primaryColor: string;
  onClose: () => void;
  onReset: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title, 
  primaryColor, 
  onClose, 
  onReset, 
  onToggleExpand,
  isExpanded 
}) => {
  return (
    <div 
      className="px-4 py-3 flex items-center justify-between border-b border-red-50/50 sticky top-0 z-10 bg-[#fff1f2]/90 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 shadow-sm">
           <img 
             src="https://fptshop.com.vn/img/bitu/bitu-avatar.png" 
             onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png")}
             className="w-full h-full object-contain" 
             alt="Bot Icon"
           />
        </div>
        <h3 className="font-bold text-[#1a2b56] text-[14px] tracking-tight flex items-center gap-1">
          {title} <span className="text-red-400 text-[12px]">✨</span>
        </h3>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500">
        <button 
          onClick={onReset} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/60 transition-all"
          title="Tải lại"
        >
          <i className="fa-solid fa-rotate-right text-[13px]"></i>
        </button>
        <button 
          onClick={onToggleExpand}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/60 transition-all" 
          title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
        >
          <i className={`fa-solid ${isExpanded ? 'fa-compress' : 'fa-expand'} text-[12px]`}></i>
        </button>
        <button 
          onClick={onClose} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/60 transition-all text-xl"
          title="Đóng"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
    </div>
  );
};
