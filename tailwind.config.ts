import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        /* Body and interface text, the reference template's base face. */
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        /* Headings. The reference ships a licensed face; Outfit is the closest
           free geometric sans in weight and proportions. */
        display: ["Outfit", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /*
         * Named palette from the reference template. The template's #33A9B1
         * reaches only 2.8:1 against white, so it stays on decorative rules,
         * icons and dark grounds; #157A82 (5.1:1) carries all teal text and any
         * fill that has white type on it.
         */
        teal: {
          DEFAULT: "#157A82",
          bright: "#33A9B1",
          deep: "#0F6A71",
        },
        pine: "#1F3D3F",
        ink: {
          DEFAULT: "#050C14",
          alt: "#121C27",
        },
        shade: "#DEE8DE",
        light: "#E2EDF3",
        mist: "#F5F7FA",
        body: "#47697B",
        mute: "#969EB2",
        hairline: "#D8DDE1",
      },
      borderRadius: {
        card: "32px",
        tile: "16px",
        panel: "30px",
        ledge: "65px",
        pill: "50px",
      },
      maxWidth: {
        shell: "1320px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
