/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          'dark-blue': '#35383E',
          primary: '#00ADB5',
          'dark-gray': '#818181',
          'text-gray': '#9A9C9F',
          'light-gray': '#EEEEEE',
          white: '#FFFFFF',
          background: '#F8F8F8',
          process: '#FFAA04',
          danger: '#EF4444',
          'primary-light': '#E6F7F8',
          'neutral-light': '#F4F4F5',
        },
      },
    },
  },
  plugins: [],
}
