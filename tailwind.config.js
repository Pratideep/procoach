/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      colors: {
        // ── Blue accent palette (replaces orange) ───────────────────
        'brand-blue':       '#3B82F6',   // blue-500 — primary
        'brand-blue-light': '#60A5FA',   // blue-400 — lighter
        'brand-blue-dark':  '#2563EB',   // blue-600 — darker
        dark: {
          900: '#080808',
          800: '#0D0F14',
          700: '#111827',
          600: '#1A2236',
          500: '#243044',
          400: '#2E3D55',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow':'bounce 2s infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
