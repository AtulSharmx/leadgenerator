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
    success: 'bg-success/20 border-success/30',
    error: 'bg-error/20 border-error/30',
    warning: 'bg-warning/20 border-warning/30',
    info: 'bg-info/20 border-info/30'
  };
  
  return (
    <motion.div
      data-testid="toast-notification"
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl border ${bgColors[type]} backdrop-blur-xl min-w-[300px] max-w-[400px]`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colors[type]} flex items-center justify-center text-white`}>
          {icons[type]}
        </div>
        <p className="flex-1 text-sm text-white font-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div className={`h-full ${colors[type]} toast-progress`} />
      </div>
    </motion.div>
  );
}

export default Toast;
