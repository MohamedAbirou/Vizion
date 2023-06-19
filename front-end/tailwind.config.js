/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '280px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        cyan: 'rgba(0, 194, 255, 1)',
        pitchBlack: '#202020',
        darkBlack: '#181818',
        halfBlack: '#A1A1A1'
      },
      fontFamily: {
        akira: ['Akira Expanded', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      boxShadow: {
        glow : '0px 0px 20px'
      }
    },
  },
  plugins: [],
}