// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Tambahkan jalur konten di sini
  theme: {
    extend: {
      fontSize: {
        'h1': '32px',
        'h2': '28px',
        'h3': '24px',
        'h4': '20px',
        'h5': '16px',
        'h6': '12px',
      },
      colors: {
        lightGray: '#F1F1F1',
        offWhite: '#EDF2F7',
        darkBlue: '#0D3B66',
        brightYellow: '#FDB813',
      },
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.h1') },
        'h2': { fontSize: theme('fontSize.h2') },
        'h3': { fontSize: theme('fontSize.h3') },
        'h4': { fontSize: theme('fontSize.h4') },
        'h5': { fontSize: theme('fontSize.h5') },
        'h6': { fontSize: theme('fontSize.h6') },
      });
    }
  ]
}
