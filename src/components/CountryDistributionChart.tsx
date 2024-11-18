import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

interface CountryDistributionChartProps {
  data: {
    country: string;
    users: number;
    partners: number;
  }[];
}

export const CountryDistributionChart: React.FC<CountryDistributionChartProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
          <XAxis 
            dataKey="country" 
            stroke="currentColor" 
            className="text-gray-600 dark:text-gray-400"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="currentColor" 
            className="text-gray-600 dark:text-gray-400"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar 
            dataKey="partners" 
            fill="#22BB9C" 
            radius={[4, 4, 0, 0]} 
            name="Partners"
          />
          <Bar 
            dataKey="users" 
            fill="#FFD300" 
            radius={[4, 4, 0, 0]} 
            name="Customers"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};