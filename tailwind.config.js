/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00aaff",
        secondary: "#282641",
        background: "#F2F2F2",
        icons: "#817E8B",
      }
    },
  },
  plugins: [],
}

