import angular from 'angular';

import createSecurityGroupComponent from './create-security-group.component';
import securityGroupNameComponent from '../../../security-group-name';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroup';

angular
  .module(moduleName, [
    securityGroupNameComponent,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroupComponent', createSecurityGroupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
