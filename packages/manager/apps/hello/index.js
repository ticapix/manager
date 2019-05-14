import angular from 'angular';

import '@uirouter/angularjs';

/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
import 'script-loader!jquery';
import 'script-loader!lodash';
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

import '@ovh-ux/manager-hello';

angular
  .module('helloApp', [
    'ovhManagerHello',
    'ui.router',
  ]);
