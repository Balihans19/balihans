/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
      },
      screens: {
        '3xl': '1630px',
      },
      fontFamily: {
        rounded: ['Gotham Rounded', 'sans-serif'], // Use the custom font name here
      },

    },
  },
  plugins: [

  ],
}

