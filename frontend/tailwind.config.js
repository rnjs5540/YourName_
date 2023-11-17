/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '35': '35px',
        '36': '45px',
        '37': '50px',
        '38': '55px',
        '39': '60px',
        '31': '65px',
        '32': '70px',
        '33': '75px'
      }
    },
  },
  plugins: [],
}

