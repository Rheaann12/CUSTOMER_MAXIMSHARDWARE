/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        'pt-serif': ['PT Serif', 'serif'],
      },
      colors: {
        'hardware-green': '#5cb85c',
        'hardware-green-dark': '#4cae4c',
        'hardware-dark-green': '#144724',
      }
    },
  },
  plugins: [],
}

