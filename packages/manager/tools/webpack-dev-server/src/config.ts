import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import Sso from './sso';
import serverProxy from './proxy';

export = (env) => {
  const region = (env.region || 'eu').toLowerCase();
  // code changed to connect to local sdev. Will be reverted once APIs are prodded
  const proxy:any = [serverProxy.v6(region)];
  const sso = new Sso(region);
  if (env.local2API) {
    proxy.unshift(serverProxy.aapi);
  }
  if (env.dev) {
    proxy.unshift(
      ...env.dev.map(config => serverProxy.dev(config)),
    );
  }

  // code added to connect to local sdev. Will be reverted once APIs are prodded
  proxy.unshift({
    target: 'https://api.ovh.com:42443/1.0',
    context: ['/engine/apiv6/cloudDB'],
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
    headers: {
      'X-Ovh-Nic': '',
    },
    pathRewrite: {
      '^/engine/apiv6/': '/',
    },
  });

  return {
    mode: 'development',
    plugins: [
      new DuplicatePackageCheckerPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ],
    devServer: {
      before(app) {
        app.get('/auth', sso.auth.bind(sso));
        app.get('/auth/check', sso.checkAuth.bind(sso));
      },
      clientLogLevel: 'none',
      logLevel: 'silent',
      host: env.host || 'localhost',
      https: env.https || false,
      overlay: true,
      port: env.port || 9000,
      proxy,
    },
  };
};
