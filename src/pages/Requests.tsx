import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { RequestDetails } from '../components/RequestDetails';
import { 
  Send,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  Calendar,
  MapPin,
  Download,
  ArrowUpDown,
  Trash2,
  Edit,
  MessageSquare
} from 'lucide-react';

const requests = [
  {
    id: '#REQ001',
    date: '2024-03-15',
    departure: 'Paris',
    arrival: 'London',
    initialPrice: '€400',
    finalPrice: '€300',
    status: 'Converted',
    sender: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    package: {
      weight: 25,
      letters: 0,
      description: 'Personal items and clothes'
    },
    negotiation: {
      offers: 3,
      duration: '2 days',
      priceReduction: '25%'
    }
  },
  {
    id: '#REQ002',
    date: '2024-03-15',
    departure: 'Lyon',
    arrival: 'Marseille',
    initialPrice: '€180',
    finalPrice: '€120',
    status: 'Pending',
    sender: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    package: {
      weight: 15,
      letters: 2,
      description: 'Documents and small package'
    },
    negotiation: {
      offers: 2,
      duration: '1 day',
      priceReduction: '33%'
    }
  }
];

export const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[number] | null>(null);
  const [filters, setFilters] = useState({
    destination: '',
    departure: '',
    date: '',
    status: 'all'
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
    const headers = ['Request ID', 'Date', 'Departure', 'Arrival', 'Initial Price', 'Final Price', 'Status'];
    const csvContent = [
      headers.join(','),
      ...requests.map(request => [
        request.id,
        request.date,
        request.departure,
        request.arrival,
        request.initialPrice,
        request.finalPrice,
        request.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'requests.csv';
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

  const handleDelete = (requestId: string) => {
    // Implement delete functionality
    console.log('Delete request:', requestId);
  };

  const handleEdit = (request: typeof requests[number]) => {
    setSelectedRequest(request);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Requests</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track delivery requests
          </p>
        </div>
        <button
          id="exportButton"
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Conversion Rate"
          value="72%"
          trend={18}
          icon={<TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
          trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
        />
        <StatCard
          title="Avg. Price Reduction"
          value="15.5%"
          trend={-8}
          icon={<DollarSign className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
          className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
          trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
        />
        <StatCard
          title="Active Negotiations"
          value="185"
          trend={12}
          icon={<MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
          trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
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

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700/50
                       text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="all">All Status</option>
              <option value="converted">Converted</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  Request ID
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Route</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  Initial Price
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  Final Price
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr 
                key={request.id}
                className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="p-4">
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    {request.id}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{request.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 dark:text-gray-200">{request.departure}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-800 dark:text-gray-200">{request.arrival}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{request.initialPrice}</td>
                <td className="p-4 font-medium text-emerald-600 dark:text-emerald-400">
                  {request.finalPrice}
                </td>
                <td className="p-4">
                  <StatusBadge status={request.status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(request)}
                      className="p-2 text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-2 text-gray-600 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1-2 of 185 requests
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

      {selectedRequest && (
        <RequestDetails 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
        />
      )}
    </div>
  );
};