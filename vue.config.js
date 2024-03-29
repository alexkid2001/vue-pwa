const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave: false,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        process: false,
      },
    },
  },
  pwa: {
    name: 'My 1st PWA App',
  },
});
