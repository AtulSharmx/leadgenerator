import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileSpreadsheet, FileDown, Check, Download } from 'lucide-react';
import { AuthContext } from '../App';

function ExportModal({ isOpen, onClose, businesses, city, niche }) {
  const [exporting, setExporting] = useState(null);
  const [exported, setExported] = useState(null);
  const { addToast } = useContext(AuthContext);
  
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  const handleExport = async (format) => {
    setExporting(format);
    
    try {
      const endpoint = `${backendUrl}/api/export/${format}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ businesses, city, niche })
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const extensions = { csv: 'csv', excel: 'xlsx', pdf: 'pdf' };
      a.download = `leads-${city}-${niche}.${extensions[format]}`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setExported(format);
      addToast(`Exported as ${format.toUpperCase()} successfully!`, 'success');
      
      setTimeout(() => {
        setExported(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Export error:', error);
      addToast('Failed to export. Please try again.', 'error');
    } finally {
      setExporting(null);
    }
  };
  
  const exportOptions = [
    {
      id: 'csv',
      label: 'CSV',
      description: 'Spreadsheet compatible',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'pdf',
      label: 'PDF',
      description: 'Branded report',
      icon: <FileDown className="w-6 h-6" />
    },
    {
      id: 'excel',
      label: 'Excel',
      description: 'Full spreadsheet',
      icon: <FileSpreadsheet className="w-6 h-6" />
    }
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50"
          />
          
          {/* Modal */}
          <motion.div
            data-testid="export-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-xl text-white">Export Leads</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
              
              {/* Export count info */}
              <p className="text-white/60 text-sm mb-6">
                Exporting {businesses.length} leads from {niche} in {city}
              </p>
              
              {/* Export options */}
              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    data-testid={`export-${option.id}-btn`}
                    onClick={() => handleExport(option.id)}
                    disabled={exporting !== null}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      exported === option.id
                        ? 'bg-success/20 border-success/30'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-primary/30'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      exported === option.id ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'
                    }`}>
                      {exported === option.id ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <Check className="w-6 h-6" />
                        </motion.div>
                      ) : exporting === option.id ? (
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        option.icon
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{option.label}</div>
                      <div className="text-sm text-white/50">{option.description}</div>
                    </div>
                    <Download className="w-5 h-5 text-white/30" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ExportModal;
