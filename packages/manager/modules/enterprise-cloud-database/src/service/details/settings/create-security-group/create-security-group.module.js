import angular from 'angular';

import createSecurityGroupComponent from './create-security-group.component';
import routing from './create-security-group.routing';
import securityGroupNameComponent from '../../../security-group-name';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroup';

angular
  .module(moduleName, [
    securityGroupNameComponent,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroupComponent', createSecurityGroupComponent)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
