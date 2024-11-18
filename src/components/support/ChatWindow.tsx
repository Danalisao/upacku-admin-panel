import React, { useState } from 'react';
import { Send, MoreVertical } from 'lucide-react';
import { chats, messages } from '../../data/supportData';

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [newMessage, setNewMessage] = useState('');
  const chat = chats.find(c => c.id === chatId);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  if (!chat) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {chat.user.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last active 2 min ago
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages[chatId]?.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[70%] ${
              message.sender === 'user'
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'bg-primary-500 text-white'
            } rounded-lg px-4 py-2`}>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs mt-1 block opacity-70">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700/50
                     text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};