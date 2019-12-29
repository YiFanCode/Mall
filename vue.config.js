const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
    chainWebpack(config){
        config.resolve.alias
        .set('components', resolve('src/components'))
        .set('pages', resolve('src/pages'))
        .set('api', resolve('src/api'))
    }
}