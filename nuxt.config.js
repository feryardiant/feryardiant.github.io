import Mode from 'frontmatter-markdown-loader/mode'
import glob from 'glob'
import path from 'path'

require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'

export default {
  mode: 'universal',
  /**
   * @see: https://nuxtjs.org/api/configuration-srcdir
   */
  srcDir: 'website',
  /**
   * @see https://nuxtjs.org/api/configuration-generate
   */
  generate: {
    fallback: true,
    subFolders: false,
    routes: () => {
      const paths = {
        '/': '*.md',
        '/posts/': 'posts/*.md'
      }

      return [].concat(
        ...Object.keys(paths).map((urlPath) => {
          const filePathGlob = paths[urlPath]

          return glob
            .sync(filePathGlob, { cwd: 'website/entries' })
            .map((filePath) => `${urlPath}${path.basename(filePath, '.md')}`)
        })
      )
    }
  },
  /**
   * @see https://nuxtjs.org/api/configuration-router
   */
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active'
  },
  /**
   * @see https://nuxtjs.org/api/configuration-ignore
   */
  ignore: ['**/.gitignore'],
  /**
   * Headers of the page
   */
  head: {
    titleTemplate: '%s - feryardiant.id',
    title: 'Sakpore',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /**
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /**
   * Global CSS
   */
  css: [],
  /**
   * Plugins to load before mounting the App
   */
  plugins: [],
  /**
   * Build configuration
   * @see https://nuxtjs.org/api/configuration-build
   */
  build: {
    // analyze: isDev,
    extractCSS: true,
    /**
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        // include: path.resolve(__dirname, 'entries'),
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META]
        }
      })
    }
  },
  /**
   * Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /**
   * Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase',
    '@nuxtjs/pwa'
  ],
  /**
   * Axios module configuration
   * @see https://axios.nuxtjs.org/options
   */
  axios: {},
  dotenv: {
    path: __dirname
  },
  /**
   * @see https://firebase.nuxtjs.org/guide/options
   */
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENTID
    },
    onFirebaseHosting: !isDev,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        }
        // For some reason it causes 'Not Found' issue on the home page.
        // ssr: true
      },
      analytics: !isDev,
      firestore: true,
      functions: {
        emulatorPort: 5000
      },
      // messaging: true,
      // performance: true,
      // realtimeDb: true,
      // remoteConfig: true,
      storage: !isDev
    }
  },
  proxy: {},
  pwa: {
    workbox: {
      // Uncomment this if services.auth.ssr not longer cause 'Not Found' issue
      // importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      // dev: isDev
      globPatterns: ['**/*.{js,css}', '**/icons/*'],
      offlinePage: '/404.html'
    }
  },
  /**
   * Tailwind CSS configuration
   * @see https://github.com/nuxt-community/tailwindcss-module#configuration
   */
  tailwindcss: {
    cssPath: '~/assets/tailwind.css'
  }
}
