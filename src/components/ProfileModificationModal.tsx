import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Check, X, AlertTriangle } from 'lucide-react';

interface ProfileChange {
  field: string;
  oldValue: string;
  newValue: string;
}

interface ProfileModificationModalProps {
  modification: {
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
    changes: ProfileChange[];
    status: 'pending' | 'approved' | 'rejected';
  };
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ProfileModificationModal: React.FC<ProfileModificationModalProps> = ({
  modification,
  onClose,
  onApprove,
  onReject
}) => {
  const handleApprove = () => {
    onApprove(modification.id);
    onClose();
  };

  const handleReject = () => {
    onReject(modification.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[800px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Profile Modification Request
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)] space-y-6">
          {/* User Info */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center gap-4">
              <img
                src={modification.user.avatar}
                alt={modification.user.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
              />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  {modification.user.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {modification.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Member since {modification.user.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Request Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Requested on {modification.requestDate}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Reason for change:</span>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {modification.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Changes Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Requested Changes</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Field</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Current Value</th>
                  <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-medium">Requested Value</th>
                </tr>
              </thead>
              <tbody>
                {modification.changes.map((change, index) => (
                  <tr 
                    key={index}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                      {change.field}
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {change.oldValue}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 px-2 py-1 rounded">
                        {change.newValue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          {modification.status === 'pending' && (
            <div className="flex justify-end gap-4">
              <button
                onClick={handleReject}
                className="px-4 py-2 flex items-center gap-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Reject Changes
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 flex items-center gap-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Check className="w-4 h-4" />
                Approve Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};