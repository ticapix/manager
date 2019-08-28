import angular from 'angular';
import passwordComponent from './password.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServicePassword';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServicePasswordComponent', passwordComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
