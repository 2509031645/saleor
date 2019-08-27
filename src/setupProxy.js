const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/hello', {
            target: 'http://192.168.1.153:8082',
            changeOrigin: true,
            pathRewrite: {
                '^/': ''
            }
        })
    )
}