import angular from 'angular';

import accountRenew from './billing/account-renew/renew.module';

import components from './exchangeComponents.module';
import controllers from './exchangeControllers.module';
import directives from './exchangeDirectives.module';
import services from './exchangeServices.module';
import routing from './exchange.routes';
import cacheTemplate from './exchange.template';

import {
  EXCHANGE_MX_CONFIG,
  EXCHANGE_CONFIG_URL,
  EXCHANGE_CONFIG,
} from './exchange.constants';

import './css/exchangeDiagnostic.css';

const moduleName = 'Module.exchange';

angular
  .module(moduleName, [
    'ngOvhUtils',
    'ngRoute',
    'ui.bootstrap',
    'ngSanitize',
    'ng.ckeditor',
    accountRenew,
    components,
    controllers,
    directives,
    services,
  ])
  .constant('EXCHANGE_MX_CONFIG', EXCHANGE_MX_CONFIG)
  .constant('EXCHANGE_CONFIG_URL', EXCHANGE_CONFIG_URL)
  .constant('EXCHANGE_CONFIG', EXCHANGE_CONFIG)
  .config(routing)
  .run(cacheTemplate);

export default moduleName;
