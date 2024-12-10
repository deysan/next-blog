import type { Config } from "tailwindcss";

export default {
  content: [
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
} satisfies Config;
