/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kula: {
          green: '#297D6B',
          'green-light': '#66D9A6',
          'green-dark': '#14474C',
          amber: '#F2A640',
          bg: {
            dark: '#0A1F24',
            mid: '#0F2E33',
            bottom: '#141A1F',
          },
          glass: {
            fill: 'rgba(255,255,255,0.08)',
            border: 'rgba(255,255,255,0.15)',
            highlight: 'rgba(255,255,255,0.25)',
          },
          success: '#4DCC80',
          warning: '#F2B340',
          error: '#F25959',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1.02' }],
        '8xl': ['6rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight-heading': '-0.025em',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'premium-lg': '0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)',
        'premium-xl': '0 8px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.1)',
        'glow': '0 4px 24px rgba(41,125,107,0.2)',
        'glow-green': '0 4px 24px rgba(41,125,107,0.25)',
        'glow-green-lg': '0 8px 40px rgba(41,125,107,0.3)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-slow': 'fade-in-slow 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        'reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-slow': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(41,125,107,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(41,125,107,0.4)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
