/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'bus-move-forward': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(100vw - 4rem))' }, // Ajusta según el ancho del bus y la pantalla
        },
        'bus-move-backward': {
          '0%': { transform: 'translateX(calc(100vw - 4rem))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'bus-move-forward': 'bus-move-forward 2s linear forwards',
        'bus-move-backward': 'bus-move-backward 2s linear forwards',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
