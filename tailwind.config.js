/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{md,vue,js}',
    './docs/.vitepress/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'serif'],
      },
    },
  },
  plugins: [],
}