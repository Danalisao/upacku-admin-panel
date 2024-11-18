import React from 'react';
import clsx from 'clsx';
import { CheckCircle, Clock, XCircle, Send, AlertCircle } from 'lucide-react';

type StatusType = 'delivered' | 'pending' | 'cancelled' | 'accepted' | 'in-transit';

interface StatusBadgeProps {
  status: StatusType | string;
}

const statusConfig: Record<string, { icon: typeof CheckCircle; className: string }> = {
  delivered: {
    icon: CheckCircle,
    className: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
  pending: {
    icon: Clock,
    className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  cancelled: {
    icon: XCircle,
    className: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  },
  accepted: {
    icon: CheckCircle,
    className: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-800',
  },
  'in-transit': {
    icon: Send,
    className: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Convert status to lowercase and replace spaces with hyphens for consistency
  const normalizedStatus = status.toLowerCase().replace(' ', '-');
  
  // Use the configured status or fallback to a default
  const config = statusConfig[normalizedStatus] || {
    icon: AlertCircle,
    className: 'bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800',
  };

  const Icon = config.icon;

  return (
    <span
      className={clsx(
        'px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5',
        'border transition-all duration-300 hover:shadow-sm',
        config.className
      )}
    >
      <Icon size={14} />
      <span className="capitalize">{status}</span>
    </span>
  );
};