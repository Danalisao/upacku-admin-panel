/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22BB9C',
          50: '#E8F7F4',
          100: '#D1F0EA',
          200: '#A3E1D5',
          300: '#75D3C0',
          400: '#47C4AB',
          500: '#22BB9C',
          600: '#1B957D',
          700: '#146F5E',
          800: '#0D4A3F',
          900: '#06241F',
        },
        secondary: {
          DEFAULT: '#FFD300',
          50: '#FFF9E5',
          100: '#FFF4CC',
          200: '#FFE999',
          300: '#FFDF66',
          400: '#FFD933',
          500: '#FFD300',
          600: '#CCA900',
          700: '#997F00',
          800: '#665400',
          900: '#332A00',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'border-flow': 'border-flow 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.8',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
};