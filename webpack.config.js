/*
*   fileName: webpack.config
*   author: 宋均辉
*   time: 2019/8/27
*/

// fixme: 注意此文件没有用处，只是为了让编辑器认识根路径为"@"
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve('dist')
    },
    resolve: {
        // 设置别名
        alias: {
            '@': resolve('src')// 这样配置后 @ 可以指向 src 目录
        }
    }
};