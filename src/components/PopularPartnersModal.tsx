import React from 'react';
import { Users, Star, Package, TrendingUp } from 'lucide-react';

const popularPartners = [
  {
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 4.9,
    deliveries: 245,
    revenue: '€12,450',
    growth: '+24%'
  },
  {
    name: 'Thomas Bernard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.8,
    deliveries: 198,
    revenue: '€9,900',
    growth: '+18%'
  },
  {
    name: 'Marie Dubois',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.7,
    deliveries: 167,
    revenue: '€8,350',
    growth: '+15%'
  }
];

export const PopularPartnersModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[800px] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Popular Partners</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {popularPartners.map((partner, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-white dark:bg-gray-700/50 border-2 border-gray-100 dark:border-gray-600
                         hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{partner.name}</h3>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {partner.growth}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-600 dark:text-gray-400">{partner.rating} Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-600 dark:text-gray-400">{partner.deliveries} Deliveries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-secondary-500" />
                        <span className="text-gray-600 dark:text-gray-400">{partner.revenue} Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};