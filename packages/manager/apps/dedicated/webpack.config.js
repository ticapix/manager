const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const webpackConfig = require('@ovh-ux/manager-webpack-config');

const folder = './client/app';
const bundles = {};

function foundNodeModulesFolder(checkedDir, cwd = '.') {
  if (fs.existsSync(`${cwd}/node_modules/${checkedDir}`)) {
    return path.relative(process.cwd(), `${cwd}/node_modules/${checkedDir}`);
  }

  if (path.resolve(cwd) !== '/') {
    return foundNodeModulesFolder(checkedDir, `${cwd}/..`);
  }

  return null;
}

fs.readdirSync(folder).forEach((file) => {
  const stats = fs.lstatSync(`${folder}/${file}`);
  if (file === 'components') return;
  if (file === 'dedicatedUniverseComponents') return;
  if (stats.isDirectory()) {
    const jsFiles = glob.sync(`${folder}/${file}/**/!(*.module).js`);
    if (jsFiles.length > 0) {
      bundles[file] = jsFiles;
    }
  }
});

module.exports = (env = {}) => {
  const { config } = webpackConfig({
    template: './client/app/index.html',
    basePath: './client/app',
    lessPath: [
      './node_modules',
    ],
    lessJavascriptEnabled: true,
    root: path.resolve(__dirname, './client/app'),
    assets: {
      files: [
        { from: path.resolve(__dirname, './client/**/*.html'), context: 'client/app' },
        { from: path.resolve(__dirname, './client/app/images/**/*.*'), context: 'client/app' },
        { from: path.resolve(__dirname, './client/assets'), to: 'assets' },
        { from: foundNodeModulesFolder('ckeditor'), to: 'ckeditor' },
        { from: foundNodeModulesFolder('angular-i18n'), to: 'resources/angular/i18n' },
        { from: `${foundNodeModulesFolder('flag-icon-css')}/flags`, to: 'flag-icon-css/flags' },
      ],
    },
  }, env);

  const WEBPACK_REGION = `${_.upperCase(env.region || process.env.REGION || 'EU')}`;

  config.plugins.push(new webpack.DefinePlugin({
    WEBPACK_ENV: {
      region: JSON.stringify(env.region),
      production: JSON.stringify(env.production),
    },
  }));

  // Extra config files
  const extrasRegion = glob.sync(`./.extras-${WEBPACK_REGION}/**/*.js`);
  const extras = glob.sync('./.extras/**/*.js');

  return merge(config, {
    entry: _.assign({
      app: [
        './client/app/index.js',
        './client/app/app.js',
        './client/app/app.routes.js',
      ]
        .concat(glob.sync('./client/app/**/*.module.js'))
        .concat(glob.sync('./client/app/components/**/!(*.module).js')),
    },
    bundles,
    extras.length > 0 ? { extras } : {},
    extrasRegion.length > 0 ? { extrasRegion } : {}),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].bundle.js',
    },
    resolve: {
      modules: [
        './node_modules',
        path.resolve(process.cwd(), './node_modules'),
        path.resolve(process.cwd(), '../../../../node_modules'),
      ],
      mainFields: ['module', 'browser', 'main'],
    },
    plugins: [
      new webpack.DefinePlugin({
        __NG_APP_INJECTIONS__: process.env.NG_APP_INJECTIONS ? `'${process.env.NG_APP_INJECTIONS}'` : 'null',
        __WEBPACK_REGION__: `'${WEBPACK_REGION}'`,
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
    },
  });
};
