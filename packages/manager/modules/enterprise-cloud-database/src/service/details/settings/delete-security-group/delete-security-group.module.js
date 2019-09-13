import angular from 'angular';

import deleteSecurityGroupComponent from './delete-security-group.component';
import routing from './delete-security-group.routing';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroup';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroupComponent', deleteSecurityGroupComponent)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
