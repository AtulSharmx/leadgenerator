import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, Mail, MapPin, Globe, Copy, Check, MessageCircle } from 'lucide-react';
import { AuthContext } from '../App';

const categoryColors = {
  'Gym': '#FF6B2B',
  'Salon': '#EC4899',
  'Restaurant': '#EAB308',
  'Real Estate': '#3B82F6',
  'Hospital': '#22C55E',
  'Hotel': '#8B5CF6',
  'School': '#06B6D4',
  'Clinic': '#10B981',
  'Default': '#6B7280'
};

function LeadCard({ business, index }) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useContext(AuthContext);
  
  const categoryColor = categoryColors[business.category] || categoryColors.Default;
  
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(business.phone);
      setCopied(true);
      addToast('Phone number copied!', 'success');
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      addToast('Failed to copy', 'error');
    }
  };
  
  const handleWhatsApp = () => {
    const phone = business.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };
  
  return (
    <motion.div
      data-testid="lead-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="glass-card glass-card-hover relative overflow-hidden"
    >
      {/* Category color strip */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: categoryColor }}
      />
      
      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-lg text-white truncate mb-1">
              {business.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium text-white">{business.rating}</span>
              </div>
              <span className="text-white/40 text-sm">({business.totalReviews} reviews)</span>
            </div>
          </div>
          
          {/* Website badge */}
          <div
            data-testid="website-badge"
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
              business.hasWebsite
                ? 'bg-success/20 text-success border border-success/30'
                : 'bg-error/20 text-error border border-error/30'
            }`}
          >
            {business.hasWebsite ? 'Has Website' : 'No Website'}
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-white/60">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{business.phone}</span>
          </div>
          
          {business.email && (
            <div className="flex items-center gap-2 text-white/60">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">{business.email}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{business.address}</span>
          </div>
          
          {business.website && (
            <div className="flex items-center gap-2 text-white/60">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm truncate hover:text-primary transition-colors"
              >
                {business.website}
              </a>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            data-testid="copy-phone-button"
            onClick={handleCopyPhone}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              copied
                ? 'bg-success/20 text-success border border-success/30'
                : 'bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Phone
              </>
            )}
          </motion.button>
          
          <motion.button
            data-testid="whatsapp-button"
            onClick={handleWhatsApp}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/30 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default LeadCard;
