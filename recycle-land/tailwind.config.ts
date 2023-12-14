import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      color: {
        primary: "#024731",
        green: {
          "100": "#8BF98D",
          "200": "#93CE20",
          "300": "#A2FAA3",
          "400": "#5C9D06",
          "500": "#457604",
          "600": "#396204",
        },
        black: {
          "100": "#111D13",
          "200": "#070D08",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#024731",
            "light-green1": "#8BF98D",
            "light-green2": "#9EFAA0",
            "light-green3": "#A2FAA3",
            "dark-green1": "#5C9D06",
            "dark-green2": "#457604",
            "dark-green3": "#396204",
            dark1: "#111D13",
          },
        },
      },
    }),
  ],
};
export default config;
