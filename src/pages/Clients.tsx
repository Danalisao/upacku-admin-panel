import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { CountryDistributionChart } from '../components/CountryDistributionChart';
import { UserDetails } from '../components/UserDetails';
import { Users, Package, TrendingUp, Clock } from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '+33 6 12 34 56 78',
    address: 'Paris, France',
    joinDate: 'March 15, 2024',
    type: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    stats: {
      totalOrders: 24,
      totalSpent: '€1,250',
      avgOrderValue: '€52',
      lastOrder: '2 days ago'
    }
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    phone: '+33 6 98 76 54 32',
    address: 'Lyon, France',
    joinDate: 'March 14, 2024',
    type: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    stats: {
      totalOrders: 18,
      totalSpent: '€950',
      avgOrderValue: '€53',
      lastOrder: '5 days ago'
    }
  }
];

const countryData = [
  { country: 'France', users: 2500 },
  { country: 'UK', users: 2000 },
  { country: 'Germany', users: 1800 },
  { country: 'Spain', users: 1500 },
  { country: 'Italy', users: 1200 }
];

export const Clients = () => {
  const [selectedUser, setSelectedUser] = useState<typeof users[number] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Clients</h1>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Clients"
          value="8,500"
          trend={15}
          icon={<Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Active Users"
          value="6,845"
          trend={12}
          icon={<Package className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Avg Order Value"
          value="€52.50"
          trend={8}
          icon={<TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
        <StatCard
          title="Retention Rate"
          value="85%"
          trend={5}
          icon={<Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
          className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
          trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Client Distribution by Country
        </h2>
        <CountryDistributionChart data={countryData} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">Clients List</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Client</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Location</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Join Date</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Total Orders</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Total Spent</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {user.name}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{user.address}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{user.stats.totalOrders}</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">
                  {user.stats.totalSpent}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{user.stats.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetails 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};