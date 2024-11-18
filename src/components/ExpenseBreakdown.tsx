import React from 'react';
import { Server } from 'lucide-react';

interface ExpenseBreakdownProps {
  expenses: Array<{
    category: string;
    amount: number;
    trend: string;
  }>;
}

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ expenses }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Expense Breakdown</h3>
    <div className="grid grid-cols-4 gap-4">
      {expenses.map((expense, index) => (
        <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-primary-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {expense.category}
              </span>
            </div>
            <span className={`text-sm font-medium ${
              expense.trend.startsWith('+') 
                ? 'text-rose-600 dark:text-rose-400'
                : expense.trend === '0%'
                ? 'text-gray-600 dark:text-gray-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {expense.trend}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              €{expense.amount.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);