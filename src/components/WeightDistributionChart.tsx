import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import { Scale } from 'lucide-react';

const COLORS = ['#22BB9C', '#FFD300', '#FF6B6B', '#4ECDC4'];

interface WeightDistributionChartProps {
  data: {
    range: string;
    count: number;
    percentage: number;
  }[];
}

export const WeightDistributionChart: React.FC<WeightDistributionChartProps> = ({ data }) => {
  const totalPackages = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary-500" />
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Package Weight Distribution</h3>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Packages: {totalPackages.toLocaleString()}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center space-y-4 pl-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.range}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.count.toLocaleString()} packages ({item.percentage}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};