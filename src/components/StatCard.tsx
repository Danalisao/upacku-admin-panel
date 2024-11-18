import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
  trendClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  icon,
  className,
  trendClassName
}) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div 
      className={clsx(
        'p-6 rounded-xl transition-all duration-300',
        'hover:shadow-lg',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        {icon && (
          <div className="p-2 rounded-lg bg-white">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-800">
          {value}
        </span>
        {trend && (
          <div className={clsx(
            'flex items-center gap-1 text-sm rounded-full px-3 py-1',
            'transition-transform duration-300 hover:scale-105',
            trendClassName
          )}>
            {isPositive ? 
              <TrendingUp size={14} /> : 
              <TrendingDown size={14} />
            }
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};