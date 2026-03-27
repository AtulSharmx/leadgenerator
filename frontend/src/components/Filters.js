import React from 'react';
import { motion } from 'framer-motion';

function Filters({ filters, setFilters }) {
  const filterOptions = [
    { id: 'noWebsiteOnly', label: 'No Website Only' },
    { id: 'hasEmail', label: 'Has Email' },
    { id: 'ratingAbove4', label: 'Rating > 4' },
    { id: 'ratingBelow4', label: 'Rating < 4' }
  ];
  
  const toggleFilter = (filterId) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 mb-6"
    >
      <span className="text-white/40 text-sm mr-2 flex items-center">Filters:</span>
      {filterOptions.map((option) => (
        <button
          key={option.id}
          data-testid={`filter-${option.id}`}
          onClick={() => toggleFilter(option.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filters[option.id]
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-white/[0.03] border border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white/80'
          }`}
        >
          {option.label}
        </button>
      ))}
    </motion.div>
  );
}

export default Filters;
