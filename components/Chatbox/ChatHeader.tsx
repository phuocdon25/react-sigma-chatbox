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
          title="Reset chat"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
        </button>
        <button 
          onClick={onToggleExpand}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/60 transition-all" 
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6"></path><path d="M20 10h-6V4"></path><path d="M14 10l7-7"></path><path d="M10 14l-7 7"></path></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
          )}
        </button>
        <button 
          onClick={onClose} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/60 transition-all"
          title="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};
