/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'p-primary': '#40b85c4f',
        'p-secundary': '#1a893c',
        't-primary': '#1a893c',
        'p-from': '#FFFFFF',
        'p-bw': '#d9e0e3',
        'p-to': '#00a99d;',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // Ajusta los temas según tus necesidades
  },
};


