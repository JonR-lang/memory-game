/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neutralClrOne: "#FDF3F8",
        neutralClrTwo: "#EEF2FF",
        primaryClrOne: "#E54891",
        primaryClrTwo: "#A5B4FD",
        accentClrOne: "#6466F1",
        darkGray: "#303136",
      },
      boxShadow: {
        crescent:
          "inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb",
      },
    },
  },
  plugins: [],
};
