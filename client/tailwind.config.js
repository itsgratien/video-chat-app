module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '#F6F6F6',
        secondaryColor: '#03071E',
      },
    },
    colors: {
      black: '#03071E',
      white: '#fff',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
