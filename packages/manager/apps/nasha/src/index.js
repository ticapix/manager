/* eslint-disable import/no-webpack-loader-syntax, import/extensions */

import 'script-loader!jquery';

/* eslint-enable import/no-webpack-loader-syntax, import/extensions */


import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/manager-nasha';
import './index.scss';

angular
  .module('nashaApp', [
    'ovhManagerCore',
    'ovhManagerNasha',
  ]);
