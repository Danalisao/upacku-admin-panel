import React from 'react';
import { Users, Send, Package } from 'lucide-react';

const userMetrics = {
  offerUsers: 3250,
  requestUsers: 5250,
  totalActiveUsers: 8500,
  offerGrowth: 18,
  requestGrowth: 22
};

export const UserMetricsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[600px] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">User Metrics</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800">
              <div className="flex items-center gap-3 mb-2">
                <Send className="w-5 h-5 text-primary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Offer Users</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {userMetrics.offerUsers.toLocaleString()}
                </span>
                <span className="text-sm text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40 px-2 py-1 rounded-full">
                  +{userMetrics.offerGrowth}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-secondary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Request Users</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {userMetrics.requestUsers.toLocaleString()}
                </span>
                <span className="text-sm text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40 px-2 py-1 rounded-full">
                  +{userMetrics.requestGrowth}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-100 dark:border-primary-800">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Total Active Users</h3>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {userMetrics.totalActiveUsers.toLocaleString()}
              </span>
              <div className="flex-1 h-4 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: `${(userMetrics.offerUsers / userMetrics.totalActiveUsers) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{Math.round((userMetrics.offerUsers / userMetrics.totalActiveUsers) * 100)}% Offer Users</span>
              <span>{Math.round((userMetrics.requestUsers / userMetrics.totalActiveUsers) * 100)}% Request Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};