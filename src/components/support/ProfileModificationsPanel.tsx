import React, { useState } from 'react';
import { Search, Filter, Check, X } from 'lucide-react';
import { ProfileModificationModal } from '../ProfileModificationModal';

interface ProfileModification {
  id: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
  };
  requestDate: string;
  reason: string;
  changes: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
  status: 'pending' | 'approved' | 'rejected';
}

const mockModifications: ProfileModification[] = [
  {
    id: 'MOD001',
    userId: 'USR001',
    user: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      email: 'sophie.martin@email.com',
      phone: '+33 6 12 34 56 78',
      address: 'Paris, France',
      joinDate: 'March 15, 2024'
    },
    requestDate: '2024-03-15',
    reason: 'Updated phone number and address after moving to a new location',
    changes: [
      {
        field: 'Phone Number',
        oldValue: '+33 6 11 11 11 11',
        newValue: '+33 6 12 34 56 78'
      },
      {
        field: 'Address',
        oldValue: 'Lyon, France',
        newValue: 'Paris, France'
      }
    ],
    status: 'pending'
  },
  {
    id: 'MOD002',
    userId: 'USR002',
    user: {
      name: 'Thomas Bernard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      email: 'thomas.bernard@email.com',
      phone: '+33 6 98 76 54 32',
      address: 'Lyon, France',
      joinDate: 'March 14, 2024'
    },
    requestDate: '2024-03-14',
    reason: 'Correcting name spelling',
    changes: [
      {
        field: 'Name',
        oldValue: 'Thomas Bernhard',
        newValue: 'Thomas Bernard'
      }
    ],
    status: 'pending'
  }
];

export const ProfileModificationsPanel = () => {
  const [selectedModification, setSelectedModification] = useState<ProfileModification | null>(null);
  const [modifications, setModifications] = useState(mockModifications);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApprove = (id: string) => {
    setModifications(mods => 
      mods.map(mod => 
        mod.id === id ? { ...mod, status: 'approved' as const } : mod
      )
    );
  };

  const handleReject = (id: string) => {
    setModifications(mods => 
      mods.map(mod => 
        mod.id === id ? { ...mod, status: 'rejected' as const } : mod
      )
    );
  };

  const filteredModifications = modifications.filter(mod => 
    filter === 'all' || mod.status === filter
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700/50
                       text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">User</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Request Date</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Changes</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModifications.map((modification) => (
              <tr 
                key={modification.id}
                className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={modification.user.avatar}
                      alt={modification.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {modification.user.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {modification.user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">
                  {modification.requestDate}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                    {modification.changes.length} field{modification.changes.length !== 1 ? 's' : ''}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    modification.status === 'pending'
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                      : modification.status === 'approved'
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
                  }`}>
                    {modification.status.charAt(0).toUpperCase() + modification.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedModification(modification)}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      View Details
                    </button>
                    {modification.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(modification.id)}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(modification.id)}
                          className="p-1 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedModification && (
        <ProfileModificationModal
          modification={selectedModification}
          onClose={() => setSelectedModification(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};