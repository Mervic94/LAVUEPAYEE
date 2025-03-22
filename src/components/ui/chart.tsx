
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Chart types and their props
type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
};

type ChartOptions = {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
      display?: boolean;
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
};

interface ChartProps {
  data: ChartData;
  options?: ChartOptions;
  className?: string;
}

// Line Chart Component
export const LineChart: React.FC<ChartProps> = ({ data, options, className }) => {
  // Transform the data format from Chart.js to Recharts format
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    data.datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {options?.plugins?.legend?.display !== false && <Legend />}
          {data.datasets.map((dataset, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={Array.isArray(dataset.borderColor) ? dataset.borderColor[0] : dataset.borderColor}
              fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Bar Chart Component
export const BarChart: React.FC<ChartProps> = ({ data, options, className }) => {
  // Transform the data format from Chart.js to Recharts format
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    data.datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {options?.plugins?.legend?.display !== false && <Legend />}
          {data.datasets.map((dataset, index) => (
            <Bar
              key={index}
              dataKey={dataset.label}
              fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Pie Chart Component
export const PieChart: React.FC<ChartProps> = ({ data, options, className }) => {
  // Use the first dataset for the pie chart
  const dataset = data.datasets[0];
  
  // Transform the data format from Chart.js to Recharts format
  const transformedData = data.labels.map((label, index) => ({
    name: label,
    value: dataset.data[index]
  }));

  // Use the backgroundColor array for the pie slices
  const colors = Array.isArray(dataset.backgroundColor) 
    ? dataset.backgroundColor 
    : data.labels.map(() => dataset.backgroundColor);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={transformedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {options?.plugins?.legend?.display !== false && <Legend />}
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
