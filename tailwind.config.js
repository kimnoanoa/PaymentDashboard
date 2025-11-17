/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepgreen: {
          600: "#24553A", // 어두운 초록
          700: "#1E4630", // 더 어두운 초록
        },
      },
    },
  },
  plugins: [],
};
