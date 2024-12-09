/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    //safelist all ways to specify margin, since this can be dynamically written out:
    {
    pattern: /m(l|r|t|b|x|y|e)?-/
  },
  {
    pattern: /leading-/
  }],
  theme: {
    spacing: {
      // Built around scaled-up text of size 8x8px:
      '1': '8px',
      '2': '16px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px',
      '7': '56px',
      '8': '64px',
      '9': '72px',
      '10': '80px',
      '11': '88px',
      '12': '96px',
      '13': '104px',
      '14': '112px',
      '15': '120px',
      '16': '128px',
  },
  lineHeight: {
    '1': '8px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '5': '40px',
    '6': '48px',
    '7': '56px',
    '8': '64px',
  },

    fontFamily: {
      hoh: ["head-over-heels"],
    },
    fontSize: {
      base: "24px",
      l: "32px",
    },
    extend: {
      scale: {
        double: "2",
      },
      maxWidth: {
        // suitable for dialogs opened for game menus
        mostOfScreen: "76rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        pureBlack: "#000000",
        lightBlack: "#3b4e48",
        shadow: "#445a57",
        midGrey: "#8a8080",
        lightGrey: "#c4b8b8",
        white: "#ffffff",
        metallicBlue: "#4d74ad",
        pink: "#d79ad4",
        moss: "#a69c15",
        redShadow: "#896a63",
        midRed: "#ca8279",
        lightBeige: "#dbb0a1",
        highlightBeige: "#eccba5",
        alpha: "#000000",
        replaceLight: "#00ffff",
        replaceDark: "#008080",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
