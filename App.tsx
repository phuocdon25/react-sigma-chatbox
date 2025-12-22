
import React, { useState } from 'react';
import { Chatbox } from './components/Chatbox/Chatbox';
import { ChatboxConfig } from './types';

const App: React.FC = () => {
  const config: ChatboxConfig = {
    primaryColor: '#6366f1', // Indigo-500 for a fresh Sigma look
    botName: 'Sigma AI',
    welcomeMessage: 'Chào bạn, mình là Sigma - Trợ lý AI thế hệ mới! Mình có thể giúp gì cho bạn hôm nay?',
    placeholder: 'Nhập câu hỏi của bạn...',
    avatarUrl: 'https://picsum.photos/seed/sigma/100/100',
    quickReplies: [
      'Tính năng chính',
      'Hướng dẫn tích hợp',
      'Báo giá dịch vụ',
      'Liên hệ hỗ trợ'
    ]
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Sigma React UI Library
        </h1>
        <p className="text-lg text-gray-600">
          A high-performance, beautiful chat assistant interface. 
          Deploy <span className="text-indigo-600 font-bold">Sigma</span> into any project with ease.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>Modern Floating Interface</li>
              <li>Expandable Chat Window</li>
              <li>Streaming AI Responses</li>
              <li>Fully Customizable Theme</li>
              <li>NPM Ready Package</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Installation</h3>
            <code className="text-xs bg-gray-50 p-2 block rounded border border-gray-100">
              npm install react-sigma-chatbox
            </code>
            <p className="text-xs text-gray-400 mt-4">
              Click the bubble in the bottom right corner to test.
            </p>
          </div>
        </div>
      </div>

      <Chatbox config={config} />
    </div>
  );
};

export default App;
