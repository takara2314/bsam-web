/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '"M PLUS 1p"', 'Meiryo', 'sans-serif'],
        'time': ['JetBrains Mono', 'Inter', 'Meiryo', 'sans-serif']
      }
    }
  }
};
