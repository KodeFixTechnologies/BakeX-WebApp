/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", , "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-grey": "#797979",
        "primary-yellow": "#FFD542",
        "primary-black": "#242424",
        "primary-white": "#f6f6f6",
        "primary-blue": "#1c4ed9",
      },
      fontFamily: {
        "poppins-regular": ["Poppins", "sans-serif"],
        "poppins-semibold": ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
