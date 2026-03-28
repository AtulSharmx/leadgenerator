import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Globe, Ban } from 'lucide-react';

function StatsBox({ total, hasWebsite, noWebsite, isVisible }) {
  const [startCount, setStartCount] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setStartCount(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  const stats = [
    {
      id: 'total',
      label: 'Total Leads',
      value: total,
      icon: <Users className="w-6 h-6" />,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      id: 'website',
      label: 'Have Website',
      value: hasWebsite,
      icon: <Globe className="w-6 h-6" />,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      id: 'nowebsite',
      label: 'No Website',
      value: noWebsite,
      icon: <Ban className="w-6 h-6" />,
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          data-testid={`stat-${stat.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`glass-card p-6 border ${stat.borderColor}`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className={`text-3xl font-heading font-bold ${stat.color}`}>
                {startCount ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={1}
                    separator=","
                  />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsBox;
