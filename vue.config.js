module.exports = {
  publicPath: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/global.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/feryardiant-id/us-central1'
      }
    },
    historyApiFallback: {
      // Simulate 404 page on GitHub Page.
      rewrites: [{ from: /.*/, to: '/404.html' }]
    }
  }
}
