/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFD000",
        secondary: "#FF5100",

        light: {
          100: "#F6F6F7",
          200: "#FFFFFF",
          300: "#E5E7EB",
        },

        dark: {
          100: "#1B1B20",
          200: "#1F2937",
        },
        accent: "#0066FF",
        danger: "#E30D34",
        info: "#0066FF",
        success: "#10B981",
        warning: "#FFD000",

        
      },
    },
  },
  plugins: [],
};