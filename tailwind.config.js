const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tangerine: ['"Tangerine"', 'cursive'],
      },
      backgroundImage: {
        hearts: "url('/backgrounds/backgroundhearts.jpg')",
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0 },
        },
        pulseGlow: {
          '0%, 100%': {
            textShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
          },
          '50%': {
            textShadow: '0 0 16px rgba(255, 255, 255, 1)',
          },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '25%': { opacity: '0.8' },
          '75%': { opacity: '0.8' },
          '100%': { opacity: '0' },
        },
        pulseGlowRed: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(255, 0, 0, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(255, 0, 0, 0.9)',
          },
        },
        pulseGlowPink: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(255, 20, 147, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(255, 20, 147, 0.9)',
          },
        },
        pulseGlowPurple: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(128, 90, 213, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(128, 90, 213, 0.9)',
          },
        },
      },
      animation: {
        'float-heart': 'float 8s linear infinite',
        'fade-in-out': 'fadeInOut 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-glow-red': 'pulseGlowRed 1.5s ease-in-out infinite',
        'pulse-glow-pink': 'pulseGlowPink 1.5s ease-in-out infinite',
        'pulse-glow-purple': 'pulseGlowPurple 1.5s ease-in-out infinite',
      },
      dropShadow: {
        'strong-tight': '0 2px 2px rgba(0, 0, 0, 0.7)',
        'glow-red': '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.glow-white': {
          textShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
        },
        '.no-drop-shadow': {
          filter: 'none',
        },
      });
    }),
  ],
};

