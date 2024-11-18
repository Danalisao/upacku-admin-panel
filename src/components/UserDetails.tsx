import React from 'react';
import { StatCard } from './StatCard';
import { StatusBadge } from './StatusBadge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package
} from 'lucide-react';

interface UserDetailsProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    avatar: string;
    type: 'partner' | 'customer';
    stats: {
      cancelRate: number;
      completionRate: number;
      responseTime: string;
      rating: number;
    };
  };
  onClose: () => void;
}

const activities = [
  {
    type: 'request',
    id: '#REQ123',
    date: '2024-03-15',
    route: 'Paris → London',
    letters: 2,
    kg: 5,
    status: 'pending'
  },
  {
    type: 'offer',
    id: '#OFF456',
    date: '2024-03-14',
    route: 'Lyon → Marseille',
    letters: 0,
    kg: 8,
    status: 'accepted'
  },
  {
    type: 'order',
    id: '#ORD789',
    date: '2024-03-13',
    route: 'Bordeaux → Paris',
    letters: 3,
    kg: 2,
    status: 'delivered'
  }
];

export const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[900px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="flex gap-8 mb-8">
            <div className="w-1/3">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-100 dark:ring-primary-900"
                  />
                  <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                    user.type === 'partner' ? 'bg-primary-500' : 'bg-secondary-500'
                  }`}></span>
                </div>
                <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">{user.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                  user.type === 'partner' 
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400'
                    : 'bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-400'
                }`}>
                  {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="w-2/3 grid grid-cols-2 gap-4">
              <StatCard
                title="Cancel Rate"
                value={`${user.stats.cancelRate}%`}
                trend={-2}
                icon={<AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
                className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800"
                trendClassName="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40"
              />
              <StatCard
                title="Completion Rate"
                value={`${user.stats.completionRate}%`}
                trend={5}
                icon={<CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800"
                trendClassName="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40"
              />
              <StatCard
                title="Avg Response Time"
                value={user.stats.responseTime}
                trend={-10}
                icon={<Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                className="bg-primary-50/50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800"
                trendClassName="text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40"
              />
              <StatCard
                title="Rating"
                value={`${user.stats.rating}/5`}
                trend={8}
                icon={<Package className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />}
                className="bg-secondary-50/50 dark:bg-secondary-900/20 border-2 border-secondary-100 dark:border-secondary-800"
                trendClassName="text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-900/40"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">ID</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Route</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Letters</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Weight</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr 
                    key={index}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        activity.type === 'request'
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
                          : activity.type === 'offer'
                          ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400'
                          : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                      }`}>
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-primary-600 dark:text-primary-400 font-medium">
                      {activity.id}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{activity.date}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{activity.route}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{activity.letters}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{activity.kg} kg</td>
                    <td className="p-4">
                      <StatusBadge status={activity.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};