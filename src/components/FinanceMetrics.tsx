import React from 'react';
import { StatCard } from './StatCard';
import { Wallet, Building, Receipt, CreditCard as CardIcon } from 'lucide-react';

interface FinanceMetricsProps {
  walletStats: {
    activeWallets: number;
    totalBalance: string;
    avgBalance: string;
    inactiveWallets: number;
  };
  onWalletClick: () => void;
}

export const FinanceMetrics: React.FC<FinanceMetricsProps> = ({ walletStats, onWalletClick }) => (
  <div className="grid grid-cols-4 gap-6">
    <div onClick={onWalletClick} className="cursor-pointer">
      <StatCard
        title="Active Wallets"
        value={walletStats.activeWallets.toLocaleString()}
        trend={15}
        icon={<Wallet className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
        className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
        trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
      />
    </div>
    <StatCard
      title="Total Balance"
      value={walletStats.totalBalance}
      trend={24}
      icon={<Building className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
      className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
      trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
    />
    <StatCard
      title="Total Expenses"
      value="€29,000"
      trend={-8}
      icon={<Receipt className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
      className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
      trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
    />
    <StatCard
      title="Avg Wallet Balance"
      value={walletStats.avgBalance}
      trend={12}
      icon={<CardIcon className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
      className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
      trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
    />
  </div>
);