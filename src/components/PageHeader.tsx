import React from 'react';
import clsx from 'clsx';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  actions,
  className
}) => {
  return (
    <div className={clsx('flex items-center justify-between mb-8', className)}>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        {title}
        {icon && <span>{icon}</span>}
      </h1>
      {actions && <div className="flex gap-4">{actions}</div>}
    </div>
  );
};