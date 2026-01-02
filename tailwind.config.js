/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 esto debe estar así
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B98E0",
        secondary: "#E8F1F2",
        accent: "#F9DC5C",
        dark: "#040404",
        gray: "#ADB6C4",
        white2: "#FAFAFA"
      },
    },
  },
  plugins: [],
}
