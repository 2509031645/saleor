const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy(['/api','/login_p'], {
            target: 'http://localhost:8082',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
                '^/login_p':'/login_p'
            }
        })
    )
}