const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const glob = require('glob')
const path = require('path')
const { author, appConfig } = require('./../package.json')

require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'

appConfig.title = `${author.name}'s ${appConfig.name}`
appConfig.themeColor = '#4a4a4a'
appConfig.backgroundColor = '$fff'
appConfig.baseUrl = process.env.BASE_URL || '/'

module.exports = (api, options) => {
  api.chainWebpack(config => {
    config.plugin('html').tap(args => {
      args[0].title = appConfig.title
      args[0].meta = {
        author: author.name,
        description: appConfig.description,
        'twitter:card': 'sumary',
        'twitter:site': '@feryardiant',
        'og:type': 'website',
        'og:url': appConfig.baseUrl,
        'og:title': appConfig.title,
        'og:description': appConfig.description
      }

      if (!isDev) {
        args[0].meta['og:image'] = `${appConfig.baseUrl}img/icons/mobile-icon-512x512.png`
        args[0].meta['og:image:alt'] = 'Website Logo'
      }

      return args
    })

    config.plugin('pwa').tap(args => {
      args[0].name = appConfig.name
      args[0].themeColor = appConfig.themeColor
      args[0].msTileColor = appConfig.msTileColor
      args[0].icons = {
        favicon16: 'img/icons/favicon-16x16.png',
        favicon32: 'img/icons/favicon-32x32.png',
        appleTouchIcon: 'img/icons/mobile-icon-152x152.png',
        maskIcon: 'img/icons/safari-pinned-tab.svg',
        msTileImage: 'img/icons/msmobile-icon-144x144.png'
      }

      return args
    })

    config.when(!isDev, config => {
      config.plugin('workbox').tap(args => {
        args[0].exclude.push('CNAME')

        return args
      })
    })

    config.plugin('imagemin').use(ImageminPlugin, [
      {
        disable: isDev,
        test: /\.(jpe?g|png|gif|svg)$/i,
        optipng: {
          optimizationLevel: 3,
          interlaced: true
        },
        jpegtran: {
          progressive: true
        },
        svgo: {},
        externalImages: {
          context: 'src/assets', // Important! This tells the plugin where to "base" the paths at
          sources: glob.sync('src/assets/img/icons/*'),
          destination: path.join(options.outputDir, options.assetsDir),
          fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
        }
      }
    ])
  })
}
