/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDFDFD",
        "primary-text": "#0F172A",
        "secondary-text": "#475569",
        primary: "#4C1D95",      // Deep purple (Hero calm)
        secondary: "#2563EB",    // Trust Blue
        accent: "#FBBF24",       // Warm Yellow for CTAs
        "accent-hover": "#F59E0B",
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(0,0,0,0.05)',
        'float': '0 30px 60px -20px rgba(76, 29, 149, 0.15)',
      }
    },
  },
  plugins: [],
};
