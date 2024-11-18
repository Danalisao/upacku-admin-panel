import React, { useState } from 'react';
import { Wallet, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface WalletUser {
  id: string;
  name: string;
  avatar: string;
  balance: string;
  transactions: Transaction[];
  lastActivity: string;
}

const mockUsers: WalletUser[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    balance: '€2,450',
    lastActivity: '2 hours ago',
    transactions: [
      {
        id: 'TRX001',
        type: 'credit',
        amount: '€450',
        description: 'Payment received for delivery #ORD123',
        date: '2024-03-15 14:30',
        status: 'completed'
      },
      {
        id: 'TRX002',
        type: 'debit',
        amount: '€120',
        description: 'Withdrawal to bank account',
        date: '2024-03-14 09:15',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    balance: '€1,850',
    lastActivity: '5 hours ago',
    transactions: [
      {
        id: 'TRX003',
        type: 'credit',
        amount: '€320',
        description: 'Payment received for delivery #ORD124',
        date: '2024-03-15 10:45',
        status: 'completed'
      },
      {
        id: 'TRX004',
        type: 'debit',
        amount: '€200',
        description: 'Withdrawal to bank account',
        date: '2024-03-13 16:20',
        status: 'pending'
      }
    ]
  }
];

interface WalletDetailsModalProps {
  onClose: () => void;
}

export const WalletDetailsModal: React.FC<WalletDetailsModalProps> = ({ onClose }) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const toggleUser = (userId: string) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[900px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Active Wallets</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                  onClick={() => toggleUser(user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{user.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Last active {user.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="block font-medium text-emerald-600 dark:text-emerald-400">
                          {user.balance}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Current Balance
                        </span>
                      </div>
                      {expandedUser === user.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedUser === user.id && (
                  <div className="border-t border-gray-200 dark:border-gray-600">
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Transaction History
                      </h4>
                      <div className="space-y-4">
                        {user.transactions.map((transaction) => (
                          <div 
                            key={transaction.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                transaction.type === 'credit'
                                  ? 'bg-emerald-100 dark:bg-emerald-900/40'
                                  : 'bg-amber-100 dark:bg-amber-900/40'
                              }`}>
                                {transaction.type === 'credit' ? (
                                  <ArrowDownLeft className={`w-4 h-4 ${
                                    transaction.type === 'credit'
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : 'text-amber-600 dark:text-amber-400'
                                  }`} />
                                ) : (
                                  <ArrowUpRight className={`w-4 h-4 ${
                                    transaction.type === 'credit'
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : 'text-amber-600 dark:text-amber-400'
                                  }`} />
                                )}
                              </div>
                              <div>
                                <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {transaction.description}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {transaction.date}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`block font-medium ${
                                transaction.type === 'credit'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-amber-600 dark:text-amber-400'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                              </span>
                              <span className={`text-sm ${
                                transaction.status === 'completed'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : transaction.status === 'pending'
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};