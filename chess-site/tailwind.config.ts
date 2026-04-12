import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E7",
        bone: "#EFE7D7",
        ink: "#1A1613",
        burgundy: "#5C1A1B",
        brass: "#A67C3A",
        stone: "#8A8378",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.24em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
