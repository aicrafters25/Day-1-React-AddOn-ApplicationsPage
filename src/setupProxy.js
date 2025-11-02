// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/mule',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: { '^/mule': '' } // /mule/hellomulesoft -> /hellomulesoft
    })
  );
};
