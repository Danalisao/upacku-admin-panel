import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Toggle } from '../components/Toggle';
import { FeatureSettingsModal } from '../components/FeatureSettingsModal';
import { 
  Info, 
  Smartphone, 
  Shield, 
  Zap, 
  Map, 
  Bell, 
  Gift,
  MessageSquare,
  UserCheck,
  Wallet,
  Camera,
  Globe,
  Search,
  DollarSign,
  Percent,
  Settings
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  category: string;
  impact: 'critical' | 'high' | 'medium';
  settings?: {
    [key: string]: string | number | boolean;
  };
}

const initialFeatures: Feature[] = [
  {
    id: 'real-time-tracking',
    name: 'Real-time Package Tracking',
    description: 'Enable users to track their packages in real-time on the map with live updates',
    icon: Map,
    enabled: true,
    category: 'core',
    impact: 'high',
    settings: {
      updateInterval: 30,
      accuracyThreshold: 100
    }
  },
  {
    id: 'push-notifications',
    name: 'Smart Notifications',
    description: 'Personalized push notifications for delivery updates, nearby travelers, and promotions',
    icon: Bell,
    enabled: true,
    category: 'engagement',
    impact: 'medium',
    settings: {
      deliveryUpdates: true,
      promotions: true,
      nearbyAlerts: true
    }
  },
  {
    id: 'instant-quotes',
    name: 'Dynamic Pricing',
    description: 'Real-time price calculations based on distance, weight, and current demand',
    icon: Zap,
    enabled: false,
    category: 'pricing',
    impact: 'high',
    settings: {
      demandMultiplier: 1.5,
      minPricePerKm: 0.5
    }
  },
  {
    id: 'secure-payments',
    name: 'Secure Transactions',
    description: 'End-to-end encrypted payment processing with multi-currency support',
    icon: Shield,
    enabled: true,
    category: 'security',
    impact: 'critical',
    settings: {
      maxTransactionLimit: 5000,
      requireVerification: true
    }
  },
  {
    id: 'loyalty-program',
    name: 'Rewards Program',
    description: 'Points system for frequent users with special perks and discounts',
    icon: Gift,
    enabled: false,
    category: 'engagement',
    impact: 'medium',
    settings: {
      pointsPerEuro: 10,
      minimumRedemption: 1000
    }
  },
  {
    id: 'chat',
    name: 'In-app Messaging',
    description: 'Secure chat system for travelers and senders to coordinate deliveries',
    icon: MessageSquare,
    enabled: true,
    category: 'communication',
    impact: 'high',
    settings: {
      mediaSharing: true,
      retentionDays: 30
    }
  },
  {
    id: 'verification',
    name: 'ID Verification',
    description: 'Advanced identity verification system for enhanced security',
    icon: UserCheck,
    enabled: true,
    category: 'security',
    impact: 'critical',
    settings: {
      requireSelfie: true,
      documentTypes: ['passport', 'id_card', 'drivers_license']
    }
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    description: 'Integrated wallet for instant payments and earnings management',
    icon: Wallet,
    enabled: true,
    category: 'payments',
    impact: 'high',
    settings: {
      maxBalance: 10000,
      instantTransfers: true
    }
  },
  {
    id: 'package-photos',
    name: 'Package Photos',
    description: 'Photo documentation system for package condition verification',
    icon: Camera,
    enabled: true,
    category: 'core',
    impact: 'medium',
    settings: {
      minPhotos: 2,
      maxPhotos: 5,
      compressionQuality: 0.8
    }
  },
  {
    id: 'route-matching',
    name: 'Smart Route Matching',
    description: 'AI-powered algorithm to match packages with optimal travel routes',
    icon: Globe,
    enabled: true,
    category: 'core',
    impact: 'high',
    settings: {
      maxDetourPercent: 15,
      minMatchScore: 0.8
    }
  },
  {
    id: 'minimum-price',
    name: 'Minimum Price Threshold',
    description: 'Set minimum price limits for deliveries to ensure fair compensation',
    icon: DollarSign,
    enabled: true,
    category: 'pricing',
    impact: 'high',
    settings: {
      perDocMinimum: 5,
      perKgMinimum: 5
    }
  },
  {
    id: 'protection-fee',
    name: 'Protection Fee Percentage',
    description: 'Configurable protection fee percentage for package insurance and guarantees',
    icon: Percent,
    enabled: true,
    category: 'pricing',
    impact: 'critical',
    settings: {
      percentage: 5
    }
  }
];

const categories = [
  { id: 'all', label: 'All Features' },
  { id: 'core', label: 'Core Features' },
  { id: 'security', label: 'Security' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'payments', label: 'Payments' },
  { id: 'communication', label: 'Communication' },
  { id: 'pricing', label: 'Pricing' }
];

const impactColors = {
  critical: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400',
  high: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
  medium: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
};

export const Features = () => {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (featureId: string) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === featureId
          ? { ...feature, enabled: !feature.enabled }
          : feature
      )
    );
  };

  const handleSettingsUpdate = (featureId: string, newSettings: any) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === featureId
          ? { ...feature, settings: { ...feature.settings, ...newSettings } }
          : feature
      )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Features Management"
        icon={<Smartphone className="text-primary-500" />}
        actions={
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
            <Info size={16} />
            <span>Changes are automatically synced to the mobile app</span>
          </div>
        }
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700">
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700/50 w-64
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-2 border-transparent 
                     hover:border-primary-100 dark:hover:border-primary-800 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-lg">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{feature.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${impactColors[feature.impact]}`}>
                      {feature.impact.charAt(0).toUpperCase() + feature.impact.slice(1)} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className="p-2 text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 
                           hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <span className={`text-sm ${
                  feature.enabled 
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <Toggle
                  enabled={feature.enabled}
                  onChange={() => handleToggle(feature.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <FeatureSettingsModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
          onSave={(settings) => {
            handleSettingsUpdate(selectedFeature.id, settings);
            setSelectedFeature(null);
          }}
        />
      )}
    </div>
  );
};