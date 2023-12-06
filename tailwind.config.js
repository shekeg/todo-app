/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        brand: {
          100: '#E7F3FF',
          500: '#007FFF',
        },
        purple: {
          1000: '#3F3D56',
        },
      },
    },
  },
  plugins: [],
};
