import React from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-text-muted" />
      </div>
      <h3 className="font-heading font-bold text-2xl text-text-primary mb-2 text-center">
        No businesses found
      </h3>
      <p className="text-text-muted text-center max-w-md">
        We couldn't find any businesses in this area. Try a different city or niche to discover more leads.
      </p>
    </motion.div>
  );
}

export default EmptyState;
