/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./cards/**/*.{js,ts,jsx,tsx}",
    "./chips/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./modals/**/*.{js,ts,jsx,tsx}",
    "./tables/**/*.{js,ts,jsx,tsx}",
    "./tailwind/**/*.{js,ts,jsx,tsx}",
    "./svg/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#eff2f5",
        "dark-white": "rgba(217, 217, 217, 0.4)",
        "light-grey": "rgba(112, 112, 112, 1)",
        "super-light": "rgba(143, 150, 163, 1)",
        "light-white": "rgba(248, 248, 248, 1)",
        "light-green": "rgba(234, 255, 238, 1)",
        "dark-green": "rgba(47, 157, 88, 1)",
        "not-so-black": "#464646",
        "table-black": "#2D2D2F",
        "sky-blue": "#EBF4FF",
        "not-so-white": "#F9F9F9",
        "light-yellow": "#FCF9B8",
        "light-pink": "#FFDDDD",
        "light-violet": "#F1CAFF",
        "primray-blue": "#0C5473",
        "primary-grey": "#8289A3",
        "base-blue": "#C5F1FF",
        "base-green": "#8CFFDD",
        "base-yellow": "#F3FFAC",
        "base-black": "#004933",
        "base-dark-yellow": "#98920B",
        "secondary-blue": "rgba(48, 126, 198, 1)",
        "mimo-blue": "rgba(77, 201, 255, 1)",
        "mimo-grey": "#A4A4A4",
        "peach": "#DBA39A",
        "light-pink": "#F0DBDB",
        "off-white": "#F5EBE0",
        "beige": "#FEFCF3",
      },
    },
    fontFamily: {
      "dm-sans": ["DM Sans", "sans-serif"],
      poppins: ["Poppins"],
      mono: ["ui-monospace", "Menlo"],
      fredoka: ["Fredoka One"],
      gloock: ["Gloock"],
      josefin: ["Josefin Sans"],
    },

    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      md: ".938rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  plugins: [],
};
