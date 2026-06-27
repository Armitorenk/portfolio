/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFDFE",
        ink: "#0C1719",
        "paper-dark": "#0E1E24",
        "ink-dark": "#E8F1F2",
        // Teal accent from the CV
        accent: {
          DEFAULT: "#0FA4B7",
          bright: "#22C4D6",
          deep: "#0B6F7E",
          soft: "#E6F6F9",
        },
        // Green "available" signal
        signal: "#22C55E",
        // Varied harmonious glow hues for the dark background (not all blue)
        glow: {
          teal: "#22C4D6",
          violet: "#8B5CF6",
          rose: "#FB7185",
          amber: "#FBBF24",
          mint: "#34D399",
        },
      },
      fontFamily: {
        display: ['"Outfit"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        site: "76rem",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(5%, 7%) scale(1.12)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1.08)" },
          "50%": { transform: "translate(-7%, -5%) scale(0.94)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(4%, -6%) scale(1.1)" },
        },
        // dizzy mouth: a queasy little side-to-side wobble
        wobble: {
          "0%, 100%": { transform: "translateX(-1.5px) rotate(-6deg)" },
          "50%": { transform: "translateX(1.5px) rotate(6deg)" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 26s ease-in-out infinite",
        "aurora-2": "aurora-2 32s ease-in-out infinite",
        "aurora-3": "aurora-3 38s ease-in-out infinite",
        wobble: "wobble 0.45s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
