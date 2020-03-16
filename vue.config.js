module.exports = {
  publicPath: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/global.scss";'
      }
    }
  },
  devServer: {
    historyApiFallback: {
      // Simulate 404 page on GitHub Page.
      rewrites: [
        { from: /.*/, to: '/404.html' }
      ]
    }
  }
}
