const { createProxyMiddleware } = require("http-proxy-middleware");

const createTransaction = async (req) => {
  const reqTarget = req.body.RequestTarget;

  const options = {
    target: reqTarget, // target host
    changeOrigin: true,
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
