module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
      './node_modules/vue-good-table/src/**/*.vue',

    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // fontFamily: {
      //   ...fontFamily,
      //   sans: ['Noto Sans'],
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
