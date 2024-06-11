/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  ]
  ,
  theme: {
    extend: {
      colors : {
        'primary-grey' : "#797979",
        'primary-yellow' : "#FFD542",
        "primary-black" : "#242424",
        'primary-white' : "#f6f6f6",
        'primary-blue' : "#1c4ed9"
      }
    },
  },
  plugins: [

  ],
}

