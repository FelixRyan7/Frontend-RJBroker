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
        darkerGray: "#9AA6B8",
        white2: "#F0F4F8",
        red: "#F43F5E",
        green: "#14B8A6",
        
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #1B98E0 0%, #0D6EFD 100%)",
      },
      animation: {
        'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
