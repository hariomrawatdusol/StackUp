/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        bg: '#0A0A0B',
        pink: { DEFAULT: '#FF2E7E' },
        mint: { DEFAULT: '#00FFA3' },
        border: 'rgba(255,255,255,0.10)',
        input: 'rgba(255,255,255,0.10)',
        ring: '#7B2FFF',
        background: '#0A0A0B',
        foreground: '#FFFFFF',
        muted: { DEFAULT: 'rgba(255,255,255,0.05)', foreground: '#A1A1AA' },
        card: { DEFAULT: 'rgba(255,255,255,0.04)', foreground: '#FFFFFF' },
        popover: { DEFAULT: '#141416', foreground: '#FFFFFF' },
        primary: { DEFAULT: '#7B2FFF', foreground: '#FFFFFF' },
        secondary: { DEFAULT: 'rgba(255,255,255,0.06)', foreground: '#FFFFFF' },
        accent: { DEFAULT: 'rgba(255,255,255,0.08)', foreground: '#FFFFFF' },
        destructive: { DEFAULT: '#FF3B3B', foreground: '#FFFFFF' },
      },
      backgroundImage: {
        'stack-gradient': 'linear-gradient(135deg, #7B2FFF 0%, #00C2FF 100%)',
        'pink-gradient': 'linear-gradient(135deg, #FF2E7E 0%, #7B2FFF 100%)',
        'mint-gradient': 'linear-gradient(135deg, #00FFA3 0%, #00C2FF 100%)',
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(60px,-40px) scale(1.15)' },
          '66%': { transform: 'translate(-40px,60px) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'blob-slow': 'blob 20s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        wiggle: 'wiggle 400ms ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
