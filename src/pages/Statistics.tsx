import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../components/StatCard';
import { TrendingUp, Package, Users, Scale, DollarSign } from 'lucide-react';
import { ChartTooltip } from '../components/ChartTooltip';

const monthlyData = [
  { month: 'Jan', revenue: 42500, transactions: 1250 },
  { month: 'Feb', revenue: 38000, transactions: 1100 },
  { month: 'Mar', revenue: 45500, transactions: 1400 },
  { month: 'Apr', revenue: 52000, transactions: 1600 },
  { month: 'May', revenue: 48000, transactions: 1450 },
  { month: 'Jun', revenue: 55000, transactions: 1700 },
  { month: 'Jul', revenue: 58000, transactions: 1800 },
  { month: 'Aug', revenue: 54000, transactions: 1650 },
  { month: 'Sep', revenue: 62000, transactions: 1900 },
  { month: 'Oct', revenue: 65000, transactions: 2000 },
  { month: 'Nov', revenue: 68000, transactions: 2100 },
  { month: 'Dec', revenue: 72000, transactions: 2200 }
];

const weightDistribution = [
  { category: '0-5 kg', count: 450, percentage: 45 },
  { category: '5-10 kg', count: 300, percentage: 30 },
  { category: '10-15 kg', count: 150, percentage: 15 },
  { category: '15+ kg', count: 100, percentage: 10 }
];

const COLORS = ['#22BB9C', '#FFD300', '#FF6B6B', '#4ECDC4'];

const popularRoutes = [
  { 
    route: 'Paris - London',
    volume: '2,450 kg',
    revenue: '€29,400',
    travelers: 185,
    avgPrice: '€12/kg',
    growth: '+24%'
  },
  { 
    route: 'Lyon - Marseille',
    volume: '1,850 kg',
    revenue: '€18,500',
    travelers: 142,
    avgPrice: '€10/kg',
    growth: '+18%'
  },
  { 
    route: 'Bordeaux - Paris',
    volume: '1,650 kg',
    revenue: '€16,500',
    travelers: 128,
    avgPrice: '€10/kg',
    growth: '+15%'
  }
];

export const Statistics = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'annual'>('monthly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Statistics</h1>
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
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Volume"
          value="24,850 kg"
          trend={24}
          icon={<Scale className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Active Travelers"
          value="2,270"
          trend={18}
          icon={<Users className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Completed Deliveries"
          value="8,450"
          trend={15}
          icon={<Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
        <StatCard
          title="Revenue"
          value="€72,000"
          trend={28}
          icon={<DollarSign className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
          className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
          trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Revenue & Transactions</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Transactions</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                <XAxis dataKey="month" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <Tooltip content={<ChartTooltip />} />
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
                  dataKey="transactions"
                  stroke="#FFD300"
                  strokeWidth={2}
                  dot={{ fill: '#FFD300', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Package Weight Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={weightDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="percentage"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        className="text-sm fill-gray-600 dark:fill-gray-400"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {`${weightDistribution[index].category} (${value}%)`}
                      </text>
                    );
                  }}
                >
                  {weightDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Top Performing Routes</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Route</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Volume</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Revenue</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Active Travelers</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Avg Price</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Growth</th>
            </tr>
          </thead>
          <tbody>
            {popularRoutes.map((route, index) => (
              <tr key={index} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{route.route}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{route.volume}</td>
                <td className="p-4 text-primary-600 dark:text-primary-400 font-medium">{route.revenue}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{route.travelers}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{route.avgPrice}</td>
                <td className="p-4">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {route.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};