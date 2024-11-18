import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

interface FinanceChartsProps {
  monthlyData: Array<{
    month: string;
    revenue: number;
    expenses: number;
    balance: number;
  }>;
  revenueDistribution: Array<{
    category: string;
    value: number;
    color: string;
  }>;
}

export const FinanceCharts: React.FC<FinanceChartsProps> = ({ monthlyData, revenueDistribution }) => (
  <div className="grid grid-cols-2 gap-6">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Revenue & Expenses</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-500"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary-500"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
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
              dataKey="expenses"
              stroke="#FFD300"
              strokeWidth={2}
              dot={{ fill: '#FFD300', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#4ECDC4"
              strokeWidth={2}
              dot={{ fill: '#4ECDC4', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Revenue Distribution</h3>
      <div className="h-[300px] flex">
        <ResponsiveContainer width="70%" height="100%">
          <PieChart>
            <Pie
              data={revenueDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: €${(value/1000).toFixed(1)}K`}
            >
              {revenueDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip valuePrefix="€" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {revenueDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  €{(item.value/1000).toFixed(1)}K
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);