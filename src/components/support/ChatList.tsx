import React from 'react';
import { Search, Filter, MessageSquare, Mail, Phone } from 'lucide-react';
import { chats, channelIcons, priorityColors } from '../../data/supportData';

interface ChatListProps {
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ selectedChatId, onChatSelect }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700/50
                     text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select className="bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none">
            <option value="all">All Channels</option>
            <option value="chat">Chat</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => {
          const ChannelIcon = channelIcons[chat.channel];
          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer
                       hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors
                       ${selectedChatId === chat.id ? 'bg-gray-50 dark:bg-gray-700/30' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    chat.user.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                      {chat.user.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <ChannelIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[chat.priority]}`}>
                      {chat.priority.charAt(0).toUpperCase() + chat.priority.slice(1)} Priority
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};