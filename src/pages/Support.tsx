import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { SupportTabs } from '../components/support/SupportTabs';
import { ChatPanel } from '../components/support/ChatPanel';
import { ProfileModificationsPanel } from '../components/support/ProfileModificationsPanel';
import { Clock, Star, CheckCircle2, MessageCircle } from 'lucide-react';

export const Support = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'modifications'>('chat');

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Response Time"
          value="8 min"
          trend={-15}
          icon={<Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Resolution Rate"
          value="94.8%"
          trend={2.5}
          icon={<CheckCircle2 className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Satisfaction"
          value="4.9/5"
          trend={0.2}
          icon={<Star className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
        <StatCard
          title="Open Tickets"
          value="24"
          trend={-8}
          icon={<MessageCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
          className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
          trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <SupportTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' ? (
            <ChatPanel />
          ) : (
            <ProfileModificationsPanel />
          )}
        </div>
      </div>
    </div>
  );
};