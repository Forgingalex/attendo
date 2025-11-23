/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'attendo-primary': '#4F46E5', // Indigo 600
        'attendo-secondary': '#EEF2FF', // Indigo Tint
        'attendo-text': '#1E293B', // Slate 800
        'attendo-neutral': '#F8FAFC', // Soft Neutral
        'attendo-success': '#22C55E', // Green 500
        'attendo-error': '#EF4444', // Red 500
      },
    },
  },
  plugins: [],
}


