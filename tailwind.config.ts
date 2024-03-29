import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: "var(--font-opensans)",
    },
    container: {
      center: true,
    },
    colors: {
      /* Base */
      transparent: "transparent",
      black: "#000",
      white: "#FFF",

      /* Yellow */
      yellow100: "#FFFBE6",

      /* Cyan */
      cyan200: "#4DD0E1",
      cyan300: "#42b1bf",

      /* Orange */
      orange400: "#F1B147",

      /* Violet */
      violet400: "#c87ed5",
      violet500: "#A769B2",

      /* Pink */
      pink100: "#FFD7DE",
      pink700: "#FF0068",

      /* Red */
      red700: "#FF1744",

      /* Green */
      green100: "#35E4BD",
      green200: "#28DD91",

      /* Gray */
      gray100: "#F2F2F2",
      gray200: "#CCCCCC",
      gray300: "#DADADA",
      gray700: "#9B9B9B",
    },
    extend: {
      keyframes: {
        fromTop: {
          from: {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fromRight: {
          from: {
            opacity: "0",
            transform: "translateX(40px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        spin: "spin 2.5s linear infinite",
        fromTop: "fromTop 0.5s ease-out",
        fromRight: "fromRight 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
