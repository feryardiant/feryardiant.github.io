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
    name: 'Fery Wardiyanto\'s Website',
    themeColor: '#4a4a4a',
    msTileColor: '#4a4a4a',
    iconPaths: {
      favicon16: 'img/icons/favicon-16x16.png',
      favicon32: 'img/icons/favicon-32x32.png',
      appleTouchIcon: 'img/icons/mobile-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msmobile-icon-144x144.png'
    }
  },
  devServer: {
    historyApiFallback: {
      // Simulate 404 page on GitHub Page.
      rewrites: [
        { from: /.*/, to: '/404.html' }
      ]
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Fery Wardiyanto'
      args[0].meta = {
        description: 'Yet Another Personal Website'
      }

      return args
    })

    config.plugin('workbox').tap(args => {
      args[0].exclude.push('CNAME')

      return args
    })

    config.plugin('imagemin').use(ImageminPlugin, [
      {
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpe?g|png|gif|svg)$/i
      }
    ])
  }
}
