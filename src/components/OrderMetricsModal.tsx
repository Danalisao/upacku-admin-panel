import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const orderMetrics = {
  new: 850,
  inProgress: 2100,
  delivered: 1950,
  cancelled: 300,
  total: 5200,
  newGrowth: 15,
  inProgressGrowth: 12,
  deliveredGrowth: 18,
  cancelledGrowth: -5
};

export const OrderMetricsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[600px] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Order Metrics</h2>
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
                <Package className="w-5 h-5 text-primary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">New Orders</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {orderMetrics.new.toLocaleString()}
                </span>
                <span className="text-sm text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40 px-2 py-1 rounded-full">
                  +{orderMetrics.newGrowth}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-secondary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">In Progress</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {orderMetrics.inProgress.toLocaleString()}
                </span>
                <span className="text-sm text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40 px-2 py-1 rounded-full">
                  +{orderMetrics.inProgressGrowth}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Delivered</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {orderMetrics.delivered.toLocaleString()}
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-full">
                  +{orderMetrics.deliveredGrowth}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-5 h-5 text-rose-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Cancelled</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {orderMetrics.cancelled.toLocaleString()}
                </span>
                <span className="text-sm text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-1 rounded-full">
                  {orderMetrics.cancelledGrowth}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-100 dark:border-primary-800">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Order Distribution</h3>
            <div className="h-4 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-primary-500"
                style={{ width: `${(orderMetrics.new / orderMetrics.total) * 100}%` }}
              />
              <div 
                className="h-full bg-secondary-500"
                style={{ width: `${(orderMetrics.inProgress / orderMetrics.total) * 100}%` }}
              />
              <div 
                className="h-full bg-emerald-500"
                style={{ width: `${(orderMetrics.delivered / orderMetrics.total) * 100}%` }}
              />
              <div 
                className="h-full bg-rose-500"
                style={{ width: `${(orderMetrics.cancelled / orderMetrics.total) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2 text-sm">
              <div className="text-center text-primary-600 dark:text-primary-400">
                {Math.round((orderMetrics.new / orderMetrics.total) * 100)}% New
              </div>
              <div className="text-center text-secondary-600 dark:text-secondary-400">
                {Math.round((orderMetrics.inProgress / orderMetrics.total) * 100)}% In Progress
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400">
                {Math.round((orderMetrics.delivered / orderMetrics.total) * 100)}% Delivered
              </div>
              <div className="text-center text-rose-600 dark:text-rose-400">
                {Math.round((orderMetrics.cancelled / orderMetrics.total) * 100)}% Cancelled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};