const { createProxyMiddleware } = require("http-proxy-middleware");

const createTransaction = (req) => {
  const reqTarget = req.body.RequestTarget;

  const options = {
    target: reqTarget, // target host
    onProxyRes: function(proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "http://saybis.xyz";
    },
    ws: true,
    pathRewrite: {
      "^/api/old-path": "/api/new-path", // rewrite path
      "^/api/remove/path": "/path", // remove base path
    },
  };

  const requestProxy = createProxyMiddleware(options);

  return requestProxy;
};

exports.createTransaction = createTransaction;
