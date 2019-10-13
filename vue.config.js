const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const manifest = require('./public/manifest.json')

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
    themeColor: manifest.theme_color,
    themeColor: manifest.theme_color,
    // workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc: 'src/service-worker.js',
      exclude: ['CNAME']
    },
    iconPaths: {
      favicon16: 'img/favicon-16x16.png',
      favicon32: 'img/favicon-32x32.png',
      appleTouchIcon: 'img/mobile-icon-152x152.png',
      maskIcon: 'img/safari-pinned-tab.svg',
      msTileImage: 'img/msmobile-icon-144x144.png'
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
    config.plugin('html').tap(args => {
      args[0].title = 'Fery Wardiyanto'
      args[0].meta = {
        description: 'Yet Another Personal Website'
      }

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
