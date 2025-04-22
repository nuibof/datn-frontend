// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: 'class', // Cho phép dark mode qua class
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
