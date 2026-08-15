/* Design tokens for the Tailwind Play CDN. Must load before it initializes. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
      colors: {
        p: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
        },
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fall: {
          '0%': { transform: 'translateY(-10px) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(600deg)', opacity: '0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(.3)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up .22s ease-out',
        'scale-in': 'scale-in .2s ease-out',
        shimmer: 'shimmer 2.5s linear infinite',
        'bounce-in': 'bounce-in .4s ease-out',
      },
    },
  },
};