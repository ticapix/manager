import angular from 'angular';
import billingInfoComponent from './billing-info.component';

const moduleName = 'enterpriseCloudDatabaseBillingInfoComponent';

angular
  .module(moduleName, [])
  .component('enterpriseCloudDatabaseBillingInfoComponent', billingInfoComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
