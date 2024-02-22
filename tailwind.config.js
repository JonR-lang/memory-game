/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neutralClrOne: "#FDF3F8",
        primaryClrOne: "#E54891",
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
