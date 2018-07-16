const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware(router) {
    router.use('/', proxy({
        target: 'https://reqres.in',
        changeOrigin: true
    }))
}