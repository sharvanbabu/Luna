/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1E",
        primary: "#7C8CFF",
        secondary: "#C3B8FF",
        card: "#121827",
        "primary-text": "#FFFFFF",
        "secondary-text": "#9BA3AF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
