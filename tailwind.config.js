module.exports = {
  content: [
    '../pages/**/*.{js,ts,jsx,tsx}',
    '../components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hearts: "url('/backgrounds/backgroundhearts.jpg')",
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0 }
        }
      },
      animation: {
        'float-heart': 'float 8s linear infinite',
      },
      dropShadow: {
        'strong-tight': '0 2px 2px rgba(0, 0, 0, 0.7)', // new custom shadow
      },
    },
  },
  plugins: [],
};

