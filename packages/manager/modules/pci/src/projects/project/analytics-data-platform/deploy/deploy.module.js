import angular from 'angular';
import '@uirouter/angularjs';
import ngOvhPaymentMethod from '@ovh-ux/ng-ovh-payment-method';
import deployComponent from './deploy.component';
import routing from './deploy.routing';

import insufficientQuota from './insufficient-quota';

import generalComponent from './general';
import securityComponent from './security';
import regionsComponent from './regions';
import nodesComponent from './nodes';
import storageComponent from './storage';

const moduleName = 'ovhManagerAnalyticsDataPlatformDeployComponent';

angular
  .module(moduleName, [
    'ui.router',
    ngOvhPaymentMethod,
    insufficientQuota,
    generalComponent,
    securityComponent,
    regionsComponent,
    nodesComponent,
    storageComponent,
  ])
  .config(routing)
  .component('deployComponent', deployComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
