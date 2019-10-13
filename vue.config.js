const { default: ImageminPlugin } = require('imagemin-webpack-plugin')

module.exports = {
  baseUrl: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/global.scss";'
      }
    }
  },
  pwa: {
    themeColor: '#fff',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/worker.js',
      exclude: ['CNAME']
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/public/404.html' }
      ]
    }
  },
  chainWebpack: config => {
    config.plugin('imagemin').use(ImageminPlugin, [
      {
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpe?g|png|gif|svg)$/i
      }
    ])
  }
}
