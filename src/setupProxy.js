const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Local SMS Gateway Proxy
  app.use(
    '/api/local-sms',
    createProxyMiddleware({
      target: 'http://192.168.18.91:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/api/local-sms': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔄 Proxying SMS request to local gateway');
      }
    })
  );
};
