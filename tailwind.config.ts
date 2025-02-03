import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Nunito",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        blue: "#3294F8",
        "base-title": "#E7EDF4",
        "base-subtitle": "#C4D4E3",
        "base-text": "#AFC2D4",
        "base-span": "#7B96B2",
        "base-label": "#3A536B",
        "base-border": "#1C2F41",
        "base-post": "#112131",
        "base-profile": "#0B1B2B",
        "base-background": "#071422",
        "base-input": "#040F1A",
      },
      boxShadow: {
        profile: "0px 2px 28px 0px rgba(0, 0, 0, 0.20)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
