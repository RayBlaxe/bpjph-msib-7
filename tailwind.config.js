const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral,
        primary: colors.sky,
        secondary: "#f0f0f0",
        purple: "#670075",
        darkPurple: "#480051",
        green: "#3EC3A4",
        fontSecondary: "#3EC3A4",
        fontPrimary: "#333",
      },
      borderRadius: {
        "2xl": "1.5rem",
      },
      fontSize: {
        "2xc": "1.85rem",
        "1sm": "0.75rem",
        "3xc": "2rem",
        "2.5xl": "1.66rem",
        "4.5xl": "2.6rem",
      },
      screens: {
        desktop: "1630px",
        780: "780px",
        sm: "375px",
      },
      height: {
        97: "25rem",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "1rem",
        md: "5rem",
        lg: "6rem",
        xl: "7rem",
        "2xl": "8rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
