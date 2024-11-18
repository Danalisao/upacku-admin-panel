import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { FinanceMetrics } from '../components/FinanceMetrics';
import { FinanceCharts } from '../components/FinanceCharts';
import { ExpenseBreakdown } from '../components/ExpenseBreakdown';
import { FinancialFlowsModal } from '../components/FinancialFlowsModal';
import { WalletDetailsModal } from '../components/WalletDetailsModal';

const monthlyData = [
  { month: 'Jan', revenue: 42500, expenses: 35000, balance: 7500 },
  { month: 'Feb', revenue: 38000, expenses: 31000, balance: 7000 },
  { month: 'Mar', revenue: 45500, expenses: 37000, balance: 8500 },
  { month: 'Apr', revenue: 52000, expenses: 43000, balance: 9000 },
  { month: 'May', revenue: 48000, expenses: 40000, balance: 8000 },
  { month: 'Jun', revenue: 55000, expenses: 45000, balance: 10000 }
];

const revenueDistribution = [
  { category: 'User Payments', value: 495000, color: '#22BB9C' },
  { category: 'Third-party Services', value: 85000, color: '#4ECDC4' },
  { category: 'Platform Fees', value: 66000, color: '#FFD300' },
  { category: 'Other Income', value: 24000, color: '#6B7280' }
];

const walletStats = {
  activeWallets: 2845,
  totalBalance: '€490,000',
  avgBalance: '€172',
  inactiveWallets: 450
};

const expenseBreakdown = [
  { category: 'Payment Processing', amount: 12500, trend: '+2.5%' },
  { category: 'Server Costs', amount: 8500, trend: '-1.2%' },
  { category: 'Third-party APIs', amount: 4500, trend: '+0.8%' },
  { category: 'Support Services', amount: 3500, trend: '0%' }
];

export const Finance = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'annual'>('monthly');
  const [showFlowsModal, setShowFlowsModal] = useState(false);
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Financial Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Platform revenue and financial performance metrics
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-1">
            {(['weekly', 'monthly', 'annual'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  timeframe === period
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowFlowsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all duration-300"
          >
            <Wallet className="w-4 h-4" />
            Financial Flows
          </button>
        </div>
      </div>

      <FinanceMetrics 
        walletStats={walletStats} 
        onWalletClick={() => setShowWalletDetails(true)} 
      />
      <FinanceCharts monthlyData={monthlyData} revenueDistribution={revenueDistribution} />
      <ExpenseBreakdown expenses={expenseBreakdown} />

      {showFlowsModal && (
        <FinancialFlowsModal onClose={() => setShowFlowsModal(false)} />
      )}

      {showWalletDetails && (
        <WalletDetailsModal onClose={() => setShowWalletDetails(false)} />
      )}
    </div>
  );
};