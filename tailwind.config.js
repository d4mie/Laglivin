/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        ink: "#0f172a",
      },
      boxShadow: {
        subtle: "0 10px 40px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

