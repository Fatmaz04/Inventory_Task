import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom-yellow': '0 4px 6px rgba(245, 158, 11, 0.5)',
      },
      colors:{
        light: '#fae6b1',
        lightblue: '#b3dee5',
        org: '#ffa101',
        orgblue:'#31525b'
      }
    },
  },
  plugins: [],
};
export default config;
