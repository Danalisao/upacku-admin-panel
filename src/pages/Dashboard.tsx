import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCard } from '../components/StatCard';
import { ChartTooltip } from '../components/ChartTooltip';
import { UserMetricsModal } from '../components/UserMetricsModal';
import { OrderMetricsModal } from '../components/OrderMetricsModal';
import { PopularPartnersModal } from '../components/PopularPartnersModal';
import { CO2Modal } from '../components/CO2Modal';
import { 
  Users, 
  Package, 
  Leaf,
  Heart,
  Clock,
  MapPin,
  ArrowRight,
  DollarSign
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', users: 1250, orders: 850, revenue: 42500 },
  { month: 'Feb', users: 1500, orders: 920, revenue: 48000 },
  { month: 'Mar', users: 1800, orders: 1100, revenue: 55000 },
  { month: 'Apr', users: 2200, orders: 1350, revenue: 67500 },
  { month: 'May', users: 2600, orders: 1580, revenue: 79000 },
  { month: 'Jun', users: 3100, orders: 1850, revenue: 92500 },
  { month: 'Jul', users: 3700, orders: 2200, revenue: 110000 },
  { month: 'Aug', users: 4400, orders: 2600, revenue: 130000 },
  { month: 'Sep', users: 5200, orders: 3100, revenue: 155000 },
  { month: 'Oct', users: 6100, orders: 3700, revenue: 185000 },
  { month: 'Nov', users: 7200, orders: 4400, revenue: 220000 },
  { month: 'Dec', users: 8500, orders: 5200, revenue: 260000 }
];

const popularRoutes = [
  { 
    departure: 'Paris',
    arrival: 'London',
    volume: '2,450 kg',
    revenue: '€29,400',
    travelers: 185,
    avgPrice: '€12/kg',
    growth: '+24%'
  },
  { 
    departure: 'Lyon',
    arrival: 'Marseille',
    volume: '1,850 kg',
    revenue: '€18,500',
    travelers: 142,
    avgPrice: '€10/kg',
    growth: '+18%'
  },
  { 
    departure: 'Bordeaux',
    arrival: 'Paris',
    volume: '1,650 kg',
    revenue: '€16,500',
    travelers: 128,
    avgPrice: '€10/kg',
    growth: '+15%'
  }
];

export const Dashboard = () => {
  const [showUserMetrics, setShowUserMetrics] = useState(false);
  const [showOrderMetrics, setShowOrderMetrics] = useState(false);
  const [showPartners, setShowPartners] = useState(false);
  const [showCO2Modal, setShowCO2Modal] = useState(false);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'annual'>('monthly');

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {greeting}, <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">John</span>
        </h1>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last login was 2 hours ago</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div onClick={() => setShowUserMetrics(true)} className="cursor-pointer">
          <StatCard
            title="Total Users"
            value="8,500"
            trend={15}
            icon={<Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
            className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
            trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
          />
        </div>
        <div onClick={() => setShowOrderMetrics(true)} className="cursor-pointer">
          <StatCard
            title="Total Orders"
            value="5,200"
            trend={12}
            icon={<Package className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
            className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
            trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
          />
        </div>
        <div onClick={() => setShowCO2Modal(true)} className="cursor-pointer">
          <StatCard
            title="CO2 Saved (kg)"
            value="12,450"
            trend={18}
            icon={<Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
            className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
            trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
          />
        </div>
        <div onClick={() => setShowPartners(true)} className="cursor-pointer">
          <StatCard
            title="Active Partners"
            value="1,245"
            trend={20}
            icon={<Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
            className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
            trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
          />
        </div>
        <StatCard
          title="Total Revenue"
          value="€600,000"
          trend={24}
          icon={<DollarSign className="w-6 h-6 text-violet-600 dark:text-violet-400" />}
          className="bg-violet-50/50 dark:bg-violet-900/20 border-2 border-violet-100 dark:border-violet-800"
          trendClassName="text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Combined Growth Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Platform Growth</h3>
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
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                <XAxis dataKey="month" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#22BB9C"
                  strokeWidth={2}
                  dot={{ fill: '#22BB9C', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#FFD300"
                  strokeWidth={2}
                  dot={{ fill: '#FFD300', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue (€)"
                  stroke="#4ECDC4"
                  strokeWidth={2}
                  dot={{ fill: '#4ECDC4', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Popular Routes (Top 3)</h3>
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
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">{route.departure}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">{route.arrival}</span>
                    </div>
                  </td>
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

      {showUserMetrics && (
        <UserMetricsModal onClose={() => setShowUserMetrics(false)} />
      )}

      {showOrderMetrics && (
        <OrderMetricsModal onClose={() => setShowOrderMetrics(false)} />
      )}

      {showPartners && (
        <PopularPartnersModal onClose={() => setShowPartners(false)} />
      )}

      {showCO2Modal && (
        <CO2Modal co2Saved={12450} onClose={() => setShowCO2Modal(false)} />
      )}
    </div>
  );
};