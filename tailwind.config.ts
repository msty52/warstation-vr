import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Мы будем использовать папку src или корень
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vr-black': '#050505',
        'vr-pink': '#ff007a', // Розовый из макета
        'vr-blue': '#00d4ff', // Голубой из макета
        'vr-yellow': '#fff200', // Желтый акцент
      },
      boxShadow: {
        'neon-pink': '0 0 10px #ff007a, 0 0 20px #ff007a',
        'neon-blue': '0 0 10px #00d4ff, 0 0 20px #00d4ff',
      }
    },
  },
  plugins: [],
};
export default config;