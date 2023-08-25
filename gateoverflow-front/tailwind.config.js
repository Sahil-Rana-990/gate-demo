/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        '2':"2px"
      }
    },

    screens: {
      'xs': {'min': '320px', 'max': '426px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'sm': {'min': '425px', 'max': '1025px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }


      'md': {'min': '1024px', 'max': '1440px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      'lg': {'min': '2560px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

