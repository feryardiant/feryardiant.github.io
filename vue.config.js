const { resolve } = require('path')

module.exports = {
  baseUrl: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/global.scss";'
      }
    }
  },
  chainWebpack: config => {
    // .
  }
}
