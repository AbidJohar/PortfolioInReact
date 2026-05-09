/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Geometra: ['Geometra', 'sans-serif'],
        RocketBrush: ['RocketBrush', 'sans-serif'], // add this
      }

    },
  },
  plugins: [],
};
