/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0d2b5e',
          dark: '#081c3f',
          mid: '#1a4080',
          light: '#e8efff',
        },
        sky: {
          brand: '#3b82f6',
          light: '#dbeafe',
        },
        teal: {
          brand: '#0d9488',
        },
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.05)',
        hover: '0 12px 32px rgba(0,0,0,0.12)',
        cta: '0 6px 20px rgba(13,43,94,0.30)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease both',
        'fade-in': 'fadeIn 0.35s ease both',
        'pulse-slow': 'pulse 2s ease infinite',
        'spin-slow': 'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
