/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        custom: ['MyCustomFont2', 'sans-serif'], 
      },
      screens: {
        '3xl': '1630px',
      },
  
    },
  },
  plugins: [

  ],
}

