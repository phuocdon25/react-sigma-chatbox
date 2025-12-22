
import React from 'react';

interface FloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
  primaryColor: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ isOpen, onClick, primaryColor }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button 
        onClick={onClick}
        className={`w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center border transition-all overflow-hidden ${
          isOpen ? 'border-red-500 ring-2 ring-red-100 scale-110' : 'border-red-50 hover:scale-110'
        }`}
      >
        <img 
          src="https://fptshop.com.vn/img/bitu/bitu-avatar.png" 
          className="w-9 h-9 object-contain" 
          alt="Bitu" 
          onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png")}
        />
      </button>
    </div>
  );
};
