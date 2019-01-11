const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
    	proxy('/api', { target: 'http://localhost:8001/', changeOrigin: true })
    );
    app.use(
    	proxy('/user', { target: 'http://localhost:8001/', changeOrigin: true })
    );
    app.use(
    	proxy('/users', { target: 'http://localhost:8001/', changeOrigin: true })
    );
}