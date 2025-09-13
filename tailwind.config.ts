import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'display': ['Anton', 'Oswald', 'sans-serif'],
        'heading': ['Oswald', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
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
        firestorm: {
          black: "hsl(var(--firestorm-black))",
          red: "hsl(var(--firestorm-red))",
          orange: "hsl(var(--firestorm-orange))",
          ember: "hsl(var(--firestorm-ember))",
          smoke: "hsl(var(--firestorm-smoke))",
          ash: "hsl(var(--firestorm-ash))",
          flame: "hsl(var(--firestorm-flame))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "parallax": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--firestorm-red) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--firestorm-red) / 0.6)" },
        },
        "fire-flicker": {
          "0%, 100%": { 
            opacity: "0.8",
            transform: "scale(1) rotate(0deg)"
          },
          "25%": { 
            opacity: "0.9",
            transform: "scale(1.02) rotate(0.5deg)"
          },
          "50%": { 
            opacity: "0.85",
            transform: "scale(1.01) rotate(-0.3deg)"
          },
          "75%": { 
            opacity: "0.95",
            transform: "scale(1.03) rotate(0.2deg)"
          }
        },
        "ember-rise": {
          "0%": { 
            transform: "translateY(100px) translateX(0px)",
            opacity: "0"
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateY(-100px) translateX(20px)",
            opacity: "0"
          }
        },
        "pulse-fire": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--firestorm-red) / 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--firestorm-red) / 0.6), 0 0 60px hsl(var(--firestorm-orange) / 0.3)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fire-flicker": "fire-flicker 4s ease-in-out infinite",
        "pulse-fire": "pulse-fire 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "parallax": "parallax 20s ease-in-out infinite alternate",
        "glow": "glow 3s ease-in-out infinite",
        "fire-flicker": "fire-flicker 8s ease-in-out infinite",
        "ember-rise": "ember-rise 15s linear infinite",
        "pulse-fire": "pulse-fire 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
