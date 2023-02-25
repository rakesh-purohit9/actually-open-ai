module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        black_900_dd: "#000000dd",
        black_900_99: "#00000099",
        indigo_A700: "#0042fc",
        black_900_60: "#00000060",
        blue_A700: "#2761ff",
        bluegray_900_19: "#2b2b2b19",
        white_A700: "#ffffff",
      },
      fontFamily: { inter: "Inter", roboto: "Roboto" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
