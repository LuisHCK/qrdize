module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  pwa: {
    workboxOptions: { skipWaiting: true }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#039be5',
        },
        javascriptEnabled: true
      }
    }
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
