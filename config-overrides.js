/*
*   fileName: config-overrides
*   author: 宋均辉
*   time: 2019/8/21
*/

const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
module.exports = override(
    // 配置路径别名
    addWebpackAlias({
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        actions: path.resolve(__dirname, 'src/actions'),
        '@': path.resolve(__dirname, 'src')
    }),
    //按需加载antd
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    })
)