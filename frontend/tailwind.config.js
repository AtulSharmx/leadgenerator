/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6',
        primary: '#FF6B2B',
        'primary-hover': '#E55A1F',
        surface: 'rgba(255, 255, 255, 0.8)',
        'surface-border': 'rgba(0, 0, 0, 0.06)',
        'text-primary': '#1A1A2E',
        'text-secondary': '#4A4A68',
        'text-muted': '#8A8AA3',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#EAB308',
        info: '#3B82F6'
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        body: ['DM Sans', 'sans-serif']
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-up': 'scale-up 0.5s ease-out forwards',
        'count-up': 'count-up 1s ease-out forwards'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 43, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 43, 0.4)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backdropBlur: {
        xl: '24px'
      }
    }
  },
  plugins: []
}
