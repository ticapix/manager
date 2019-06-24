import angular from 'angular';
import '@uirouter/angularjs';
import ngOvhPaymentMethod from '@ovh-ux/ng-ovh-payment-method';
import deployComponent from './deploy.component';
import routing from './deploy.routing';

import insufficientQuota from './insufficient-quota';

import generalComponent from './general';

const moduleName = 'ovhManagerAnalyticsDataPlatformDeployComponent';

angular
  .module(moduleName, [
    'ui.router',
    ngOvhPaymentMethod,
    insufficientQuota,
    generalComponent,
  ])
  .config(routing)
  .component('deployComponent', deployComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
