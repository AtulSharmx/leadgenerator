import React from 'react';
import { motion } from 'framer-motion';

function SkeletonCard({ index }) {
  return (
    <motion.div
      data-testid="skeleton-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card relative overflow-hidden"
    >
      {/* Category strip skeleton */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10" />
      
      <div className="p-5 pl-6">
        {/* Header skeleton */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="h-6 w-3/4 bg-white/5 rounded shimmer mb-2" />
            <div className="h-4 w-1/3 bg-white/5 rounded shimmer" />
          </div>
          <div className="h-6 w-20 bg-white/5 rounded-full shimmer" />
        </div>
        
        {/* Details skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-4 w-2/3 bg-white/5 rounded shimmer" />
          <div className="h-4 w-1/2 bg-white/5 rounded shimmer" />
          <div className="h-4 w-full bg-white/5 rounded shimmer" />
        </div>
        
        {/* Actions skeleton */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-white/5 rounded-lg shimmer" />
          <div className="flex-1 h-10 bg-white/5 rounded-lg shimmer" />
        </div>
      </div>
    </motion.div>
  );
}

export default SkeletonCard;
