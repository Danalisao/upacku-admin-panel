import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

interface FeatureSettingsModalProps {
  feature: {
    id: string;
    name: string;
    settings?: {
      [key: string]: string | number | boolean;
    };
  };
  onClose: () => void;
  onSave: (settings: any) => void;
}

export const FeatureSettingsModal: React.FC<FeatureSettingsModalProps> = ({
  feature,
  onClose,
  onSave
}) => {
  const [settings, setSettings] = useState(feature.settings || {});

  const handleSave = () => {
    onSave(settings);
  };

  const renderSettingInput = (key: string, value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return (
        <select
          value={String(settings[key])}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value === 'true' })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      );
    }

    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: Number(e.target.value) })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      );
    }

    return (
      <input
        type="text"
        value={settings[key]}
        onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />
    );
  };

  const formatSettingName = (key: string) => {
    return key
      .split(/(?=[A-Z])|_/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[600px] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {feature.name} Settings
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formatSettingName(key)}
              </label>
              {renderSettingInput(key, value)}
            </div>
          ))}

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};