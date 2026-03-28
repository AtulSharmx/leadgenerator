import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, AlertTriangle } from 'lucide-react';

function Toast({ message, type = 'success', onClose }) {
  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };
  
  const colors = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info'
  };
  
  const bgColors = {
    success: 'bg-white border-success/30',
    error: 'bg-white border-error/30',
    warning: 'bg-white border-warning/30',
    info: 'bg-white border-info/30'
  };
  
  const textColors = {
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info'
  };
  
  return (
    <motion.div
      data-testid="toast-notification"
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl border shadow-lg ${bgColors[type]} min-w-[300px] max-w-[400px]`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colors[type]} flex items-center justify-center text-white`}>
          {icons[type]}
        </div>
        <p className={`flex-1 text-sm font-medium ${textColors[type]}`}>{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
        <div className={`h-full ${colors[type]} toast-progress`} />
      </div>
    </motion.div>
  );
}

export default Toast;
