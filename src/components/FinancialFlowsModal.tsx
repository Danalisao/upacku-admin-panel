import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import { StatCard } from './StatCard';
import { 
  Wallet, 
  CreditCard, 
  RefreshCcw, 
  Server, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface FinancialFlowsModalProps {
  onClose: () => void;
}

const COLORS = ['#22BB9C', '#FFD300', '#FF6B6B', '#4ECDC4'];

const monthlyFlowData = [
  { month: 'Jan', revenue: 42500, payouts: 35000, refunds: 2500 },
  { month: 'Feb', revenue: 38000, payouts: 31000, refunds: 2000 },
  { month: 'Mar', revenue: 45500, payouts: 37000, refunds: 3000 },
  { month: 'Apr', revenue: 52000, payouts: 43000, refunds: 2800 },
  { month: 'May', revenue: 48000, payouts: 40000, refunds: 2400 },
  { month: 'Jun', revenue: 55000, payouts: 45000, refunds: 3200 }
];

const walletData = [
  { category: 'User Wallets', value: 245000 },
  { category: 'Pending Transfers', value: 85000 },
  { category: 'Reserved for Refunds', value: 35000 },
  { category: 'Platform Revenue', value: 125000 }
];

const serviceFeesData = [
  { service: 'Stripe', amount: 12500, percentage: '2.5%', trend: '+0.8%' },
  { service: 'PayPal', amount: 8500, percentage: '3.0%', trend: '-0.2%' },
  { service: 'Firebase', amount: 2500, fixed: '€2,500/month', trend: '0%' },
  { service: 'AWS', amount: 1800, fixed: '€1,800/month', trend: '+0.5%' }
];

const transactionHistory = [
  {
    id: '#TRX001',
    type: 'Payment to Traveler',
    amount: '€450.00',
    orderId: '#ORD123',
    status: 'completed',
    date: '2024-03-15'
  },
  {
    id: '#TRX002',
    type: 'Refund to Sender',
    amount: '€125.00',
    orderId: '#ORD124',
    status: 'processing',
    date: '2024-03-15'
  },
  {
    id: '#TRX003',
    type: 'Platform Fee',
    amount: '€45.00',
    orderId: '#ORD125',
    status: 'completed',
    date: '2024-03-14'
  }
];

export const FinancialFlowsModal: React.FC<FinancialFlowsModalProps> = ({ onClose }) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'annual'>('monthly');

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[1200px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Financial Flows</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Detailed overview of all financial movements within the platform
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/50 rounded-xl p-1">
              {(['weekly', 'monthly', 'annual'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    timeframe === period
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Balance"
              value="€490,000"
              trend={24}
              icon={<Wallet className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
              className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
              trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
            />
            <StatCard
              title="Monthly Revenue"
              value="€55,000"
              trend={18}
              icon={<TrendingUp className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
              className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
              trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
            />
            <StatCard
              title="Processing Success"
              value="99.8%"
              trend={0.5}
              icon={<ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
              className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
              trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
            />
            <StatCard
              title="Avg Transaction"
              value="€32.50"
              trend={12}
              icon={<ArrowUpRight className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
              className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
              trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Monthly Cash Flow</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-secondary-500"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Payouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Refunds</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                    <XAxis dataKey="month" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                    <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                    <Tooltip content={<ChartTooltip valuePrefix="€" />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22BB9C"
                      strokeWidth={2}
                      dot={{ fill: '#22BB9C', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="payouts"
                      stroke="#FFD300"
                      strokeWidth={2}
                      dot={{ fill: '#FFD300', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="refunds"
                      stroke="#FF6B6B"
                      strokeWidth={2}
                      dot={{ fill: '#FF6B6B', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Balance Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={walletData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: €${(value/1000).toFixed(1)}K`}
                    >
                      {walletData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip valuePrefix="€" />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Service Fees */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Service Provider Fees</h3>
            <div className="grid grid-cols-4 gap-4">
              {serviceFeesData.map((service, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-primary-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {service.service}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      service.trend.startsWith('+') 
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : service.trend === '0%'
                        ? 'text-gray-600 dark:text-gray-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {service.trend}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      €{service.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {service.percentage || service.fixed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Transactions</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Transaction ID</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Amount</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Order ID</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction, index) => (
                  <tr 
                    key={index}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="p-4 font-medium text-primary-600 dark:text-primary-400">
                      {transaction.id}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'Payment to Traveler' ? (
                          <Wallet className="w-4 h-4 text-emerald-500" />
                        ) : transaction.type === 'Refund to Sender' ? (
                          <RefreshCcw className="w-4 h-4 text-amber-500" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-primary-500" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                      {transaction.amount}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{transaction.orderId}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        transaction.status === 'completed'
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};