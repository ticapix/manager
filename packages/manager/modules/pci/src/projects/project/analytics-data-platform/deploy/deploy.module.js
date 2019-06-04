import angular from 'angular';
import '@uirouter/angularjs';
import ngOvhPaymentMethod from '@ovh-ux/ng-ovh-payment-method';
import deployComponent from './deploy.component';
import routing from './deploy.routing';

const moduleName = 'ovhManagerAnalyticsDataPlatformDeployComponent';

angular
  .module(moduleName, [
    'ui.router',
    ngOvhPaymentMethod,
  ])
  .config(routing)
  .component('deployComponent', deployComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
