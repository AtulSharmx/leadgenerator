import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Radar } from 'lucide-react';
import { AuthContext } from '../App';
import Navbar from '../components/Navbar';
import SearchBox from '../components/SearchBox';
import StatsBox from '../components/StatsBox';
import LeadCard from '../components/LeadCard';
import SkeletonCard from '../components/SkeletonCard';
import Filters from '../components/Filters';
import ExportModal from '../components/ExportModal';
import EmptyState from '../components/EmptyState';

function HomePage() {
  const { addToast } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [displayedLeads, setDisplayedLeads] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filters, setFilters] = useState({
    noWebsiteOnly: false,
    hasEmail: false,
    ratingAbove4: false,
    ratingBelow4: false
  });
  
  const loaderRef = useRef(null);
  const pageSize = 10;
  
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  // Filter businesses
  const getFilteredBusinesses = useCallback(() => {
    if (!searchResult?.businesses) return [];
    
    return searchResult.businesses.filter(business => {
      if (filters.noWebsiteOnly && business.hasWebsite) return false;
      if (filters.hasEmail && !business.email) return false;
      if (filters.ratingAbove4 && business.rating <= 4) return false;
      if (filters.ratingBelow4 && business.rating >= 4) return false;
      return true;
    });
  }, [searchResult, filters]);
  
  // Update displayed leads when filters change
  useEffect(() => {
    if (searchResult) {
      const filtered = getFilteredBusinesses();
      setDisplayedLeads(filtered.slice(0, pageSize));
    }
  }, [searchResult, filters, getFilteredBusinesses]);
  
  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && searchResult) {
          const filtered = getFilteredBusinesses();
          if (displayedLeads.length < filtered.length) {
            setDisplayedLeads(prev => 
              filtered.slice(0, prev.length + pageSize)
            );
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [searchResult, displayedLeads.length, getFilteredBusinesses]);
  
  const handleSearch = async (city, niche) => {
    setIsLoading(true);
    setSearchResult(null);
    setDisplayedLeads([]);
    
    try {
      const response = await fetch(`${backendUrl}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, niche })
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setSearchResult(data);
      setDisplayedLeads(data.businesses.slice(0, pageSize));
      
      if (data.businesses.length === 0) {
        addToast('No businesses found in this area', 'warning');
      } else {
        addToast(`Found ${data.total} leads!`, 'success');
      }
    } catch (error) {
      console.error('Search error:', error);
      addToast('Failed to search. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredBusinesses = getFilteredBusinesses();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FF8B5B] flex items-center justify-center shadow-lg shadow-primary/30">
              <Radar className="w-9 h-9 text-white" />
            </div>
          </motion.div>
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Find Business <span className="text-primary">Leads</span> Fast
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Discover real businesses with contact details, ratings, and website status. 
            Perfect for agencies, freelancers, and sales teams.
          </motion.p>
        </div>
        
        {/* Search Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}
        
        {/* Results Section */}
        {!isLoading && searchResult && (
          <>
            {/* Stats */}
            <StatsBox
              total={filteredBusinesses.length}
              hasWebsite={filteredBusinesses.filter(b => b.hasWebsite).length}
              noWebsite={filteredBusinesses.filter(b => !b.hasWebsite).length}
              isVisible={true}
            />
            
            {/* Filters and Export */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <Filters filters={filters} setFilters={setFilters} />
              
              {filteredBusinesses.length > 0 && (
                <motion.button
                  data-testid="export-button"
                  onClick={() => setShowExportModal(true)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[#FF8B5B] text-white font-semibold btn-shimmer relative overflow-hidden"
                >
                  <Download className="w-5 h-5" />
                  Export Leads
                </motion.button>
              )}
            </div>
            
            {/* Lead Cards or Empty State */}
            {filteredBusinesses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedLeads.map((business, index) => (
                    <LeadCard key={business.id} business={business} index={index} />
                  ))}
                </div>
                
                {/* Load more trigger */}
                {displayedLeads.length < filteredBusinesses.length && (
                  <div ref={loaderRef} className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Showing count */}
                <div className="text-center text-white/40 text-sm mt-6">
                  Showing {displayedLeads.length} of {filteredBusinesses.length} leads
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}
        
        {/* Initial state - before any search */}
        {!isLoading && !searchResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-white/40">
              Enter a city and business type above to start finding leads
            </p>
          </motion.div>
        )}
      </main>
      
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        businesses={filteredBusinesses}
        city={searchResult?.city}
        niche={searchResult?.niche}
      />
    </div>
  );
}

export default HomePage;
