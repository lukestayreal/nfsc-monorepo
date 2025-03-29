import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Switzer, system-ui, sans-serif",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
