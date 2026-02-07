import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border|shadow|ring)-(dark-bg|card-bg|card-border|accent|brand-green|header-bg|discount-badge|timer-warn|secondary)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family)"],
        montserrat: ["var(--font-family)"],
        raleway: ["var(--second-family)"],
        gilroy: ["var(--third-family)"],
      },
      colors: {
        "brand-green": "var(--color-brand-green)",
        "dark-bg": "var(--color-site-bg)",
        "card-bg": "var(--color-card-bg)",
        "card-border": "var(--color-card-border)",
        accent: "var(--color-accent)",
        "header-bg": "var(--color-header-bg)",
        "discount-badge": "var(--color-discount-badge)",
        "timer-warn": "var(--color-timer-warn)",
        secondary: "var(--color-text-secondary)",
      },
      animation: {
        blink: "blink 1.5s ease-in-out infinite",
        priceSwitch: "priceSwitch 0.5s ease-out",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        priceSwitch: {
          "0%": { opacity: "0.5", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      height: {
        header: "var(--height-header)",
        button: "var(--height-button)",
        image: "var(--height-image)",
      },
      width: {
        button: "var(--width-button)",
        image: "var(--width-image)",
      },
      borderRadius: {
        button: "var(--radius-button)",
      },
      spacing: {
        "button-x": "var(--padding-button-x)",
        "button-y": "var(--padding-button-y)",
      },
    },
  },
  plugins: [],
};

export default config;
