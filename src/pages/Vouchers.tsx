import React, { useState } from 'react';
import { Tag, Users, Copy, Plus, Search, Filter, Download } from 'lucide-react';
import { StatCard } from '../components/StatCard';

const vouchers = [
  {
    code: 'WELCOME2024',
    type: 'Percentage',
    discount: '20%',
    usageLimit: 1000,
    used: 450,
    expiryDate: '2024-12-31',
    minAmount: '€50',
    maxDiscount: '€100',
    status: 'active'
  },
  {
    code: 'SUMMER50',
    type: 'Fixed',
    discount: '€50',
    usageLimit: 500,
    used: 500,
    expiryDate: '2024-08-31',
    minAmount: '€200',
    maxDiscount: '€50',
    status: 'expired'
  },
  {
    code: 'FREESHIP',
    type: 'Percentage',
    discount: '100%',
    usageLimit: 200,
    used: 150,
    expiryDate: '2024-06-30',
    minAmount: '€20',
    maxDiscount: '€30',
    status: 'active'
  }
];

const voucherStats = [
  { label: 'Total Savings', value: '€24,500' },
  { label: 'Avg. Discount', value: '€32.50' },
  { label: 'Usage Rate', value: '68%' }
];

export const Vouchers = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Add toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Vouchers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage promotional codes and track their performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
            <Plus className="w-4 h-4" />
            Create Voucher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Active Vouchers"
          value="24"
          trend={15}
          icon={<Tag className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Total Usage"
          value="1,234"
          trend={8}
          icon={<Users className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-2 border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4">
            {voucherStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vouchers..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 
                           focus:outline-none focus:ring-2 focus:ring-primary-500/20 w-64
                           text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  className="bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Code</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Type</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Discount</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Usage</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Min. Amount</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Max. Discount</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Expiry Date</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher, index) => (
              <tr key={index} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary-600 dark:text-primary-400">{voucher.code}</span>
                    <button 
                      onClick={() => copyToClipboard(voucher.code)}
                      className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{voucher.type}</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">{voucher.discount}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(voucher.used / voucher.usageLimit) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {voucher.used}/{voucher.usageLimit}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{voucher.minAmount}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{voucher.maxDiscount}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{voucher.expiryDate}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    voucher.status === 'active' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                  }`}>
                    {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1-3 of 24 vouchers
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
              1
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-300">
              2
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-300">
              3
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};