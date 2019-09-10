import angular from 'angular';
import priceComponent from './price.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabasePriceComponent';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabasePriceComponent', priceComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
