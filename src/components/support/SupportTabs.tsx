import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import clsx from 'clsx';

interface SupportTabsProps {
  activeTab: 'chat' | 'modifications';
  onTabChange: (tab: 'chat' | 'modifications') => void;
}

export const SupportTabs: React.FC<SupportTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'chat',
      label: 'Support Chat',
      icon: MessageSquare,
      badge: '3'
    },
    {
      id: 'modifications',
      label: 'Profile Modifications',
      icon: User,
      badge: '2'
    }
  ] as const;

  return (
    <div className="border-b border-gray-100 dark:border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-6 py-4 border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};