import React, { useState } from 'react';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';

export const ChatPanel = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('1');

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-3 border-r border-gray-100 dark:border-gray-700">
        <ChatList selectedChatId={selectedChatId} onChatSelect={setSelectedChatId} />
      </div>
      <div className="col-span-9">
        <ChatWindow chatId={selectedChatId} />
      </div>
    </div>
  );
};