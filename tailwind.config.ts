import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        mainBg: "#0a0f2c",  // Fondo principal azul oscuro
        secondaryBg: "#162447", // Fondo secundario
        accentBg: "#1f4068", // Fondo de acento (puede usarse en botones, etc.)
        highlightBg: "#e43f5a", // Color de acento naranja
      },
      textColor: {
        primaryText: "#ffffff",  // Texto principal blanco
        secondaryText: "#e3e3e3", // Texto secundario
        highlightText: "#e43f5a", // Texto de acento naranja
      },
      borderColor: {
        primaryBorder: "#1f4068", // Bordes de acento
        highlightBorder: "#e43f5a", // Bordes destacados en naranja
      },
    },
  },
  plugins: [],
};

export default config;
