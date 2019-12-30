const webpack = require('webpack')
const path = require('path')
const appData = require('./mock/data.json')
const {seller, goods, ratings} = appData

function resolve(dir) {
  return path.join(__dirname, dir) // vue.config.js 所在的目录
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          error: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          error: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          error: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
