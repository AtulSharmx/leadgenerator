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
      <span className="text-text-muted text-sm mr-2 flex items-center">Filters:</span>
      {filterOptions.map((option) => (
        <button
          key={option.id}
          data-testid={`filter-${option.id}`}
          onClick={() => toggleFilter(option.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filters[option.id]
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-white border border-black/10 text-text-secondary hover:border-black/20 hover:text-text-primary'
          }`}
        >
          {option.label}
        </button>
      ))}
    </motion.div>
  );
}

export default Filters;
