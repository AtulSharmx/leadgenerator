import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { AuthContext } from '../App';

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function AuthCallback() {
  const hasProcessed = useRef(false);
  const navigate = useNavigate();
  const { setUser, addToast } = useContext(AuthContext);
  
  useEffect(() => {
    // Use useRef to prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    
    const processAuth = async () => {
      try {
        // Extract session_id from URL fragment
        const hash = window.location.hash;
        const sessionId = hash.split('session_id=')[1]?.split('&')[0];
        
        if (!sessionId) {
          throw new Error('No session ID found');
        }
        
        // Exchange session_id for session token via backend
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ sessionId })
        });
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        
        const data = await response.json();
        setUser(data.user);
        
        // Clear the hash and redirect to dashboard
        window.history.replaceState(null, '', '/dashboard');
        navigate('/dashboard', { replace: true, state: { user: data.user } });
        
        if (addToast) {
          addToast(`Welcome, ${data.user.name}!`, 'success');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        if (addToast) {
          addToast('Authentication failed. Please try again.', 'error');
        }
        navigate('/login', { replace: true });
      }
    };
    
    processAuth();
  }, [navigate, setUser, addToast]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FF8B5B] flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="w-9 h-9 text-white" />
          </div>
        </div>
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-primary font-medium">Signing you in...</p>
        <p className="text-text-muted text-sm mt-1">Please wait a moment</p>
      </motion.div>
    </div>
  );
}

export default AuthCallback;
