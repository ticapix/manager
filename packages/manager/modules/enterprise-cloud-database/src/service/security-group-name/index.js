import angular from 'angular';
import securityGroupNameComponent from './security-group-name.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceSecurityGroupName';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceSecurityGroupNameComponent', securityGroupNameComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
