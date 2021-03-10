const { defineConfig } = require('vite-plugin-windicss')
const typography = require('windicss/plugin/typography')

module.exports = defineConfig({
  darkMode: 'class',
  plugins: [
    typography()
  ]
})
