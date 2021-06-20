module.exports = {
  // configureWebpack: {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://lab.isaaclin.cn/nCoV/', // target host
        // ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '/api', // rewrite path
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  productionSourceMap: false,
};
