const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
        .set('components', resolve('src/components'))
        .set('assets', resolve('src/assets'))
        .set('pages', resolve('src/pages'))
        .set('api', resolve('src/api'))
        config.plugins.delete('prefetch')
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    outputDir: 'app/',
    productionSourceMap: false
}