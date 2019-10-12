module.exports = {
  baseUrl: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        appendData: '@import "@/global.scss";'
      }
    }
  },
  chainWebpack: config => {
    // .
  }
}
