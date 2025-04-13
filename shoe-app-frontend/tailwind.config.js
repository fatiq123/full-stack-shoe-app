// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        secondary: '#F59E0B',
        secondaryHover: '#D97706',
        dark: '#1F2937',
        darkSecondary: '#374151',
        light: '#F3F4F6',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
