import angular from 'angular';
import defaultPaymentComponent from './default-payment.component';

const moduleName = 'enterpriseCloudDatabaseServiceDetailsDefaultPaymentComponent';

angular
  .module(moduleName, [])
  .component('enterpriseCloudDatabaseServiceDetailsDefaultPaymentComponent', defaultPaymentComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
