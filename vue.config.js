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
  chainWebpack: config => {
    // .
  }
}
