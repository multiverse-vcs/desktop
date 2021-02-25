const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
