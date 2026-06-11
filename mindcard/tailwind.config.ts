import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Calm, teen-friendly, "safe" palette
        cream: "#FBF8F4",
        canvas: "#F6F5FC",
        ink: {
          DEFAULT: "#2E2A47",
          soft: "#4A4668",
          muted: "#7C7A95",
        },
        lavender: {
          50: "#F3F1FE",
          100: "#E7E3FD",
          200: "#CFC7FB",
          300: "#B3A6F6",
          400: "#9683F1",
          500: "#7C6BF0",
          600: "#6A55E0",
          700: "#5942C2",
        },
        mint: {
          50: "#EDFBF8",
          100: "#D4F5EE",
          200: "#A8ECDE",
          300: "#74DECB",
          400: "#4FCFBA",
          500: "#34BBA6",
          600: "#239585",
        },
        peach: {
          50: "#FFF3EE",
          100: "#FFE4D7",
          200: "#FFC7AE",
          300: "#FFA985",
          400: "#FF8E63",
          500: "#FB7546",
        },
        blush: {
          100: "#FCE3EC",
          200: "#F8C2D6",
          300: "#F29BBA",
        },
        sky: {
          100: "#E2F1FB",
          200: "#BFE0F6",
          300: "#8FC8EE",
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(86, 70, 160, 0.35)",
        glow: "0 0 60px -10px rgba(124, 107, 240, 0.45)",
        card: "0 24px 60px -28px rgba(60, 48, 120, 0.45)",
        lift: "0 30px 70px -30px rgba(60, 48, 120, 0.5)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatySlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-22px) translateX(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.92)", opacity: "0.7" },
          "70%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        floatySlow: "floatySlow 9s ease-in-out infinite",
        shimmer: "shimmer 8s ease infinite",
        riseIn: "riseIn 0.6s ease-out both",
        pulseRing: "pulseRing 2.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
