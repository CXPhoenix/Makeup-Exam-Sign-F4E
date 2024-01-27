/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,jsx,js,html}"],
  theme: {
    extend: {
      boxShadow: {
        "md-hover": "10px 12px 3px -3px rgb(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
