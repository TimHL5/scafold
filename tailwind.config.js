/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        card: '#111111',
        'card-hover': '#1A1A1A',
        'border-subtle': 'rgba(255, 255, 255, 0.06)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.6)',
        'text-tertiary': 'rgba(255, 255, 255, 0.35)',
        'status-not-started': '#666666',
        'status-scheduled': '#F2C94C',
        'status-posted': '#6AC670',
        'platform-linkedin': '#0A66C2',
        'platform-instagram': '#E1306C',
        'accent-vermillion': '#E94560',
        'accent-blue': '#4361EE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
