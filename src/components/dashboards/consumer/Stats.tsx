
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsProps {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: any;
  }>;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="glass-card rounded-xl p-6 animate-fade-in" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/60 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <div className={`flex items-center mt-2 text-xs font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </div>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              {typeof stat.icon === 'function' 
                ? <stat.icon />
                : React.createElement(stat.icon, { className: "h-5 w-5 text-primary" })
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
