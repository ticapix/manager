import angular from 'angular';

import deleteSecurityGroupComponent from './delete-security-group.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroup';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroupComponent', deleteSecurityGroupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
