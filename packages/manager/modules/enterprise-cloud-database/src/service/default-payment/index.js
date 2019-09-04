import angular from 'angular';
import defaultPaymentComponent from './default-payment.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsDefaultPaymentComponent';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsDefaultPaymentComponent', defaultPaymentComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
