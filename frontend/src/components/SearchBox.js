import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase } from 'lucide-react';

const quickNiches = [
  'Gym', 'Salon', 'Restaurant', 'Real Estate', 
  'Hospital', 'Hotel', 'School', 'Clinic'
];

function SearchBox({ onSearch, isLoading }) {
  const [city, setCity] = useState('');
  const [niche, setNiche] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && niche) {
      onSearch(city, niche);
    }
  };
  
  const handleNicheClick = (selectedNiche) => {
    setNiche(selectedNiche);
  };
  
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
      className="glass-card p-6 md:p-8"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* City Input */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              data-testid="city-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 input-glow transition-all text-lg"
            />
          </div>
          
          {/* Niche Input */}
          <div className="flex-1 relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              data-testid="niche-input"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Business type (e.g., Gym, Salon)..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 input-glow transition-all text-lg"
            />
          </div>
        </div>
        
        {/* Quick Niche Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quickNiches.map((item) => (
            <button
              key={item}
              type="button"
              data-testid={`quick-chip-${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => handleNicheClick(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                niche === item
                  ? 'bg-primary text-white'
                  : 'bg-white/[0.03] border border-white/10 text-white/70 hover:bg-primary/20 hover:border-primary/30 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Search Button */}
        <motion.button
          data-testid="search-submit-button"
          type="submit"
          disabled={!city || !niche || isLoading}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden ${
            city && niche
              ? 'bg-gradient-to-r from-primary to-[#FF8B5B] text-white pulse-glow btn-shimmer'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find Leads
              </>
            )}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}

export default SearchBox;
