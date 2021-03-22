const { defineConfig } = require('vite-plugin-windicss')
const typography = require('windicss/plugin/typography')

module.exports = defineConfig({
  darkMode: 'class',
  variants: {
    extends: {
      responsive: ['sm', 'md']
    }
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: false,
            h1: {
              fontWeight: '700',
              marginTop: false,
              marginBottom: false,
              margin: '0'
            },
            figure: {
              marginTop: false
            },
            img: {
              borderRadius: '.25rem',
              border: '1px solid #D1D5DB'
            }
          },
        },
      },
    },
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
      mono: ['Fira Code', 'monospace'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      },
      css: {
        padding: '1rem'
      }
    }
  },
  plugins: [
    typography({
      modifiers: ['sm', 'md'],
    })
  ]
})
