import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { AuthContext } from '../App';

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function LoginPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  const handleGoogleLogin = () => {
    setIsRedirecting(true);
    // Dynamically construct redirect URL using window.location.origin
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FF8B5B] flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-text-muted">
            Sign in to start generating leads
          </p>
        </motion.div>
        
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8"
        >
          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-text-secondary">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Unlimited lead searches</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Secure Google authentication</span>
            </div>
          </div>
          
          {/* Google Sign In Button */}
          <motion.button
            data-testid="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={isRedirecting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-text-primary text-white font-semibold hover:bg-text-primary/90 transition-all shadow-lg disabled:opacity-70"
          >
            {isRedirecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </>
            )}
          </motion.button>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-text-muted uppercase tracking-wider">Secure & Fast</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
          
          {/* Info */}
          <p className="text-text-muted text-xs text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            Your data is encrypted and secure.
          </p>
        </motion.div>
        
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <a href="/" className="text-text-muted hover:text-text-primary text-sm transition-colors">
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
