import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { OrderDetails } from '../components/OrderDetails';
import { WeightDistributionChart } from '../components/WeightDistributionChart';
import { DocumentDistributionChart } from '../components/DocumentDistributionChart';
import { 
  Package, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Download,
  Search,
  Calendar,
  MapPin,
  Filter
} from 'lucide-react';

const orders = [
  { 
    id: '#UPK245',
    date: '2024-03-15',
    departure: 'Paris',
    arrival: 'London',
    kg: 25,
    letters: 0,
    price: '€300',
    status: 'New Order',
    sender: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    traveler: {
      name: 'Thomas Bernard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    }
  },
  { 
    id: '#UPK244',
    date: '2024-03-15',
    departure: 'Lyon',
    arrival: 'Marseille',
    kg: 15,
    letters: 2,
    price: '€120',
    status: 'Handover',
    sender: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    traveler: {
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    }
  },
  {
    id: '#UPK243',
    date: '2024-03-14',
    departure: 'Bordeaux',
    arrival: 'Paris',
    kg: 8,
    letters: 5,
    price: '€80',
    status: 'Delivered',
    sender: {
      name: 'Pierre Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    traveler: {
      name: 'Alice Rousseau',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    }
  },
  {
    id: '#UPK242',
    date: '2024-03-14',
    departure: 'Nice',
    arrival: 'Paris',
    kg: 12,
    letters: 0,
    price: '€95',
    status: 'Cancelled',
    sender: {
      name: 'Lucas Petit',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150'
    },
    traveler: {
      name: 'Emma Laurent',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  }
];

const weightDistributionData = [
  { range: '0-5 kg', count: 450, percentage: 45 },
  { range: '5-10 kg', count: 300, percentage: 30 },
  { range: '10-20 kg', count: 150, percentage: 15 },
  { range: '20+ kg', count: 100, percentage: 10 }
];

const documentDistributionData = [
  { type: 'Letters', count: 850, percentage: 45 },
  { type: 'Documents', count: 650, percentage: 35 },
  { type: 'Packages', count: 380, percentage: 20 }
];

export const Orders = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'annual'>('daily');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[number] | null>(null);
  const [filters, setFilters] = useState({
    destination: '',
    departure: '',
    date: ''
  });

  const handleExport = async () => {
    // Simulate export processing
    const button = document.getElementById('exportButton');
    if (button) {
      button.textContent = 'Exporting...';
      button.setAttribute('disabled', 'true');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create and download CSV file
    const headers = ['Order ID', 'Date', 'Departure', 'Arrival', 'Weight', 'Letters', 'Price', 'Status'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.id,
        order.date,
        order.departure,
        order.arrival,
        order.kg,
        order.letters,
        order.price,
        order.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Reset button state
    if (button) {
      button.textContent = 'Export Data';
      button.removeAttribute('disabled');
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Orders</h1>
          <Package className="w-6 h-6 text-primary-500" />
        </div>
        <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-1">
          {(['daily', 'weekly', 'monthly', 'annual'] as const).map((period) => (
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
          title="New Orders"
          value="245"
          trend={20}
          icon={<Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Handover"
          value="123"
          trend={11}
          icon={<TrendingUp className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Delivered"
          value="150"
          trend={18}
          icon={<CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
        <StatCard
          title="Cancelled"
          value="45"
          trend={-8}
          icon={<AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
          className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
          trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Package Weight Distribution</h3>
          <WeightDistributionChart data={weightDistributionData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Document Type Distribution</h3>
          <DocumentDistributionChart data={documentDistributionData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700">
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
                All Orders
              </button>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                New Orders
              </button>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                Handover
              </button>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                Delivered
              </button>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                Cancelled
              </button>
            </div>
            <div className="flex-1"></div>
            <button
              id="exportButton"
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700/50 w-64
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Destination"
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700/50
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Departure"
                value={filters.departure}
                onChange={(e) => setFilters({ ...filters, departure: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700/50
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700/50
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Order ID</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Date</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Departure</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Arrival</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Weight</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Letters</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Price</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150 cursor-pointer"
              >
                <td className="p-4">
                  <span className="font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 px-2 py-1 rounded">
                    {order.id}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">{order.departure}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">{order.arrival}</td>
                <td className="p-4">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{order.kg}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-1">kg</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{order.letters}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-1">pcs</span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{order.price}</span>
                </td>
                <td className="p-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1-4 of 245 orders
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
              1
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              2
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              3
            </button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};