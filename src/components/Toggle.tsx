import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
        enabled ? 'bg-primary-500' : 'bg-gray-200'
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </Switch>
  );
};