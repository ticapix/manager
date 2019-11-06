/* eslint-disable import/no-webpack-loader-syntax, import/extensions */

import 'script-loader!jquery';

/* eslint-enable import/no-webpack-loader-syntax, import/extensions */


import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/manager-nasha';
import './index.scss';
// import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';

angular
  .module('nashaApp', [
    'ovhManagerCore',
    'ovhManagerNasha',
  ]);
