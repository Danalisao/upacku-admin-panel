import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { CountryDistributionChart } from '../components/CountryDistributionChart';
import { UserDetails } from '../components/UserDetails';
import { 
  Users, 
  Star, 
  TrendingUp,
  Package,
  Clock,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';

const partners = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '+33 6 12 34 56 78',
    address: 'Paris, France',
    joinDate: 'March 15, 2024',
    type: 'partner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    stats: {
      cancelRate: 2.5,
      completionRate: 97.5,
      responseTime: '15 min',
      rating: 4.8,
      totalDeliveries: 245,
      totalRevenue: '€12,450',
      avgDeliveryTime: '2.5 days'
    }
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    phone: '+33 6 98 76 54 32',
    address: 'Lyon, France',
    joinDate: 'March 14, 2024',
    type: 'partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    stats: {
      cancelRate: 1.8,
      completionRate: 98.2,
      responseTime: '22 min',
      rating: 4.9,
      totalDeliveries: 198,
      totalRevenue: '€9,900',
      avgDeliveryTime: '2.2 days'
    }
  }
];

const countryData = [
  { country: 'France', partners: 450 },
  { country: 'UK', partners: 380 },
  { country: 'Germany', partners: 320 },
  { country: 'Spain', partners: 280 },
  { country: 'Italy', partners: 220 }
];

export const Partners = () => {
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[number] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Partners</h1>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Partners"
          value="2,270"
          trend={15}
          icon={<Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Avg Rating"
          value="4.8/5"
          trend={8}
          icon={<Star className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Completion Rate"
          value="97.5%"
          trend={12}
          icon={<ThumbsUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
        <StatCard
          title="Avg Response Time"
          value="18 min"
          trend={-5}
          icon={<Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
          className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
          trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Deliveries"
          value="24,850"
          trend={24}
          icon={<Package className="w-6 h-6 text-violet-600 dark:text-violet-400" />}
          className="bg-violet-50/50 dark:bg-violet-900/20 border-2 border-violet-100 dark:border-violet-800"
          trendClassName="text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40"
        />
        <StatCard
          title="Partner Revenue"
          value="€495,000"
          trend={18}
          icon={<TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
          className="bg-amber-50/50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-800"
          trendClassName="text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40"
        />
        <StatCard
          title="Cancel Rate"
          value="2.5%"
          trend={-8}
          icon={<AlertTriangle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
          className="bg-indigo-50/50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800"
          trendClassName="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Partner Distribution by Country
        </h2>
        <CountryDistributionChart data={countryData} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">Partners List</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Partner</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Location</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Join Date</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Deliveries</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Revenue</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Rating</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Response Time</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr 
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {partner.name}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {partner.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{partner.address}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{partner.joinDate}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{partner.stats.totalDeliveries}</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">
                  {partner.stats.totalRevenue}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-800 dark:text-gray-200">{partner.stats.rating}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{partner.stats.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPartner && (
        <UserDetails 
          user={selectedPartner} 
          onClose={() => setSelectedPartner(null)} 
        />
      )}
    </div>
  );
};